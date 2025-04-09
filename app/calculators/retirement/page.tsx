    "use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Wallet, TrendingUp, IndianRupee, Lightbulb } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

export default function RetirementCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(50000)
  const [expectedInflation, setExpectedInflation] = useState(6)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [results, setResults] = useState({
    retirementCorpus: 43905618,
    monthlyInvestmentNeeded: 22875,
    totalInvestment: 6862500,
    totalReturns: 36543118
  })

  // Calculate retirement planning
  useEffect(() => {
    const calculateRetirementPlan = () => {
      // Ensure values are proper numbers
      const cAge = Number(currentAge) || 0
      const rAge = Number(retirementAge) || 0
      const monthlyExpenses = Number(currentMonthlyExpenses) || 0
      const inflation = Number(expectedInflation) || 0
      const returnRate = Number(expectedReturn) || 0
      const savings = Number(currentSavings) || 0
      
      if (cAge >= rAge || monthlyExpenses <= 0 || inflation <= 0 || returnRate <= 0) {
        setResults({
          retirementCorpus: 0,
          monthlyInvestmentNeeded: 0,
          totalInvestment: 0,
          totalReturns: 0
        })
        return
      }
      
      const yearsToRetirement = rAge - cAge
      const yearsInRetirement = 30 // Assuming 30 years of retirement
      
      // Calculate future monthly expenses considering inflation
      const futureMonthlyExpenses = monthlyExpenses * 
        Math.pow(1 + inflation / 100, yearsToRetirement)
      
      // Calculate retirement corpus needed
      const monthlyRate = inflation / 12 / 100
      const months = yearsInRetirement * 12
      
      const retirementCorpus = futureMonthlyExpenses * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      
      // Calculate monthly investment needed
      const investmentMonthlyRate = returnRate / 12 / 100
      const investmentMonths = yearsToRetirement * 12
      
      let monthlyInvestmentNeeded = 0
      if (investmentMonthlyRate > 0 && investmentMonths > 0) {
        monthlyInvestmentNeeded = (retirementCorpus - savings) / 
          (((Math.pow(1 + investmentMonthlyRate, investmentMonths) - 1) / investmentMonthlyRate) * 
          (1 + investmentMonthlyRate))
      }

      const totalInvestment = monthlyInvestmentNeeded * investmentMonths
      const totalReturns = retirementCorpus - totalInvestment - savings

      setResults({
        retirementCorpus,
        monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
        totalInvestment,
        totalReturns
      })
    }

    calculateRetirementPlan()
  }, [currentAge, retirementAge, currentMonthlyExpenses, expectedInflation, expectedReturn, currentSavings])

  // Handle input changes with proper validation
  const handleCurrentAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setCurrentAge(parseInt(cleanValue, 10))
    } else {
      setCurrentAge(value)
    }
  }

  const handleRetirementAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setRetirementAge(parseInt(cleanValue, 10))
    } else {
      setRetirementAge(value)
    }
  }

  const handleMonthlyExpensesChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setCurrentMonthlyExpenses(parseInt(cleanValue, 10))
    } else {
      setCurrentMonthlyExpenses(value)
    }
  }

  const handleSavingsChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setCurrentSavings(parseInt(cleanValue, 10))
    } else {
      setCurrentSavings(value)
    }
  }

  const handleInflationChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setExpectedInflation(parseFloat(cleanValue))
    } else {
      setExpectedInflation(value)
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
            <Wallet className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Retirement Planning Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Plan your retirement and ensure a comfortable life after work
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Age
                  </label>
                  <input
                    type="text"
                    value={currentAge === 0 ? '' : currentAge}
                    onChange={(e) => handleCurrentAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="25" 
                    max="55" 
                    value={currentAge}
                    onChange={(e) => handleCurrentAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>25 years</span>
                    <span>55 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Retirement Age
                  </label>
                  <input
                    type="text"
                    value={retirementAge === 0 ? '' : retirementAge}
                    onChange={(e) => handleRetirementAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="55" 
                    max="70" 
                    value={retirementAge}
                    onChange={(e) => handleRetirementAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>55 years</span>
                    <span>70 years</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Monthly Expenses
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={currentMonthlyExpenses === 0 ? '' : currentMonthlyExpenses}
                      onChange={(e) => handleMonthlyExpensesChange(e.target.value)}
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
                    min="20000" 
                    max="200000" 
                    step="5000" 
                    value={currentMonthlyExpenses}
                    onChange={(e) => handleMonthlyExpensesChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>₹20,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Savings
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={currentSavings === 0 ? '' : currentSavings}
                      onChange={(e) => handleSavingsChange(e.target.value)}
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
                    min="0" 
                    max="10000000" 
                    step="100000" 
                    value={currentSavings}
                    onChange={(e) => handleSavingsChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>₹0</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Expected Inflation (%)
                  </label>
                  <input
                    type="text"
                    value={expectedInflation === 0 ? '' : expectedInflation}
                    onChange={(e) => handleInflationChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="4" 
                    max="12" 
                    step="0.5" 
                    value={expectedInflation}
                    onChange={(e) => handleInflationChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>4%</span>
                    <span>12%</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Expected Investment Returns (%)
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
                    min="6" 
                    max="15" 
                    step="0.5" 
                    value={expectedReturn}
                    onChange={(e) => handleReturnChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
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
                  Retirement Planning Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Here's what you need to plan for your retirement
                </p>
              </div>

              <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-3 sm:mb-4 ${
                theme === 'light' 
                  ? 'bg-purple-50' 
                  : 'bg-purple-900/20'
              }`}>
                <p className={`text-xs sm:text-sm mb-1 ${
                  theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                }`}>
                  Required Retirement Corpus
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                }`}>
                  ₹{formatIndianCurrency(results.retirementCorpus || 0)}
                </p>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                  theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                }`}>
                  for 30 years after age {retirementAge}
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
                  Required Monthly Investment
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                }`}>
                  ₹{formatIndianCurrency(results.monthlyInvestmentNeeded || 0)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                  <p className={`text-base sm:text-xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalInvestment || 0)}
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-orange-50' 
                    : 'bg-orange-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-orange-600' : 'text-orange-300'
                  }`}>
                    Total Returns
                  </p>
                  <p className={`text-base sm:text-xl font-bold ${
                    theme === 'light' ? 'text-orange-700' : 'text-orange-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalReturns || 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Start Investment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/contact')}
              className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Retirement Planning
            </motion.button>
          </motion.div>
        </div>

        {/* Retirement Planning Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-6xl mx-auto mt-6 sm:mt-10 lg:mt-12"
        >
          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
            theme === 'light' 
              ? 'bg-white shadow-lg' 
              : 'bg-gray-800/50 backdrop-blur-sm'
          }`}>
            <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              Retirement Planning Tips
            </h3>
            <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Start planning early to benefit from the power of compounding</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider inflation while calculating your retirement corpus</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Diversify your investments between equity and debt based on your risk appetite</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Look into retirement-specific investment options like NPS and PPF</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider health insurance and emergency fund as part of your retirement plan</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 