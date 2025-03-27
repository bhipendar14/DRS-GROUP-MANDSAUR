"use client"

import { useState, useEffect } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/context/theme-context'
import { Calculator, PieChart, DollarSign, Landmark, TrendingUp, LineChart, BarChart3, RefreshCw, PiggyBank } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

export default function CalculatorsPage() {
  const { theme } = useTheme()
  const [activeCalculator, setActiveCalculator] = useState('emi')
  
  // EMI Calculator State
  const [emiData, setEmiData] = useState({
    loanAmount: 1000000,
    interestRate: 8.5,
    loanTenure: 20,
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  })
  
  // SIP Calculator State
  const [sipData, setSipData] = useState({
    monthlyInvestment: 10000,
    expectedReturn: 12,
    timePeriod: 10,
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0
  })
  
  // Lumpsum Calculator State
  const [lumpsumData, setLumpsumData] = useState({
    investmentAmount: 100000,
    expectedReturn: 12,
    timePeriod: 10,
    totalValue: 0,
    estimatedReturns: 0
  })
  
  // Tax Calculator State
  const [taxData, setTaxData] = useState({
    income: 1000000,
    age: 'below60',
    regime: 'new',
    deductions: 150000,
    tax: 0,
    effectiveRate: 0
  })
  
  // FD Calculator State
  const [fdData, setFdData] = useState({
    principal: 100000,
    interestRate: 6.5,
    timePeriod: 5,
    compoundingFrequency: 'quarterly',
    maturityAmount: 0,
    totalInterest: 0
  })
  
  // PPF Calculator State
  const [ppfData, setPpfData] = useState({
    yearlyInvestment: 150000,
    timePeriod: 15,
    totalInvestment: 0,
    totalInterest: 0,
    maturityAmount: 0
  })
  
  // Calculate EMI
  useEffect(() => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = emiData.interestRate / (12 * 100)
    const tenure = emiData.loanTenure * 12
    
    // Calculate EMI
    const emi = emiData.loanAmount * monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, tenure) / 
      (Math.pow(1 + monthlyInterestRate, tenure) - 1)
    
    const totalPayment = emi * tenure
    const totalInterest = totalPayment - emiData.loanAmount
    
    setEmiData(prev => ({
      ...prev,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    }))
  }, [emiData.loanAmount, emiData.interestRate, emiData.loanTenure])
  
  // Calculate SIP returns
  useEffect(() => {
    const monthlyRate = sipData.expectedReturn / 12 / 100
    const months = sipData.timePeriod * 12
    
    // Formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
    const totalValue = sipData.monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate)
    
    const totalInvestment = sipData.monthlyInvestment * months
    const estimatedReturns = totalValue - totalInvestment
    
    setSipData(prev => ({
      ...prev,
      totalInvestment,
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue)
    }))
  }, [sipData.monthlyInvestment, sipData.expectedReturn, sipData.timePeriod])
  
  // Calculate Lumpsum returns
  useEffect(() => {
    // Formula: P(1 + r)^t
    const totalValue = lumpsumData.investmentAmount * 
      Math.pow(1 + (lumpsumData.expectedReturn / 100), lumpsumData.timePeriod)
    
    const estimatedReturns = totalValue - lumpsumData.investmentAmount
    
    setLumpsumData(prev => ({
      ...prev,
      totalValue: Math.round(totalValue),
      estimatedReturns: Math.round(estimatedReturns)
    }))
  }, [lumpsumData.investmentAmount, lumpsumData.expectedReturn, lumpsumData.timePeriod])
  
  // Calculate Income Tax (simplified)
  useEffect(() => {
    let taxAmount = 0
    const taxableIncome = taxData.regime === 'old' 
      ? Math.max(0, taxData.income - taxData.deductions)
      : taxData.income
    
    // Simplified tax calculation (new regime 2023-24)
    if (taxData.regime === 'new') {
      if (taxableIncome <= 300000) {
        taxAmount = 0
      } else if (taxableIncome <= 600000) {
        taxAmount = (taxableIncome - 300000) * 0.05
      } else if (taxableIncome <= 900000) {
        taxAmount = 15000 + (taxableIncome - 600000) * 0.1
      } else if (taxableIncome <= 1200000) {
        taxAmount = 45000 + (taxableIncome - 900000) * 0.15
      } else if (taxableIncome <= 1500000) {
        taxAmount = 90000 + (taxableIncome - 1200000) * 0.2
      } else {
        taxAmount = 150000 + (taxableIncome - 1500000) * 0.3
      }
    } else {
      // Old regime (with age consideration)
      let exemptionLimit = 250000
      if (taxData.age === 'between60and80') exemptionLimit = 300000
      if (taxData.age === 'above80') exemptionLimit = 500000
      
      if (taxableIncome <= exemptionLimit) {
        taxAmount = 0
      } else if (taxableIncome <= 500000) {
        taxAmount = (taxableIncome - exemptionLimit) * 0.05
      } else if (taxableIncome <= 1000000) {
        taxAmount = (500000 - exemptionLimit) * 0.05 + (taxableIncome - 500000) * 0.2
      } else {
        taxAmount = (500000 - exemptionLimit) * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3
      }
    }
    
    // Add 4% cess
    taxAmount = taxAmount * 1.04
    
    setTaxData(prev => ({
      ...prev,
      tax: Math.round(taxAmount),
      effectiveRate: taxAmount > 0 ? Math.round((taxAmount / taxData.income) * 10000) / 100 : 0
    }))
  }, [taxData.income, taxData.age, taxData.regime, taxData.deductions])
  
  // Calculate FD returns
  useEffect(() => {
    let n = 1 // compounding frequency
    if (fdData.compoundingFrequency === 'quarterly') n = 4
    else if (fdData.compoundingFrequency === 'monthly') n = 12
    else if (fdData.compoundingFrequency === 'daily') n = 365
    
    // A = P(1 + r/n)^(nt)
    const maturityAmount = fdData.principal * 
      Math.pow(1 + (fdData.interestRate / 100) / n, n * fdData.timePeriod)
    
    const totalInterest = maturityAmount - fdData.principal
    
    setFdData(prev => ({
      ...prev,
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest)
    }))
  }, [fdData.principal, fdData.interestRate, fdData.timePeriod, fdData.compoundingFrequency])
  
  // Calculate PPF returns
  useEffect(() => {
    let totalAmount = 0
    let totalInterest = 0
    let yearlyInvestment = ppfData.yearlyInvestment
    
    for (let year = 1; year <= ppfData.timePeriod; year++) {
      // Opening balance for the year
      const openingBalance = totalAmount
      
      // Interest earned for the year (PPF current rate is 7.1%)
      const interestEarned = (openingBalance + yearlyInvestment) * 0.071
      
      // Total balance at the end of the year
      totalAmount = openingBalance + yearlyInvestment + interestEarned
      
      // Add to total interest
      totalInterest += interestEarned
    }
    
    setPpfData(prev => ({
      ...prev,
      totalInvestment: yearlyInvestment * ppfData.timePeriod,
      maturityAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    }))
  }, [ppfData.yearlyInvestment, ppfData.timePeriod])
  
  // Common CSS class variables to use throughout the component
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800'
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700'
  const inputBgColor = theme === 'light' ? 'bg-white' : 'bg-gray-700'
  const resultsBg = theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
  
  // Prepare chart data based on theme
  const lineColors = {
    investment: theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.7)',
    returns: theme === 'light' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.7)'
  }
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className={`py-14 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
          : 'bg-gradient-to-r from-purple-900 to-blue-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Plan your financial future with our suite of calculators. Make informed decisions about loans, investments, taxes, and more.
          </p>
        </div>
      </section>
      
      {/* Calculator Selection */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { id: 'emi', name: 'EMI Calculator', icon: <Calculator /> },
              { id: 'sip', name: 'SIP Calculator', icon: <TrendingUp /> },
              { id: 'lumpsum', name: 'Lumpsum', icon: <PiggyBank /> },
              { id: 'tax', name: 'Income Tax', icon: <DollarSign /> },
              { id: 'fd', name: 'Fixed Deposit', icon: <Landmark /> },
              { id: 'ppf', name: 'PPF Calculator', icon: <RefreshCw /> }
            ].map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`p-4 rounded-lg transition-all flex flex-col items-center justify-center ${
                  activeCalculator === calc.id
                    ? theme === 'light'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-800 text-white shadow-lg'
                    : theme === 'light'
                      ? 'bg-white hover:bg-gray-100 text-gray-800 shadow-sm'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-100 shadow-sm'
                } border ${borderColor}`}
              >
                <div className="mb-2">
                  {calc.icon}
                </div>
                <span className="text-sm font-medium">{calc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Calculator Content */}
      <section className="py-8 px-4 mb-12">
        <div className="container mx-auto">
          <div className={`p-6 rounded-xl ${cardBg} border ${borderColor} shadow-sm`}>
            {/* EMI Calculator */}
            {activeCalculator === 'emi' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Calculator className="mr-2" /> EMI Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Calculate your Equated Monthly Installment (EMI) based on loan amount, interest rate, and loan tenure.
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={emiData.loanAmount}
                      onChange={(e) => setEmiData({...emiData, loanAmount: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="50000" 
                      max="10000000" 
                      step="10000" 
                      value={emiData.loanAmount}
                      onChange={(e) => setEmiData({...emiData, loanAmount: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (% p.a)</label>
                    <input
                      type="number"
                      value={emiData.interestRate}
                      step="0.1"
                      onChange={(e) => setEmiData({...emiData, interestRate: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      step="0.1" 
                      value={emiData.interestRate}
                      onChange={(e) => setEmiData({...emiData, interestRate: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Tenure (years)</label>
                    <input
                      type="number"
                      value={emiData.loanTenure}
                      onChange={(e) => setEmiData({...emiData, loanTenure: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={emiData.loanTenure}
                      onChange={(e) => setEmiData({...emiData, loanTenure: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your Monthly EMI</p>
                    <h3 className="text-3xl font-bold my-1">₹ {emiData.emi.toLocaleString()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Interest Payable</p>
                      <p className="font-semibold text-xl mt-1">₹ {emiData.totalInterest.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Payment</p>
                      <p className="font-semibold text-xl mt-1">₹ {emiData.totalPayment.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Pie
                        data={{
                          labels: ['Principal', 'Interest'],
                          datasets: [
                            {
                              data: [emiData.loanAmount, emiData.totalInterest],
                              backgroundColor: [
                                theme === 'light' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.8)',
                                theme === 'light' ? 'rgba(147, 51, 234, 0.7)' : 'rgba(147, 51, 234, 0.8)',
                              ],
                              borderColor: [
                                theme === 'light' ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 1)',
                                theme === 'light' ? 'rgba(147, 51, 234, 1)' : 'rgba(147, 51, 234, 1)',
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: theme === 'light' ? '#4b5563' : '#e5e7eb'
                              }
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  let label = context.label || '';
                                  if (label) {
                                    label += ': ';
                                  }
                                  if (context.parsed !== undefined) {
                                    label += '₹' + context.parsed.toLocaleString();
                                  }
                                  return label;
                                }
                              }
                            }
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* SIP Calculator */}
            {activeCalculator === 'sip' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="mr-2" /> SIP Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Calculate the returns from your Systematic Investment Plan (SIP) based on monthly investment, expected rate of return, and time period.
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Investment (₹)</label>
                    <input
                      type="number"
                      value={sipData.monthlyInvestment}
                      onChange={(e) => setSipData({...sipData, monthlyInvestment: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="500" 
                      max="100000" 
                      step="500" 
                      value={sipData.monthlyInvestment}
                      onChange={(e) => setSipData({...sipData, monthlyInvestment: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Return Rate (% p.a)</label>
                    <input
                      type="number"
                      value={sipData.expectedReturn}
                      step="0.1"
                      onChange={(e) => setSipData({...sipData, expectedReturn: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="0.1" 
                      value={sipData.expectedReturn}
                      onChange={(e) => setSipData({...sipData, expectedReturn: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period (years)</label>
                    <input
                      type="number"
                      value={sipData.timePeriod}
                      onChange={(e) => setSipData({...sipData, timePeriod: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      value={sipData.timePeriod}
                      onChange={(e) => setSipData({...sipData, timePeriod: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expected Future Value</p>
                    <h3 className="text-3xl font-bold my-1">₹ {sipData.totalValue.toLocaleString()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount Invested</p>
                      <p className="font-semibold text-xl mt-1">₹ {sipData.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-green-50 dark:bg-green-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Returns</p>
                      <p className="font-semibold text-xl mt-1">₹ {sipData.estimatedReturns.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {/* SIP Growth Chart */}
                    <Line
                      data={{
                        labels: Array.from({ length: sipData.timePeriod }, (_, i) => i + 1),
                        datasets: [
                          {
                            label: 'Invested Amount',
                            data: Array.from(
                              { length: sipData.timePeriod }, 
                              (_, i) => sipData.monthlyInvestment * 12 * (i + 1)
                            ),
                            borderColor: lineColors.investment,
                            backgroundColor: lineColors.investment,
                            borderWidth: 2,
                            fill: true,
                            tension: 0.1
                          },
                          {
                            label: 'Wealth Gained',
                            data: Array.from(
                              { length: sipData.timePeriod }, 
                              (_, i) => {
                                const months = (i + 1) * 12
                                const monthlyRate = sipData.expectedReturn / 12 / 100
                                return sipData.monthlyInvestment * 
                                ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
                              }
                            ),
                            borderColor: lineColors.returns,
                            backgroundColor: lineColors.returns,
                            borderWidth: 2,
                            fill: true,
                            tension: 0.1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: theme === 'light' ? '#4b5563' : '#e5e7eb'
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                  label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                  label += '₹' + context.parsed.y.toLocaleString();
                                }
                                return label;
                              }
                            }
                          }
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: 'Years',
                              color: theme === 'light' ? '#4b5563' : '#e5e7eb'
                            },
                            ticks: {
                              color: theme === 'light' ? '#4b5563' : '#e5e7eb'
                            },
                            grid: {
                              color: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
                            }
                          },
                          y: {
                            title: {
                              display: true,
                              text: 'Value (₹)',
                              color: theme === 'light' ? '#4b5563' : '#e5e7eb'
                            },
                            ticks: {
                              color: theme === 'light' ? '#4b5563' : '#e5e7eb',
                              callback: function(value) {
                                return '₹' + value.toLocaleString();
                              }
                            },
                            grid: {
                              color: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Lumpsum Calculator */}
            {activeCalculator === 'lumpsum' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <PiggyBank className="mr-2" /> Lumpsum Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Calculate the future value of your one-time investment based on expected rate of return and time period.
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Investment Amount (₹)</label>
                    <input
                      type="number"
                      value={lumpsumData.investmentAmount}
                      onChange={(e) => setLumpsumData({...lumpsumData, investmentAmount: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1000" 
                      max="10000000" 
                      step="1000" 
                      value={lumpsumData.investmentAmount}
                      onChange={(e) => setLumpsumData({...lumpsumData, investmentAmount: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Return Rate (% p.a)</label>
                    <input
                      type="number"
                      value={lumpsumData.expectedReturn}
                      step="0.1"
                      onChange={(e) => setLumpsumData({...lumpsumData, expectedReturn: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="0.1" 
                      value={lumpsumData.expectedReturn}
                      onChange={(e) => setLumpsumData({...lumpsumData, expectedReturn: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period (years)</label>
                    <input
                      type="number"
                      value={lumpsumData.timePeriod}
                      onChange={(e) => setLumpsumData({...lumpsumData, timePeriod: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      value={lumpsumData.timePeriod}
                      onChange={(e) => setLumpsumData({...lumpsumData, timePeriod: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expected Future Value</p>
                    <h3 className="text-3xl font-bold my-1">₹ {lumpsumData.totalValue.toLocaleString()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Investment Amount</p>
                      <p className="font-semibold text-xl mt-1">₹ {lumpsumData.investmentAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-green-50 dark:bg-green-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Returns</p>
                      <p className="font-semibold text-xl mt-1">₹ {lumpsumData.estimatedReturns.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                      Investing ₹{lumpsumData.investmentAmount.toLocaleString()} for {lumpsumData.timePeriod} years at {lumpsumData.expectedReturn}% can 
                      grow to ₹{lumpsumData.totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Income Tax Calculator */}
            {activeCalculator === 'tax' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <DollarSign className="mr-2" /> Income Tax Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Estimate your income tax liability based on your income, age, and tax regime (simplified calculation).
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Income (₹)</label>
                    <input
                      type="number"
                      value={taxData.income}
                      onChange={(e) => setTaxData({...taxData, income: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="300000" 
                      max="5000000" 
                      step="10000" 
                      value={taxData.income}
                      onChange={(e) => setTaxData({...taxData, income: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Age Group</label>
                    <select
                      value={taxData.age}
                      onChange={(e) => setTaxData({...taxData, age: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    >
                      <option value="below60">Below 60 years</option>
                      <option value="between60and80">60 to 80 years</option>
                      <option value="above80">Above 80 years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tax Regime</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="new"
                          checked={taxData.regime === 'new'}
                          onChange={() => setTaxData({...taxData, regime: 'new'})}
                          className="mr-2"
                        />
                        New Regime
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="old"
                          checked={taxData.regime === 'old'}
                          onChange={() => setTaxData({...taxData, regime: 'old'})}
                          className="mr-2"
                        />
                        Old Regime
                      </label>
                    </div>
                  </div>
                  
                  {taxData.regime === 'old' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Deductions & Exemptions (₹)</label>
                      <input
                        type="number"
                        value={taxData.deductions}
                        onChange={(e) => setTaxData({...taxData, deductions: Number(e.target.value)})}
                        className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max="500000" 
                        step="5000" 
                        value={taxData.deductions}
                        onChange={(e) => setTaxData({...taxData, deductions: Number(e.target.value)})}
                        className="w-full mt-2"
                      />
                    </div>
                  )}
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Tax Liability</p>
                    <h3 className="text-3xl font-bold my-1">₹ {taxData.tax.toLocaleString()}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Effective Tax Rate: {taxData.effectiveRate}%
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Fixed Deposit Calculator */}
            {activeCalculator === 'fd' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Landmark className="mr-2" /> Fixed Deposit Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Calculate maturity amount and interest earned on your fixed deposit investment.
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Principal Amount (₹)</label>
                    <input
                      type="number"
                      value={fdData.principal}
                      onChange={(e) => setFdData({...fdData, principal: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1000" 
                      max="5000000" 
                      step="1000" 
                      value={fdData.principal}
                      onChange={(e) => setFdData({...fdData, principal: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (% p.a)</label>
                    <input
                      type="number"
                      value={fdData.interestRate}
                      step="0.1"
                      onChange={(e) => setFdData({...fdData, interestRate: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      step="0.1" 
                      value={fdData.interestRate}
                      onChange={(e) => setFdData({...fdData, interestRate: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period (years)</label>
                    <input
                      type="number"
                      value={fdData.timePeriod}
                      onChange={(e) => setFdData({...fdData, timePeriod: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      value={fdData.timePeriod}
                      onChange={(e) => setFdData({...fdData, timePeriod: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Compounding Frequency</label>
                    <select
                      value={fdData.compoundingFrequency}
                      onChange={(e) => setFdData({...fdData, compoundingFrequency: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    >
                      <option value="annually">Annually</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Maturity Amount</p>
                    <h3 className="text-3xl font-bold my-1">₹ {fdData.maturityAmount.toLocaleString()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Principal Amount</p>
                      <p className="font-semibold text-xl mt-1">₹ {fdData.principal.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Interest</p>
                      <p className="font-semibold text-xl mt-1">₹ {fdData.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* PPF Calculator */}
            {activeCalculator === 'ppf' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <RefreshCw className="mr-2" /> PPF Calculator
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Calculate the maturity amount of your Public Provident Fund (PPF) investment.
                </p>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Yearly Investment (₹)</label>
                    <input
                      type="number"
                      value={ppfData.yearlyInvestment}
                      onChange={(e) => setPpfData({...ppfData, yearlyInvestment: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="500" 
                      max="150000" 
                      step="500" 
                      value={ppfData.yearlyInvestment}
                      onChange={(e) => setPpfData({...ppfData, yearlyInvestment: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period (years)</label>
                    <input
                      type="number"
                      value={ppfData.timePeriod}
                      onChange={(e) => setPpfData({...ppfData, timePeriod: Number(e.target.value)})}
                      className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${inputBgColor}`}
                    />
                    <input 
                      type="range" 
                      min="15" 
                      max="50" 
                      value={ppfData.timePeriod}
                      onChange={(e) => setPpfData({...ppfData, timePeriod: Number(e.target.value)})}
                      className="w-full mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum lock-in period is 15 years</p>
                  </div>
                </div>
                
                <div className={`mt-8 p-6 rounded-lg ${resultsBg} max-w-xl mx-auto`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Maturity Amount</p>
                    <h3 className="text-3xl font-bold my-1">₹ {ppfData.maturityAmount.toLocaleString()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Investment</p>
                      <p className="font-semibold text-xl mt-1">₹ {ppfData.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-opacity-50 bg-green-50 dark:bg-green-900 dark:bg-opacity-20">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Interest</p>
                      <p className="font-semibold text-xl mt-1">₹ {ppfData.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <div className="my-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
          <strong>Disclaimer:</strong> These calculators provide estimates for planning purposes only. Actual results may vary based on market conditions, 
          regulatory changes, and other factors. Please consult a financial advisor before making investment decisions.
        </p>
      </div>
      
      <Footer />
    </div>
  )
} 