'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'

// Placeholder partner categories - replace with actual data later
const partnerCategories = [
  {
    id: 'financial',
    title: 'Financial Partners',
    description: 'Our key financial institutions and brokerage partners.',
    partners: [
      {
        id: 'partner1',
        name: 'Motilal Oswal Financial Services Ltd',
        logo: '/placeholder-logo.png', // Replace with actual logo path
        description: 'As an authorized sub-broker of Motilal Oswal Financial Services Ltd, we leverage their powerful trading platforms and extensive market research.',
        website: '#'
      },
      // More partners to be added
    ]
  },
  {
    id: 'technology',
    title: 'Technology Partners',
    description: 'Our technology partners that help power our platform.',
    partners: [
      // Partners to be added
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Partners',
    description: 'Our trusted insurance providers offering comprehensive coverage.',
    partners: [
      // Partners to be added
    ]
  },
  {
    id: 'advisory',
    title: 'Advisory Partners',
    description: 'Our expert advisory partners for specialized financial guidance.',
    partners: [
      // Partners to be added
    ]
  }
]

export default function PartnersPage() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DSR Group Mandsaur
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Our Partners
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            At DSR Group Mandsaur, we collaborate with industry-leading companies to provide our clients with the best financial services and solutions.
          </p>
        </div>

        {/* Partners Sections */}
        {partnerCategories.map((category) => (
          <section key={category.id} className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{category.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">{category.description}</p>
            
            {category.partners && category.partners.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {category.partners.map((partner) => (
                  <div 
                    key={partner.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg flex flex-col"
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-40 h-40 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {/* Placeholder for logo - replace with actual Image component when logo is available */}
                        <div className="text-gray-400 dark:text-gray-500 text-sm text-center">
                          {partner.name} Logo
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {partner.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {partner.description}
                        </p>
                        {partner.website && (
                          <Link 
                            href={partner.website}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                          >
                            Visit website →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl font-light text-gray-400 dark:text-gray-500 mb-3">Coming Soon</div>
                <p className="text-gray-600 dark:text-gray-300">
                  We're currently expanding our network of partners in this category.
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Become a Partner Section */}
        <section className="mt-24">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Interested in Becoming a Partner?</h2>
                <p className="text-indigo-100 text-lg max-w-2xl">
                  We're always looking to expand our ecosystem with partners who share our values and commitment to excellence.
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:ml-8">
                <Link 
                  href="/contact"
                  className="inline-block px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:bg-indigo-50 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {Footer ? <Footer /> : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DSR Group Mandsaur. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
} 