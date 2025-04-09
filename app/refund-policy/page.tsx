'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowPathIcon, BanknotesIcon, ClockIcon, ExclamationCircleIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

export default function RefundPolicyPage() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('introduction')

  // Handle scroll to update active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionId = section.getAttribute('id')
        
        if (window.scrollY >= sectionTop) {
          setActiveSection(sectionId || 'introduction')
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section when clicking sidebar
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  // Last updated date
  const lastUpdated = "May 15, 2023"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DSR GROUP MANDSAUR</h1>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-24">
              <Image 
                src="/logo.jpg" 
                alt="DSR Group Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We want you to be completely satisfied with our services. This policy outlines when and how you can request refunds or cancellations.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contents</h3>
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection('introduction')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'introduction' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Introduction
                </button>
                <button 
                  onClick={() => scrollToSection('eligibility')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'eligibility' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Refund Eligibility
                </button>
                <button 
                  onClick={() => scrollToSection('process')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'process' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Refund Process
                </button>
                <button 
                  onClick={() => scrollToSection('exceptions')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'exceptions' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Non-refundable Items
                </button>
                <button 
                  onClick={() => scrollToSection('cancellation')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'cancellation' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Cancellation Policy
                </button>
                <button 
                  onClick={() => scrollToSection('methods')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'methods' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Refund Methods
                </button>
                <button 
                  onClick={() => scrollToSection('processing')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'processing' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Processing Time
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'contact' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Contact Us
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <section id="introduction" className="mb-12">
                  <div className="flex items-center mb-6">
                    <BanknotesIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Refund & Cancellation Policy</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-md">
                      <p className="text-indigo-700 dark:text-indigo-300">
                        At DSR GROUP MANDSAUR, we are committed to ensuring your satisfaction with our services. This Refund and Cancellation Policy 
                        outlines the guidelines and procedures for refunds and cancellations of our services and products. 
                      </p>
                    </div>
                    <p className="mt-4">
                      This policy applies to all services and products offered by DSR GROUP MANDSAUR, including but not limited to investment advisory services, 
                      brokerage services, financial planning services, and educational materials. By using our services, you agree to the terms of this Refund Policy.
                    </p>
                  </div>
                </section>

                <section id="eligibility" className="mb-12">
                  <div className="flex items-center mb-4">
                    <CheckCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Refund Eligibility</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      You may be eligible for a refund under the following circumstances:
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="text-green-800 dark:text-green-400 font-medium mb-2">Service Not Provided</h3>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          If we fail to provide the service you purchased after payment was made and confirmed.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="text-green-800 dark:text-green-400 font-medium mb-2">Technical Issues</h3>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          If technical issues prevent you from accessing or using our service and we are unable to resolve them.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="text-green-800 dark:text-green-400 font-medium mb-2">Subscription Cancellation</h3>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          Prorated refund for the unused portion of subscription services, subject to terms.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="text-green-800 dark:text-green-400 font-medium mb-2">Duplicate Charges</h3>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          If you were charged multiple times for the same service due to a technical error.
                        </p>
                      </div>
                    </div>
                    
                    <p className="mt-6">
                      All refund requests will be evaluated on a case-by-case basis, and we reserve the right to determine eligibility for refunds.
                    </p>
                  </div>
                </section>

                <section id="process" className="mb-12">
                  <div className="flex items-center mb-4">
                    <ArrowPathIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Refund Process</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      To request a refund, please follow these steps:
                    </p>
                    
                    <ol className="mt-4 space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">1</span>
                        <div>
                          <span className="font-medium">Contact our customer support team</span> via email at dsrgroupmandsaur@gmail.com or by phone at +91-9024138649.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">2</span>
                        <div>
                          <span className="font-medium">Provide the following information:</span>
                          <ul className="mt-2 ml-6 list-disc">
                            <li>Your full name and contact information</li>
                            <li>Order/transaction ID or reference number</li>
                            <li>Date of purchase</li>
                            <li>Reason for requesting a refund</li>
                            <li>Any relevant supporting documentation</li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">3</span>
                        <div>
                          <span className="font-medium">Our team will review your request</span> and may contact you for additional information if needed.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">4</span>
                        <div>
                          <span className="font-medium">If your refund is approved,</span> we will process it according to the original payment method used for the purchase.
                        </div>
                      </li>
                    </ol>
                    
                    <p className="mt-6">
                      Refund requests should be submitted within 30 days of the original purchase date, unless otherwise specified in the service agreement.
                    </p>
                  </div>
                </section>

                <section id="exceptions" className="mb-12">
                  <div className="flex items-center mb-4">
                    <XCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Non-refundable Items</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      The following services and products are generally non-refundable:
                    </p>
                    
                    <div className="mt-4 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                          <span>Services that have been fully delivered or completed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                          <span>Personalized or customized investment advisory services once they have commenced</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                          <span>Digital content, including reports, guides, or educational materials that have been downloaded, accessed, or delivered</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                          <span>Transaction fees, processing fees, and administrative charges</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 dark:text-red-400 mr-2">•</span>
                          <span>Services canceled after the cooling-off period specified in the service agreement</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="mt-6">
                      We may make exceptions to these non-refundable items in certain circumstances, such as in cases of 
                      technical issues or service unavailability that prevent access or usage.
                    </p>
                  </div>
                </section>

                <section id="cancellation" className="mb-12">
                  <div className="flex items-center mb-4">
                    <ExclamationCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cancellation Policy</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      For subscription-based services, you may cancel your subscription at any time by following these steps:
                    </p>
                    
                    <ol className="mt-4 space-y-3">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">1</span>
                        <div>
                          Log in to your account on our website or contact our customer support team.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">2</span>
                        <div>
                          Navigate to the subscription management section or request cancellation via customer support.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium mr-3">3</span>
                        <div>
                          Follow the prompts to confirm your cancellation.
                        </div>
                      </li>
                    </ol>
                    
                    <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h3 className="text-yellow-800 dark:text-yellow-400 font-medium mb-2">Important Notes</h3>
                      <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                        <li>Cancellation will take effect at the end of your current billing cycle, unless otherwise specified.</li>
                        <li>For annual subscriptions, cancellation may be subject to early termination fees as outlined in your service agreement.</li>
                        <li>Specific services may have different cancellation policies, which will be detailed in the respective service agreements.</li>
                      </ul>
                    </div>
                    
                    <p className="mt-6">
                      If you cancel a subscription before it expires, you may be eligible for a prorated refund for the unused portion, 
                      depending on the terms of your service agreement.
                    </p>
                  </div>
                </section>

                <section id="methods" className="mb-12">
                  <div className="flex items-center mb-4">
                    <BanknotesIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Refund Methods</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Refunds will be issued using the same payment method used for the original purchase when possible:
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Credit/Debit Card Payments</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Refunded to the same card used for the purchase. Please note that it may take 5-10 business days for the refund to appear on your card statement.
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bank Transfers</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Refunded to the bank account from which the payment was made. Bank transfer refunds may take 7-14 business days to process.
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Digital Wallets</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Refunded to the same digital wallet account (e.g., PayTM, Google Pay) used for the payment. These refunds typically process within 3-5 business days.
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Other Payment Methods</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          For payments made through other methods, we may issue refunds by bank transfer or other appropriate means as determined by our finance department.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="processing" className="mb-12">
                  <div className="flex items-center mb-4">
                    <ClockIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Processing Time</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We strive to process all refund requests promptly. Here's what you can expect:
                    </p>
                    
                    <div className="mt-4 space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                            <CheckCircleIcon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Refund Request Review</h3>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">
                            We will review and respond to your refund request within 2-3 business days.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                            <BanknotesIcon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Refund Processing</h3>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Once approved, we will process your refund within 5-7 business days.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                            <ArrowPathIcon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bank/Card Processing</h3>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">
                            After we process the refund, it may take an additional 5-14 business days for the funds to appear in your account, depending on your financial institution.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-blue-700 dark:text-blue-300">
                        <strong>Please note:</strong> Refund processing times may vary depending on your payment method, financial institution, and the complexity of your refund request.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="contact" className="mb-6">
                  <div className="flex items-center mb-4">
                    <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      If you have any questions about our Refund and Cancellation Policy, please contact us at:
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mt-4">
                      <p className="mb-1"><strong>DSR GROUP MANDSAUR</strong></p>
                      <p className="mb-1">Address: DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001</p>
                      <p className="mb-1">Email: dsrgroupmandsaur@gmail.com</p>
                      <p className="mb-1">Phone: Mobile: +91-9024138649, Landline: 07422 - 496399</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
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