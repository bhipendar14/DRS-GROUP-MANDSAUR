"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Plane, TrendingUp, IndianRupee, Lightbulb, Calendar, Shield, Globe, CheckCircle2, XCircle, Info } from "lucide-react"
import { formatIndianCurrency } from "@/lib/utils"

// Define destination type
type Destination = {
  name: string
  cost: number
  currency: string
  rate?: number
  peakSeason: string
  offSeason: string
  description: string
}

// Vacation destinations with typical costs and seasonal information
const destinations: Destination[] = [
  { 
    name: 'Domestic Trip', 
    cost: 100000, 
    currency: 'INR',
    peakSeason: 'Oct-Mar',
    offSeason: 'Apr-Sep',
    description: 'Explore India\'s diverse landscapes and cultures'
  },
  { 
    name: 'South East Asia', 
    cost: 200000, 
    currency: 'INR',
    peakSeason: 'Nov-Feb',
    offSeason: 'Jun-Sep',
    description: 'Experience tropical beaches and rich heritage'
  },
  { 
    name: 'Europe', 
    cost: 400000, 
    currency: 'EUR', 
    rate: 90,
    peakSeason: 'Jun-Aug',
    offSeason: 'Nov-Mar',
    description: 'Discover historic cities and scenic landscapes'
  },
  { 
    name: 'USA/Canada', 
    cost: 600000, 
    currency: 'USD', 
    rate: 83,
    peakSeason: 'Jun-Aug',
    offSeason: 'Dec-Feb',
    description: 'Explore iconic cities and natural wonders'
  },
  { 
    name: 'Luxury International', 
    cost: 1000000, 
    currency: 'USD', 
    rate: 83,
    peakSeason: 'Dec-Jan',
    offSeason: 'May-Sep',
    description: 'Indulge in premium travel experiences'
  }
]

// Seasonal variations with detailed information
const seasons = [
  { 
    name: 'Peak Season', 
    multiplier: 1.3,
    description: 'Best weather, highest prices, most crowded',
    icon: '☀️'
  },
  { 
    name: 'Normal Season', 
    multiplier: 1,
    description: 'Good weather, moderate prices, fewer crowds',
    icon: '🌤️'
  },
  { 
    name: 'Off Season', 
    multiplier: 0.7,
    description: 'Lower prices, fewer tourists, possible weather challenges',
    icon: '🌧️'
  }
]

// Travel checklist items with categories
const checklistItems = [
  { 
    category: 'Essential Documents',
    items: [
      { id: 'passport', label: 'Valid Passport', required: true },
      { id: 'visa', label: 'Visa', required: true },
      { id: 'insurance', label: 'Travel Insurance', required: true }
    ]
  },
  {
    category: 'Travel Arrangements',
    items: [
      { id: 'hotel', label: 'Hotel Bookings', required: true },
      { id: 'flights', label: 'Flight Tickets', required: true },
      { id: 'currency', label: 'Foreign Currency', required: true }
    ]
  },
  {
    category: 'Travel Essentials',
    items: [
      { id: 'medicines', label: 'Essential Medicines', required: false },
      { id: 'adapter', label: 'Power Adapter', required: false },
      { id: 'sim', label: 'International SIM', required: false }
    ]
  }
]

// Add exchange rates
const exchangeRates = {
  USD: 83.5,
  EUR: 90.2,
  GBP: 105.8,
  AUD: 54.3,
  SGD: 61.8,
  JPY: 0.56,
  AED: 22.7,
  THB: 2.3,
  MYR: 17.6,
  IDR: 0.0053
}

export default function VacationCalculatorPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [tripCost, setTripCost] = useState(200000) // 2 Lakhs
  const [monthsToTrip, setMonthsToTrip] = useState(12)
  const [expectedReturn, setExpectedReturn] = useState(8)
  const [selectedSeason, setSelectedSeason] = useState('normal')
  const [insuranceCost, setInsuranceCost] = useState(0)
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[0])
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [results, setResults] = useState({
    monthlyInvestmentNeeded: 16389,
    totalInvestment: 196668,
    totalReturns: 63332,
    expenseBreakdown: {
      flights: 78000,
      accommodation: 78000,
      food: 52000,
      activities: 26000,
      shopping: 13000,
      miscellaneous: 13000
    }
  })

  // Calculate vacation planning
  useEffect(() => {
    const calculateVacationPlan = () => {
      // Ensure values are proper numbers
      const cost = Number(tripCost) || 0
      const months = Number(monthsToTrip) || 0
      const returnRate = Number(expectedReturn) || 0
      
      if (cost <= 0 || months <= 0 || returnRate <= 0) {
        return
      }
      
      // Get current season multiplier
      const currentSeason = seasons.find(s => s.name.toLowerCase() === selectedSeason)
      const seasonMultiplier = currentSeason?.multiplier || 1

      // Calculate adjusted trip cost based on season
      const adjustedTripCost = cost * seasonMultiplier

      // Calculate monthly investment needed
      const monthlyRate = returnRate / 12 / 100
      
      let monthlyInvestmentNeeded = 0;
      if (monthlyRate > 0 && months > 0) {
        monthlyInvestmentNeeded = adjustedTripCost / 
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate))
      }

      const totalInvestment = monthlyInvestmentNeeded * months
      const totalReturns = adjustedTripCost - totalInvestment

      // Calculate expense breakdown
      const isInternational = selectedDestination.currency !== 'INR'
      const baseCost = adjustedTripCost / (isInternational ? (selectedDestination.rate || 1) : 1)

      const expenseBreakdown = {
        flights: Math.round(baseCost * 0.3),
        accommodation: Math.round(baseCost * 0.3),
        food: Math.round(baseCost * 0.2),
        activities: Math.round(baseCost * 0.1),
        shopping: Math.round(baseCost * 0.05),
        miscellaneous: Math.round(baseCost * 0.05)
      }

      // Calculate insurance cost (approximately 1% of trip cost)
      const insuranceCost = Math.round(adjustedTripCost * 0.01)

      // Calculate currency conversion
      const exchangeRate = isInternational ? exchangeRates[selectedDestination.currency as keyof typeof exchangeRates] || 1 : 1
      const convertedAmount = isInternational 
        ? cost / exchangeRate
        : cost

      setResults({
        monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
        totalInvestment,
        totalReturns,
        expenseBreakdown
      })
      setInsuranceCost(insuranceCost)
      setConvertedAmount(convertedAmount)
    }

    calculateVacationPlan()
  }, [tripCost, monthsToTrip, expectedReturn, selectedSeason, selectedDestination])

  // Handle input changes with proper validation
  const handleTripCostChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setTripCost(parseInt(cleanValue, 10))
    } else {
      setTripCost(value)
    }
  }

  const handleMonthsChange = (value: string | number) => {
    if (typeof value === 'string') {
      const cleanValue = value.replace(/^0+/, '') || '0'
      setMonthsToTrip(parseInt(cleanValue, 10))
    } else {
      setMonthsToTrip(value)
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

  // Handle destination selection
  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination)
    setTripCost(destination.cost)
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
            <Plane className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0" />
            <span>Dream Vacation Planning Calculator</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Plan and save for your dream vacation systematically
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
              {/* Destination Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Destination Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {destinations.map((destination) => (
                    <button
                      key={destination.name}
                      onClick={() => handleDestinationSelect(destination)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 ${
                        selectedDestination.name === destination.name
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <Plane className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{destination.name}</span>
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs sm:text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {selectedDestination.description}
                </p>
              </div>

              {/* Season Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 sm:mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Travel Season
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {seasons.map((season) => (
                    <button
                      key={season.name}
                      onClick={() => setSelectedSeason(season.name.toLowerCase())}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex flex-col items-center gap-1 ${
                        selectedSeason === season.name.toLowerCase()
                          ? 'bg-blue-500 text-white'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      } transition-all duration-200`}
                    >
                      <span className="text-base sm:text-lg">{season.icon}</span>
                      {season.name}
                      <span className={`text-xs hidden sm:block ${
                        selectedSeason === season.name.toLowerCase()
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}>
                        {season.description}
                      </span>
                    </button>
                  ))}
                </div>
                <div className={`mt-2 p-2 sm:p-3 rounded-lg ${
                  theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                }`}>
                  <p className={`text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {selectedDestination.name} peak season: {selectedDestination.peakSeason}
                  </p>
                </div>
              </div>

              {/* Currency Converter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Currency Converter
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <div className="w-full flex-1">
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={tripCost === 0 ? '' : tripCost}
                        onChange={(e) => handleTripCostChange(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          theme === 'light' 
                            ? 'border-gray-200 focus:border-blue-500' 
                            : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                        } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs sm:text-sm mt-1 text-gray-500">INR (Indian Rupee)</p>
                  </div>
                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={convertedAmount.toFixed(2)}
                      readOnly
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'light' 
                          ? 'border-gray-200 bg-gray-50' 
                          : 'border-gray-600 bg-gray-700'
                      }`}
                    />
                    <p className="text-xs sm:text-sm mt-1 text-gray-500">
                      {selectedDestination.currency} ({selectedDestination.currency === 'USD' ? 'US Dollar' : 
                        selectedDestination.currency === 'EUR' ? 'Euro' :
                        selectedDestination.currency === 'GBP' ? 'British Pound' :
                        selectedDestination.currency === 'AUD' ? 'Australian Dollar' :
                        selectedDestination.currency === 'SGD' ? 'Singapore Dollar' :
                        selectedDestination.currency === 'JPY' ? 'Japanese Yen' :
                        selectedDestination.currency === 'AED' ? 'UAE Dirham' :
                        selectedDestination.currency === 'THB' ? 'Thai Baht' :
                        selectedDestination.currency === 'MYR' ? 'Malaysian Ringgit' :
                        selectedDestination.currency === 'IDR' ? 'Indonesian Rupiah' : 'Currency'})
                    </p>
                  </div>
                </div>
                <div className={`mt-2 p-2 rounded-lg text-sm ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
                }`}>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                    Exchange rate: 1 {selectedDestination.currency} = {exchangeRates[selectedDestination.currency as keyof typeof exchangeRates] || 1} INR
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Months to Trip
                </label>
                <input
                  type="text"
                  value={monthsToTrip === 0 ? '' : monthsToTrip}
                  onChange={(e) => handleMonthsChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-gray-200 focus:border-blue-500' 
                      : 'border-gray-600 focus:border-blue-400 bg-gray-700'
                  } focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                  placeholder="0"
                />
                <input 
                  type="range" 
                  min="3" 
                  max="60" 
                  value={monthsToTrip}
                  onChange={(e) => handleMonthsChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span>3 months</span>
                  <span>5 years</span>
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
                  min="4" 
                  max="12" 
                  step="0.5" 
                  value={expectedReturn}
                  onChange={(e) => handleReturnChange(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span>4%</span>
                  <span>12%</span>
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
                  Vacation Planning Summary
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Here's what you need to save for your dream vacation
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
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                }`}>
                  for {monthsToTrip} months
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

            {/* Expense Breakdown */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Expense Breakdown
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(results.expenseBreakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className={`capitalize text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {category}
                    </span>
                    <span className={`font-medium text-sm sm:text-base ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      ₹{formatIndianCurrency(amount || 0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Insurance */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <h3 className={`text-lg sm:text-xl font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Travel Insurance
                </h3>
              </div>
              <p className={`mb-3 sm:mb-4 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Recommended insurance cost for your trip:
              </p>
              <p className={`text-xl sm:text-2xl font-bold ${
                theme === 'light' ? 'text-blue-600' : 'text-blue-400'
              }`}>
                ₹{formatIndianCurrency(insuranceCost || 0)}
              </p>
            </div>

            {/* Travel Checklist */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              theme === 'light' 
                ? 'bg-white shadow-lg' 
                : 'bg-gray-800/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Travel Checklist
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {checklistItems.map((category) => (
                  <div key={category.category}>
                    <h4 className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {category.category}
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                          {item.required ? (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          )}
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
              Start Vacation Planning
            </motion.button>
          </motion.div>
        </div>

        {/* Vacation Planning Tips */}
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
              Vacation Planning Tips
            </h3>
            <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Start planning early to spread out your savings</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider seasonal variations in travel costs</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Look for travel deals and discounts</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Include buffer for unexpected expenses</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Consider travel insurance for international trips</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
} 