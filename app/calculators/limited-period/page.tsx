"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Clock, TrendingUp, IndianRupee, Lightbulb, Calendar, Percent, Info } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

// Investment goals with typical amounts
const investmentGoals = [
  { 
    name: 'Short Term Goal', 
    amount: 500000,
    description: 'Save for a short-term goal like a gadget or vacation'
  },
  { 
    name: 'Medium Term Goal', 
    amount: 2000000,
    description: 'Plan for a medium-term goal like a car or home renovation'
  },
  { 
    name: 'Long Term Goal', 
    amount: 5000000,
    description: 'Achieve a significant long-term financial goal'
  },
  { 
    name: 'Custom Goal', 
    amount: 1000000,
    description: 'Set your own investment target'
  }
]

export default function LimitedPeriodSIPCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000)
  const [investmentPeriod, setInvestmentPeriod] = useState(5)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [selectedGoal, setSelectedGoal] = useState(investmentGoals[1])
  const [results, setResults] = useState({
    totalInvestment: 600000,
    totalReturns: 516840,
    maturityAmount: 1116840,
    monthlyInvestmentNeeded: 9600
  })

  // Calculate investment returns
  useEffect(() => {
    const calculateReturns = () => {
      // Ensure values are proper numbers
      const monthly = Number(monthlyInvestment) || 0
      const period = Number(investmentPeriod) || 0
      const returnRate = Number(expectedReturn) || 0
      
      if (monthly <= 0 || period <= 0 || returnRate <= 0) {
        setResults({
          totalInvestment: monthly * period * 12,
          totalReturns: 0,
          maturityAmount: monthly * period * 12,
          monthlyInvestmentNeeded: 0
        })
        return
      }
      
      const months = period * 12
      const monthlyRate = returnRate / 12 / 100
      
      // Calculate future value of SIP
      const futureValue = monthly * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
        (1 + monthlyRate)
      
      const totalInvestment = monthly * months
      const totalReturns = futureValue - totalInvestment

      // Calculate required monthly investment for selected goal
      const goalAmount = selectedGoal.amount
      let requiredMonthlyInvestment = 0
      
      if (goalAmount > 0 && monthlyRate > 0 && months > 0) {
        requiredMonthlyInvestment = goalAmount / 
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate))
      }

      setResults({
        totalInvestment,
        totalReturns,
        maturityAmount: futureValue,
        monthlyInvestmentNeeded: requiredMonthlyInvestment
      })
    }

    calculateReturns()
  }, [monthlyInvestment, investmentPeriod, expectedReturn, selectedGoal])

  // Handle goal selection
  const handleGoalSelect = (goal: typeof investmentGoals[0]) => {
    setSelectedGoal(goal)
  }

  // Handle input changes with proper validation
  const handleInvestmentChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setMonthlyInvestment(parseInt(cleanValue, 10))
    } else {
      setMonthlyInvestment(value)
    }
  }

  const handlePeriodChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setInvestmentPeriod(parseInt(cleanValue, 10))
    } else {
      setInvestmentPeriod(value)
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
            <Clock className="w-12 h-12" />
            Limited Period SIP Calculator
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate returns for your specific investment duration
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
              {/* Investment Goal Selection */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Investment Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {investmentGoals.map((goal) => (
                    <button
                      key={goal.name}
                      onClick={() => handleGoalSelect(goal)}
                      className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        selectedGoal.name === goal.name
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Calendar className="w-4 h-4" />
                      {goal.name}
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {selectedGoal.description}
                </p>
              </div>

              {/* Monthly Investment */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Monthly Investment
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
              </div>

              {/* Investment Period */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Investment Period (Years)
                </label>
                <input
                  type="text"
                  value={investmentPeriod === 0 ? '' : investmentPeriod}
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
                  max="10" 
                  value={investmentPeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>1 year</span>
                  <span>10 years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Expected Return (%)
                </label>
                <div className="flex items-center gap-4">
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
                  <span className="text-gray-500">%</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="20" 
                  step="0.5" 
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>8%</span>
                  <span>20%</span>
                </div>
              </div>
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
                  Your investment returns and goal details
                </p>
              </div>

              <div className={`p-4 rounded-xl mb-4 ${
                theme === 'light' 
                  ? 'bg-blue-50' 
                  : 'bg-blue-900/20'
              }`}>
                <p className={`text-sm mb-1 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  Maturity Amount
                </p>
                <p className={`text-3xl font-bold ${
                  theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                }`}>
                  ₹{formatIndianCurrency(results.maturityAmount || 0)}
                </p>
                <p className={`text-sm mt-2 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  after {investmentPeriod} years
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-green-50' 
                    : 'bg-green-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-300'
                  }`}>
                    Total Investment
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalInvestment || 0)}
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
                    Total Returns
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-orange-700' : 'text-orange-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalReturns || 0)}
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-purple-50' 
                    : 'bg-purple-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                  }`}>
                    Goal Amount
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                  }`}>
                    ₹{formatIndianCurrency(selectedGoal.amount || 0)}
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-yellow-50' 
                    : 'bg-yellow-900/20'
                }`}>
                  <p className={`text-sm mb-1 ${
                    theme === 'light' ? 'text-yellow-600' : 'text-yellow-300'
                  }`}>
                    Required Monthly Investment
                  </p>
                  <p className={`text-2xl font-bold ${
                    theme === 'light' ? 'text-yellow-700' : 'text-yellow-200'
                  }`}>
                    ₹{formatIndianCurrency(results.monthlyInvestmentNeeded || 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Tips */}
            <div className={`p-6 rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                <Lightbulb className="w-5 h-5" />
                Investment Tips
              </h3>
              <ul className={`space-y-3 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                <li>• Start early to benefit from compounding</li>
                <li>• Choose funds based on your risk appetite</li>
                <li>• Review and rebalance your portfolio regularly</li>
                <li>• Consider tax implications of your investments</li>
                <li>• Stay invested for the long term</li>
              </ul>
            </div>

            {/* Start Investment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/contact')}
              className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Start Limited Period SIP
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 