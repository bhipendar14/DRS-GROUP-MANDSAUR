"use client"

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import IndianStocks from '@/components/indian-stocks'
import { MutualFundsSection } from '@/components/mutual-funds-section'
import { CharterAccountSection } from '@/components/charter-account-section'
import { ThemeWrapper } from '@/components/theme-wrapper'
import Link from 'next/link'

export default function HomePage() {
  const { theme } = useTheme()
  
  // For typewriter effect
  const [titleIndex, setTitleIndex] = useState(0)
  const [descIndex, setDescIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [titleDone, setTitleDone] = useState(false)
  const [descDone, setDescDone] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  
  const titleText = "DSR GROUP MANDSAUR"
  const descriptionText = "Financial performance is a complete evaluation of standing in categories such as assets, liabilities, expenses, revenue, and overall profitability."
  
  // Typewriter and cursor effect code
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(interval)
  }, [])
  
  // Show welcome message first
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeVisible(true)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [])
  
  // Typewriter effect for title (starts after welcome is visible)
  useEffect(() => {
    if (welcomeVisible && titleIndex < titleText.length) {
      const timeout = setTimeout(() => {
        setTitleIndex(prev => prev + 1)
      }, 100) // Typing speed for title
      
      return () => clearTimeout(timeout)
    } else if (welcomeVisible) {
      setTitleDone(true)
    }
  }, [titleIndex, titleText.length, welcomeVisible])
  
  // Typewriter effect for description (starts after title is done)
  useEffect(() => {
    if (titleDone && descIndex < descriptionText.length) {
      const timeout = setTimeout(() => {
        setDescIndex(prev => prev + 1)
      }, 25) // Typing speed for description (faster)
      
      return () => clearTimeout(timeout)
    } else if (titleDone) {
      setDescDone(true)
    }
  }, [descIndex, descriptionText.length, titleDone])

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-black'}`}>
      <style jsx global>{`
        @keyframes rgbCycle {
          0% { color: #ff3366; }
          25% { color: #8833ff; }
          50% { color: #3366ff; }
          75% { color: #33ff66; }
          100% { color: #ff3366; }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .rgb-text-effect {
          animation: rgbCycle 8s infinite;
          background-image: linear-gradient(90deg, #ff3366, #8833ff, #3366ff, #33ff66, #ff3366);
          background-size: 400% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: rgbCycle 8s ease infinite;
          background-position: 0% 50%;
        }
        
        @keyframes rgbCycle {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
      
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with typewriter effect */}
        <ThemeWrapper className="py-20 text-center rounded-2xl my-8">
          {/* Welcome message with fade-in effect */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: welcomeVisible ? 1 : 0, 
              y: welcomeVisible ? 0 : -20 
            }}
            transition={{ duration: 0.7 }}
            className={`text-lg md:text-xl font-medium mb-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            WELCOME TO
          </motion.h2>
          
          {/* DSR GROUP MANDSAUR with RGB cycle effect */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="rgb-text-effect">
              {titleText.substring(0, titleIndex)}
              {titleIndex < titleText.length && (
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              )}
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            {descriptionText.substring(0, descIndex)}
            {titleDone && descIndex < descriptionText.length && (
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            )}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: descDone ? 1 : 0,
              y: descDone ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/about">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>About Us</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Contact Us</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
          </motion.div>
        </ThemeWrapper>
        
        {/* Financial Data Sections */}
        <div className="space-y-24 pb-16">
          {/* Section 1: Top Indian Stocks */}
          <IndianStocks />
          
          {/* Section 2: Mutual Funds */}
          <div id="mutual-funds">
            <MutualFundsSection />
          </div>
          
          {/* Section 4: Charter Account Section with fade in */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-900 shadow-xl shadow-gray-800/30'
            }`}
          >
            <CharterAccountSection />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

