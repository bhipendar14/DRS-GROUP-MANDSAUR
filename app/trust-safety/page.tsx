'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ShieldCheckIcon, LockClosedIcon, DocumentTextIcon, ServerIcon, UserGroupIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

// Trust features section data
const trustFeatures = [
  {
    id: 'security',
    icon: LockClosedIcon,
    title: 'Enterprise-Grade Security',
    description: 'We employ industry-leading encryption and security protocols to protect your personal information and financial data at all times.'
  },
  {
    id: 'compliance',
    icon: BuildingLibraryIcon,
    title: 'Regulatory Compliance',
    description: 'Our platform complies with all SEBI regulations and financial services guidelines to ensure a secure and transparent trading environment.'
  },
  {
    id: 'data-protection',
    icon: ShieldCheckIcon,
    title: 'Data Protection',
    description: 'Your data is protected by comprehensive privacy policies and secure infrastructure that meets global standards for data protection.'
  },
  {
    id: 'reliability',
    icon: ServerIcon,
    title: 'Platform Reliability',
    description: 'Our systems are built with redundancy and high availability in mind, ensuring consistent access to market data when you need it most.'
  },
  {
    id: 'privacy',
    icon: DocumentTextIcon,
    title: 'Privacy First',
    description: 'We never sell your personal data to third parties and maintain strict controls over how your information is used and accessed.'
  },
  {
    id: 'community',
    icon: UserGroupIcon,
    title: 'Trusted Community',
    description: 'Our active moderation team ensures that discussions and information shared on our platform maintain high standards of integrity.'
  }
]

export default function TrustSafetyPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Trust & Safety
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your security and privacy are our top priorities. Learn how we protect your data and ensure a safe trading environment.
          </p>
        </div>

        {/* Trust Features Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustFeatures.map((feature) => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Numbers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Registration Numbers</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-indigo-600 dark:text-indigo-300 text-lg font-bold">NSE</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium mb-1">NSE Registration</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">AP0297130541</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-indigo-600 dark:text-indigo-300 text-lg font-bold">BSE</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium mb-1">BSE Registration</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">AP01044601140</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-indigo-600 dark:text-indigo-300 text-lg font-bold">MCX</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium mb-1">MCX Registration</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">MCX/AP/151388</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-indigo-600 dark:text-indigo-300 text-lg font-bold">AMFI</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium mb-1">AMFI ARN</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">175170</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  We are registered with all major Indian financial regulatory bodies to ensure compliance and security in your trading experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Security Practices</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Data Encryption
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All sensitive data is encrypted both in transit and at rest using industry-standard AES-256 encryption.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Multi-Factor Authentication
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We offer and encourage the use of multi-factor authentication to add an extra layer of security to your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Regular Security Audits
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our systems undergo regular security audits and penetration testing by independent security firms.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Real-time Monitoring
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our security team maintains 24/7 monitoring for suspicious activities and potential threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Highlight */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our comprehensive privacy policy outlines how we collect, use, and protect your personal information. We are committed to transparency and giving you control over your data.
              </p>
              <Link 
                href="/privacy-policy" 
                className="inline-flex items-center bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Read Our Privacy Policy
              </Link>
            </div>
          </div>
        </section>

        {/* Contact For Security Concerns */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Report Security Concerns</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any security concerns or notice suspicious activity related to your account, please contact our security team immediately.
              </p>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    Contact Email
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400">dsrgroupmandsaur@gmail.com</p>
                </div>
                <div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    Contact Number
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400">07422 - 496399</p>
                </div>
              </div>
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