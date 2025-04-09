"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3, Shield, Clock, ChevronRight, RefreshCw, AlertTriangle, Briefcase, LucideBuilding2 } from 'lucide-react'

// Define interfaces
interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  dayHigh: number
  dayLow: number
  open: number
  previousClose: number
  isRealData: boolean
}

// Top Indian stocks with correct symbols for Alpha Vantage
const TOP_STOCKS = [
  { symbol: 'INFY', name: 'Infosys Ltd.' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.' },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.' },
  { symbol: 'ITC', name: 'ITC Ltd.' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.' }
]

// Benefits of stock investing
const BENEFITS = [
  {
    title: "Wealth Generation",
    description: "Historically, stocks have outperformed most investment classes over the long term, offering significant wealth creation potential.",
    icon: <TrendingUp className="h-6 w-6 text-emerald-600" />
  },
  {
    title: "Ownership Stake",
    description: "When you buy stocks, you own a portion of a company and participate in its growth and success.",
    icon: <LucideBuilding2 className="h-6 w-6 text-emerald-600" />
  },
  {
    title: "Portfolio Diversification",
    description: "Stocks help diversify your investment portfolio, reducing overall investment risk while maximizing returns.",
    icon: <BarChart3 className="h-6 w-6 text-emerald-600" />
  },
  {
    title: "Inflation Protection",
    description: "Stock investments historically provide returns that outpace inflation, protecting your purchasing power over time.",
    icon: <Shield className="h-6 w-6 text-emerald-600" />
  }
]

export default function IndianStocks() {
  const [stockData, setStockData] = useState<Record<string, Stock>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [showLearnMore, setShowLearnMore] = useState(false)
  
  // Create a server route to bypass CORS issues
  const fetchStockData = async (symbol: string, name: string) => {
    try {
      const response = await fetch(`/api/indian-stocks?symbol=${encodeURIComponent(symbol)}`)
      
      if (!response.ok) {
        console.warn(`API error for ${symbol}: ${response.statusText}`)
        return null
      }
      
      const data = await response.json()
      
      // Always create a Stock object from the response
      return {
        symbol,
        name,
        price: data.price || 0,
        change: data.change || 0,
        changePercent: data.changePercent || 0,
        volume: data.volume || 0,
        open: data.open || 0,
        dayHigh: data.dayHigh || 0,
        dayLow: data.dayLow || 0,
        previousClose: data.previousClose || 0,
        isRealData: true
      }
    } catch (error) {
      console.warn(`Error fetching ${symbol}:`, error)
      return null
    }
  }
  
  // Generate fallback data when API fails
  const generateFallbackStock = (symbol: string, name: string): Stock => {
    const priceMap: Record<string, number> = {
      'INFY': 1530.20,
      'TCS': 3556.45,
      'RELIANCE': 2943.00,
      'HDFCBANK': 1769.90,
      'ICICIBANK': 1067.00,
      'HINDUNILVR': 2237.00,
      'SBIN': 773.00,
      'BHARTIARTL': 1341.67,
      'ITC': 428.30,
      'KOTAKBANK': 1753.00
    }
    
    return {
      symbol,
      name,
      price: priceMap[symbol] || 1000,
      change: 0,
      changePercent: 0,
      volume: 0,
      open: 0,
      dayHigh: 0,
      dayLow: 0,
      previousClose: 0,
      isRealData: false
    }
  }
  
  // Load stock data - fetch only a subset of stocks each time but show all stocks
  const loadStockData = async () => {
    setRefreshing(true)
    
    try {
      // On first load, initialize all stocks with fallback data if they don't exist yet
      if (Object.keys(stockData).length < TOP_STOCKS.length) {
        const initialData: Record<string, Stock> = {...stockData}
        
        TOP_STOCKS.forEach(stock => {
          if (!initialData[stock.symbol]) {
            initialData[stock.symbol] = generateFallbackStock(stock.symbol, stock.name)
          }
        })
        
        setStockData(initialData)
      }
      
      let newData: Record<string, Stock> = {...stockData}
      
      // Only fetch 2 stocks at a time to avoid rate limits
      const now = new Date().getTime()
      const cycleIndex = Math.floor(now / (2 * 60 * 1000)) % 5 // Changes every 2 minutes
      const startIdx = cycleIndex * 2 // 0, 2, 4, 6, 8
      const stocksToFetch = TOP_STOCKS.slice(startIdx, startIdx + 2)
      
      console.log(`Updating stocks batch ${cycleIndex + 1}/5:`, stocksToFetch.map(s => s.symbol).join(', '))
      
      for (const stock of stocksToFetch) {
        // Try to get live data
        const liveData = await fetchStockData(stock.symbol, stock.name)
        
        // Use live data if available
        if (liveData) {
          newData[stock.symbol] = liveData
        }
        
        // Wait between requests
        if (stock !== stocksToFetch[stocksToFetch.length - 1]) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
      
      setStockData(newData)
      setLastUpdated(new Date())
      setLoading(false)
    } catch (error) {
      console.error('Failed to load stock data:', error)
      setError('Failed to load stock data')
    } finally {
      setRefreshing(false)
    }
  }
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value).replace(/^₹/, '₹');
  }
  
  // Test Alpha Vantage API
  const testAlphaVantageAPI = async () => {
    try {
      const symbol = 'INFY';
      console.log('Testing Alpha Vantage API via our server endpoint...');
      
      const response = await fetch(`/api/indian-stocks?symbol=${symbol}`);
      
      if (!response.ok) {
        console.error(`Test API call failed with status: ${response.status}`);
        return false;
      }
      
      const data = await response.json();
      console.log('Test API response:', data);
      
      // Check if we got real data or fallback
      if (data.price && data.price > 0 && (data.change !== 0 || data.changePercent !== 0)) {
        console.log('✅ SUCCESS: Got real live stock data!');
        return true;
      } else {
        console.log('⚠️ Got data but it looks like fallback values');
        return false;
      }
    } catch (error) {
      console.error('❌ API test failed with error:', error);
      return false;
    }
  };
  
  // Initial load - put all stocks in with fallback data first
  useEffect(() => {
    const initialLoad = async () => {
      const initialData: Record<string, Stock> = {}
      
      // First load all stocks with fallback data so UI has something to show
      TOP_STOCKS.forEach(stock => {
        initialData[stock.symbol] = generateFallbackStock(stock.symbol, stock.name)
      })
      
      setStockData(initialData)
      setLoading(false)
      
      // Then start the refresh cycle
      await loadStockData()
    }
    
    initialLoad()
    
    // Test if our API is working
    setTimeout(() => {
      testAlphaVantageAPI().then(isWorking => {
        if (!isWorking) {
          console.warn('⚠️ Alpha Vantage API is not returning live data - using fallback data');
        }
      });
    }, 2000); // Wait 2 seconds after initial load
    
    // Refresh more frequently but fetch fewer stocks each time
    const interval = setInterval(loadStockData, 30 * 1000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])
  
  // Format large numbers
  const formatLargeNumber = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} L`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} K`
    }
    return value.toString()
  }
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Introduction Section */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Indian Stock Market Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Track real-time performance of top BSE-listed companies and make informed investment decisions.
          </motion.p>
          
          {/* Refresh Button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={loadStockData}
              disabled={refreshing}
              className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-70"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </>
              )}
            </button>
            
            {lastUpdated && (
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </motion.div>
        </div>
        
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg p-4"
            >
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Top Performing Companies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white relative">
                <span className="relative z-10">Top Performing Companies</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200 dark:bg-emerald-900 opacity-40 z-0"></span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Current market prices of India's leading BSE-listed companies
              </p>
            </motion.div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {TOP_STOCKS.map((stock, index) => {
                  const data = stockData[stock.symbol]
                  if (!data) return null
                  
                  return (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-md transition-shadow duration-300 ${
                        selectedStock === stock.symbol
                          ? 'ring-1 ring-emerald-500'
                          : ''
                      }`}
                      onClick={() => setSelectedStock(
                        selectedStock === stock.symbol ? null : stock.symbol
                      )}
                    >
                      <div className="flex justify-between items-start">
                    <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{data.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stock.symbol.split('.')[0]}</p>
                        </div>
                        {!data.isRealData && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Sample
                      </span>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(data.price)}
                        </span>
                        <span className={`ml-4 inline-flex items-center text-sm font-semibold ${
                          data.change >= 0 
                            ? 'text-green-600 dark:text-green-500'
                            : 'text-red-600 dark:text-red-500'
                        }`}>
                          {data.change >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {formatCurrency(Math.abs(data.change))} ({Math.abs(data.changePercent).toFixed(2)}%)
                        </span>
                      </div>
                      
                      {selectedStock === stock.symbol && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Open</p>
                              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(data.open)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Previous Close</p>
                              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(data.previousClose)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Day High</p>
                              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(data.dayHigh)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Day Low</p>
                              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(data.dayLow)}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-500 dark:text-gray-400">Volume</p>
                              <p className="font-medium text-gray-900 dark:text-white">{formatLargeNumber(data.volume)}</p>
                    </div>
                  </div>
                </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
          
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white relative">
                <span className="relative z-10">Benefits of Stock Investments</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200 dark:bg-emerald-900 opacity-40 z-0"></span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Discover why millions of Indians are investing in the stock market
              </p>
            </motion.div>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BENEFITS.map((benefit, index) => (
                      <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-emerald-500 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-md p-3">
                    {benefit.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
                  </div>
                </div>
                
        {/* Learn More Section (expanded on click) */}
        <AnimatePresence>
          {showLearnMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Understanding Stock Market Investments
              </h3>
              <div className="prose prose-emerald dark:prose-invert max-w-none">
                <p>
                  <strong>DSR GROUP MANDSAUR™</strong> provides expert guidance on stock market investments, helping clients navigate the complexities of equity markets with confidence and clarity.
                </p>
                <p>
                  The stock market represents ownership shares in companies that are publicly traded. When you buy a stock, you're purchasing a small piece of that company, becoming a shareholder. As the company grows and increases in value, the value of your shares may increase as well, allowing you to sell them at a higher price than you paid.
                </p>
                <p>
                  Stock prices fluctuate based on various factors including:
                </p>
                <ul>
                  <li>Company performance and financial health</li>
                  <li>Industry trends and market conditions</li>
                  <li>Economic indicators and government policies</li>
                  <li>Investor sentiment and market psychology</li>
                </ul>
                <p>
                  In India, the primary stock exchanges are the Bombay Stock Exchange (BSE) and the National Stock Exchange (NSE). These platforms facilitate the buying and selling of shares between investors, providing liquidity and price discovery.
                </p>
                <p>
                  At DSR GROUP, we help our clients build diversified portfolios aligned with their financial goals, risk tolerance, and investment horizon. Our team of experts continuously monitors market conditions to identify opportunities and mitigate risks.
                </p>
              </div>
              <button
                onClick={() => setShowLearnMore(false)}
                className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
              >
                Hide details <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl overflow-hidden shadow-xl mb-16"
        >
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="mt-4 text-emerald-100 md:text-lg">
                Our expert team is ready to help you navigate the Indian stock market with personalized strategies and insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link href="/contact" className="px-6 py-3 bg-white text-emerald-700 hover:bg-emerald-50 font-medium rounded-lg text-center shadow-md hover:shadow-lg transition-all">
                Contact Our Experts
              </Link>
              <button
                onClick={() => setShowLearnMore(!showLearnMore)}
                className="px-6 py-3 border border-white text-white hover:bg-white/10 font-medium rounded-lg text-center transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Footer Section */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center">
            <Clock size={16} className="mr-2" />
            Data is updated every 5 minutes due to API limitations
          </p>
          <p className="mt-2">
            Powered by Yahoo Finance and Alpha Vantage APIs
          </p>
        </div>
      </div>
    </motion.section>
  )
} 