"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { GraduationCap, TrendingUp, IndianRupee, School, BookOpen } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

export default function EducationCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [currentCost, setCurrentCost] = useState(2000000) // 20 Lakhs
  const [childAge, setChildAge] = useState(5)
  const [educationAge, setEducationAge] = useState(18)
  const [expectedInflation, setExpectedInflation] = useState(6)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [results, setResults] = useState({
    futureEducationCost: 4792320,
    monthlyInvestmentNeeded: 14050,
    totalInvestment: 2191800,
    totalReturns: 2600520
  })

  // Education cost categories
  const educationCosts = [
    { name: 'Engineering', cost: 2000000 }, // 20 Lakhs
    { name: 'Medical', cost: 5000000 }, // 50 Lakhs
    { name: 'MBA', cost: 3500000 }, // 35 Lakhs
    { name: 'Liberal Arts', cost: 1500000 }, // 15 Lakhs
    { name: 'Overseas Education', cost: 10000000 } // 1 Crore
  ]

  // Calculate education planning
  useEffect(() => {
    const calculateEducationPlan = () => {
      // Ensure values are proper numbers
      const cost = Number(currentCost) || 0
      const cAge = Number(childAge) || 0
      const eAge = Number(educationAge) || 0
      const inflation = Number(expectedInflation) || 0
      const returnRate = Number(expectedReturn) || 0
      
      if (cost <= 0 || cAge >= eAge || inflation <= 0 || returnRate <= 0) {
        setResults({
          futureEducationCost: cost,
          monthlyInvestmentNeeded: 0,
          totalInvestment: 0,
          totalReturns: 0
        })
        return
      }
      
      const yearsToEducation = eAge - cAge
      
      // Calculate future education cost considering inflation
      const futureEducationCost = cost * 
        Math.pow(1 + inflation / 100, yearsToEducation)
      
      // Calculate monthly investment needed
      const monthlyRate = returnRate / 12 / 100
      const months = yearsToEducation * 12
      
      let monthlyInvestmentNeeded = 0
      if (monthlyRate > 0 && months > 0) {
        monthlyInvestmentNeeded = futureEducationCost / 
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate))
      }

      const totalInvestment = monthlyInvestmentNeeded * months
      const totalReturns = futureEducationCost - totalInvestment

      setResults({
        futureEducationCost,
        monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
        totalInvestment,
        totalReturns
      })
    }

    calculateEducationPlan()
  }, [currentCost, childAge, educationAge, expectedInflation, expectedReturn])

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

  const handleEducationAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setEducationAge(parseInt(cleanValue, 10))
    } else {
      setEducationAge(value)
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
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Education Planning Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Plan ahead for your child's education with our comprehensive calculator
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
                  Quick Course Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
                  {educationCosts.map((edu) => (
                    <button
                      key={edu.name}
                      onClick={() => setCurrentCost(edu.cost)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        currentCost === edu.cost
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <School className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{edu.name}</span>
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
                    Current Education Cost
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
                    min="500000" 
                    max="15000000" 
                    step="100000" 
                    value={currentCost}
                    onChange={(e) => handleCostChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>₹5 Lakhs</span>
                    <span>₹1.5 Crore</span>
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
                    max="15" 
                    value={childAge}
                    onChange={(e) => handleChildAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>0 years</span>
                    <span>15 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Education Age
                  </label>
                  <input
                    type="text"
                    value={educationAge === 0 ? '' : educationAge}
                    onChange={(e) => handleEducationAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="15" 
                    max="25" 
                    value={educationAge}
                    onChange={(e) => handleEducationAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>15 years</span>
                    <span>25 years</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Expected Education Cost Inflation (%)
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
                  Education Planning Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Here's what you need to plan for your child's education
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
                  Future Education Cost
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                }`}>
                  ₹{formatIndianCurrency(results.futureEducationCost || 0)}
                </p>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                  theme === 'light' ? 'text-purple-600' : 'text-purple-300'
                }`}>
                  at age {educationAge} ({educationAge - childAge} years from now)
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
              Start Education Planning
            </motion.button>
          </motion.div>
        </div>

        {/* Education Planning Tips */}
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
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Education Planning Tips
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
                <span>Consider education cost inflation which is typically higher than regular inflation</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Include additional costs like living expenses, books, and other materials</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Look into education-specific investment options like Sukanya Samriddhi Yojana for girls</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider diversifying investments between equity and debt based on time horizon</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 