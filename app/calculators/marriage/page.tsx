"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Heart, TrendingUp, IndianRupee, Gift } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

export default function MarriageCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [currentCost, setCurrentCost] = useState(2500000) // 25 Lakhs
  const [childAge, setChildAge] = useState(5)
  const [marriageAge, setMarriageAge] = useState(25)
  const [expectedInflation, setExpectedInflation] = useState(6)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [results, setResults] = useState({
    futureMarriageCost: 8046639,
    monthlyInvestmentNeeded: 21598,
    totalInvestment: 4319600,
    totalReturns: 3727039
  })

  // Marriage expense categories with typical costs
  const marriageExpenses = [
    { name: 'Simple Wedding', cost: 1500000 }, // 15 Lakhs
    { name: 'Moderate Wedding', cost: 2500000 }, // 25 Lakhs
    { name: 'Grand Wedding', cost: 5000000 }, // 50 Lakhs
    { name: 'Luxury Wedding', cost: 10000000 }, // 1 Crore
    { name: 'Destination Wedding', cost: 15000000 } // 1.5 Crore
  ]

  // Calculate marriage planning
  useEffect(() => {
    const calculateMarriagePlan = () => {
      // Ensure values are proper numbers
      const cost = Number(currentCost) || 0
      const cAge = Number(childAge) || 0
      const mAge = Number(marriageAge) || 0
      const inflation = Number(expectedInflation) || 0
      const returnRate = Number(expectedReturn) || 0
      
      if (cost <= 0 || cAge >= mAge || inflation <= 0 || returnRate <= 0) {
        setResults({
          futureMarriageCost: cost,
          monthlyInvestmentNeeded: 0,
          totalInvestment: 0,
          totalReturns: 0
        })
        return
      }
      
      const yearsToMarriage = mAge - cAge
      
      // Calculate future marriage cost considering inflation
      const futureMarriageCost = cost * 
        Math.pow(1 + inflation / 100, yearsToMarriage)
      
      // Calculate monthly investment needed
      const monthlyRate = returnRate / 12 / 100
      const months = yearsToMarriage * 12
      
      let monthlyInvestmentNeeded = 0
      if (monthlyRate > 0 && months > 0) {
        monthlyInvestmentNeeded = futureMarriageCost / 
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate))
      }

      const totalInvestment = monthlyInvestmentNeeded * months
      const totalReturns = futureMarriageCost - totalInvestment

      setResults({
        futureMarriageCost,
        monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
        totalInvestment,
        totalReturns
      })
    }

    calculateMarriagePlan()
  }, [currentCost, childAge, marriageAge, expectedInflation, expectedReturn])

  // Handle input changes with proper validation
  const handleCostChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setCurrentCost(parseInt(cleanValue, 10))
    } else {
      setCurrentCost(value)
    }
  }

  const handleChildAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setChildAge(parseInt(cleanValue, 10))
    } else {
      setChildAge(value)
    }
  }

  const handleMarriageAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setMarriageAge(parseInt(cleanValue, 10))
    } else {
      setMarriageAge(value)
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
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Marriage Planning Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Plan ahead for your child's wedding with our comprehensive calculator
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
              {/* Quick Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Wedding Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
                  {marriageExpenses.map((wedding) => (
                    <button
                      key={wedding.name}
                      onClick={() => setCurrentCost(wedding.cost)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        currentCost === wedding.cost
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{wedding.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rest of the input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Wedding Cost Estimate
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={currentCost === 0 ? '' : currentCost}
                      onChange={(e) => handleCostChange(e.target.value)}
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
                    min="1000000" 
                    max="20000000" 
                    step="500000" 
                    value={currentCost}
                    onChange={(e) => handleCostChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>₹10 Lakhs</span>
                    <span>₹2 Crore</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Child's Current Age
                  </label>
                  <input
                    type="text"
                    value={childAge === 0 ? '' : childAge}
                    onChange={(e) => handleChildAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    value={childAge}
                    onChange={(e) => handleChildAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>0 years</span>
                    <span>20 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Expected Marriage Age
                  </label>
                  <input
                    type="text"
                    value={marriageAge === 0 ? '' : marriageAge}
                    onChange={(e) => handleMarriageAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="21" 
                    max="35" 
                    value={marriageAge}
                    onChange={(e) => handleMarriageAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>21 years</span>
                    <span>35 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Expected Wedding Cost Inflation (%)
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

                <div className="col-span-1 sm:col-span-2">
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
                  Marriage Planning Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Here's what you need to plan for your child's wedding
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
                  Future Wedding Cost
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                }`}>
                  ₹{formatIndianCurrency(results.futureMarriageCost || 0)}
                </p>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                  theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                }`}>
                  at age {marriageAge} ({marriageAge - childAge} years from now)
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
              Start Marriage Planning
            </motion.button>
          </motion.div>
        </div>

        {/* Marriage Planning Tips */}
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
              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              Marriage Planning Tips
            </h3>
            <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Start planning early to reduce financial burden later</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider wedding cost inflation which can be higher than regular inflation</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Include all major expenses like venue, catering, jewelry, and clothing</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Look into gold savings schemes and systematic gold investment plans</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider wedding insurance to protect against unforeseen circumstances</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 