"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { IndianRupee, TrendingUp, Calculator, Calendar, Percent, PieChart, ArrowRight, Info, Target } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

// Investment goals with typical amounts
const investmentGoals = [
  {
    name: 'Retirement Corpus',
    amount: 10000000,
    description: 'Build a substantial retirement fund'
  },
  {
    name: 'Property Down Payment',
    amount: 2000000,
    description: 'Save for property down payment'
  },
  {
    name: 'Children Education',
    amount: 5000000,
    description: 'Fund children higher education'
  },
  {
    name: 'Emergency Fund',
    amount: 1000000,
    description: 'Create emergency fund'
  }
]

// Risk profiles with expected returns
const riskProfiles = [
  {
    name: 'Conservative',
    return: 8,
    description: 'Lower risk, stable returns',
    assets: ['Debt Funds', 'Government Bonds', 'Fixed Deposits']
  },
  {
    name: 'Moderate',
    return: 12,
    description: 'Balanced risk-return ratio',
    assets: ['Hybrid Funds', 'Blue Chip Stocks', 'Corporate Bonds']
  },
  {
    name: 'Aggressive',
    return: 15,
    description: 'Higher risk, higher potential returns',
    assets: ['Small Cap Stocks', 'Sectoral Funds', 'International Funds']
  }
]

export default function LumpsumCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()

  // State variables
  const [investmentAmount, setInvestmentAmount] = useState(100000)
  const [investmentPeriod, setInvestmentPeriod] = useState(5)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [selectedGoal, setSelectedGoal] = useState(investmentGoals[0])
  const [selectedRiskProfile, setSelectedRiskProfile] = useState(riskProfiles[1])
  const [showDetails, setShowDetails] = useState(false)

  // Results state
  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    totalReturns: 0,
    goalAchievement: 0,
    yearlyBreakdown: [] as { year: number; amount: number; interest: number }[]
  })

  // Handle input changes with proper validation
  const handleInvestmentAmountChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setInvestmentAmount(parseInt(cleanValue, 10))
    } else {
      setInvestmentAmount(value)
    }
  }

  const handleInvestmentPeriodChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setInvestmentPeriod(parseInt(cleanValue, 10))
    } else {
      setInvestmentPeriod(value)
    }
  }

  const handleExpectedReturnChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setExpectedReturn(parseInt(cleanValue, 10))
    } else {
      setExpectedReturn(value)
    }
  }

  // Calculate returns
  useEffect(() => {
    const calculateReturns = () => {
      // Ensure values are proper numbers to prevent NaN results
      const amount = Number(investmentAmount) || 0
      const period = Number(investmentPeriod) || 0
      const returnRate = Number(expectedReturn) || 0
      
      const rate = returnRate / 100
      const maturityAmount = amount * Math.pow(1 + rate, period)
      const totalReturns = maturityAmount - amount
      const goalAchievement = (maturityAmount / selectedGoal.amount) * 100

      // Calculate yearly breakdown
      const yearlyBreakdown = []
      let currentAmount = amount

      for (let year = 1; year <= period; year++) {
        const yearEndAmount = currentAmount * (1 + rate)
        const yearlyInterest = yearEndAmount - currentAmount
        
        yearlyBreakdown.push({
          year,
          amount: yearEndAmount,
          interest: yearlyInterest
        })

        currentAmount = yearEndAmount
      }

      setResults({
        maturityAmount,
        totalInvestment: amount,
        totalReturns,
        goalAchievement,
        yearlyBreakdown
      })
    }

    calculateReturns()
  }, [investmentAmount, investmentPeriod, expectedReturn, selectedGoal])

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <Calculator className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Lumpsum Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate returns on your one-time investment and plan your financial goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Investment Goals */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Investment Goal
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {investmentGoals.map((goal) => (
                    <button
                      key={goal.name}
                      onClick={() => setSelectedGoal(goal)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        selectedGoal.name === goal.name
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="line-clamp-1">{goal.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {selectedGoal.description}
                </p>
              </div>

              {/* Investment Amount */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  One-time Investment Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={investmentAmount === 0 ? '' : investmentAmount}
                    onChange={(e) => handleInvestmentAmountChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm sm:text-base`}
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
                  onChange={(e) => handleInvestmentPeriodChange(e.target.value)}
                  className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-200 focus:border-blue-500' 
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                  } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm sm:text-base`}
                  placeholder="0"
                />
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={investmentPeriod}
                  onChange={(e) => handleInvestmentPeriodChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Risk Profile
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {riskProfiles.map((profile) => (
                    <button
                      key={profile.name}
                      onClick={() => {
                        setSelectedRiskProfile(profile)
                        setExpectedReturn(profile.return)
                      }}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm transition-all duration-200 ${
                        selectedRiskProfile.name === profile.name
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1 sm:gap-2">
                        <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium line-clamp-1">{profile.name}</span>
                        <span className="text-xs">
                          {profile.return}% return
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {selectedRiskProfile.description}
                </p>
                <div className="mt-2">
                  <p className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    Recommended Assets:
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedRiskProfile.assets.map((asset, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${
                          theme === 'light'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-blue-900/30 text-blue-300'
                        }`}
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expected Return */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Expected Annual Return (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={expectedReturn === 0 ? '' : expectedReturn}
                    onChange={(e) => handleExpectedReturnChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm sm:text-base`}
                    placeholder="0"
                  />
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={expectedReturn}
                  onChange={(e) => handleExpectedReturnChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Main Results Card */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <div className="text-center mb-4 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Investment Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Projected returns on your lumpsum investment
                </p>
              </div>

              <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${
                theme === 'light' 
                  ? 'bg-blue-50' 
                  : 'bg-blue-900/20'
              }`}>
                <p className={`text-xs sm:text-sm mb-1 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  Maturity Amount
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                }`}>
                  ₹{formatIndianCurrency(results.maturityAmount || 0)}
                </p>
                <div className={`flex items-center gap-2 mt-1 sm:mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  <span>Goal Achievement:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    results.goalAchievement >= 100
                      ? 'bg-green-500 text-white'
                      : theme === 'light'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-yellow-900/30 text-yellow-300'
                  }`}>
                    {results.goalAchievement.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-green-50' 
                    : 'bg-green-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-300'
                  }`}>
                    Total Investment
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalInvestment || 0)}
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-purple-50' 
                    : 'bg-purple-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                  }`}>
                    Total Returns
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalReturns || 0)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`w-full mt-3 sm:mt-4 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 text-xs sm:text-sm ${
                  theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {/* Yearly Breakdown */}
            {showDetails && (
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                theme === 'light' 
                  ? 'bg-white shadow-lg' 
                  : 'bg-gray-800/50 backdrop-blur-sm'
              }`}>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Year-wise Breakdown
                </h3>
                <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-1 sm:pr-2">
                  {results.yearlyBreakdown.map((year) => (
                    <div
                      key={year.year}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                        theme === 'light'
                          ? 'bg-gray-50'
                          : 'bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className={`font-medium text-sm sm:text-base ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                          Year {year.year}
                        </span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className={`font-medium text-sm sm:text-base ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }`}>
                          ₹{formatIndianCurrency(year.amount)}
                        </span>
                      </div>
                      <div className={`text-xs sm:text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Interest Earned: ₹{formatIndianCurrency(year.interest)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investment Tips */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Investment Tips
              </h3>
              <ul className={`space-y-2 sm:space-y-3 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span className="text-sm sm:text-base">Consider your risk tolerance before investing</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span className="text-sm sm:text-base">Diversify your investment portfolio</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span className="text-sm sm:text-base">Review and rebalance periodically</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span className="text-sm sm:text-base">Stay invested for the long term</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span className="text-sm sm:text-base">Consider tax implications of your investments</span>
                </li>
              </ul>
            </div>

            {/* Start Investment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/contact')}
              className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Investing Now
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 