'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Newspaper, Radio, Download, Mail } from 'lucide-react'

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
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <NavBar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Media & Press
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Get the latest news, press releases, and media resources about DSR Group MANDSAUR platform.
          </p>
        </div>

        {/* Press Releases Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Newspaper className={theme === 'light' ? 'text-gray-800' : 'text-gray-200'} />
            <h2 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Press Releases</h2>
          </div>
          <div className={`p-8 rounded-xl text-center ${
            theme === 'light' 
              ? 'bg-white border border-gray-200 shadow-sm' 
              : 'bg-gray-800 border border-gray-700'
          }`}>
            <p className={`text-lg mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>No Press Releases Yet</p>
            <p className={`text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>Check back soon for our latest announcements and updates.</p>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Radio className={theme === 'light' ? 'text-gray-800' : 'text-gray-200'} />
            <h2 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Media Coverage</h2>
          </div>
          <div className={`p-8 rounded-xl text-center ${
            theme === 'light' 
              ? 'bg-white border border-gray-200 shadow-sm' 
              : 'bg-gray-800 border border-gray-700'
          }`}>
            <p className={`text-lg mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Coming Soon</p>
            <p className={`text-base ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>Our media coverage section will be updated with the latest news and features about DSR Group.</p>
          </div>
        </section>

        {/* Press Kit Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Download className={theme === 'light' ? 'text-gray-800' : 'text-gray-200'} />
            <h2 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Press Kit</h2>
          </div>
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white border border-gray-200 shadow-sm' 
              : 'bg-gray-800 border border-gray-700'
          }`}>
            <p className={`text-base mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Our press kit will include company logos, brand guidelines, product screenshots, and media resources.
            </p>
            <button 
              disabled
              className={`inline-flex items-center py-2.5 px-6 rounded-lg text-sm font-medium transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Press Kit Coming Soon
            </button>
          </div>
        </section>

        {/* Media Contact Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Mail className={theme === 'light' ? 'text-gray-800' : 'text-gray-200'} />
            <h2 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>Media Contact</h2>
          </div>
          <div className={`p-8 rounded-xl ${
            theme === 'light' 
              ? 'bg-white border border-gray-200 shadow-sm' 
              : 'bg-gray-800 border border-gray-700'
          }`}>
            <p className={`text-base mb-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              For press inquiries, please contact:
            </p>
            <div className={`text-lg font-medium mb-1 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Media Relations Team
            </div>
            <a 
              href="mailto:info@dsrgroupmandsaur.com" 
              className={`text-base hover:underline ${
                theme === 'light' ? 'text-green-600' : 'text-green-400'
              }`}
            >
              info@dsrgroupmandsaur.com
            </a>
            <p className={`text-sm mt-4 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              We aim to respond to all media inquiries within 24-48 hours.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 