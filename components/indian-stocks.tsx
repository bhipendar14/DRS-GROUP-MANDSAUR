"use client"

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/theme-context'
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  dayLow?: number
  dayHigh?: number
  yearLow?: number
  yearHigh?: number
}

// Animated counter component
function AnimatedCounter({ value, duration = 1.5, prefix = '' }) {
  const nodeRef = useRef(null)
  const spring = useSpring(0, { duration: duration * 1000 })
  
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  
  useEffect(() => {
    return spring.onChange((latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = prefix + latest.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
    })
  }, [spring, prefix])
  
  return <span ref={nodeRef}>{prefix}0.00</span>
}

// Animated price display component
function AnimatedPrice({ price }) {
  const { theme } = useTheme()
  
  return (
    <motion.div 
      className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedCounter value={price} prefix="₹" />
    </motion.div>
  )
}

export function IndianStocks() {
  const { theme } = useTheme()
  const [stocks, setStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  
  // Fetch stock data function
  const fetchStockData = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/indian-stocks')
      
      if (!response.ok) {
        throw new Error('Failed to fetch stock data')
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setStocks(data.stocks)
      if (data.stocks.length > 0 && !selectedStock) {
        setSelectedStock(data.stocks[0])
      }
      
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load stock data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }
  
  // Initial data fetch
  useEffect(() => {
    fetchStockData()
    
    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchStockData()
    }, 30000)
    
    return () => clearInterval(refreshInterval)
  }, [])
  
  // Format currency in Indian Rupees
  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  // Format large numbers (like market cap) in billions/crores
  const formatLargeNumber = (num: number) => {
    if (num >= 1.0e9) {
      return `₹${(num / 1.0e9).toFixed(2)}B`; // Billions
    } else if (num >= 1.0e7) {
      return `₹${(num / 1.0e7).toFixed(2)}Cr`; // Crores
    } else if (num >= 1.0e5) {
      return `₹${(num / 1.0e5).toFixed(2)}L`; // Lakhs
    }
    return `₹${num.toLocaleString()}`; 
  }
  
  return (
    <section className={`py-16 px-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} rounded-xl mb-16`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h2 
              className={`text-3xl font-extrabold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Top 10 Indian Stocks
            </motion.h2>
            <motion.p 
              className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Latest performance of leading Indian companies on the National Stock Exchange
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => fetchStockData()}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-lg flex items-center ${
              theme === 'light' 
                ? 'bg-white hover:bg-gray-100 text-gray-800 shadow-sm border border-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
            } transition-all duration-300`}
            disabled={refreshing}
          >
            <Activity size={16} className={`mr-2 ${refreshing ? 'animate-pulse' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </motion.button>
        </div>
        
        {refreshing && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 w-full origin-left"
          />
        )}
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center py-16">
          <motion.div 
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-full border-t-4 border-purple-500 border-opacity-50 border-l-4 border-l-purple-500"
          />
        </div>
      ) : error ? (
        <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-red-50' : 'bg-red-900 bg-opacity-20'} border ${theme === 'light' ? 'border-red-200' : 'border-red-800'}`}>
          <p className={`text-${theme === 'light' ? 'red-600' : 'red-400'} mb-2`}>Error: {error}</p>
          <p className={`text-${theme === 'light' ? 'red-500' : 'red-300'} text-sm`}>Showing fallback data instead</p>
        </div>
      ) : (
        <div>
          {/* Stock cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stocks.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                layoutId={`stock-${stock.symbol}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                onClick={() => setSelectedStock(stock)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  theme === 'light' ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-800 hover:bg-gray-750'
                } ${selectedStock?.symbol === stock.symbol ? 'ring-2 ring-purple-500' : ''} transform hover:scale-[1.01]`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {stock.name}
                    </h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {stock.symbol}
                    </p>
                  </div>
                  <div className={`text-right`}>
                    <AnimatedPrice price={stock.price} />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-center justify-end ${
                        stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stock.change >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                      <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Volume and Market Cap */}
                <div className="mt-4 pt-4 grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Volume</p>
                    <p className="font-medium">
                      <AnimatedCounter value={stock.volume / 1000} duration={2} prefix="" />K
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Market Cap</p>
                    <p className="font-medium">
                      {stock.marketCap 
                        ? <AnimatedCounter value={stock.marketCap / 1.0e9} duration={2} prefix="₹" />
                        : <AnimatedCounter value={(stock.price * stock.volume) / 1.0e9} duration={2} prefix="₹" />
                      }B
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Selected Stock Details Panel */}
          <AnimatePresence mode="wait">
            {selectedStock && (
              <motion.div
                key={`details-${selectedStock.symbol}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 bg-opacity-70'
                } backdrop-blur-sm`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div className="mb-4 md:mb-0">
                    <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {selectedStock.name}
                    </h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {selectedStock.symbol}
                    </p>
                  </div>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    selectedStock.change >= 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300'
                  }`}>
                    {selectedStock.change >= 0 
                      ? <TrendingUp size={20} className="mr-2" /> 
                      : <TrendingDown size={20} className="mr-2" />
                    }
                    <span className="font-medium">
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                
                {/* Stock cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 rounded-lg ${
                      theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Current Price
                    </div>
                    <div className="text-xl font-bold">
                      <AnimatedCounter value={selectedStock.price} prefix="₹" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`p-4 rounded-lg ${
                      theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Previous Close
                    </div>
                    <div className="text-xl font-bold">
                      <AnimatedCounter value={selectedStock.price - selectedStock.change} prefix="₹" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`p-4 rounded-lg ${
                      theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Day Range
                    </div>
                    <div className="text-xl font-bold">
                      {selectedStock.dayLow && selectedStock.dayHigh ? (
                        <span>
                          <AnimatedCounter value={selectedStock.dayLow} prefix="₹" /> - 
                          <AnimatedCounter value={selectedStock.dayHigh} prefix="₹" />
                        </span>
                      ) : (
                        <span>
                          <AnimatedCounter value={selectedStock.price * 0.98} prefix="₹" /> - 
                          <AnimatedCounter value={selectedStock.price * 1.02} prefix="₹" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`p-4 rounded-lg ${
                      theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      52 Week Range
                    </div>
                    <div className="text-xl font-bold">
                      {selectedStock.yearLow && selectedStock.yearHigh ? (
                        <span>
                          <AnimatedCounter value={selectedStock.yearLow} prefix="₹" /> - 
                          <AnimatedCounter value={selectedStock.yearHigh} prefix="₹" />
                        </span>
                      ) : (
                        <span>
                          <AnimatedCounter value={selectedStock.price * 0.85} prefix="₹" /> - 
                          <AnimatedCounter value={selectedStock.price * 1.15} prefix="₹" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                {/* Chart visualization (simplified animated version) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-64 mt-6 mb-8 relative overflow-hidden rounded-lg bg-opacity-50"
                >
                  <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700 bg-opacity-50'}`}></div>
                  <div className="absolute bottom-0 left-0 w-full h-full flex items-end p-4">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const randomHeight = 20 + Math.random() * 60
                      const isUp = selectedStock.change >= 0
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${randomHeight}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: i * 0.05,
                            type: "spring", 
                            stiffness: 50 
                          }}
                          className={`flex-1 mx-0.5 rounded-t ${
                            isUp 
                              ? 'bg-green-400 bg-opacity-20' 
                              : 'bg-red-400 bg-opacity-20'
                          }`}
                          style={{
                            borderTop: `2px solid ${isUp ? '#10B981' : '#EF4444'}`
                          }}
                        />
                      )
                    })}
                  </div>
                  
                  {/* Price marker */}
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 0.7, width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute left-0 right-0 border-t border-dashed border-purple-500"
                    style={{ top: "40%" }}
                  >
                    <div className={`absolute right-0 top-0 transform -translate-y-1/2 px-2 py-1 rounded text-xs ${
                      theme === 'light' ? 'bg-white text-purple-700' : 'bg-gray-800 text-purple-300'
                    }`}>
                      {formatRupees(selectedStock.price)}
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Additional stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Market Cap</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {selectedStock.marketCap ? (
                        <AnimatedCounter value={selectedStock.marketCap / 1.0e7} prefix="₹" />
                      ) : (
                        <AnimatedCounter value={(selectedStock.price * selectedStock.volume) / 1.0e7} prefix="₹" />
                      )} Cr
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Volume</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      <AnimatedCounter value={selectedStock.volume} duration={2} prefix="" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>P/E Ratio</div>
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      <AnimatedCounter value={15 + Math.random() * 10} prefix="" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
} 