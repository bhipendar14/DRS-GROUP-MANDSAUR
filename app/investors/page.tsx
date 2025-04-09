'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ChartBarIcon, PresentationChartLineIcon, CurrencyRupeeIcon, CalculatorIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline'

// Investment options - replace with actual offerings when available
const investmentOptions = [
  {
    id: 'stocks',
    title: 'Equity Trading',
    icon: ChartBarIcon,
    description: 'Access Indian and global stock markets with our comprehensive trading platform and expert guidance.',
    features: [
      'Seamless trading experience through Motilal Oswal platforms',
      'Advanced technical analysis tools',
      'Expert research and stock recommendations',
      'Regular market updates and insights'
    ]
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds',
    icon: PresentationChartLineIcon,
    description: 'Diversify your portfolio with a curated selection of mutual funds across various asset classes and risk profiles.',
    features: [
      'Wide range of equity, debt, and hybrid funds',
      'Zero commission on direct mutual funds',
      'Systematic investment plans (SIP) options',
      'Regular portfolio review and rebalancing'
    ]
  },
  {
    id: 'pms',
    title: 'Portfolio Management Services',
    icon: CurrencyRupeeIcon,
    description: 'Professional portfolio management tailored to your financial goals and risk tolerance.',
    features: [
      'Customized investment strategies',
      'Professional fund managers with proven track records',
      'Transparent performance reporting',
      'Access to exclusive investment opportunities'
    ]
  },
  {
    id: 'alternatives',
    title: 'Alternative Investments',
    icon: CalculatorIcon,
    description: 'Explore alternative investment funds (AIFs) for diversification beyond traditional assets.',
    features: [
      'Access to private equity funds',
      'Real estate investment trusts (REITs)',
      'Structured products for sophisticated investors',
      'Hedge fund strategies for market-neutral returns'
    ]
  }
]

// Testimonials - replace with actual testimonials when available
const testimonials = [
  {
    id: 'testimonial1',
    quote: "DSR GROUP MANDSAUR's investment advice has helped me achieve consistent returns above market average for the past 3 years.",
    author: "Rajesh P., Retail Investor",
    location: "Indore"
  },
  {
    id: 'testimonial2',
    quote: "Their team took the time to understand my risk profile and financial goals before recommending any investments.",
    author: "Priya S., Business Owner",
    location: "Mandsaur"
  },
  {
    id: 'testimonial3',
    quote: "The regular portfolio reviews and market insights have been invaluable for my long-term investment strategy.",
    author: "Amit K., Retired Professional",
    location: "Ujjain"
  }
]

export default function InvestorsPage() {
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
        <div className="relative bg-indigo-800 dark:bg-indigo-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-blue-800 opacity-90 dark:opacity-80"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Investments Tailored to Your Goals
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              DSR GROUP MANDSAUR offers diverse investment opportunities across multiple asset classes, designed to help you build wealth and achieve financial security.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <Link
                  href="#investment-options"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:text-lg"
                >
                  Explore Options
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Philosophy */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Investment Philosophy
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At DSR GROUP MANDSAUR, we believe in taking a disciplined, research-driven approach to investing, focusing on long-term growth while managing risk.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <DocumentTextIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Research-Driven</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Our investment recommendations are backed by thorough fundamental and technical analysis.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <CalculatorIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Risk-Managed</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We prioritize risk management through diversification and careful asset allocation.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <UserGroupIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Client-Focused</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Every investment recommendation is tailored to the unique financial goals and risk tolerance of our clients.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Investment Options */}
        <section id="investment-options" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Investment Options
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our comprehensive range of investment products and services.
              </p>
            </div>
            
            <div className="space-y-12">
              {investmentOptions.map((option, index) => (
                <div 
                  key={option.id}
                  className={`flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="lg:w-1/3 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 p-12">
                    <option.icon className="h-24 w-24 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="lg:w-2/3 p-8 lg:p-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {option.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {option.description}
                    </p>
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-indigo-600 dark:text-indigo-400">•</span>
                          <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                What Our Investors Say
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear from investors who have trusted us with their financial goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6">
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-indigo-700 dark:bg-indigo-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Schedule a consultation with our financial advisors to discuss your investment goals and explore tailored solutions.
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