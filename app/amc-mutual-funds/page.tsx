'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { PresentationChartLineIcon, ChartPieIcon, ShieldCheckIcon, CurrencyRupeeIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

// Sample AMCs (Asset Management Companies) that DSR GROUP MANDSAUR might work with
const featuredAMCs = [
  { name: 'Motilal Oswal AMC', logo: '/placeholder-logo.png' }, // Replace with actual logos
  { name: 'SBI Mutual Fund', logo: '/placeholder-logo.png' },
  { name: 'HDFC Mutual Fund', logo: '/placeholder-logo.png' },
  { name: 'Axis Mutual Fund', logo: '/placeholder-logo.png' },
  { name: 'ICICI Prudential Mutual Fund', logo: '/placeholder-logo.png' },
  { name: 'Aditya Birla Sun Life Mutual Fund', logo: '/placeholder-logo.png' },
]

// Mutual Fund Categories
const fundCategories = [
  {
    id: 'equity',
    title: 'Equity Funds',
    icon: ChartPieIcon,
    description: 'Invest primarily in stocks with the goal of capital appreciation over the long term.',
    types: [
      'Large Cap Funds',
      'Mid Cap Funds',
      'Small Cap Funds',
      'Multi Cap Funds',
      'Sectoral/Thematic Funds',
      'ELSS (Tax Saving) Funds'
    ],
    riskLevel: 'High',
    idealTimeframe: '5+ years'
  },
  {
    id: 'debt',
    title: 'Debt Funds',
    icon: ShieldCheckIcon,
    description: 'Invest in fixed-income securities like bonds and government securities to generate steady income.',
    types: [
      'Liquid Funds',
      'Ultra Short Duration Funds',
      'Corporate Bond Funds',
      'Dynamic Bond Funds',
      'Gilt Funds',
      'Credit Risk Funds'
    ],
    riskLevel: 'Low to Moderate',
    idealTimeframe: '1-3 years'
  },
  {
    id: 'hybrid',
    title: 'Hybrid Funds',
    icon: ArrowPathIcon,
    description: 'Invest in a mix of equity and debt instruments to provide both growth and stability.',
    types: [
      'Balanced Funds',
      'Conservative Hybrid Funds',
      'Aggressive Hybrid Funds',
      'Multi-Asset Allocation Funds',
      'Arbitrage Funds',
      'Equity Savings Funds'
    ],
    riskLevel: 'Moderate',
    idealTimeframe: '3-5 years'
  },
  {
    id: 'solution-oriented',
    title: 'Solution-Oriented Funds',
    icon: ClockIcon,
    description: 'Designed for specific financial goals with designated lock-in periods.',
    types: [
      'Retirement Funds',
      'Children\'s Funds',
      'Goal-Based Funds'
    ],
    riskLevel: 'Varies based on allocation',
    idealTimeframe: 'Goal-specific (typically long-term)'
  }
]

// Benefits of Mutual Funds
const benefits = [
  {
    title: 'Professional Management',
    description: 'Experienced fund managers make investment decisions based on research and analysis.',
    icon: PresentationChartLineIcon
  },
  {
    title: 'Diversification',
    description: 'Spread investments across multiple securities to reduce risk.',
    icon: ChartPieIcon
  },
  {
    title: 'Affordability',
    description: 'Start investing with as little as ₹500 per month through SIP.',
    icon: CurrencyRupeeIcon
  },
  {
    title: 'Liquidity',
    description: 'Most mutual funds can be redeemed on any business day.',
    icon: ClockIcon
  },
  {
    title: 'Transparency',
    description: 'Regular portfolio disclosures and NAV updates.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Flexibility',
    description: 'Choose from various investment options based on your goals.',
    icon: ArrowPathIcon
  }
]

// FAQs
const faqs = [
  {
    question: 'How do I start investing in mutual funds?',
    answer: 'You can start investing in mutual funds through DSR GROUP MANDSAUR by completing KYC formalities and submitting the required documents. Our advisors will guide you through the process and help you select funds based on your financial goals and risk appetite.'
  },
  {
    question: 'What is a Systematic Investment Plan (SIP)?',
    answer: 'A Systematic Investment Plan (SIP) allows you to invest a fixed amount in mutual funds at regular intervals (typically monthly). This approach helps in rupee cost averaging and building wealth through disciplined investing without timing the market.'
  },
  {
    question: 'Are mutual funds safe investments?',
    answer: 'While mutual funds are generally considered safer than direct stock investments due to diversification, they still carry market risks. Different types of funds carry different levels of risk. Our advisors can help you understand the risk associated with each fund type and choose options aligned with your risk tolerance.'
  },
  {
    question: 'How are mutual funds taxed in India?',
    answer: 'Taxation depends on the type of fund and holding period. Equity funds held for more than 1 year are subject to 10% LTCG tax (above ₹1 lakh). Debt funds held for more than 3 years are taxed at 20% with indexation benefits. Dividends from all mutual funds are taxable at your income tax slab rate.'
  },
  {
    question: 'Can I withdraw my mutual fund investments anytime?',
    answer: 'Most open-ended mutual funds allow redemption on any business day, though some funds may have exit loads if redeemed before a specified period. Certain funds like ELSS have a mandatory lock-in period of 3 years. Solution-oriented funds like retirement funds may also have specific lock-in requirements.'
  }
]

export default function AMCMutualFundsPage() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DSR GROUP MANDSAUR
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Home
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                AMC Mutual Funds
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Build wealth systematically with professionally managed mutual funds from India's top Asset Management Companies.
              </p>
              <div className="mt-10">
                <Link
                  href="#fund-categories"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-blue-50 md:text-lg"
                >
                  Explore Fund Categories
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Categories */}
        <section id="fund-categories" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Mutual Fund Categories
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore various mutual fund categories to match your investment goals, time horizon, and risk appetite.
              </p>
            </div>
            
            <div className="mt-16 space-y-12">
              {fundCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className={`flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="lg:w-1/3 flex items-center justify-center bg-blue-100 dark:bg-blue-900 p-12">
                    <div className="text-center">
                      <category.icon className="h-24 w-24 text-blue-600 dark:text-blue-300 mx-auto" />
                      <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          <span className="font-medium">Risk Level:</span> {category.riskLevel}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          <span className="font-medium">Ideal Timeframe:</span> {category.idealTimeframe}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-8 lg:p-12">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {category.description}
                    </p>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fund Types:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        {category.types.map((type, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">•</span>
                            <span className="ml-2 text-gray-600 dark:text-gray-300">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured AMCs */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Top Asset Management Companies
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We offer mutual funds from India's leading and most trusted asset management companies.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {featuredAMCs.map((amc, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center h-32">
                  <p className="text-center font-medium text-gray-900 dark:text-white text-lg">{amc.name}</p>
                  {/* Uncomment when logos are available */}
                  {/* <img src={amc.logo} alt={`${amc.name} logo`} className="h-16" /> */}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Benefits of Investing in Mutual Funds
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover why mutual funds are a popular investment choice for both beginners and experienced investors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-5">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How to Invest */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                How to Invest in Mutual Funds
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                DSR GROUP MANDSAUR makes investing in mutual funds simple and hassle-free.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="px-8 py-12 lg:p-12 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Process
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    With our guidance, you can start your mutual fund investment journey in just a few simple steps.
                  </p>
                </div>
                
                <div className="mt-8 lg:mt-0 lg:col-span-2">
                  <div className="space-y-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
                          1
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Consultation and KYC
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Meet with our financial advisor to discuss your investment goals. Complete the KYC (Know Your Customer) process with necessary identity and address proofs.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
                          2
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Risk Assessment and Fund Selection
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          We assess your risk profile and recommend mutual funds that align with your financial goals and time horizon.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
                          3
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Investment Execution
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          Choose your investment mode (lump sum or SIP) and complete the application form. We'll handle the rest, ensuring your investment is processed efficiently.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
                          4
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Regular Monitoring and Review
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          We provide regular updates on your investments and schedule periodic reviews to ensure your portfolio remains aligned with your changing goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Get answers to common questions about mutual fund investments.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Start Your Mutual Fund Investment Journey?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Our financial advisors are here to help you build a mutual fund portfolio tailored to your goals.
            </p>
            <div className="mt-10">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:text-lg shadow-lg"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {Footer ? <Footer /> : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DSR GROUP MANDSAUR. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
} 