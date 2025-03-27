"use client"

import { useState, useEffect } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  Calendar, 
  Shield, 
  PieChart, 
  TrendingUp, 
  Check, 
  Info, 
  HelpCircle,
  ArrowRight,
  Briefcase,
  Book,
  Clock,
  Award
} from 'lucide-react'

export default function IncomeTaxPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  
  // Basic tax calculation state
  const [taxCalc, setTaxCalc] = useState({
    income: 1000000,
    age: 'below60',
    regime: 'new',
    deductions: 150000
  })
  
  const [taxResults, setTaxResults] = useState({
    taxAmount: 0,
    effectiveTaxRate: 0,
    takeHomeSalary: 0
  })
  
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }
  
  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Calculate tax based on inputs
  useEffect(() => {
    if (!mounted) return;
    
    let tax = 0
    const taxableIncome = taxCalc.regime === 'old' 
      ? Math.max(0, taxCalc.income - taxCalc.deductions)
      : taxCalc.income
    
    if (taxCalc.regime === 'new') {
      // New Tax Regime 2023-24
      if (taxableIncome <= 300000) {
        tax = 0
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3
      }
    } else {
      // Old Tax Regime
      if (taxCalc.age === 'below60') {
        if (taxableIncome <= 250000) {
          tax = 0
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.2
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.3
        }
      } else if (taxCalc.age === 'between60and80') {
        if (taxableIncome <= 300000) {
          tax = 0
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 300000) * 0.05
        } else if (taxableIncome <= 1000000) {
          tax = 10000 + (taxableIncome - 500000) * 0.2
        } else {
          tax = 110000 + (taxableIncome - 1000000) * 0.3
        }
      } else {
        // Above 80 years
        if (taxableIncome <= 500000) {
          tax = 0
        } else if (taxableIncome <= 1000000) {
          tax = (taxableIncome - 500000) * 0.2
        } else {
          tax = 100000 + (taxableIncome - 1000000) * 0.3
        }
      }
    }
    
    // Add surcharge for high income (simplified)
    if (taxableIncome > 5000000) {
      tax += tax * 0.1
    }
    
    // Add cess
    tax += tax * 0.04
    
    setTaxResults({
      taxAmount: Math.round(tax),
      effectiveTaxRate: Math.round((tax / taxCalc.income) * 100 * 10) / 10,
      takeHomeSalary: Math.round(taxCalc.income - tax)
    })
  }, [taxCalc, mounted])
  
  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <NavBar />
      
      <section className={`py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
          : 'bg-gradient-to-r from-blue-900 to-purple-900 text-white'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Income Tax Services</h1>
            <p className="text-xl mb-8">
              Navigate the complexities of taxation with expert guidance and comprehensive solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab('calculator')}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center"
              >
                <Calculator className="mr-2" size={20} />
                Calculate Your Tax
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center"
              >
                <Briefcase className="mr-2" size={20} />
                Contact Our Tax Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
              { id: 'taxSystem', label: 'Indian Tax System', icon: <Shield size={18} /> },
              { id: 'impact', label: 'Impact of Taxation', icon: <TrendingUp size={18} /> },
              { id: 'calculator', label: 'Tax Calculator', icon: <Calculator size={18} /> },
              { id: 'planning', label: 'Tax Planning', icon: <PieChart size={18} /> },
              { id: 'filing', label: 'Tax Filing', icon: <FileText size={18} /> },
              { id: 'faq', label: 'FAQs', icon: <HelpCircle size={18} /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-4 font-medium flex items-center whitespace-nowrap ${
                  activeTab === item.id
                    ? theme === 'light'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Income Tax Services</h2>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                At DSR Group Mandsaur, we provide comprehensive income tax services to help individuals and businesses 
                navigate the complex tax landscape, maximize savings, and ensure compliance with the latest 
                regulations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className={`p-6 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-sm border border-gray-100' 
                    : 'bg-gray-800 border border-gray-700'
                }`}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <DollarSign className={`mr-2 ${
                      theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                    }`} />
                    For Individuals
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Income tax return filing for all sources of income',
                      'Tax planning and optimization strategies',
                      'Capital gains tax calculation and reporting',
                      'Assistance with tax notices and assessments',
                      'NRI taxation and foreign income reporting'
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 mt-1 text-green-500 shrink-0" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`p-6 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-sm border border-gray-100' 
                    : 'bg-gray-800 border border-gray-700'
                }`}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className={`mr-2 ${
                      theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                    }`} />
                    For Businesses
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Business & professional income tax returns',
                      'Corporate tax planning and compliance',
                      'Tax audit and certification services',
                      'TDS/TCS filing and compliance',
                      'GST integration with income tax planning'
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 mt-1 text-green-500 shrink-0" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Income Tax Calculator</h2>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Use our simple calculator to estimate your income tax liability for the financial year.
                This is a simplified calculation and actual tax liability may vary.
              </p>
              
              <div className={`p-6 rounded-xl mb-8 ${
                theme === 'light' 
                  ? 'bg-white border border-gray-100 shadow-sm' 
                  : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-6">Enter Your Details</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Total Annual Income (₹)
                        </label>
                        <input
                          type="number"
                          value={taxCalc.income}
                          onChange={(e) => setTaxCalc({...taxCalc, income: Number(e.target.value)})}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            theme === 'light' 
                              ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' 
                              : 'border-gray-700 bg-gray-700 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Age Group
                        </label>
                        <select
                          value={taxCalc.age}
                          onChange={(e) => setTaxCalc({...taxCalc, age: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            theme === 'light' 
                              ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' 
                              : 'border-gray-700 bg-gray-700 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        >
                          <option value="below60">Below 60 years</option>
                          <option value="between60and80">60 to 80 years</option>
                          <option value="above80">Above 80 years</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tax Regime
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="new"
                              checked={taxCalc.regime === 'new'}
                              onChange={() => setTaxCalc({...taxCalc, regime: 'new'})}
                              className="mr-2"
                            />
                            New Regime
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="old"
                              checked={taxCalc.regime === 'old'}
                              onChange={() => setTaxCalc({...taxCalc, regime: 'old'})}
                              className="mr-2"
                            />
                            Old Regime
                          </label>
                        </div>
                      </div>
                      
                      {taxCalc.regime === 'old' && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Total Deductions (₹)
                          </label>
                          <input
                            type="number"
                            value={taxCalc.deductions}
                            onChange={(e) => setTaxCalc({...taxCalc, deductions: Number(e.target.value)})}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              theme === 'light' 
                                ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' 
                                : 'border-gray-700 bg-gray-700 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Section 80C, 80D, HRA, and all other deductions
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-6">Your Tax Calculation</h3>
                    
                    <div className={`p-6 rounded-xl mb-6 ${
                      theme === 'light' 
                        ? 'bg-purple-50' 
                        : 'bg-purple-900 bg-opacity-20'
                    }`}>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Estimated Tax Amount
                        </p>
                        <h3 className="text-3xl font-bold my-2">
                          ₹ {taxResults.taxAmount.toLocaleString()}
                        </h3>
                        <p className="text-sm">
                          Effective Tax Rate: <span className="font-medium">{taxResults.effectiveTaxRate}%</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`p-6 rounded-xl ${
                      theme === 'light' 
                        ? 'bg-green-50' 
                        : 'bg-green-900 bg-opacity-20'
                    }`}>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Take Home Amount
                        </p>
                        <h3 className="text-3xl font-bold my-2 text-green-600 dark:text-green-400">
                          ₹ {taxResults.takeHomeSalary.toLocaleString()}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Indian Tax System Tab */}
          {activeTab === 'taxSystem' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Indian Tax System</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                India follows a progressive tax structure governed by the Income Tax Act of 1961.
              </p>
              <div className={`p-6 rounded-xl mb-8 ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
              }`}>
                <h3 className="text-xl font-medium mb-4">Tax Regimes in India</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">New Tax Regime</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Lower rates but no exemptions or deductions
                    </p>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Up to ₹3 lakhs: No tax</li>
                      <li>₹3-6 lakhs: 5%</li>
                      <li>₹6-9 lakhs: 10%</li>
                      <li>₹9-12 lakhs: 15%</li>
                      <li>₹12-15 lakhs: 20%</li>
                      <li>Above ₹15 lakhs: 30%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Old Tax Regime</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Higher rates but allows exemptions and deductions
                    </p>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Up to ₹2.5 lakhs: No tax</li>
                      <li>₹2.5-5 lakhs: 5%</li>
                      <li>₹5-10 lakhs: 20%</li>
                      <li>Above ₹10 lakhs: 30%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Impact of Taxation Tab */}
          {activeTab === 'impact' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Impact of Taxation</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Taxation affects various aspects of the economy and society.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
                }`}>
                  <h3 className="text-xl font-medium mb-4">Economic Impact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Revenue generation for public services</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Wealth redistribution in society</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Influencing investment patterns</span>
                    </li>
                  </ul>
                </div>
                <div className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
                }`}>
                  <h3 className="text-xl font-medium mb-4">Social Impact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Funding welfare programs</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Reducing income inequality</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={16} className="mt-1 mr-2 text-purple-500" />
                      <span>Encouraging socially beneficial behaviors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Tax Planning Tab */}
          {activeTab === 'planning' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Tax Planning Strategies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Legally minimize your tax liability with these strategies.
              </p>
              <div className={`p-6 rounded-xl mb-8 ${
                theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
              }`}>
                <h3 className="text-xl font-medium mb-4">Key Tax-Saving Options</h3>
                <ul className="space-y-3">
                  <li className="pb-3 border-b">
                    <h4 className="font-medium">Section 80C Investments</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      PPF, ELSS, life insurance premiums, home loan principal
                    </p>
                  </li>
                  <li className="pb-3 border-b">
                    <h4 className="font-medium">Section 80D - Health Insurance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Premium for self, family, and parents
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium">Home Loan Benefits</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interest deduction under Section 24
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Tax Filing Tab */}
          {activeTab === 'filing' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Tax Filing Process</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Important steps and deadlines for filing income tax returns.
              </p>
              <div className="space-y-6">
                <div className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
                }`}>
                  <h3 className="text-xl font-medium mb-4">Key Dates</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Regular filing deadline</span>
                      <span className="font-medium">July 31</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Filing with audit report</span>
                      <span className="font-medium">October 31</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Belated returns</span>
                      <span className="font-medium">December 31</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* FAQs Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    question: "Who needs to file income tax returns?",
                    answer: "Anyone with annual income above the basic exemption limit must file ITR. Also required for those with foreign assets or seeking refunds."
                  },
                  {
                    question: "What's the difference between old and new tax regimes?",
                    answer: "New regime offers lower rates without deductions; old regime has higher rates but allows various deductions and exemptions."
                  },
                  {
                    question: "When is the last date to file ITR?",
                    answer: "Regular filing deadline is July 31. With audit reports, it's October 31. Belated returns can be filed until December 31."
                  }
                ].map((faq, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    theme === 'light' ? 'bg-white' : 'bg-gray-800' 
                  }`}>
                    <button 
                      className="flex justify-between items-center w-full text-left font-medium"
                      onClick={() => toggleQuestion(index)}
                    >
                      <span>{faq.question}</span>
                      <ArrowRight 
                        size={16} 
                        className={`transform transition-transform ${
                          activeQuestion === index ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                    {activeQuestion === index && (
                      <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}