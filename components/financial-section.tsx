"use client"

import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function FinancialSection() {
  const router = useRouter()
  const [animatedStocks, setAnimatedStocks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  
  // Function to fetch stock data
  async function fetchStockData(symbol: string) {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      
      const data = await response.json();
      const quote = data['Global Quote'];
      
      if (!quote || Object.keys(quote).length === 0) {
        throw new Error(`No data available for ${symbol}`);
      }
      
      return {
        name: symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      // Return fallback data if API fails
      return {
        name: symbol,
        price: 0,
        change: 0,
        changePercent: 0
      };
    }
  }

  // Fetch all stocks
  useEffect(() => {
    async function fetchStocks() {
      setLoading(true);
      try {
        const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "BRK.B", "V", "JPM"];
        const stocksData = await Promise.all(symbols.map(symbol => fetchStockData(symbol)));
        
        // Initialize animated stocks with 0 as current price
        setAnimatedStocks(stocksData.map(stock => ({ ...stock, currentPrice: 0 })));
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStocks();
    
    // Refresh data every 5 minutes (Alpha Vantage has rate limits)
    const interval = setInterval(fetchStocks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize animation
  useEffect(() => {
    if (animatedStocks.length === 0) return;
    
    // Animate prices from 0 to actual value
    const interval = setInterval(() => {
      setAnimatedStocks(prev => 
        prev.map(stock => {
          const targetPrice = stock.price || 0;
          const step = targetPrice / 50; // Divide animation into 50 steps
          
          if (stock.currentPrice < targetPrice) {
            return {
              ...stock,
              currentPrice: Math.min(stock.currentPrice + step, targetPrice)
            };
          }
          return stock;
        })
      );
    }, 20); // Update every 20ms for smooth animation

    // Simulate minor fluctuations for live effect
    const liveInterval = setInterval(() => {
      setAnimatedStocks(prev =>
        prev.map(stock => {
          const randomChange = (Math.random() - 0.5) * 0.05 * stock.price;
          const newPrice = stock.currentPrice + randomChange;
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            currentPrice: newPrice,
            change: change,
            changePercent: changePercent
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => {
      clearInterval(interval);
      clearInterval(liveInterval);
    };
  }, [animatedStocks.length]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-2">
            Financial Dashboard
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            Real-time tracking of market performance and stock prices
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/stocks')}
          className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700
                    bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm mt-4 md:mt-0 border border-gray-300"
        >
          View All Stocks
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {animatedStocks.map((stock, index) => (
          <motion.div
            key={stock.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-900/50
                      bg-white border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold dark:text-white text-gray-800">{stock.name}</span>
              <motion.div
                animate={{
                  backgroundColor: Number(stock.changePercent) >= 0 
                    ? "rgba(34, 197, 94, 0.1)" 
                    : "rgba(239, 68, 68, 0.1)",
                  color: Number(stock.changePercent) >= 0 
                    ? "rgb(22 163 74)" 
                    : "rgb(220 38 38)"
                }}
                className="text-xs px-2 py-1 rounded"
              >
                {Number(stock.changePercent) >= 0 ? "+" : ""}
                {typeof stock.changePercent === 'number' 
                  ? stock.changePercent.toFixed(2) 
                  : Number(stock.changePercent || 0).toFixed(2)}%
              </motion.div>
            </div>
            <motion.div 
              className="text-xl font-medium mb-2"
              animate={{ color: Number(stock.change) >= 0 ? "rgb(22 163 74)" : "rgb(220 38 38)" }}
            >
              ${(stock.currentPrice || 0).toFixed(2)}
            </motion.div>
            <div className="flex items-center text-sm">
              {Number(stock.change) >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <motion.span 
                animate={{ color: Number(stock.change) >= 0 ? "rgb(22 163 74)" : "rgb(220 38 38)" }}
              >
                {Number(stock.change) >= 0 ? "+" : ""}
                {typeof stock.change === 'number' 
                  ? stock.change.toFixed(2) 
                  : Number(stock.change || 0).toFixed(2)}
              </motion.span>
              <span className="dark:text-gray-400 text-gray-500 ml-1">Today</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

