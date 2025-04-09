"use client"

import { useState, useEffect } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import { 
  Calculator, 
  Home, 
  Car, 
  BookOpen, 
  CreditCard, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  Percent, 
  AlertCircle, 
  Shield,
  FileText,
  FileCheck,
  CheckSquare,
  X
} from 'lucide-react'

export default function LoansPage() {
  const { theme } = useTheme()
  const [loanAmount, setLoanAmount] = useState(500000)
  const [loanTerm, setLoanTerm] = useState(5)
  const [interestRate, setInterestRate] = useState(8.5)
  const [activeTab, setActiveTab] = useState('personal')
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / (12 * 100)
    const totalMonths = loanTerm * 12
    
    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths) / (Math.pow(1 + ratePerMonth, totalMonths) - 1)
    
    return isNaN(emi) ? 0 : Math.round(emi)
  }

  // Calculate total payment and interest
  const calculateTotalPayment = () => {
    const emi = calculateEMI()
    const totalPayment = emi * loanTerm * 12
    const totalInterest = totalPayment - loanAmount
    
    return {
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleQuestionClick = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const loanTypes = [
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: <CreditCard size={24} />,
      interestRate: '8.5% - 12.5%',
      maxAmount: '₹25 Lakhs',
      tenure: 'Up to 5 years',
      processing: '1-2% of loan amount',
      description: 'Quick access to funds for any personal need without collateral. Ideal for emergencies, travel, or consolidating debt.'
    },
    {
      id: 'home',
      name: 'Home Loan',
      icon: <Home size={24} />,
      interestRate: '6.7% - 8.5%',
      maxAmount: '₹5 Crores',
      tenure: 'Up to 30 years',
      processing: '0.5-1% of loan amount',
      description: 'Finance your dream home with competitive interest rates and flexible repayment options. Tax benefits available under Section 24 and 80C.'
    },
    {
      id: 'car',
      name: 'Car Loan',
      icon: <Car size={24} />,
      interestRate: '7.25% - 9.5%',
      maxAmount: '₹1 Crore',
      tenure: 'Up to 7 years',
      processing: '0.5-1.5% of loan amount',
      description: 'Drive home your dream car with quick loan approval and minimal documentation. Options for both new and pre-owned vehicles.'
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: <BookOpen size={24} />,
      interestRate: '7.15% - 11.3%',
      maxAmount: '₹75 Lakhs',
      tenure: 'Up to 15 years',
      processing: '0-1% of loan amount',
      description: 'Invest in your future with loans for higher education in India or abroad. Interest subsidy available for eligible students.'
    }
  ]

  const faqs = [
    {
      question: 'What documents are required for loan application?',
      answer: 'Generally, you need identity proof (Aadhar, PAN), address proof, income proof (salary slips or ITR), and bank statements for the last 6 months. Specific loan types may require additional documents like property papers for home loans or admission letter for education loans.'
    },
    {
      question: 'How is my loan eligibility determined?',
      answer: 'Loan eligibility depends on factors like your income, existing financial obligations, credit score, age, and employment stability. Lenders typically consider your debt-to-income ratio to ensure you can comfortably repay the loan.'
    },
    {
      question: 'Can I repay my loan before the tenure ends?',
      answer: 'Yes, most loans can be repaid before the full tenure through partial or full prepayment. However, some lenders may charge a prepayment penalty, typically ranging from 2-5% of the outstanding amount.'
    },
    {
      question: 'How long does the loan approval process take?',
      answer: 'The approval timeline varies by loan type and lender. Personal loans may be approved within 24-48 hours, while home loans can take 7-15 days due to additional verification steps like property evaluation.'
    },
    {
      question: 'What happens if I miss an EMI payment?',
      answer: 'Missing an EMI payment can result in late payment fees, negatively impact your credit score, and potentially lead to higher interest rates on future loans. Repeated defaults may result in recovery proceedings as per the loan agreement.'
    }
  ]

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <NavBar />
      
      {/* Hero Section with Loan Calculator */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold mb-6">Financial Solutions Tailored for You</h1>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                Achieve your financial goals with our range of competitive loan products. 
                Fast approvals, minimal paperwork, and dedicated support throughout your journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#loan-types" 
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  Explore Loans
                </Link>
                <Link 
                  href="#apply" 
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'light' 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowApplyModal(true)
                  }}
                >
                  How to Apply
                </Link>
              </div>
            </div>
            
            <div className={`lg:w-1/2 rounded-xl p-6 shadow-lg ${
              theme === 'light' ? 'bg-white' : 'bg-gray-800'
            }`}>
              <div className="flex items-center mb-6">
                <Calculator size={24} className="mr-2 text-blue-500" />
                <h2 className="text-2xl font-bold">Loan Calculator</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Loan Amount: {formatCurrency(loanAmount)}
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>₹50K</span>
                    <span>₹1Cr</span>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Tenure: {loanTerm} {loanTerm === 1 ? 'year' : 'years'}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Interest Rate: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>
                
                <div className={`mt-8 p-5 rounded-lg ${
                  theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                }`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Monthly EMI</p>
                      <p className="text-2xl font-bold">{formatCurrency(calculateEMI())}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Interest</p>
                      <p className="text-2xl font-bold">{formatCurrency(calculateTotalPayment().totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Principal Amount</p>
                      <p className="text-lg font-medium">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Payment</p>
                      <p className="text-lg font-medium">{formatCurrency(calculateTotalPayment().totalPayment)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Loan Types */}
      <section id="loan-types" className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loan Products</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our range of loan options designed to meet your specific financial needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
            {loanTypes.map((loan) => (
              <button
                key={loan.id}
                onClick={() => setActiveTab(loan.id)}
                className={`py-3 px-4 rounded-t-lg font-medium transition-colors flex items-center justify-center ${
                  activeTab === loan.id
                    ? theme === 'light'
                      ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                      : 'bg-gray-900 border-b-2 border-blue-500 text-blue-500'
                    : theme === 'light'
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{loan.icon}</span>
                {loan.name}
              </button>
            ))}
          </div>
          
          <div className={`rounded-lg p-8 ${
            theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-900 shadow-lg'
          }`}>
            {loanTypes.map((loan) => (
              <div key={loan.id} className={activeTab === loan.id ? 'block' : 'hidden'}>
                <div className="flex items-center mb-6">
                  <span className={`p-3 rounded-full mr-4 ${
                    theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 bg-opacity-30 text-blue-400'
                  }`}>
                    {loan.icon}
                  </span>
                  <h3 className="text-2xl font-bold">{loan.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {loan.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Interest Rate</p>
                    <p className="text-xl font-semibold">{loan.interestRate}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Maximum Amount</p>
                    <p className="text-xl font-semibold">{loan.maxAmount}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tenure</p>
                    <p className="text-xl font-semibold">{loan.tenure}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Processing Fee</p>
                    <p className="text-xl font-semibold">{loan.processing}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className={`px-5 py-2.5 rounded-lg font-medium ${
                      theme === 'light' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-700 text-white hover:bg-blue-600'
                    }`}
                  >
                    Apply Now
                  </Link>
                  <button
                    className={`px-5 py-2.5 rounded-lg font-medium ${
                      theme === 'light' 
                        ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                        : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Download Brochure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Simple Application Process Section */}
      <section className={`py-16 px-4 ${theme === 'light' ? 'bg-gray-900 text-white' : 'bg-gray-950 text-white'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple Application Process</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our streamlined process ensures quick approval with minimal hassle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 relative">
            {/* Process Step Lines */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-700 z-0" style={{ width: '75%', margin: '0 auto' }}></div>
            
            {/* Step 1 */}
            <div className="relative z-10 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-6">
                <FileText size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Submit Application</h3>
              <p className="text-gray-300">
                Fill out the online application form with your personal and financial details.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-6">
                <FileCheck size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Document Verification</h3>
              <p className="text-gray-300">
                Our team verifies your documents and checks eligibility.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-6">
                <CheckSquare size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Approval</h3>
              <p className="text-gray-300">
                Receive loan approval and review the offered terms and conditions.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="relative z-10 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-6">
                <CreditCard size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">4. Disbursement</h3>
              <p className="text-gray-300">
                Loan amount is transferred directly to your bank account.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Loans</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Benefits that set our loan products apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900 bg-opacity-30 text-green-400'
              }`}>
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fast application processing with minimal waiting time. Get funds when you need them most.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900 bg-opacity-30 text-purple-400'
              }`}>
                <Percent size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy some of the lowest interest rates in the market with transparent fee structure.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 bg-opacity-30 text-blue-400'
              }`}>
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Repayment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose repayment options that suit your financial situation with no prepayment penalties.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-yellow-100 text-yellow-600' : 'bg-yellow-900 bg-opacity-30 text-yellow-400'
              }`}>
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Minimal Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Streamlined paperwork with digital KYC options to save your time and effort.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-red-100 text-red-600' : 'bg-red-900 bg-opacity-30 text-red-400'
              }`}>
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">No Hidden Charges</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete transparency with all fees and charges clearly disclosed upfront.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-900 shadow'
            }`}>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900 bg-opacity-30 text-indigo-400'
              }`}>
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Account Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your loan, track payments, and access statements through our digital platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our loan products and processes
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`mb-4 rounded-lg overflow-hidden ${
                  theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
                }`}
              >
                <button
                  onClick={() => handleQuestionClick(index)}
                  className="w-full px-6 py-4 text-left font-medium flex items-center justify-between"
                >
                  {faq.question}
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${activeQuestion === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {activeQuestion === index && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call-to-Action */}
      <section className={`py-16 px-4 ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white'}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply for a Loan?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Start your application today and take the first step towards achieving your financial goals
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className={`px-6 py-3 rounded-lg font-medium ${
                theme === 'light' 
                  ? 'bg-white text-blue-600 hover:bg-gray-100' 
                  : 'bg-white text-blue-900 hover:bg-gray-100'
              }`}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`relative max-w-2xl w-full rounded-xl p-6 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          } shadow-2xl`}>
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">How to Apply for a Loan</h2>
              <div className={`w-16 h-1 mb-6 ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Applying for a loan with DSR Group is a straightforward process designed to get you the funds you need with minimal hassle. Our team of financial experts will guide you through each step.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Document Preparation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gather your identity proof, address proof, income documents, and bank statements for the last 6 months.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Initial Consultation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contact our team to discuss your loan requirements and receive personalized guidance on the best options.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Application Submission</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete the application form with your personal, employment, and financial details.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">Loan Processing & Approval</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our team will verify your documents, check your credit score, and determine your eligibility.</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Link 
                href="/contact" 
                className={`px-6 py-3 rounded-lg font-medium ${
                  theme === 'light' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-700 text-white hover:bg-blue-600'
                }`}
                onClick={() => setShowApplyModal(false)}
              >
                Contact Us to Apply
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
} 