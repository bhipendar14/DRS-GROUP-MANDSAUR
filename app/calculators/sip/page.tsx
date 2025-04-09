"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Calculator, TrendingUp, IndianRupee, ArrowRight, Lightbulb } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

export default function SIPCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [results, setResults] = useState({
    totalInvestment: 600000,
    totalReturns: 516840,
    maturityValue: 1116840,
    monthlyInvestmentForGoal: 83333
  })
  const [targetAmount, setTargetAmount] = useState(10000000) // 1 Crore default goal
  const [showGoalPlanner, setShowGoalPlanner] = useState(false)

  // Calculate SIP returns
  useEffect(() => {
    const calculateSIP = () => {
      // Ensure values are proper numbers
      const investment = Number(monthlyInvestment) || 0
      const returns = Number(expectedReturn) || 0
      const years = Number(timePeriod) || 0
      const target = Number(targetAmount) || 0
      
      if (investment <= 0 || returns <= 0 || years <= 0) {
        setResults({
          totalInvestment: investment * years * 12,
          totalReturns: 0,
          maturityValue: investment * years * 12,
          monthlyInvestmentForGoal: 0
        })
        return
      }

      const monthlyRate = returns / 12 / 100
      const months = years * 12
      
      // Formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
      const maturityValue = investment * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
        (1 + monthlyRate)
      
      const totalInvestment = investment * months
      const totalReturns = maturityValue - totalInvestment

      // Calculate required monthly investment for goal
      let monthlyInvestmentForGoal = 0
      if (target > 0 && monthlyRate > 0 && months > 0) {
        monthlyInvestmentForGoal = target / 
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate))
      }

      setResults({
        totalInvestment,
        totalReturns,
        maturityValue,
        monthlyInvestmentForGoal: Math.ceil(monthlyInvestmentForGoal)
      })
    }

    calculateSIP()
  }, [monthlyInvestment, expectedReturn, timePeriod, targetAmount])

  // Handle input changes with proper validation
  const handleInvestmentChange = (value: string | number) => {
    // Remove leading zeros and convert to number
    if (typeof value === 'string') {
      // If user entered something like "04", convert it to "4"
      const cleanValue = value.replace(/^0+/, '') || '0'
      setMonthlyInvestment(parseInt(cleanValue, 10))
    } else {
      setMonthlyInvestment(value)
    }
  }

  const handleReturnChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setExpectedReturn(parseFloat(cleanValue))
    } else {
      setExpectedReturn(value)
    }
  }

  const handlePeriodChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setTimePeriod(parseInt(cleanValue, 10))
    } else {
      setTimePeriod(value)
    }
  }

  const handleTargetChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setTargetAmount(parseInt(cleanValue, 10))
    } else {
      setTargetAmount(value)
    }
  }

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      <NavBar />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <Calculator className="w-12 h-12" />
            SIP Calculator
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Plan your wealth creation journey with Systematic Investment Plan (SIP)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}
          >
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Monthly Investment Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={monthlyInvestment === 0 ? '' : monthlyInvestment}
                    onChange={(e) => handleInvestmentChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="100000" 
                  step="500" 
                  value={monthlyInvestment}
                  onChange={(e) => handleInvestmentChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Expected Annual Returns (%)
                </label>
                <input
                  type="text"
                  value={expectedReturn === 0 ? '' : expectedReturn}
                  onChange={(e) => handleReturnChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-200 focus:border-blue-500' 
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                  } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                  placeholder="0"
                />
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="0.5" 
                  value={expectedReturn}
                  onChange={(e) => handleReturnChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Investment Period (Years)
                </label>
                <input
                  type="text"
                  value={timePeriod === 0 ? '' : timePeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-200 focus:border-blue-500' 
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                  } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                  placeholder="0"
                />
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  value={timePeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              <button
                onClick={() => setShowGoalPlanner(!showGoalPlanner)}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } transition-all duration-200`}
              >
                {showGoalPlanner ? 'Hide' : 'Show'} Goal Planner
                <ArrowRight className="w-4 h-4" />
              </button>

              {showGoalPlanner && (
                <div className="pt-4">
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Target Amount
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={targetAmount === 0 ? '' : targetAmount}
                      onChange={(e) => handleTargetChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="0"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="50000000" 
                    step="100000" 
                    value={targetAmount}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹5 Crore</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Main Results Card */}
            <div className={`p-6 rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Investment Summary
                </h2>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  Here's what your investment could grow to
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-blue-50' 
                    : 'bg-blue-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                  }`}>
                    Total Investment
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalInvestment || 0)}
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-green-50' 
                    : 'bg-green-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-300'
                  }`}>
                    Total Returns
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalReturns || 0)}
                  </p>
                </div>
              </div>

              <div className={`mt-4 p-4 rounded-xl ${
                theme === 'light' 
                  ? 'bg-purple-50' 
                  : 'bg-purple-900/20'
              }`}>
                <p className={`text-sm mb-1 ${
                  theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                }`}>
                  Maturity Value
                </p>
                <p className={`text-3xl font-bold ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                }`}>
                  ₹{formatIndianCurrency(results.maturityValue || 0)}
                </p>
              </div>
            </div>

            {/* Goal Planner Results */}
            {showGoalPlanner && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-2xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-800/50 backdrop-blur-sm'
                }`}
              >
                <div className="text-center mb-6">
                  <h2 className={`text-2xl font-bold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Goal Planner
                  </h2>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                    Required monthly investment to reach your goal
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-orange-50' 
                    : 'bg-orange-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-orange-600' : 'text-orange-300'
                  }`}>
                    Required Monthly SIP
                  </p>
                  <p className={`text-3xl font-bold ${
                    theme === 'light' ? 'text-orange-700' : 'text-orange-200'
                  }`}>
                    ₹{formatIndianCurrency(results.monthlyInvestmentForGoal || 0)}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Start Investment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/contact')}
              className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Start Investment
            </motion.button>
          </motion.div>
        </div>

        {/* Investment Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-6xl mx-auto mt-12"
        >
          <div className={`p-6 rounded-2xl ${
            theme === 'light' 
              ? 'bg-white shadow-lg' 
              : 'bg-gray-800/50 backdrop-blur-sm'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Investment Tips
            </h3>
            <ul className={`space-y-3 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <li>• Start early to benefit from the power of compounding</li>
              <li>• Invest regularly through SIP to average out market volatility</li>
              <li>• Choose mutual funds based on your risk appetite and goals</li>
              <li>• Diversify your investments across different asset classes</li>
              <li>• Stay invested for the long term to maximize returns</li>
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 