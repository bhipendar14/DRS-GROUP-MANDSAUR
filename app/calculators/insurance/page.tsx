"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Shield, TrendingUp, IndianRupee, Lightbulb, Users, Percent, Calendar, Info, Heart, CheckCircle2 } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

// Insurance types with typical coverage
const insuranceTypes = [
  { 
    name: 'Term Insurance', 
    description: 'Pure life cover with no maturity benefits',
    features: ['High coverage at low premium', 'No maturity benefits', 'Best for family protection']
  },
  { 
    name: 'Endowment Plan', 
    description: 'Life cover with savings component',
    features: ['Life cover + savings', 'Maturity benefits', 'Regular income options']
  },
  { 
    name: 'ULIP', 
    description: 'Life cover with investment component',
    features: ['Life cover + investment', 'Market-linked returns', 'Flexible premium payment']
  },
  { 
    name: 'Whole Life', 
    description: 'Life cover for entire lifetime',
    features: ['Lifetime coverage', 'Cash value accumulation', 'Premium payment for limited period']
  }
]

// Add these new types and constants after the existing insuranceTypes array
const healthConditions = [
  { name: 'Excellent', multiplier: 1.0, description: 'No health issues, regular exercise' },
  { name: 'Good', multiplier: 1.1, description: 'Minor health issues, occasional medication' },
  { name: 'Average', multiplier: 1.3, description: 'Chronic conditions, regular medication' },
  { name: 'Poor', multiplier: 1.5, description: 'Major health issues, frequent medical care' }
]

const premiumPaymentOptions = [
  { name: 'Monthly', frequency: 12 },
  { name: 'Quarterly', frequency: 4 },
  { name: 'Half Yearly', frequency: 2 },
  { name: 'Yearly', frequency: 1 }
]

const riders = [
  { 
    name: 'Critical Illness', 
    cost: 0.0002, 
    description: 'Coverage for major illnesses',
    features: ['Cancer', 'Heart Attack', 'Stroke', 'Kidney Failure']
  },
  { 
    name: 'Accidental Death', 
    cost: 0.0001, 
    description: 'Additional coverage for accidental death',
    features: ['Double benefit', 'Permanent disability', 'Temporary disability']
  },
  { 
    name: 'Waiver of Premium', 
    cost: 0.00015, 
    description: 'Premium waiver during disability',
    features: ['Total disability', 'Critical illness', 'Job loss']
  },
  { 
    name: 'Income Benefit', 
    cost: 0.00025, 
    description: 'Regular income after claim',
    features: ['Monthly payout', '5-10 years duration', 'Family protection']
  }
]

export default function InsuranceCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [age, setAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [annualIncome, setAnnualIncome] = useState(1000000)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [dependents, setDependents] = useState(2)
  const [liabilities, setLiabilities] = useState(5000000)
  const [selectedInsurance, setSelectedInsurance] = useState(insuranceTypes[0])
  const [results, setResults] = useState({
    recommendedCover: 14500000,
    monthlyPremium: 2610,
    totalPremium: 940000,
    coverageMultiple: 14.5,
    taxBenefits: {
      section80C: 31320,
      section80D: 25000
    },
    ridersCost: 0
  })

  // Add these new state variables after the existing useState declarations
  const [healthCondition, setHealthCondition] = useState(healthConditions[0])
  const [premiumPayment, setPremiumPayment] = useState(premiumPaymentOptions[0])
  const [selectedRiders, setSelectedRiders] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  // Handle input changes with proper validation
  const handleAgeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setAge(parseInt(cleanValue, 10))
    } else {
      setAge(value)
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

  const handleAnnualIncomeChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setAnnualIncome(parseInt(cleanValue, 10))
    } else {
      setAnnualIncome(value)
    }
  }

  const handleCurrentSavingsChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setCurrentSavings(parseInt(cleanValue, 10))
    } else {
      setCurrentSavings(value)
    }
  }

  const handleDependentsChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setDependents(parseInt(cleanValue, 10))
    } else {
      setDependents(value)
    }
  }

  const handleLiabilitiesChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setLiabilities(parseInt(cleanValue, 10))
    } else {
      setLiabilities(value)
    }
  }

  // Calculate insurance needs
  useEffect(() => {
    const calculateInsurance = () => {
      // Ensure values are proper numbers
      const currentAge = Number(age) || 0
      const plannedRetirementAge = Number(retirementAge) || 0
      const income = Number(annualIncome) || 0
      const savings = Number(currentSavings) || 0
      const dependentCount = Number(dependents) || 0
      const liabilityAmount = Number(liabilities) || 0
      
      if (currentAge >= plannedRetirementAge || income <= 0) {
        return
      }
      
      // Calculate human life value (HLV)
      const yearsToRetirement = plannedRetirementAge - currentAge
      const futureIncome = income * yearsToRetirement
      
      // Calculate total financial needs
      const totalNeeds = (futureIncome * 0.7) + liabilityAmount - savings
      
      // Calculate recommended coverage
      const recommendedCover = Math.max(
        totalNeeds,
        income * 10, // 10 times annual income
        liabilityAmount * 1.5  // 1.5 times liabilities
      )

      // Calculate premium based on age and coverage
      const basePremiumRate = 0.0005 // Base premium rate per 1000
      const ageFactor = 1 + (currentAge - 30) * 0.02 // Premium increases with age
      const monthlyPremium = (recommendedCover * basePremiumRate * ageFactor) / 12
      const totalPremium = monthlyPremium * 12 * yearsToRetirement

      // Apply health condition multiplier
      const healthAdjustedPremium = monthlyPremium * healthCondition.multiplier

      // Calculate riders cost
      const ridersCost = selectedRiders.reduce((total, riderName) => {
        const rider = riders.find(r => r.name === riderName)
        return total + (rider ? recommendedCover * rider.cost : 0)
      }, 0)

      // Calculate tax benefits
      const taxBenefits = {
        section80C: Math.min(healthAdjustedPremium * 12, 150000),
        section80D: Math.min(25000, healthAdjustedPremium * 12)
      }

      setResults({
        recommendedCover,
        monthlyPremium: healthAdjustedPremium + ridersCost,
        totalPremium: (healthAdjustedPremium + ridersCost) * 12 * yearsToRetirement,
        coverageMultiple: recommendedCover / income,
        taxBenefits,
        ridersCost
      })
    }

    calculateInsurance()
  }, [age, retirementAge, annualIncome, currentSavings, liabilities, healthCondition, premiumPayment, selectedRiders])

  // Handle insurance type selection
  const handleInsuranceSelect = (insurance: typeof insuranceTypes[0]) => {
    setSelectedInsurance(insurance)
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
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Life Insurance Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Calculate your ideal life insurance coverage and premium
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
              {/* Insurance Type Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Insurance Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {insuranceTypes.map((insurance) => (
                    <button
                      key={insurance.name}
                      onClick={() => handleInsuranceSelect(insurance)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        selectedInsurance.name === insurance.name
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{insurance.name}</span>
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {selectedInsurance.description}
                </p>
                <ul className={`mt-2 space-y-1 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {selectedInsurance.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Age */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Current Age
                  </label>
                  <input
                    type="text"
                    value={age === 0 ? '' : age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'light' 
                        ? 'border-gray-200 focus:border-blue-500' 
                        : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    placeholder="0"
                  />
                  <input 
                    type="range" 
                    min="18" 
                    max="65" 
                    value={age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm mt-1">
                    <span>18 years</span>
                    <span>65 years</span>
                  </div>
                </div>

                {/* Retirement Age */}
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
                {/* Annual Income */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Annual Income
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={annualIncome === 0 ? '' : annualIncome}
                      onChange={(e) => handleAnnualIncomeChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Current Savings */}
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
                      onChange={(e) => handleCurrentSavingsChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Number of Dependents */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Number of Dependents
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={dependents === 0 ? '' : dependents}
                      onChange={(e) => handleDependentsChange(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="0"
                    />
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </div>

                {/* Liabilities */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    Total Liabilities (Loans, etc.)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={liabilities === 0 ? '' : liabilities}
                      onChange={(e) => handleLiabilitiesChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 focus:border-blue-500' 
                          : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                      } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Health Assessment */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Health Condition
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {healthConditions.map((condition) => (
                    <button
                      key={condition.name}
                      onClick={() => setHealthCondition(condition)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        healthCondition.name === condition.name
                          ? 'bg-green-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{condition.name}</span>
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {healthCondition.description}
                </p>
              </div>

              {/* Premium Payment Options */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Payment Frequency
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {premiumPaymentOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setPremiumPayment(option)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        premiumPayment.name === option.name
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Riders Section */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${
                theme === 'light' 
                  ? 'from-gray-50 to-white border border-gray-200' 
                  : 'from-gray-800/50 to-gray-900/50 border border-gray-700'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      <h3 className={`text-lg sm:text-xl font-bold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Additional Riders
                      </h3>
                    </div>
                    <p className={`text-xs sm:text-sm mt-1 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Select additional coverage options
                    </p>
                  </div>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className={`shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200 ${
                      showComparison
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : theme === 'light'
                          ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm'
                          : 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                    {showComparison ? 'Hide Comparison' : 'Compare Plans'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {riders.map((rider) => (
                    <div
                      key={rider.name}
                      className={`group relative p-3 sm:p-5 rounded-lg sm:rounded-xl transition-all duration-200 ${
                        selectedRiders.includes(rider.name)
                          ? theme === 'light'
                            ? 'bg-blue-50/80 border-2 border-blue-200 shadow-lg shadow-blue-500/10'
                            : 'bg-blue-900/20 border-2 border-blue-500/50'
                          : theme === 'light'
                            ? 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                            : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1 sm:mb-2">
                            <h4 className={`text-base sm:text-lg font-semibold ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>
                              {rider.name}
                            </h4>
                            <span className={`shrink-0 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                              selectedRiders.includes(rider.name)
                                ? 'bg-blue-500 text-white'
                                : theme === 'light'
                                  ? 'bg-gray-100 text-gray-600'
                                  : 'bg-gray-700 text-gray-300'
                            }`}>
                              {selectedRiders.includes(rider.name) ? 'Selected' : 'Optional'}
                            </span>
                          </div>
                          <p className={`text-xs sm:text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {rider.description}
                          </p>
                        </div>

                        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 flex-grow">
                          {rider.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                              <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 ${
                                selectedRiders.includes(rider.name)
                                  ? 'text-blue-500'
                                  : theme === 'light'
                                    ? 'text-gray-400'
                                    : 'text-gray-500'
                              }`} />
                              <span className={`text-xs sm:text-sm ${
                                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => {
                            setSelectedRiders(prev => 
                              prev.includes(rider.name)
                                ? prev.filter(r => r !== rider.name)
                                : [...prev, rider.name]
                            )
                          }}
                          className={`w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedRiders.includes(rider.name)
                              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25'
                              : theme === 'light'
                                ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 group-hover:border-gray-300'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                          }`}
                        >
                          {selectedRiders.includes(rider.name) ? (
                            <span className="flex items-center justify-center gap-1 sm:gap-2">
                              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              Selected
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1 sm:gap-2">
                              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                              Add Coverage
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Riders Summary */}
                {selectedRiders.length > 0 && (
                  <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200'
                      : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-800/30'
                  }`}>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        theme === 'light' ? 'text-blue-500' : 'text-blue-400'
                      }`} />
                      <h4 className={`text-sm sm:text-base font-medium ${
                        theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                      }`}>
                        Selected Coverage Options ({selectedRiders.length})
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedRiders.map((riderName) => (
                        <div
                          key={riderName}
                          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm ${
                            theme === 'light'
                              ? 'bg-white text-blue-700 border border-blue-200 shadow-sm'
                              : 'bg-blue-900/30 text-blue-300 border border-blue-700'
                          }`}
                        >
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                          {riderName}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                  Insurance Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Your recommended coverage and premium details
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
                  Recommended Coverage
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                }`}>
                  ₹{formatIndianCurrency(results.recommendedCover || 0)}
                </p>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  {results.coverageMultiple.toFixed(1)}x of annual income
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
                    Monthly Premium
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.monthlyPremium || 0)}
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
                    Total Premium
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-orange-700' : 'text-orange-200'
                  }`}>
                    ₹{formatIndianCurrency(results.totalPremium || 0)}
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
                    Coverage Period
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-purple-700' : 'text-purple-200'
                  }`}>
                    {retirementAge - age} years
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-yellow-50' 
                    : 'bg-yellow-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-yellow-600' : 'text-yellow-300'
                  }`}>
                    Dependents
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-yellow-700' : 'text-yellow-200'
                  }`}>
                    {dependents} persons
                  </p>
                </div>
              </div>
            </div>

            {/* Insurance Tips */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                Insurance Tips
              </h3>
              <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Buy insurance when you're young and healthy</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Consider riders for additional coverage</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Review your coverage periodically</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Disclose all health conditions honestly</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Choose a reputable insurance provider</span>
                </li>
              </ul>
            </div>

            {/* Start Insurance Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/contact')}
              className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Insurance Process
            </motion.button>

            {/* Insurance Comparison */}
            {showComparison && (
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                theme === 'light' 
                  ? 'bg-white shadow-lg' 
                  : 'bg-gray-800/50 backdrop-blur-sm'
              }`}>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Insurance Type Comparison
                </h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[640px] px-4 sm:px-0 sm:min-w-full">
                    <table className="w-full">
                      <thead>
                        <tr className={`${
                          theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                        }`}>
                          <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Type</th>
                          <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Coverage</th>
                          <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Premium</th>
                          <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        {insuranceTypes.map((type) => {
                          const basePremium = results.monthlyPremium * (type.name === 'Term Insurance' ? 1 : 1.5)
                          return (
                            <tr key={type.name} className={`${
                              theme === 'light' ? 'border-b' : 'border-b border-gray-700'
                            }`}>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{type.name}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">₹{formatIndianCurrency(results.recommendedCover || 0)}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">₹{formatIndianCurrency(basePremium || 0)}/month</td>
                              <td className="p-2 sm:p-3">
                                <ul className="space-y-1">
                                  {type.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tax Benefits Section */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                <Percent className="w-4 h-4 sm:w-5 sm:h-5" />
                Tax Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-green-50' 
                    : 'bg-green-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-300'
                  }`}>
                    Section 80C
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-green-700' : 'text-green-200'
                  }`}>
                    ₹{formatIndianCurrency(results.taxBenefits.section80C || 0)}
                  </p>
                  <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                    theme === 'light' ? 'text-green-600' : 'text-green-300'
                  }`}>
                    Maximum deduction per year
                  </p>
                </div>
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  theme === 'light' 
                    ? 'bg-blue-50' 
                    : 'bg-blue-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                  }`}>
                    Section 80D
                  </p>
                  <p className={`text-base sm:text-xl md:text-2xl font-bold ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                  }`}>
                    ₹{formatIndianCurrency(results.taxBenefits.section80D || 0)}
                  </p>
                  <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                  }`}>
                    Health insurance premium deduction
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 