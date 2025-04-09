"use client"

import { useState, useEffect, useRef } from "react"
import { PieChart, ArrowUpRight, TrendingUp, Shield, Clock, Award, DollarSign, BarChart3, Calculator } from "lucide-react"
import { useTheme } from '@/context/theme-context'
import { motion, useInView, useSpring, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { jsPDF } from 'jspdf'
import Image from 'next/image'

// Animated counter component
function AnimatedCounter({ value, duration = 1.5, prefix = '', suffix = '' }: { 
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const spring = useSpring(0, { duration: duration * 1000 })
  
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  
  useEffect(() => {
    return spring.onChange((latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${latest.toLocaleString('en-IN', {
          minimumFractionDigits: value % 1 === 0 ? 0 : 1,
          maximumFractionDigits: value % 1 === 0 ? 0 : 1
        })}${suffix}`
      }
    })
  }, [spring, prefix, suffix, value])
  
  return <span ref={nodeRef}>{prefix}0{suffix}</span>
}

// Typewriter component
function Typewriter({ text, delay = 20, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  
  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
      
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [currentIndex, delay, isTyping, text])
  
  return (
    <div className={className}>
      {displayText}
      {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse"></span>}
    </div>
  )
}

// Add this utility function at the top of the file
const formatLargeNumber = (num: number) => {
  if (num >= 10000000) { // For values >= 1 crore
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // For values >= 1 lakh
    return `₹${(num / 100000).toFixed(2)} L`;
  } else {
    return `₹${num.toLocaleString()}`;
  }
};

export function MutualFundsSection() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // State for typewriter control
  const [startTypewriter, setStartTypewriter] = useState(false)
  const descriptionRef = useRef(null)
  const descriptionInView = useInView(descriptionRef, { once: true, margin: "-50px" })
  
  // SIP Calculator state
  const [sipAmount, setSipAmount] = useState(5000)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [estimatedReturns, setEstimatedReturns] = useState(0)
  const [futureValue, setFutureValue] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
  const router = useRouter()
  
  // COMBINED mutual fund description text for single typewriter effect
  const mutualFundDescription = `Mutual funds are professionally managed investment vehicles that pool money from multiple investors to purchase a diversified portfolio of securities. This pooled investment approach offers several key advantages:

1. Professional Management: Expert fund managers make informed investment decisions based on thorough research and market analysis.

2. Diversification: Spread risk across multiple securities, sectors, and asset classes to optimize returns.

3. Accessibility: Start investing with small amounts through Systematic Investment Plans (SIPs).

4. Transparency: Regular portfolio disclosures and NAV updates ensure complete transparency.

IMPORTANT DISCLAIMER:
• Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
• Past performance is not indicative of future returns. 
• The information provided here is for educational purposes only and should not be considered as financial advice.
• Investors should consider their investment objectives, risks, charges, and expenses carefully before investing.`
  
  // Calculate SIP results
  useEffect(() => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = years * 12
    const futureVal = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    
    const totalInvest = sipAmount * months
    const returns = futureVal - totalInvest
    
    setTotalInvestment(totalInvest)
    setEstimatedReturns(returns)
    setFutureValue(futureVal)
    
    // Show results with a slight delay for animation purposes
    const timeout = setTimeout(() => {
      setShowResults(true)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [sipAmount, years, expectedReturn])
  
  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { 
          type: "spring",
          duration: 1,
          bounce: 0.3
        }
      })
    }
  }, [controls, isInView])
  
  // Start typewriter when description is in view
  useEffect(() => {
    if (descriptionInView) {
      setStartTypewriter(true)
    }
  }, [descriptionInView])

  return (
    <div ref={ref} className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Welcome animation */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={controls}
        className="mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl text-white mb-6"
          >
            <PieChart className="w-12 h-12" />
          </motion.div>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={`text-3xl md:text-4xl font-bold text-center mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
        >
          Discover Mutual Funds
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className={`text-center max-w-3xl mx-auto mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
        >
          Start your investment journey with professionally managed mutual funds that match your financial goals
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h2 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            <PieChart className="w-6 h-6 text-purple-500" />
            Mutual Funds Investment
          </h2>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-2xl`}>
            Expertly managed investment vehicles that pool money from multiple investors to purchase securities.
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 space-x-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'overview' 
                ? 'bg-purple-600 text-white' 
                : theme === 'light' 
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'benefits' 
                ? 'bg-purple-600 text-white' 
                : theme === 'light' 
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Benefits
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'calculator' 
                ? 'bg-purple-600 text-white' 
                : theme === 'light' 
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            SIP Calculator
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div ref={descriptionRef} className={`p-4 sm:p-6 rounded-xl mb-8 ${
            theme === 'light' 
              ? 'bg-purple-50 border border-purple-100' 
              : 'bg-purple-900/20 border border-purple-800/30'
          }`}>
            <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              What are Mutual Funds?
            </h3>
            
            {startTypewriter ? (
              <Typewriter 
                text={mutualFundDescription}
                delay={10}
                className={`whitespace-pre-line text-sm sm:text-base ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
              />
            ) : (
              <div className={`h-32 ${theme === 'light' ? 'bg-purple-100/50' : 'bg-purple-900/10'} animate-pulse rounded`}></div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
            <a 
              href="https://www.fundzbazar.com/customisedlinkregistration/7c7723/2364257c77235e6d3a3f6326266b7c3f6326266b7c21713d"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <PieChart className="w-5 h-5 mr-2" />
              Open Mutual Fund Account
            </a>
            <button
              onClick={() => router.push('/calculators')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Financial Calculator
            </button>
          </div>
        </motion.div>
      )}

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-6 rounded-xl mb-8 ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100' 
              : 'bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-800/30'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Benefits of Investing in Mutual Funds with Angel One
            </h3>
            <p className={`mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Angel One provides a seamless platform for mutual fund investments with expert guidance, diverse options, and cutting-edge tools to help you make informed decisions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Professional Management</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Expert fund managers with deep market knowledge make investment decisions on your behalf.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Diversification</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Spread your investment across multiple securities to reduce risk and enhance returns potential.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Convenience</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Start with as little as ₹500 through SIP and automate your investments for disciplined wealth creation.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Cost-Efficient</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Zero commission on mutual fund investments through our direct plans, maximizing your returns.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Expert Research</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Access detailed research reports and recommendations from our team of financial experts.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 shadow-md shadow-purple-900/10'
              }`}>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h4 className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Transparent Tracking</h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Monitor your investments anytime with our intuitive dashboard and detailed performance reports.
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${
            theme === 'light' 
              ? 'bg-indigo-50 border border-indigo-100' 
              : 'bg-indigo-900/20 border border-indigo-800/30'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              How to Start Investing with Angel One
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`flex-1 p-4 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 bg-opacity-50'
              }`}>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Create Account</h4>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Sign up with Angel One in under 5 minutes with a completely paperless KYC process.
                </p>
              </div>
              
              <div className={`flex-1 p-4 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 bg-opacity-50'
              }`}>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Choose Funds</h4>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Select from over 5,000 mutual funds based on your investment goals and risk appetite.
                </p>
              </div>
              
              <div className={`flex-1 p-4 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800 bg-opacity-50'
              }`}>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Start SIP</h4>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Set up a systematic investment plan with as little as ₹500 per month and watch your wealth grow.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SIP Calculator Tab */}
      {activeTab === 'calculator' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-xl overflow-hidden ${
            theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Calculator inputs */}
            <div className={`p-6 sm:p-8 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-purple-50 to-indigo-50' 
                : 'bg-gradient-to-br from-purple-900/20 to-indigo-900/20'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                SIP Calculator
              </h3>
              
              <div className="space-y-8">
                {/* Monthly Investment */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Monthly Investment
                    </label>
                    <span className={`text-base sm:text-lg font-bold truncate ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                      {formatLargeNumber(sipAmount)}
                    </span>
                  </div>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="500" 
                      max="100000" 
                      step="500" 
                      value={sipAmount} 
                      onChange={(e) => setSipAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>₹500</span>
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>₹1,00,000</span>
                    </div>
                  </div>
                </div>
                
                {/* Investment Period */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Investment Period
                    </label>
                    <span className={`text-lg font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                      {years} Years
                    </span>
                  </div>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="1" 
                      value={years} 
                      onChange={(e) => setYears(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>1 Year</span>
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>30 Years</span>
                    </div>
                  </div>
                </div>
                
                {/* Expected Returns */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Expected Annual Returns
                    </label>
                    <span className={`text-lg font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                      {expectedReturn}%
                    </span>
                  </div>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="0.5" 
                      value={expectedReturn} 
                      onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>1%</span>
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Results */}
            <div className="p-6 sm:p-8">
              <h3 className={`text-2xl font-bold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                Your SIP Results
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Invested Amount */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`p-4 rounded-xl ${
                    theme === 'light' 
                      ? 'bg-purple-50 border border-purple-100' 
                      : 'bg-purple-900/20 border border-purple-800/30'
                  }`}
                >
                  <p className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Total Investment
                  </p>
                  <h4 className={`text-lg sm:text-xl font-bold truncate ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {formatLargeNumber(totalInvestment)}
                  </h4>
                  <p className={`text-xs mt-1 truncate ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Monthly: {formatLargeNumber(sipAmount)}
                  </p>
                </motion.div>
                
                {/* Estimated Returns */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={`p-4 rounded-xl ${
                    theme === 'light' 
                      ? 'bg-green-50 border border-green-100' 
                      : 'bg-green-900/20 border border-green-800/30'
                  }`}
                >
                  <p className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Est. Returns
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold truncate text-green-500">
                    {formatLargeNumber(estimatedReturns)}
                  </h4>
                  <p className={`text-xs mt-1 truncate ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Rate: {expectedReturn}% p.a.
                  </p>
                </motion.div>
                
                {/* Total Value */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600"
                >
                  <p className="text-sm mb-1 text-purple-100">
                    Total Value
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold truncate text-white">
                    {formatLargeNumber(futureValue)}
                  </h4>
                  <p className="text-xs mt-1 truncate text-purple-100">
                    After {years} Years
                  </p>
                </motion.div>
              </div>
              
              {/* Investment Ratio Bar */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: showResults ? 1 : 0, scaleX: showResults ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8" 
                style={{ transformOrigin: "left" }}
              >
                <div className={`h-3 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalInvestment / futureValue) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      Investment
                    </p>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      <AnimatedCounter value={Math.round((totalInvestment / futureValue) * 100)} suffix="%" />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      Returns
                    </p>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      <AnimatedCounter value={Math.round((estimatedReturns / futureValue) * 100)} suffix="%" />
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span>Start SIP Investment</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    // Create PDF content
                    const doc = new jsPDF();
                    
                    // Add DSR Group Logo and Header
                    doc.setFontSize(24);
                    doc.setTextColor(88, 28, 135); // Purple color
                    doc.text("DSR GROUP MANDSAUR™", 105, 20, { align: "center" });
                    
                    // Add divider line
                    doc.setDrawColor(88, 28, 135);
                    doc.line(20, 25, 190, 25);
                    
                    // Add SIP Details
                    doc.setFontSize(18);
                    doc.setTextColor(0, 0, 0);
                    doc.text("SIP Investment Details", 20, 40);
                    
                    // Add calculation details
                    doc.setFontSize(12);
                    doc.text([
                      `Monthly Investment: ${formatLargeNumber(sipAmount)}`,
                      `Investment Period: ${years} Years`,
                      `Expected Returns: ${expectedReturn}% p.a.`,
                      `Total Investment: ${formatLargeNumber(totalInvestment)}`,
                      `Estimated Returns: ${formatLargeNumber(estimatedReturns)}`,
                      `Total Value: ${formatLargeNumber(futureValue)}`
                    ], 20, 60);
                    
                    // Add investment ratio
                    doc.text([
                      `Investment Ratio:`,
                      `Investment: ${Math.round((totalInvestment / futureValue) * 100)}%`,
                      `Returns: ${Math.round((estimatedReturns / futureValue) * 100)}%`
                    ], 20, 110);
                    
                    // Add Disclaimer
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text([
                      "Disclaimer:",
                      "• Mutual fund investments are subject to market risks.",
                      "• Please read all scheme-related documents carefully before investing.",
                      "• Past performance is not indicative of future returns.",
                      "• The calculations shown are estimates based on the given parameters.",
                      "• Actual returns may vary based on market conditions and fund performance."
                    ], 20, 140);
                    
                    // Add Contact Information
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    doc.text([
                      "Contact Information:",
                      "DSR GROUP MANDSAUR",
                      "117 Nemi Nagar Kothari Colony, Street No 3",
                      "(Motilal Oswal Financial Services)",
                      "Mandsaur, Madhya Pradesh, 458001",
                      "Mobile: +91-9024138649",
                      "Landline: 07422 - 496399",
                      "Email: dsrgroupmandsaur@gmail.com"
                    ], 20, 180);
                    
                    // Save the PDF
                    doc.save("DSR-Group-SIP-Calculator-Results.pdf");
                  }}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === 'light' 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <span>Download Results</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

