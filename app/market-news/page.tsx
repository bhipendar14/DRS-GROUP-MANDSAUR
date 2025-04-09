"use client"

import { useState, useEffect, useCallback } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Clock, 
  Globe, 
  Filter, 
  ChevronDown, 
  ArrowRight,
  RefreshCw, 
  ExternalLink,
  BarChart2,
  AlertTriangle
} from 'lucide-react'
import { motion } from 'framer-motion'

// Constants
const API_BASE_URL = "https://api.marketaux.com/v1"
// You should store this in environment variables (.env.local) in production
const API_KEY = "YOUR_MARKETAUX_API_KEY" 

// Types
type NewsArticle = {
  uuid: string;
  title: string;
  description: string;
  keywords: string[];
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  entities: {
    symbol: string;
    name: string;
    exchange: string;
    exchange_long: string;
    country: string;
    type: string;
    industry: string;
    match_score: number;
    sentiment_score: number;
    highlights: string[];
  }[];
}

type EntityStats = {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  price_change: number;
  price_change_pct: number;
  volume: number;
  market_cap: number;
}

export default function MarketNewsPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('latest')
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [similarArticles, setSimilarArticles] = useState<NewsArticle[]>([])
  const [entityStats, setEntityStats] = useState<EntityStats[]>([])
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [stocksData, setStocksData] = useState<Record<string, any>>({})
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    fetchLatestNews()
    fetchEntityStats()
  }, [])

  useEffect(() => {
    if (activeTab === 'markets') {
      const welcomeText = "Track real-time performance of India's leading companies"
      let index = 0
      setTypedText('')
      const timer = setInterval(() => {
        if (index < welcomeText.length) {
          setTypedText(welcomeText.substring(0, index + 1))
          index++
        } else {
          clearInterval(timer)
        }
      }, 50)
      
      return () => clearInterval(timer)
    }
  }, [activeTab])

  const fetchStockData = useCallback(async () => {
    setLoading(true)
    
    try {
      const TOP_STOCKS = [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.' },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
        { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.' },
        { symbol: 'INFY', name: 'Infosys Ltd.' },
        { symbol: 'HDFC', name: 'Housing Development Finance Corporation Ltd.' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
        { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.' },
        { symbol: 'SBIN', name: 'State Bank of India' },
        { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.' },
        { symbol: 'ITC', name: 'ITC Ltd.' }
      ]
      
      const results = await Promise.all(
        TOP_STOCKS.map(async (stock) => {
          try {
            const response = await fetch(`/api/indian-stocks?symbol=${stock.symbol}`)
            if (!response.ok) throw new Error(`Error fetching ${stock.symbol}`)
            const data = await response.json()
            return { ...stock, ...data }
          } catch (err) {
            console.error(`Failed to fetch ${stock.symbol}:`, err)
            return { 
              ...stock, 
              price: 0, 
              change: 0, 
              changePercent: 0, 
              volume: 0,
              open: 0,
              dayHigh: 0,
              dayLow: 0,
              previousClose: 0,
              error: true 
            }
          }
        })
      )
      
      const stocksObject: Record<string, any> = {}
      results.forEach(stock => {
        stocksObject[stock.symbol] = stock
      })
      
      setStocksData(stocksObject)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching stock data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'markets') {
      fetchStockData()
    }
  }, [activeTab, fetchStockData])

  const getMarketCap = (symbol: string, price: number) => {
    const baseCaps: Record<string, number> = {
      'RELIANCE': 16.71,
      'HDFCBANK': 8.57,
      'TCS': 13.65,
      'INFY': 6.19,
      'HDFC': 4.83,
      'ICICIBANK': 6.31,
      'HINDUNILVR': 5.92,
      'SBIN': 5.20,
      'BHARTIARTL': 4.96,
      'ITC': 4.40
    }
    
    return baseCaps[symbol] || 3.5
  }

  const handleRefreshData = () => {
    fetchStockData()
  }

  // Format large numbers (e.g., market cap) to more readable form
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T'
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B'
    if (num >= 1e7) return (num / 1e7).toFixed(2) + ' Cr'
    if (num >= 1e5) return (num / 1e5).toFixed(2) + ' L'
    return num.toString()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // API Calls
  const fetchLatestNews = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // In a live app, use real API call:
      // const response = await fetch(`${API_BASE_URL}/news/all?api_token=${API_KEY}&filter_entities=true&language=en&countries=in&limit=10`)
      // if (!response.ok) throw new Error(`API error: ${response.status}`)
      // const data = await response.json()
      // setNewsArticles(data.data || [])
      
      // For now, using mock data since we don't have a real API key
      setNewsArticles(getMockNewsData())
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Failed to load latest news. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const fetchEntityStats = async () => {
    setError(null)
    
    try {
      // In a live app, use real API call:
      // const response = await fetch(`${API_BASE_URL}/entity/stats/intraday?api_token=${API_KEY}&symbols=RELIANCE.BSE,HDFCBANK.BSE,TCS.BSE,INFY.NSE,HDFC.BSE`)
      // if (!response.ok) throw new Error(`API error: ${response.status}`)
      // const data = await response.json()
      // setEntityStats(data.data || [])
      
      // For now, using mock data
      setEntityStats(getMockEntityStatsData())
    } catch (err) {
      console.error("Error fetching entity stats:", err)
      setError("Failed to load market data. Please try again later.")
    }
  }

  const fetchSimilarArticles = async (uuid: string) => {
    try {
      // In a live app, use real API call:
      // const response = await fetch(`${API_BASE_URL}/news/similar/${uuid}?api_token=${API_KEY}&limit=3`)
      // if (!response.ok) throw new Error(`API error: ${response.status}`)
      // const data = await response.json()
      // setSimilarArticles(data.data || [])
      
      // For now, using mock data
      setSimilarArticles(getMockSimilarNewsData())
    } catch (err) {
      console.error("Error fetching similar articles:", err)
      // We don't set the main error state here to not disrupt the main view
    }
  }

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article)
    fetchSimilarArticles(article.uuid)
    setActiveTab('detail')
  }

  // Filter news based on search term
  const filteredNews = newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.entities.some(entity => 
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Mock data - remove in production and use real API
  const getMockNewsData = (): NewsArticle[] => [
    {
      uuid: "1",
      title: "Reliance Industries Announces Major Investment in Green Energy",
      description: "Reliance Industries plans to invest ₹75,000 crore in green energy initiatives over the next 3 years, aiming to become carbon neutral by 2035.",
      keywords: ["Reliance", "green energy", "investment", "carbon neutral"],
      snippet: "Reliance Industries Chairman Mukesh Ambani announced a ₹75,000 crore investment plan for green energy projects, including solar, batteries, and hydrogen fuel cells.",
      url: "https://example.com/news/1",
      image_url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-05T09:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "RELIANCE.BSE",
          name: "Reliance Industries Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Energy",
          match_score: 0.98,
          sentiment_score: 0.85,
          highlights: ["₹75,000 crore investment", "green energy initiatives", "carbon neutral by 2035"]
        }
      ]
    },
    {
      uuid: "2",
      title: "HDFC Bank Reports 20% Rise in Q2 Net Profit, Beats Estimates",
      description: "HDFC Bank, India's largest private sector lender, reported a 20% year-on-year increase in net profit for Q2 FY24, exceeding market expectations.",
      keywords: ["HDFC Bank", "quarterly results", "banking sector", "profit growth"],
      snippet: "HDFC Bank posted a net profit of ₹15,976 crore for the quarter ended September 2023, up 20% from ₹13,265 crore in the same period last year, driven by strong loan growth and improved asset quality.",
      url: "https://example.com/news/2",
      image_url: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-04T14:45:00Z",
      source: "LiveMint",
      entities: [
        {
          symbol: "HDFCBANK.BSE",
          name: "HDFC Bank Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Banking",
          match_score: 0.95,
          sentiment_score: 0.72,
          highlights: ["20% rise in net profit", "exceeds analyst expectations", "strong loan growth"]
        }
      ]
    },
    {
      uuid: "3",
      title: "Infosys Wins $1.5 Billion AI Contract from Global Retailer",
      description: "Infosys secures a $1.5 billion contract to implement AI-powered digital transformation solutions for a leading global retail chain.",
      keywords: ["Infosys", "AI contract", "digital transformation", "IT services"],
      snippet: "Infosys has won a $1.5 billion multi-year contract to deploy artificial intelligence and machine learning solutions for a major international retailer, marking one of the largest deals for the IT major this year.",
      url: "https://example.com/news/3",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-05T11:15:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.97,
          sentiment_score: 0.91,
          highlights: ["$1.5 billion contract", "AI-powered solutions", "digital transformation"]
        }
      ]
    },
    {
      uuid: "4",
      title: "HDFC Bank Launches AI-Powered Banking Services for Rural India",
      description: "HDFC Bank introduces new artificial intelligence-driven banking services aimed at increasing financial inclusion in rural India.",
      keywords: ["HDFC Bank", "AI banking", "rural India", "financial inclusion"],
      snippet: "HDFC Bank has launched a suite of AI-powered banking services designed specifically for rural customers, including voice-based transactions in local languages and simplified digital account opening procedures.",
      url: "https://example.com/news/4",
      image_url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-03T11:20:00Z",
      source: "Mint",
      entities: [
        {
          symbol: "HDFCBANK.BSE",
          name: "HDFC Bank Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Banking",
          match_score: 0.96,
          sentiment_score: 0.6,
          highlights: ["AI-powered services", "digital innovation", "rural banking"]
        }
      ]
    },
    {
      uuid: "5",
      title: "TCS Reports 8.7% Growth in Q2 Profit, Announces ₹18,000 Crore Buyback",
      description: "Tata Consultancy Services posts strong quarterly results and announces share buyback program valued at ₹18,000 crore.",
      keywords: ["TCS", "quarterly results", "share buyback", "IT sector"],
      snippet: "IT giant TCS reported an 8.7% year-on-year increase in Q2 net profit to ₹11,342 crore, beating street expectations. The company also announced a share buyback program worth ₹18,000 crore at ₹4,150 per share.",
      url: "https://example.com/news/5",
      image_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-02T16:00:00Z",
      source: "LiveMint",
      entities: [
        {
          symbol: "TCS.BSE",
          name: "Tata Consultancy Services Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.99,
          sentiment_score: 0.75,
          highlights: ["8.7% profit growth", "₹18,000 crore share buyback", "exceeds expectations"]
        }
      ]
    }
  ]
  
  const getMockSimilarNewsData = (): NewsArticle[] => [
    {
      uuid: "6",
      title: "Indian IT Firms to Benefit from Global AI Adoption Trend",
      description: "Analysis shows Indian IT service providers are well-positioned to capitalize on the growing global demand for AI implementation services.",
      keywords: ["IT sector", "AI adoption", "Indian companies", "global trend"],
      snippet: "Research indicates that Indian IT majors including TCS, Infosys, and Wipro are set to gain significantly from the accelerating global trend of AI adoption across industries.",
      url: "https://example.com/news/6",
      image_url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-04T09:00:00Z",
      source: "Financial Express",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.87,
          sentiment_score: 0.65,
          highlights: ["AI implementation services", "global demand", "competitive position"]
        }
      ]
    },
    {
      uuid: "7",
      title: "Wipro Secures $700 Million AI Contract with European Financial Services Group",
      description: "Wipro has won a $700 million deal to provide AI and cloud transformation services to a major European financial services conglomerate.",
      keywords: ["Wipro", "AI contract", "European market", "financial services"],
      snippet: "Wipro has announced a $700 million contract with a leading European financial services group for implementing AI-driven solutions and cloud migration services over a five-year period.",
      url: "https://example.com/news/7",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-03T15:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "WIPRO.BSE",
          name: "Wipro Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.84,
          sentiment_score: 0.7,
          highlights: ["$700 million contract", "European financial services", "AI implementation"]
        }
      ]
    },
    {
      uuid: "8",
      title: "Tech Mahindra Partners with Google Cloud for AI Solutions",
      description: "Tech Mahindra announces strategic partnership with Google Cloud to develop and deploy industry-specific AI solutions across multiple sectors.",
      keywords: ["Tech Mahindra", "Google Cloud", "AI partnership", "tech collaboration"],
      snippet: "Tech Mahindra has formed a strategic alliance with Google Cloud to co-develop and market AI-powered solutions targeting industries such as telecommunications, healthcare, and manufacturing.",
      url: "https://example.com/news/8",
      image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-02T13:45:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "TECHM.NSE",
          name: "Tech Mahindra Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.82,
          sentiment_score: 0.68,
          highlights: ["Google Cloud partnership", "industry-specific AI solutions", "market expansion strategy"]
        }
      ]
    }
  ]
  
  const getMockEntityStatsData = (): EntityStats[] => [
    {
      symbol: "RELIANCE.BSE",
      name: "Reliance Industries Ltd",
      exchange: "BSE",
      price: 2467.35,
      price_change: 32.80,
      price_change_pct: 1.35,
      volume: 1245678,
      market_cap: 16705230000000
    },
    {
      symbol: "HDFCBANK.BSE",
      name: "HDFC Bank Ltd",
      exchange: "BSE",
      price: 1523.65,
      price_change: 18.45,
      price_change_pct: 1.23,
      volume: 987654,
      market_cap: 8569320000000
    },
    {
      symbol: "TCS.BSE",
      name: "Tata Consultancy Services Ltd",
      exchange: "BSE",
      price: 3725.50,
      price_change: -12.30,
      price_change_pct: -0.33,
      volume: 543210,
      market_cap: 13650780000000
    },
    {
      symbol: "INFY.NSE",
      name: "Infosys Ltd",
      exchange: "NSE",
      price: 1478.25,
      price_change: 22.15,
      price_change_pct: 1.52,
      volume: 876543,
      market_cap: 6189450000000
    },
    {
      symbol: "HDFC.BSE",
      name: "Housing Development Finance Corporation Ltd",
      exchange: "BSE",
      price: 2695.75,
      price_change: 45.60,
      price_change_pct: 1.72,
      volume: 432198,
      market_cap: 4832760000000
    }
  ]

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <NavBar />
      
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Indian Market News & Analysis</h1>
          
          {/* Error Message */}
          {error && (
            <div className={`p-4 mb-6 rounded-lg flex items-center ${
              theme === 'light' ? 'bg-red-100 text-red-800' : 'bg-red-900 bg-opacity-20 text-red-400'
            }`}>
              <AlertTriangle className="mr-2" size={20} />
              {error}
            </div>
          )}
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap mb-8 border-b border-gray-200 dark:border-gray-700">
            <button 
              className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                activeTab === 'latest' 
                  ? theme === 'light'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('latest')}
            >
              Latest News
            </button>
            <button 
              className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                activeTab === 'markets' 
                  ? theme === 'light'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('markets')}
            >
              Market Data
            </button>
            {selectedArticle && (
              <button 
                className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                  activeTab === 'detail' 
                    ? theme === 'light'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-blue-500 text-blue-500'
                    : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('detail')}
              >
                Article Details
              </button>
            )}
          </div>
          
          {/* Latest News Tab */}
          {activeTab === 'latest' && (
            <div>
              <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Latest Financial News</h2>
              </div>
              
              <div className={`rounded-xl p-12 text-center ${
                theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}>
                  <Globe className={`w-8 h-8 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Market News Coming Soon
                </h3>
                <p className={`text-lg max-w-2xl mx-auto ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  We're working on bringing you the latest financial news and market updates. Stay tuned for comprehensive coverage of Indian markets, company announcements, and economic insights.
                </p>
              </div>
            </div>
          )}
          
          {/* Market Data Tab */}
          {activeTab === 'markets' && (
            <div className="container mx-auto">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Live Market Data</h2>
                  <div className="h-6 text-gray-600 dark:text-gray-400">
                    {typedText}
                  </div>
                </div>
                
                <button
                  onClick={handleRefreshData}
                  className={`mt-4 md:mt-0 px-5 py-2 rounded-lg text-sm flex items-center ${
                    theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                  disabled={loading}
                >
                  <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>
              </div>
              
              {/* Stock Cards Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="rounded-lg shadow-md p-6 animate-pulse bg-white dark:bg-gray-800">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.values(stocksData).map((stock, index) => {
                    if (!stock || stock.error) return null;
                    
                    const exchange = index % 2 === 0 ? "NSE" : "BSE";
                    
                    return (
                      <motion.div
                        key={stock.symbol}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.name}</h3>
                              <div className="flex items-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.symbol}</p>
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                                  exchange === 'NSE' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400'
                                }`}>
                                  {exchange}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-baseline">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ₹{stock.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                              </span>
                              <div className={`ml-3 flex items-center ${
                                stock.change >= 0 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {stock.change >= 0 ? (
                                  <TrendingUp size={16} className="mr-1" />
                                ) : (
                                  <TrendingDown size={16} className="mr-1" />
                                )}
                                <span className="font-medium text-sm">
                                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                                  ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {stock.volume.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
                              <p className="font-medium text-gray-900 dark:text-white">₹{getMarketCap(stock.symbol, stock.price).toFixed(2)} T</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Day Range</p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                ₹{stock.dayLow.toFixed(2)} - ₹{stock.dayHigh.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
                              <p className="font-medium text-gray-900 dark:text-white">₹{stock.open.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-5 py-2.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                          >
                            View Details <ArrowRight size={14} className="ml-1" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
              
              {/* Last Updated Info */}
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Clock className="mr-2" size={16} />
                  Last updated: {lastUpdated.toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric', 
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Data powered by Yahoo Finance API | Real-time market data
                </p>
              </div>
            </div>
          )}
          
          {/* Article Detail Tab */}
          {activeTab === 'detail' && selectedArticle && (
            <div>
              <div className="mb-8">
                <button
                  onClick={() => setActiveTab('latest')}
                  className={`mb-4 px-3 py-1 rounded-lg text-sm flex items-center ${
                    theme === 'light' 
                      ? 'bg-gray-100 hover:bg-gray-200' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <ArrowRight className="mr-1 rotate-180" size={16} />
                  Back to News
                </button>
                
                <div className={`rounded-lg overflow-hidden ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-800'
                }`}>
                  {selectedArticle.image_url && (
                    <div className="h-80 w-full">
                      <img 
                        src={selectedArticle.image_url} 
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4 flex-wrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 bg-opacity-30 text-blue-400'
                      }`}>
                        {selectedArticle.entities[0]?.industry || 'Finance'}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(selectedArticle.published_at)}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedArticle.source}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedArticle.description}</p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6">{selectedArticle.snippet}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Mentioned Companies</h3>
                      <div className="space-y-3">
                        {selectedArticle.entities.map((entity, index) => (
                          <div key={index} className={`p-3 rounded-lg flex items-center ${
                            theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                          }`}>
                            <div>
                              <div className="font-medium">{entity.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {entity.symbol} • {entity.exchange}
                              </div>
                            </div>
                            <div className="ml-auto">
                              <div className={`px-2 py-1 rounded-full text-xs ${
                                entity.sentiment_score > 0.3
                                  ? theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900 bg-opacity-30 text-green-400'
                                  : entity.sentiment_score < -0.3
                                    ? theme === 'light' ? 'bg-red-100 text-red-800' : 'bg-red-900 bg-opacity-30 text-red-400'
                                    : theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-600 text-gray-300'
                              }`}>
                                Sentiment: {entity.sentiment_score > 0 ? '+' : ''}{entity.sentiment_score.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {selectedArticle.entities.flatMap(entity => entity.highlights).map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <div className="flex space-x-2">
                        <button className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                          theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share
                        </button>
                        <button className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                          theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Save
                        </button>
                      </div>
                      
                      <a 
                        href={selectedArticle.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                          theme === 'light' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-blue-700 text-white hover:bg-blue-600'
                        }`}
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Read Full Article
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {similarArticles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Related News</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarArticles.map((article) => (
                      <div 
                        key={article.uuid}
                        onClick={() => handleArticleClick(article)}
                        className={`rounded-lg overflow-hidden shadow-sm cursor-pointer ${
                          theme === 'light' ? 'bg-white hover:bg-gray-50' : 'bg-gray-800 hover:bg-gray-750'
                        }`}
                      >
                        {article.image_url && (
                          <div className="h-40 w-full">
                            <img 
                              src={article.image_url} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {article.source}
                            </span>
                          </div>
                          <h4 className="font-medium mb-2 line-clamp-2">{article.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{article.snippet}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

// Mock Data Functions
function getMockNewsData() {
  return [
    {
      uuid: "1",
      title: "Reliance Industries Announces Major Investment in Green Energy",
      description: "Reliance Industries plans to invest ₹75,000 crore in green energy initiatives over the next 3 years, aiming to become carbon neutral by 2035.",
      keywords: ["Reliance", "green energy", "investment", "carbon neutral"],
      snippet: "Reliance Industries Chairman Mukesh Ambani announced a ₹75,000 crore investment plan for green energy projects, including solar, batteries, and hydrogen fuel cells.",
      url: "https://example.com/news/1",
      image_url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-05T09:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "RELIANCE.BSE",
          name: "Reliance Industries Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Energy",
          match_score: 0.98,
          sentiment_score: 0.85,
          highlights: ["₹75,000 crore investment", "green energy initiatives", "carbon neutral by 2035"]
        }
      ]
    },
    {
      uuid: "2",
      title: "HDFC Bank Reports 20% Rise in Q2 Net Profit, Beats Estimates",
      description: "HDFC Bank, India's largest private sector lender, reported a 20% year-on-year increase in net profit for Q2 FY24, exceeding market expectations.",
      keywords: ["HDFC Bank", "quarterly results", "banking sector", "profit growth"],
      snippet: "HDFC Bank posted a net profit of ₹15,976 crore for the quarter ended September 2023, up 20% from ₹13,265 crore in the same period last year, driven by strong loan growth and improved asset quality.",
      url: "https://example.com/news/2",
      image_url: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-04T14:45:00Z",
      source: "LiveMint",
      entities: [
        {
          symbol: "HDFCBANK.BSE",
          name: "HDFC Bank Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Banking",
          match_score: 0.95,
          sentiment_score: 0.72,
          highlights: ["20% rise in net profit", "exceeds analyst expectations", "strong loan growth"]
        }
      ]
    },
    {
      uuid: "3",
      title: "Infosys Wins $1.5 Billion AI Contract from Global Retailer",
      description: "Infosys secures a $1.5 billion contract to implement AI-powered digital transformation solutions for a leading global retail chain.",
      keywords: ["Infosys", "AI contract", "digital transformation", "IT services"],
      snippet: "Infosys has won a $1.5 billion multi-year contract to deploy artificial intelligence and machine learning solutions for a major international retailer, marking one of the largest deals for the IT major this year.",
      url: "https://example.com/news/3",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-05T11:15:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.97,
          sentiment_score: 0.91,
          highlights: ["$1.5 billion contract", "AI-powered solutions", "digital transformation"]
        }
      ]
    },
    {
      uuid: "4",
      title: "HDFC Bank Launches AI-Powered Banking Services for Rural India",
      description: "HDFC Bank introduces new artificial intelligence-driven banking services aimed at increasing financial inclusion in rural India.",
      keywords: ["HDFC Bank", "AI banking", "rural India", "financial inclusion"],
      snippet: "HDFC Bank has launched a suite of AI-powered banking services designed specifically for rural customers, including voice-based transactions in local languages and simplified digital account opening procedures.",
      url: "https://example.com/news/4",
      image_url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-03T11:20:00Z",
      source: "Mint",
      entities: [
        {
          symbol: "HDFCBANK.BSE",
          name: "HDFC Bank Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Banking",
          match_score: 0.96,
          sentiment_score: 0.6,
          highlights: ["AI-powered services", "digital innovation", "rural banking"]
        }
      ]
    },
    {
      uuid: "5",
      title: "TCS Reports 8.7% Growth in Q2 Profit, Announces ₹18,000 Crore Buyback",
      description: "Tata Consultancy Services posts strong quarterly results and announces share buyback program valued at ₹18,000 crore.",
      keywords: ["TCS", "quarterly results", "share buyback", "IT sector"],
      snippet: "IT giant TCS reported an 8.7% year-on-year increase in Q2 net profit to ₹11,342 crore, beating street expectations. The company also announced a share buyback program worth ₹18,000 crore at ₹4,150 per share.",
      url: "https://example.com/news/5",
      image_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-02T16:00:00Z",
      source: "LiveMint",
      entities: [
        {
          symbol: "TCS.BSE",
          name: "Tata Consultancy Services Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.99,
          sentiment_score: 0.75,
          highlights: ["8.7% profit growth", "₹18,000 crore share buyback", "exceeds expectations"]
        }
      ]
    }
  ]
}

function getMockSimilarNewsData() {
  return [
    {
      uuid: "6",
      title: "Indian IT Firms to Benefit from Global AI Adoption Trend",
      description: "Analysis shows Indian IT service providers are well-positioned to capitalize on the growing global demand for AI implementation services.",
      keywords: ["IT sector", "AI adoption", "Indian companies", "global trend"],
      snippet: "Research indicates that Indian IT majors including TCS, Infosys, and Wipro are set to gain significantly from the accelerating global trend of AI adoption across industries.",
      url: "https://example.com/news/6",
      image_url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-04T09:00:00Z",
      source: "Financial Express",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.87,
          sentiment_score: 0.65,
          highlights: ["AI implementation services", "global demand", "competitive position"]
        }
      ]
    },
    {
      uuid: "7",
      title: "Wipro Secures $700 Million AI Contract with European Financial Services Group",
      description: "Wipro has won a $700 million deal to provide AI and cloud transformation services to a major European financial services conglomerate.",
      keywords: ["Wipro", "AI contract", "European market", "financial services"],
      snippet: "Wipro has announced a $700 million contract with a leading European financial services group for implementing AI-driven solutions and cloud migration services over a five-year period.",
      url: "https://example.com/news/7",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-03T15:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "WIPRO.BSE",
          name: "Wipro Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.84,
          sentiment_score: 0.7,
          highlights: ["$700 million contract", "European financial services", "AI implementation"]
        }
      ]
    },
    {
      uuid: "8",
      title: "Tech Mahindra Partners with Google Cloud for AI Solutions",
      description: "Tech Mahindra announces strategic partnership with Google Cloud to develop and deploy industry-specific AI solutions across multiple sectors.",
      keywords: ["Tech Mahindra", "Google Cloud", "AI partnership", "tech collaboration"],
      snippet: "Tech Mahindra has formed a strategic alliance with Google Cloud to co-develop and market AI-powered solutions targeting industries such as telecommunications, healthcare, and manufacturing.",
      url: "https://example.com/news/8",
      image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2023-10-02T13:45:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "TECHM.NSE",
          name: "Tech Mahindra Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.82,
          sentiment_score: 0.68,
          highlights: ["Google Cloud partnership", "industry-specific AI solutions", "market expansion strategy"]
        }
      ]
    }
  ]
}

function getMockEntityStatsData() {
  return [
    {
      symbol: "RELIANCE.BSE",
      name: "Reliance Industries Ltd",
      exchange: "BSE",
      price: 2467.35,
      price_change: 32.80,
      price_change_pct: 1.35,
      volume: 1245678,
      market_cap: 16705230000000
    },
    {
      symbol: "HDFCBANK.BSE",
      name: "HDFC Bank Ltd",
      exchange: "BSE",
      price: 1523.65,
      price_change: 18.45,
      price_change_pct: 1.23,
      volume: 987654,
      market_cap: 8569320000000
    },
    {
      symbol: "TCS.BSE",
      name: "Tata Consultancy Services Ltd",
      exchange: "BSE",
      price: 3725.50,
      price_change: -12.30,
      price_change_pct: -0.33,
      volume: 543210,
      market_cap: 13650780000000
    },
    {
      symbol: "INFY.NSE",
      name: "Infosys Ltd",
      exchange: "NSE",
      price: 1478.25,
      price_change: 22.15,
      price_change_pct: 1.52,
      volume: 876543,
      market_cap: 6189450000000
    },
    {
      symbol: "HDFC.BSE",
      name: "Housing Development Finance Corporation Ltd",
      exchange: "BSE",
      price: 2695.75,
      price_change: 45.60,
      price_change_pct: 1.72,
      volume: 432198,
      market_cap: 4832760000000
    }
  ]
}