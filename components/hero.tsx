"use client"

import { motion } from 'framer-motion'
import { useTheme } from '@/context/theme-context'
import { useRouter } from 'next/navigation'

export function Hero() {
  const { theme } = useTheme()
  const router = useRouter()
  
  return (
    <section className="relative py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 ${
          theme === 'light' ? 'bg-purple-300' : 'bg-purple-900'
        }`}></div>
        <div className={`absolute -top-20 -left-20 w-[300px] h-[300px] border rounded-full ${
          theme === 'light' ? 'border-gray-200' : 'border-gray-800'
        }`}></div>
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            DSR GROUP MANDSAUR
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-xl mb-10 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
        >
          Financial performance is a complete evaluation of standing in categories such as 
          assets, liabilities, expenses, revenue, and overall profitability.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Join Web3 Community
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-lg font-medium ${
              theme === 'light' 
                ? 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50' 
                : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
            }`}
          >
            Try it now!
          </motion.button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-8 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
        >
          Try our demo of dashboard now! - <span className="text-purple-500 hover:underline cursor-pointer">Learn more →</span>
        </motion.p>
      </div>
    </section>
  )
} 