"use client"

import { useState, useEffect, useRef } from "react"
import { PieChart, ArrowUpRight, TrendingUp, Shield, Clock, Award, DollarSign, BarChart3 } from "lucide-react"
import { useTheme } from '@/context/theme-context'
import { motion, useInView, useSpring, useAnimation } from 'framer-motion'

// Animated counter component
function AnimatedCounter({ value, duration = 1.5, prefix = '', suffix = '' }) {
  const nodeRef = useRef(null)
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
function Typewriter({ text, delay = 20, className = "" }) {
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
  
  // COMBINED mutual fund description text for single typewriter effect
  const mutualFundDescription = "Mutual funds are investment vehicles that pool money from many investors to purchase securities like stocks, bonds, and other assets. Professional fund managers allocate the fund's investments and attempt to produce capital gains and income for the fund's investors.\n\nInvestors buy mutual fund shares, which represent a portion of the holdings of the fund. The price of these shares, known as the Net Asset Value (NAV), fluctuates daily based on the performance of the fund's underlying securities. Mutual funds provide diversification, professional management, and liquidity to investors at a reasonable cost."
  
  // Top performing funds 
  const topFunds = [
    {
      name: "HDFC Mid-Cap Opportunities Fund",
      category: "Mid Cap",
      returns: { "1y": 18.7, "3y": 15.2, "5y": 14.5 },
      aum: "31.2B",
      riskLevel: "Moderate"
    },
    {
      name: "Axis Bluechip Fund",
      category: "Large Cap",
      returns: { "1y": 15.3, "3y": 12.4, "5y": 13.1 },
      aum: "28.7B",
      riskLevel: "Low to Moderate"
    },
    {
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns: { "1y": 21.5, "3y": 16.8, "5y": 17.3 },
      aum: "16.5B",
      riskLevel: "High"
    },
    {
      name: "Mirae Asset Emerging Bluechip",
      category: "Large & Mid Cap",
      returns: { "1y": 19.2, "3y": 14.7, "5y": 15.9 },
      aum: "22.3B",
      riskLevel: "Moderate to High"
    },
  ]
  
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
        >
          <div ref={descriptionRef} className={`p-6 rounded-xl mb-8 ${
            theme === 'light' 
              ? 'bg-purple-50 border border-purple-100' 
              : 'bg-purple-900/20 border border-purple-800/30'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              What are Mutual Funds?
            </h3>
            
            {startTypewriter ? (
              <Typewriter 
                text={mutualFundDescription}
                delay={10}
                className={`whitespace-pre-line ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
              />
            ) : (
              <div className={`h-32 ${theme === 'light' ? 'bg-purple-100/50' : 'bg-purple-900/10'} animate-pulse rounded`}></div>
            )}
          </div>

          <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Top Performing Mutual Funds
          </h3>
          
          <div className={`overflow-hidden rounded-xl border ${
            theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-800 bg-gray-900/80'
          } backdrop-blur-sm`}>
            <table className="w-full">
              <thead>
                <tr className={`${theme === 'light' ? 'border-b border-gray-200' : 'border-b border-gray-800'}`}>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Fund Name</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Category</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>1Y Return</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>3Y Return</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>5Y Return</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>AUM</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Risk Level</th>
                  <th className={`text-left p-4 font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}></th>
                </tr>
              </thead>
              <tbody>
                {topFunds.map((fund, index) => (
                  <tr key={fund.name} className={index !== topFunds.length - 1 ? (theme === 'light' ? "border-b border-gray-200" : "border-b border-gray-800") : ""}>
                    <td className={`p-4 font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{fund.name}</td>
                    <td className={`p-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{fund.category}</td>
                    <td className="p-4 text-green-500">+<AnimatedCounter value={fund.returns["1y"]} suffix="%" /></td>
                    <td className="p-4 text-green-500">+<AnimatedCounter value={fund.returns["3y"]} suffix="%" /></td>
                    <td className="p-4 text-green-500">+<AnimatedCounter value={fund.returns["5y"]} suffix="%" /></td>
                    <td className={`p-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>₹<AnimatedCounter value={parseInt(fund.aum)} /></td>
                    <td className={`p-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{fund.riskLevel}</td>
                    <td className="p-4">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${
                          theme === 'light' 
                            ? 'bg-purple-100 hover:bg-purple-200 text-purple-600' 
                            : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-400'
                          } p-2 rounded-full`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-6">
            <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              theme === 'light' 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-700 hover:bg-purple-600 text-white'
            }`}>
              <BarChart3 className="w-4 h-4" />
              Explore All Mutual Funds
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
          className={`rounded-xl ${
            theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className={`md:col-span-2 p-6 rounded-tl-xl md:rounded-l-xl ${
              theme === 'light' 
                ? 'bg-purple-50 border-r border-purple-100' 
                : 'bg-purple-900/20 border-r border-purple-800/30'
            }`}>
              <h3 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                SIP Calculator
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Monthly Investment (₹)
                  </label>
                  <input 
                    type="range" 
                    min="500" 
                    max="100000" 
                    step="500" 
                    value={sipAmount} 
                    onChange={(e) => setSipAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>₹500</span>
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>₹{sipAmount.toLocaleString()}</span>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>₹1,00,000</span>
                  </div>
                </div>
                
                <div>
                  <label className={`block mb-2 text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Investment Period (Years)
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={years} 
                    onChange={(e) => setYears(parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>1 Yr</span>
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>{years} Years</span>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>30 Yrs</span>
                  </div>
                </div>
                
                <div>
                  <label className={`block mb-2 text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Expected Annual Returns (%)
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="0.5" 
                    value={expectedReturn} 
                    onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>1%</span>
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>{expectedReturn}%</span>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>30%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 p-6">
              <h3 className={`text-xl font-semibold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                Your SIP Results
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`rounded-xl p-4 border ${
                    theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                  }`}
                >
                  <h4 className={`text-sm mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Invested Amount</h4>
                  <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    ₹<AnimatedCounter value={totalInvestment} duration={1.2} />
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Monthly: ₹{sipAmount.toLocaleString('en-IN')}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={`rounded-xl p-4 border ${
                    theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                  }`}
                >
                  <h4 className={`text-sm mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Estimated Returns</h4>
                  <p className={`text-2xl font-bold text-green-500`}>
                    ₹<AnimatedCounter value={estimatedReturns} duration={1.2} />
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Rate: {expectedReturn}% p.a.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className={`rounded-xl p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white`}
                >
                  <h4 className="text-sm mb-2 text-purple-100">Total Value</h4>
                  <p className="text-2xl font-bold">
                    ₹<AnimatedCounter value={futureValue} duration={1.2} />
                  </p>
                  <p className="text-xs mt-1 text-purple-100">
                    After {years} Years
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: showResults ? 1 : 0, scaleX: showResults ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8" 
                style={{ transformOrigin: "left" }}
              >
                <div className={`h-8 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalInvestment / futureValue) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-center">
                    <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      <AnimatedCounter value={Math.round((totalInvestment / futureValue) * 100)} suffix="%" />
                    </div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Investment
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      <AnimatedCounter value={Math.round((estimatedReturns / futureValue) * 100)} suffix="%" />
                    </div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Returns
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all flex-1">
                  Start SIP Investment
                </button>
                <button className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}>
                  Download Results
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

