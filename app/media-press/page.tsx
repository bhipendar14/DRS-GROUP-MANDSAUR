'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

// Sample press releases - you can replace these with actual content later
const pressReleases = [
  {
    id: 'pr-1',
    title: 'Indian Stock Market Platform Launches New Analytics Tools',
    date: 'May 15, 2023',
    summary: 'Our platform introduces advanced analytics tools to help investors make more informed decisions.',
    link: '#'
  },
  {
    id: 'pr-2',
    title: 'Q1 2023 Market Insights Report Released',
    date: 'April 3, 2023',
    summary: 'Comprehensive analysis of market trends and forecasts for the coming quarters.',
    link: '#'
  },
  {
    id: 'pr-3',
    title: 'Introducing Mobile App for Real-time Stock Tracking',
    date: 'January 22, 2023',
    summary: 'New mobile application allows investors to track their portfolio and market movements in real-time.',
    link: '#'
  },
]

// Sample media coverage - you can replace these with actual content later
const mediaCoverage = [
  {
    id: 'mc-1',
    publication: 'Economic Times',
    title: 'Top 10 Stock Market Platforms in India',
    date: 'June 10, 2023',
    link: '#'
  },
  {
    id: 'mc-2',
    publication: 'Business Standard',
    title: 'How Technology is Reshaping Stock Trading in India',
    date: 'May 5, 2023',
    link: '#'
  },
  {
    id: 'mc-3',
    publication: 'Financial Express',
    title: 'Interview: The Future of Retail Investing in India',
    date: 'March 18, 2023',
    link: '#'
  },
]

export default function MediaPressPage() {
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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Media & Press
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get the latest news, press releases, and media resources about Indian Stock Market platform.
          </p>
        </div>

        {/* Press Releases Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Press Releases</h2>
          <div className="space-y-8">
            {pressReleases.map((release) => (
              <div 
                key={release.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{release.date}</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {release.summary}
                  </p>
                  <Link 
                    href={release.link} 
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Read more
                    <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              href="#" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
            >
              View all press releases
            </Link>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Media Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaCoverage.map((coverage) => (
              <div 
                key={coverage.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{coverage.date}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{coverage.publication}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {coverage.title}
                </h3>
                <Link 
                  href={coverage.link} 
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Read article
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Press Kit Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Press Kit</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Download our press kit, which includes company logos, product screenshots, and executive headshots for media use.
              </p>
              <button 
                className="inline-flex items-center bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Download Press Kit
              </button>
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Media Contact</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                For press inquiries, please contact:
              </p>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                Media Relations
              </div>
              <p className="text-indigo-600 dark:text-indigo-400">press@indianstockmarket.com</p>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                We aim to respond to all media inquiries within 24 hours.
              </p>
            </div>
          </div>
        </section>
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