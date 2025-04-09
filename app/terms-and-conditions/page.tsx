'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpenIcon, ScaleIcon, ShieldCheckIcon, DocumentIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

export default function TermsAndConditionsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services. By accessing or using our services, you agree to be bound by these terms.
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
                  onClick={() => scrollToSection('acceptance')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'acceptance' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Acceptance of Terms
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'services' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Services Description
                </button>
                <button 
                  onClick={() => scrollToSection('user-obligations')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'user-obligations' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  User Obligations
                </button>
                <button 
                  onClick={() => scrollToSection('intellectual-property')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'intellectual-property' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Intellectual Property
                </button>
                <button 
                  onClick={() => scrollToSection('privacy')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'privacy' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => scrollToSection('disclaimers')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'disclaimers' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Disclaimers & Limitations
                </button>
                <button 
                  onClick={() => scrollToSection('indemnification')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'indemnification' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Indemnification
                </button>
                <button 
                  onClick={() => scrollToSection('governing-law')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'governing-law' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Governing Law
                </button>
                <button 
                  onClick={() => scrollToSection('modifications')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'modifications' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Modifications to Terms
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'contact' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Contact Information
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <section id="introduction" className="mb-12">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Welcome to DSR GROUP MANDSAUR. These Terms and Conditions govern your use of our website, mobile applications, and services (collectively, the "Services"). 
                    By accessing or using our Services, you agree to be bound by these Terms and Conditions and our Privacy Policy, which is incorporated by reference.
                  </p>
                  <p>
                    If you do not agree to these Terms and Conditions, please do not use our Services. Our Services are intended for users who are at least 18 years of age. 
                    By using our Services, you represent and warrant that you are at least 18 years old.
                  </p>
                </div>
              </section>

              <section id="acceptance" className="mb-12">
                <div className="flex items-center mb-4">
                  <ScaleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
                    If you do not agree with any part of these terms, you must not use our Services.
                  </p>
                  <p>
                    We reserve the right to update, change, or replace any part of these Terms and Conditions by posting updates or changes to our website. 
                    It is your responsibility to check our website periodically for changes. Your continued use of our Services following the posting of any changes 
                    constitutes acceptance of those changes.
                  </p>
                </div>
              </section>

              <section id="services" className="mb-12">
                <div className="flex items-center mb-4">
                  <DocumentIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Description</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    DSR GROUP MANDSAUR provides a range of financial and investment services, including but not limited to:
                  </p>
                  <ul>
                    <li>Investment advisory services</li>
                    <li>Stock and securities brokerage</li>
                    <li>Mutual fund distribution</li>
                    <li>Financial planning and wealth management</li>
                    <li>Educational resources and investment tools</li>
                  </ul>
                  <p>
                    Our Services may include features that allow you to create accounts, submit information, participate in discussions, 
                    and engage with various investment tools and calculators. We may modify, suspend, or discontinue any aspect of our Services at any time.
                  </p>
                </div>
              </section>

              <section id="user-obligations" className="mb-12">
                <div className="flex items-center mb-4">
                  <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Obligations</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    By using our Services, you agree to:
                  </p>
                  <ul>
                    <li>Provide accurate, current, and complete information when creating accounts or using our Services</li>
                    <li>Maintain the security of your account and password</li>
                    <li>Notify us immediately of any unauthorized access or use of your account</li>
                    <li>Use our Services in compliance with all applicable laws and regulations</li>
                    <li>Not use our Services for any illegal or unauthorized purpose</li>
                    <li>Not attempt to interfere with the proper functioning of our Services</li>
                  </ul>
                  <p>
                    You acknowledge that all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials ("Content") 
                    shared through our Services are the sole responsibility of the person from whom such Content originated. This means that you, and not DSR GROUP MANDSAUR, 
                    are entirely responsible for all Content that you upload, post, email, transmit, or otherwise make available via our Services.
                  </p>
                </div>
              </section>

              <section id="intellectual-property" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Intellectual Property</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    All content, features, and functionality on our Services, including but not limited to text, graphics, logos, icons, images, audio clips, 
                    digital downloads, data compilations, and software, are the exclusive property of DSR GROUP MANDSAUR, its licensors, or other content suppliers 
                    and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit 
                    any of the material on our Services, except as follows:
                  </p>
                  <ul>
                    <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                    <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                    <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
                  </ul>
                </div>
              </section>

              <section id="privacy" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Your use of our Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms and Conditions. 
                    Our Privacy Policy outlines how we collect, use, store, and disclose your personal information. By using our Services, you consent to 
                    the collection and use of your information as described in our Privacy Policy.
                  </p>
                  <p>
                    We take appropriate security measures to protect your personal information. However, no method of transmission over the internet or 
                    electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section id="disclaimers" className="mb-12">
                <div className="flex items-center mb-4">
                  <ScaleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclaimers and Limitations of Liability</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH OUR SERVICES MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. 
                    CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. DSR GROUP MANDSAUR AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES TO OUR 
                    SERVICES AT ANY TIME.
                  </p>
                  <p>
                    DSR GROUP MANDSAUR DOES NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES 
                    OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. DSR GROUP MANDSAUR DOES NOT WARRANT OR MAKE ANY 
                    REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF OUR SERVICES IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR OTHERWISE.
                  </p>
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DSR GROUP MANDSAUR, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, 
                    EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE 
                    OF OUR SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                  </p>
                </div>
              </section>

              <section id="indemnification" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Indemnification</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    You agree to defend, indemnify, and hold harmless DSR GROUP MANDSAUR, its affiliates, licensors, and service providers, and its and their respective 
                    officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, 
                    judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms 
                    and Conditions or your use of our Services.
                  </p>
                </div>
              </section>

              <section id="governing-law" className="mb-12">
                <div className="flex items-center mb-4">
                  <ScaleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    These Terms and Conditions and any disputes relating to these terms or our Services shall be governed by and construed in accordance with the 
                    laws of India, without regard to its conflict of law principles.
                  </p>
                  <p>
                    Any legal suit, action, or proceeding arising out of or related to these Terms and Conditions or our Services shall be instituted exclusively 
                    in the courts located in Mandsaur, Madhya Pradesh, India, and you and DSR GROUP MANDSAUR irrevocably submit to the jurisdiction of such courts.
                  </p>
                </div>
              </section>

              <section id="modifications" className="mb-12">
                <div className="flex items-center mb-4">
                  <DocumentIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Modifications to Terms</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    DSR GROUP MANDSAUR reserves the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. If a revision is material, 
                    we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                  <p>
                    By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to 
                    the new terms, you are no longer authorized to use our Services.
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <div className="flex items-center mb-4">
                  <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mt-4">
                    <p className="mb-1"><strong>DSR GROUP MANDSAUR</strong></p>
                    <p className="mb-1">DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001</p>
                    <p className="mb-1">Email: dsrgroupmandsaur@gmail.com</p>
                    <p className="mb-1">Phone: Mobile: +91-9024138649, Landline: 07422 - 496399</p>
                  </div>
                </div>
              </section>
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