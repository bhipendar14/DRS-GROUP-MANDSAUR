'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { useTheme } from '@/context/theme-context'

import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    price: '₹499',
    frequency: '/month',
    description: 'Essential tools for stock market beginners.',
    features: [
      'Real-time data for 20 stocks',
      'Basic market analysis',
      'Daily market reports',
      'Email support',
    ],
    cta: 'Start with Basic',
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    price: '₹999',
    frequency: '/month',
    description: 'Advanced tools for active traders.',
    features: [
      'Real-time data for all NSE stocks',
      'Advanced technical indicators',
      'Portfolio tracking',
      'Historical data (5 years)',
      'Priority email support',
      'Mobile app access',
    ],
    cta: 'Get Pro Access',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: '₹2,999',
    frequency: '/month',
    description: 'Complete suite for professional traders and firms.',
    features: [
      'Everything in Pro tier',
      'API access',
      'Algorithmic trading tools',
      'Custom indicators',
      'Historical data (10+ years)',
      '24/7 dedicated support',
      'Team collaboration tools',
    ],
    cta: 'Contact Sales',
    mostPopular: false,
  },
]

export default function PricingPage() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Indian Stock Market
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Choose the right plan for you
          </h2>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From real-time market data to advanced analytics, we have a plan to suit your needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`
                flex flex-col flex-1 rounded-2xl shadow-lg overflow-hidden border
                ${tier.mostPopular 
                  ? 'ring-4 ring-indigo-500 dark:ring-indigo-400 bg-white dark:bg-gray-800 lg:scale-105 z-10 border-indigo-200 dark:border-indigo-800' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
                transform transition-all duration-200 hover:translate-y-[-8px] hover:shadow-xl
              `}
            >
              {tier.mostPopular && (
                <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">{tier.description}</p>
                  <div className="mt-8 flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{tier.price}</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">{tier.frequency}</span>
                  </div>
                </div>

                <ul className="mt-10 space-y-4 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    type="button"
                    className={`
                      w-full py-4 px-6 rounded-xl shadow font-semibold text-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 
                      ${tier.mostPopular 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h3>
          <dl className="mt-8 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="pt-6">
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Can I cancel my subscription at any time?
              </dt>
              <dd className="mt-3 text-gray-600 dark:text-gray-300">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                How accurate is the stock data?
              </dt>
              <dd className="mt-3 text-gray-600 dark:text-gray-300">
                We provide real-time data directly from the National Stock Exchange (NSE) with minimal delay for all paid plans.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Do you offer discounts for annual billing?
              </dt>
              <dd className="mt-3 text-gray-600 dark:text-gray-300">
                Yes, we offer a 20% discount for annual billing on all plans. Contact our sales team for more information.
              </dd>
            </div>
          </dl>
        </div>
      </main>

      {Footer ? <Footer /> : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Indian Stock Market. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
} 