"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavBar } from "@/components/nav-bar"
import dynamic from 'next/dynamic'
import { 
  LineChart, 
  BarChart2,
  Download, 
  TrendingUp,
  Wallet,
  Receipt,
  Calculator,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronDown
} from "lucide-react"
import { format, subDays } from 'date-fns'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import axios from 'axios'
import debounce from 'lodash/debounce'
import * as cheerio from 'cheerio'

// Dynamically import Chart.js to avoid SSR issues
const Line = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  { ssr: false }
)

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Add proper type for AnimatedCounter props
interface AnimatedCounterProps {
  value: string | number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const numericValue = typeof value === 'string' 
      ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
      : value
    
    const duration = 1500
    const frames = 60
    const increment = numericValue / frames
    let currentValue = 0

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= numericValue) {
        currentValue = numericValue
        clearInterval(timer)
      }
      setDisplayValue(currentValue)
    }, duration / frames)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString('en-IN', { 
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      })}
      {suffix}
    </span>
  )
}

// Update metrics definition
const performanceMetrics = [
  { id: 'marketCap', label: 'Market Cap', color: 'purple-400', prefix: '$', suffix: '' },
  { id: 'performance', label: 'Performance', color: 'green-400', prefix: '', suffix: '%' },
  { id: 'growth', label: 'YoY Growth', color: 'blue-400', prefix: '', suffix: '%' },
  { id: 'revenue', label: 'Revenue', color: 'orange-400', prefix: '$', suffix: 'Cr' },
  { id: 'netProfit', label: 'Net Profit', color: 'pink-400', prefix: '$', suffix: 'Cr' }
]

interface PerformanceMetric {
  id: string
  label: string
  color: string
  prefix?: string
  suffix?: string
}

// Company interface with detailed data
interface CompanyData {
  id: string
  name: string
  symbol: string
  sector: string
  marketCap: string
  currentPrice: number
  dayChange: number
  dayChangePercentage: number
  volume: string
  pe: number
  eps: number
  revenue: string
  netProfit: string
  yoyGrowth: number
  quarterlyData: {
    dates: string[]
    prices: number[]
    volumes: number[]
    revenue: number[]
    profit: number[]
  }
}

// Financial categories data
const categories = [
  { id: 'stocks', name: 'Stocks', icon: TrendingUp, color: 'purple' },
  { id: 'mutualFunds', name: 'Mutual Funds', icon: Wallet, color: 'blue' },
  { id: 'incomeTax', name: 'Income Tax', icon: Receipt, color: 'green' },
  { id: 'gst', name: 'GST', icon: Calculator, color: 'orange' }
]

const topCompanies: CompanyData[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries',
    symbol: 'RELIANCE.BSE',
    sector: 'Conglomerate',
    marketCap: '$17.8T',
    currentPrice: 2350,
    dayChange: 10,
    dayChangePercentage: 0.43,
    volume: '$792,756 Cr',
    pe: 20.5,
    eps: 115,
    revenue: '$792,756 Cr',
    netProfit: '$60,705 Cr',
    yoyGrowth: 28.8,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [2300, 2350, 2400, 2450],
      volumes: [1000000, 1200000, 1500000, 1800000],
      revenue: [200000, 210000, 220000, 230000],
      profit: [15000, 16000, 17000, 18000]
    }
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    symbol: 'TCS.BSE',
    sector: 'IT Services',
    marketCap: '$13.1T',
    currentPrice: 3400,
    dayChange: 50,
    dayChangePercentage: 1.48,
    volume: '$208,854 Cr',
    pe: 25.3,
    eps: 134,
    revenue: '$208,854 Cr',
    netProfit: '$38,327 Cr',
    yoyGrowth: 16.2,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [3300, 3400, 3500, 3600],
      volumes: [500000, 600000, 700000, 800000],
      revenue: [50000, 52000, 54000, 56000],
      profit: [10000, 11000, 12000, 13000]
    }
  },
  {
    id: 'hdfcBank',
    name: 'HDFC Bank',
    symbol: 'HDFCBANK.BSE',
    sector: 'Banking',
    marketCap: '$12.3T',
    currentPrice: 1700,
    dayChange: 20,
    dayChangePercentage: 1.18,
    volume: '$350,000 Cr',
    pe: 15.2,
    eps: 112,
    revenue: '$350,000 Cr',
    netProfit: '$50,000 Cr',
    yoyGrowth: 12.3,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [1650, 1700, 1750, 1800],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [200000, 210000, 220000, 230000],
      profit: [30000, 32000, 34000, 36000]
    }
  },
  {
    id: 'infosys',
    name: 'Infosys',
    symbol: 'INFY.BSE',
    sector: 'IT Services',
    marketCap: '$6.9T',
    currentPrice: 1500,
    dayChange: 50,
    dayChangePercentage: 3.43,
    volume: '$150,000 Cr',
    pe: 20.5,
    eps: 100,
    revenue: '$150,000 Cr',
    netProfit: '$25,000 Cr',
    yoyGrowth: 18.5,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [1450, 1500, 1550, 1600],
      volumes: [500000, 600000, 700000, 800000],
      revenue: [30000, 32000, 34000, 36000],
      profit: [5000, 6000, 7000, 8000]
    }
  },
  {
    id: 'hindunilvr',
    name: 'Hindustan Unilever',
    symbol: 'HINDUNILVR.BSE',
    sector: 'FMCG',
    marketCap: '$6.2T',
    currentPrice: 2200,
    dayChange: 100,
    dayChangePercentage: 4.64,
    volume: '$220,000 Cr',
    pe: 25.3,
    eps: 105,
    revenue: '$220,000 Cr',
    netProfit: '$30,000 Cr',
    yoyGrowth: 20.1,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [2100, 2200, 2300, 2400],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [5000, 6000, 7000, 8000]
    }
  },
  {
    id: 'iciciBank',
    name: 'ICICI Bank',
    symbol: 'ICICIBANK.BSE',
    sector: 'Banking',
    marketCap: '$6.1T',
    currentPrice: 1700,
    dayChange: 50,
    dayChangePercentage: 2.94,
    volume: '$300,000 Cr',
    pe: 15.2,
    eps: 100,
    revenue: '$300,000 Cr',
    netProfit: '$40,000 Cr',
    yoyGrowth: 10.9,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [1650, 1700, 1750, 1800],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [200000, 210000, 220000, 230000],
      profit: [30000, 32000, 34000, 36000]
    }
  },
  {
    id: 'stateBank',
    name: 'State Bank of India',
    symbol: 'SBIN.BSE',
    sector: 'Banking',
    marketCap: '$5.2T',
    currentPrice: 1400,
    dayChange: 20,
    dayChangePercentage: 1.43,
    volume: '$280,000 Cr',
    pe: 15.2,
    eps: 80,
    revenue: '$280,000 Cr',
    netProfit: '$35,000 Cr',
    yoyGrowth: 8.7,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [1350, 1400, 1450, 1500],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [20000, 22000, 24000, 26000]
    }
  },
  {
    id: 'bhartiAirtel',
    name: 'Bharti Airtel',
    symbol: 'BRITL.BSE',
    sector: 'Telecommunications',
    marketCap: '$4.9T',
    currentPrice: 700,
    dayChange: 20,
    dayChangePercentage: 2.86,
    volume: '$180,000 Cr',
    pe: 10.2,
    eps: 20,
    revenue: '$180,000 Cr',
    netProfit: '$25,000 Cr',
    yoyGrowth: 22.4,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [650, 700, 750, 800],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [30000, 32000, 34000, 36000],
      profit: [5000, 6000, 7000, 8000]
    }
  },
  {
    id: 'itc',
    name: 'ITC Limited',
    symbol: 'ITC.BSE',
    sector: 'FMCG',
    marketCap: '$4.8T',
    currentPrice: 300,
    dayChange: 10,
    dayChangePercentage: 3.33,
    volume: '$200,000 Cr',
    pe: 15.2,
    eps: 20,
    revenue: '$200,000 Cr',
    netProfit: '$28,000 Cr',
    yoyGrowth: 17.6,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [290, 300, 310, 320],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [30000, 32000, 34000, 36000],
      profit: [5000, 6000, 7000, 8000]
    }
  },
  {
    id: 'larsenToubro',
    name: 'Larsen & Toubro',
    symbol: 'L&T.BSE',
    sector: 'Engineering',
    marketCap: '$4.6T',
    currentPrice: 2200,
    dayChange: 50,
    dayChangePercentage: 2.27,
    volume: '$170,000 Cr',
    pe: 15.2,
    eps: 100,
    revenue: '$170,000 Cr',
    netProfit: '$22,000 Cr',
    yoyGrowth: 15.2,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [2150, 2200, 2250, 2300],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [20000, 22000, 24000, 26000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'kotakMahindra',
    name: 'Kotak Mahindra Bank',
    symbol: 'KOTAKBANK.BSE',
    sector: 'Banking',
    marketCap: '$4.5T',
    currentPrice: 1200,
    dayChange: 20,
    dayChangePercentage: 1.67,
    volume: '$290,000 Cr',
    pe: 15.2,
    eps: 100,
    revenue: '$290,000 Cr',
    netProfit: '$38,000 Cr',
    yoyGrowth: 21.7,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [1150, 1200, 1250, 1300],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [200000, 220000, 240000, 260000],
      profit: [30000, 32000, 34000, 36000]
    }
  },
  {
    id: 'axisBank',
    name: 'Axis Bank',
    symbol: 'AXISBANK.BSE',
    sector: 'Banking',
    marketCap: '$4.2T',
    currentPrice: 1000,
    dayChange: 20,
    dayChangePercentage: 2,
    volume: '$260,000 Cr',
    pe: 15.2,
    eps: 80,
    revenue: '$260,000 Cr',
    netProfit: '$32,000 Cr',
    yoyGrowth: 11.4,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [950, 1000, 1050, 1100],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [20000, 22000, 24000, 26000]
    }
  },
  {
    id: 'asianPaints',
    name: 'Asian Paints',
    symbol: 'ASIANPAINT.BSE',
    sector: 'Paints',
    marketCap: '$3.9T',
    currentPrice: 3000,
    dayChange: 100,
    dayChangePercentage: 3.33,
    volume: '$120,000 Cr',
    pe: 25.3,
    eps: 100,
    revenue: '$120,000 Cr',
    netProfit: '$18,000 Cr',
    yoyGrowth: 24.3,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [2900, 3000, 3100, 3200],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'hclTech',
    name: 'HCL Technologies',
    symbol: 'HCLTECH.BSE',
    sector: 'IT Services',
    marketCap: '$3.8T',
    currentPrice: 1000,
    dayChange: 50,
    dayChangePercentage: 5,
    volume: '$160,000 Cr',
    pe: 25.3,
    eps: 100,
    revenue: '$160,000 Cr',
    netProfit: '$20,000 Cr',
    yoyGrowth: 19.8,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [950, 1000, 1050, 1100],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'marutiSuzuki',
    name: 'Maruti Suzuki',
    symbol: 'MARUTI.BSE',
    sector: 'Automotive',
    marketCap: '$3.7T',
    currentPrice: 7000,
    dayChange: 200,
    dayChangePercentage: 2.86,
    volume: '$240,000 Cr',
    pe: 15.2,
    eps: 500,
    revenue: '$240,000 Cr',
    netProfit: '$30,000 Cr',
    yoyGrowth: 26.9,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [6800, 7000, 7200, 7400],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [5000, 6000, 7000, 8000]
    }
  },
  {
    id: 'bajajFinance',
    name: 'Bajaj Finance',
    symbol: 'BAJAJFINSV.BSE',
    sector: 'Financial Services',
    marketCap: '$3.6T',
    currentPrice: 3000,
    dayChange: 100,
    dayChangePercentage: 3.33,
    volume: '$190,000 Cr',
    pe: 25.3,
    eps: 100,
    revenue: '$190,000 Cr',
    netProfit: '$26,000 Cr',
    yoyGrowth: 20.9,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [2900, 3000, 3100, 3200],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'sunPharma',
    name: 'Sun Pharmaceutical',
    symbol: 'SUNPHARMA.BSE',
    sector: 'Healthcare',
    marketCap: '$3.5T',
    currentPrice: 1000,
    dayChange: 50,
    dayChangePercentage: 5,
    volume: '$130,000 Cr',
    pe: 25.3,
    eps: 100,
    revenue: '$130,000 Cr',
    netProfit: '$15,000 Cr',
    yoyGrowth: 25.6,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [950, 1000, 1050, 1100],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'ultraTechCement',
    name: 'UltraTech Cement',
    symbol: 'ULTRACEMCO.BSE',
    sector: 'Cement',
    marketCap: '$3.4T',
    currentPrice: 700,
    dayChange: 20,
    dayChangePercentage: 2.86,
    volume: '$110,000 Cr',
    pe: 15.2,
    eps: 50,
    revenue: '$110,000 Cr',
    netProfit: '$13,000 Cr',
    yoyGrowth: 22.8,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [650, 700, 750, 800],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'wipro',
    name: 'Wipro',
    symbol: 'WIPRO.BSE',
    sector: 'IT Services',
    marketCap: '$3.3T',
    currentPrice: 1000,
    dayChange: 50,
    dayChangePercentage: 5,
    volume: '$140,000 Cr',
    pe: 25.3,
    eps: 100,
    revenue: '$140,000 Cr',
    netProfit: '$17,000 Cr',
    yoyGrowth: 18.1,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [950, 1000, 1050, 1100],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [3000, 4000, 5000, 6000]
    }
  },
  {
    id: 'powerGrid',
    name: 'Power Grid Corporation',
    symbol: 'POWERGRID.BSE',
    sector: 'Power',
    marketCap: '$3.2T',
    currentPrice: 200,
    dayChange: 5,
    dayChangePercentage: 2.5,
    volume: '$80,000 Cr',
    pe: 15.2,
    eps: 20,
    revenue: '$80,000 Cr',
    netProfit: '$10,000 Cr',
    yoyGrowth: 9.6,
    quarterlyData: {
      dates: ['Q1', 'Q2', 'Q3', 'Q4'],
      prices: [195, 200, 205, 210],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [100000, 110000, 120000, 130000],
      profit: [20000, 22000, 24000, 26000]
    }
  }
]

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

interface StockData {
  symbol: string
  latestPrice: number
  change: number
  changePercent: number
  marketCap: number
  volume: number
}

// Function to fetch live stock data
const fetchStockData = async (symbol: string): Promise<StockData> => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    )
    
    const data = response.data['Global Quote']
    return {
      symbol,
      latestPrice: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
      marketCap: 0, // We'll get this from company info
      volume: parseInt(data['06. volume'])
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    throw error
  }
}

// Function to fetch company data using web scraping
const fetchCompanyDataByScraping = async (symbol: string): Promise<CompanyData | null> => {
  try {
    // Call our server-side API endpoint instead of directly scraping
    const response = await fetch(`/api/stock?symbol=${symbol}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error)
    return null
  }
}

// Function to search for a company
const searchCompany = async (query: string): Promise<CompanyData | null> => {
  try {
    // If the query looks like a symbol, search directly
    if (/^[A-Z0-9]+$/.test(query)) {
      return await fetchCompanyDataByScraping(query)
    }
    
    // Otherwise, try to find the company by name
    // This would typically use a search API, but for now we'll just
    // map some common company names to symbols
    const companyMap: Record<string, string> = {
      'reliance': 'RELIANCE',
      'tcs': 'TCS',
      'hdfc': 'HDFCBANK',
      'infosys': 'INFY',
      'hindustan unilever': 'HINDUNILVR',
      'itc': 'ITC',
      'sbi': 'SBIN',
      'bharti airtel': 'BHARTIARTL',
      'kotak': 'KOTAKBANK',
      'axis': 'AXISBANK'
    }
    
    const symbol = companyMap[query.toLowerCase()] || null
    if (symbol) {
      return await fetchCompanyDataByScraping(symbol)
    }
    
    return null
  } catch (error) {
    console.error('Error searching for company:', error)
    return null
  }
}

// Metric Card Component with null safety
const MetricCard = ({ 
  label, 
  value, 
  change 
}: { 
  label: string
  value: string | number
  change?: number 
}) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className="text-xl font-semibold flex items-center">
      {value || 'N/A'}
      {change !== undefined && (
        <span className={`ml-2 text-sm font-normal ${
          (change || 0) >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {(change || 0) >= 0 ? '↑' : '↓'}{Math.abs(change || 0).toFixed(1)}%
        </span>
      )}
    </div>
  </div>
)

// Chart Component with null safety
const CompanyChart = ({ 
  data, 
  timeframe 
}: { 
  data: CompanyData['quarterlyData']
  timeframe: string 
}) => {
  // Safe data check
  const safeData = data || { dates: [], prices: [], volumes: [], revenue: [], profit: [] }
  
  // Filter data based on timeframe
  const getTimeframeData = () => {
    let dataPoints = 30 // Default to 1M
    
    switch(timeframe) {
      case '1W': dataPoints = 7; break;
      case '1M': dataPoints = 30; break;
      case '3M': dataPoints = 90; break;
      case '6M': dataPoints = 180; break;
      case '1Y': dataPoints = 365; break;
      default: dataPoints = 30;
    }
    
    // If we have less data points than requested, use all available
    dataPoints = Math.min(dataPoints, safeData.dates.length)
    
    // If no data, return empty arrays
    if (dataPoints === 0) {
      return { dates: [], prices: [] }
    }
    
    // Get the most recent data points
    const sliceStart = Math.max(0, safeData.dates.length - dataPoints)
    
    return {
      dates: safeData.dates.slice(sliceStart),
      prices: safeData.prices.slice(sliceStart)
    }
  }
  
  const { dates, prices } = getTimeframeData()
  
  // Handle empty data case
  if (!dates.length) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-400">
        No historical data available
      </div>
    )
  }
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.7)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toLocaleString('en-IN')}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: { 
          color: 'rgba(255, 255, 255, 0.6)',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          callback: (value: number) => `$${value.toLocaleString('en-IN')}`
        }
      }
    }
  }

  return (
    <div className="h-[400px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default function AnalyticsPage() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [timeframe, setTimeframe] = useState('1M')
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([])
  const [error, setError] = useState('')

  // Implement debounced search
  const debouncedSearch = useMemo(
    () => debounce((query: string) => handleSearch(query), 500),
    []
  )
  
  // Function to handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredCompanies(companies)
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/stock?symbol=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        // Instead of throwing an error, set it in state
        setError(errorData.error || 'Company not found. Try a different name or symbol.')
        
        // If there are suggestions, show them
        if (errorData.suggestions) {
          setFilteredCompanies([])
        }
        return
      }
      
      const data = await response.json()
      
      // Add to companies if not already there
      if (!companies.some(company => company.symbol === data.symbol)) {
        const updatedCompanies = [...companies, data]
        setCompanies(updatedCompanies)
      }
      
      setFilteredCompanies([data])
      setSelectedCompany(data)
      setError('')
    } catch (error: any) {
      console.error('Search error:', error)
      setError('Failed to search. Please try again.')
      setFilteredCompanies([])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Fetch initial popular stocks
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      setError('')
      
      try {
        // Global popular stocks
        const initialSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']
        const initialData = []
        
        for (const symbol of initialSymbols) {
          try {
            const response = await fetch(`/api/stock?symbol=${symbol}`)
            
            if (response.ok) {
              const data = await response.json()
              initialData.push(data)
            }
          } catch (error) {
            console.error(`Error fetching ${symbol}:`, error)
            // Continue with next symbol
          }
        }
        
        if (initialData.length === 0) {
          throw new Error('Failed to load any initial stock data')
        }
        
        setCompanies(initialData)
        setFilteredCompanies(initialData)
        setSelectedCompany(initialData[0])
      } catch (error: any) {
        console.error('Error fetching initial data:', error)
        setError(error.message || 'Failed to load market data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchInitialData()
  }, [])
  
  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])
  
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4 md:mb-0">
            Market Analytics
          </h1>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  debouncedSearch(e.target.value)
                }}
                placeholder="Search by company name or ticker symbol..."
                className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        {/* Error message */}
        {error && !isLoading && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Main content */}
        {!isLoading && !error && filteredCompanies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with company list */}
            <div className="md:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <h2 className="text-xl font-semibold mb-4">Companies</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence>
                  {filteredCompanies.map(company => (
                    <motion.div
                      key={company.id || company.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                        selectedCompany?.id === company.id 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedCompany(company)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{company.name || company.symbol}</div>
                          <div className="text-sm text-gray-400">{company.symbol}</div>
                        </div>
                        <div className={`text-right ${
                          (company.dayChangePercentage || 0) >= 0 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          <div className="font-semibold">
                            ${(company.currentPrice || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </div>
                          <div className="text-sm flex items-center justify-end">
                            {(company.dayChangePercentage || 0) >= 0 ? (
                              <ArrowUpRight size={14} className="mr-1" />
                            ) : (
                              <ArrowDownRight size={14} className="mr-1" />
                            )}
                            {Math.abs(company.dayChangePercentage || 0).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Company Details */}
            <div className="md:col-span-3">
              {selectedCompany ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCompany?.id || selectedCompany?.symbol || 'empty'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Company Header */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedCompany.name || selectedCompany.symbol}</h2>
                          <div className="flex items-center text-gray-400 space-x-2">
                            <span>{selectedCompany.symbol}</span>
                            <span>•</span>
                            <span>{selectedCompany.sector || 'N/A'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            ${(selectedCompany.currentPrice || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </div>
                          <div className={`flex items-center justify-end text-lg ${
                            (selectedCompany.dayChangePercentage || 0) >= 0 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            {(selectedCompany.dayChangePercentage || 0) >= 0 ? (
                              <ArrowUpRight size={18} className="mr-1" />
                            ) : (
                              <ArrowDownRight size={18} className="mr-1" />
                            )}
                            ${Math.abs(selectedCompany.dayChange || 0).toFixed(2)} ({Math.abs(selectedCompany.dayChangePercentage || 0).toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard 
                          label="Market Cap" 
                          value={selectedCompany.marketCap || 'N/A'} 
                        />
                        <MetricCard 
                          label="Volume" 
                          value={selectedCompany.volume || 'N/A'} 
                        />
                        <MetricCard 
                          label="P/E Ratio" 
                          value={(selectedCompany.pe || 0).toFixed(2)} 
                        />
                        <MetricCard 
                          label="EPS" 
                          value={`$${(selectedCompany.eps || 0).toFixed(2)}`} 
                        />
                      </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Price History</h3>
                        <div className="flex gap-2">
                          {['1W', '1M', '3M', '6M', '1Y'].map((tf) => (
                            <button
                              key={tf}
                              onClick={() => setTimeframe(tf)}
                              className={`px-3 py-1 rounded-lg transition-all ${
                                timeframe === tf 
                                  ? 'bg-purple-500 text-white' 
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      </div>
                      <CompanyChart 
                        data={selectedCompany.quarterlyData} 
                        timeframe={timeframe} 
                      />
                    </div>

                    {/* Additional Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard 
                        label="Revenue" 
                        value={selectedCompany.revenue || 'N/A'} 
                      />
                      <MetricCard 
                        label="Net Profit" 
                        value={selectedCompany.netProfit || 'N/A'} 
                      />
                      <MetricCard 
                        label="YoY Growth" 
                        value={`${(selectedCompany.yoyGrowth || 0).toFixed(2)}%`} 
                        change={selectedCompany.yoyGrowth || 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex justify-center items-center h-[400px]">
                  <p className="text-gray-400">Select a company or search for one to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* No results */}
        {!isLoading && !error && filteredCompanies.length === 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8 text-center">
            <p className="text-xl text-gray-400 mb-4">No companies found matching your search.</p>
            <p className="text-gray-500">Try searching for a different company name or ticker symbol.</p>
          </div>
        )}
      </div>
    </div>
  )
} 