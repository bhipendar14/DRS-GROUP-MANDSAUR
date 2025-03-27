"use client"

import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { motion, AnimatePresence } from 'framer-motion';
import { NavBar } from "@/components/nav-bar";  // Updated import path

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  currentPrice?: number;
  changePercent: number;
}

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

async function fetchStockData(symbol: string): Promise<Stock> {
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
      symbol: symbol,
      name: getCompanyName(symbol), // We'll define this helper function
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    // Return fallback data if API fails
    return {
      symbol: symbol,
      name: getCompanyName(symbol),
      price: 0,
      change: 0,
      changePercent: 0
    };
  }
}

// Helper to map symbols to company names
function getCompanyName(symbol: string): string {
  const companyNames: {[key: string]: string} = {
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corporation",
    "GOOGL": "Alphabet Inc.",
    "AMZN": "Amazon.com Inc.",
    "NVDA": "NVIDIA Corporation",
    "META": "Meta Platforms Inc.",
    "TSLA": "Tesla Inc.",
    "BRK.B": "Berkshire Hathaway",
    "V": "Visa Inc.",
    "JPM": "JPMorgan Chase"
  };
  
  return companyNames[symbol] || symbol;
}

function LiveStockList({ stocks }: { stocks: Stock[] }) {
  const [animatedStocks, setAnimatedStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Initialize with 0 prices
    setAnimatedStocks(stocks.map(stock => ({ ...stock, currentPrice: 0 })));

    // Animate to actual prices
    const interval = setInterval(() => {
      setAnimatedStocks(prev => 
        prev.map(stock => {
          const targetPrice = stocks.find(s => s.symbol === stock.symbol)?.price || 0;
          const step = targetPrice / 50;
          
          if ((stock.currentPrice || 0) < targetPrice) {
            return {
              ...stock,
              currentPrice: Math.min((stock.currentPrice || 0) + step, targetPrice)
            };
          }
          return stock;
        })
      );
    }, 20);

    // Live updates
    const liveInterval = setInterval(() => {
      setAnimatedStocks(prev =>
        prev.map(stock => {
          const randomChange = (Math.random() - 0.5) * 0.5;
          const newPrice = (stock.currentPrice || stock.price) + randomChange;
          const change = ((newPrice - stock.price) / stock.price) * 100;
          
          return {
            ...stock,
            currentPrice: newPrice,
            change: change
          };
        })
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(liveInterval);
    };
  }, [stocks]);

  return (
    <div className="space-y-4">
      {animatedStocks.map((stock, index) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-900/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">{stock.symbol}</h4>
              <p className="text-sm text-gray-400">{stock.name}</p>
            </div>
            <div className="text-right">
              <motion.p 
                className="text-xl font-medium"
                animate={{ color: stock.change > 0 ? "rgb(74 222 128)" : "rgb(248 113 113)" }}
              >
                ${(stock.currentPrice || stock.price).toFixed(2)}
              </motion.p>
              <motion.p
                animate={{ 
                  color: stock.change > 0 ? "rgb(74 222 128)" : "rgb(248 113 113)",
                  backgroundColor: stock.change > 0 ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"
                }}
                className="text-sm px-2 py-1 rounded-full inline-block"
              >
                {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      setLoading(true);
      try {
        const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"];
        const stocksData = await Promise.all(symbols.map(symbol => fetchStockData(symbol)));
        setStocks(stocksData);
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

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="container mx-auto px-4 pt-16"> {/* Reduced from pt-24 to pt-16 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-4" // Reduced from py-8 to py-4
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold mb-8 text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              Market Overview
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex gap-4 mb-6 overflow-x-auto">
                {["US Stocks", "Market Action", "Crypto", "Global Markets"].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/90 hover:text-white hover:bg-purple-600/20 transition-all"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-white">Major Indices</h3>
                  <div className="h-[400px] w-full">
                    <AdvancedRealTimeChart 
                      symbol="NASDAQ:AAPL"
                      theme="dark"
                      height={500}
                      width="100%"
                      style="3"
                      timezone="exchange"
                      backgroundColor="rgba(0, 0, 0, 0)"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-white">Top Movers</h3>
                  <LiveStockList stocks={stocks} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 