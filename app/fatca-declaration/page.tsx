'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentTextIcon, InformationCircleIcon, ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon, GlobeAltIcon, ClipboardDocumentListIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

export default function FATCADeclarationPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">REGULATORY COMPLIANCE</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            FATCA Declaration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Foreign Account Tax Compliance Act (FATCA) is a tax information reporting regime that requires the identification and reporting of U.S. accounts to the U.S. Internal Revenue Service.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contents</h3>
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection('introduction')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'introduction' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Introduction to FATCA
                </button>
                <button 
                  onClick={() => scrollToSection('purpose')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'purpose' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Purpose of Declaration
                </button>
                <button 
                  onClick={() => scrollToSection('who-needs')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'who-needs' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Who Needs to Declare
                </button>
                <button 
                  onClick={() => scrollToSection('declaration-form')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'declaration-form' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Declaration Form
                </button>
                <button 
                  onClick={() => scrollToSection('documentation')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'documentation' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Required Documentation
                </button>
                <button 
                  onClick={() => scrollToSection('confidentiality')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'confidentiality' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Confidentiality
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'contact' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <section id="introduction" className="mb-12">
                <div className="flex items-center mb-6">
                  <InformationCircleIcon className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction to FATCA</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The Foreign Account Tax Compliance Act (FATCA) is a U.S. tax law that aims to combat tax evasion by U.S. 
                    persons holding investments in offshore accounts. Under FATCA, foreign financial institutions (FFIs) 
                    are required to report certain information about financial accounts held by U.S. taxpayers, or by foreign 
                    entities in which U.S. taxpayers hold a substantial ownership interest.
                  </p>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-blue-700 dark:text-blue-300 font-medium">
                      FATCA was enacted in 2010 as part of the Hiring Incentives to Restore Employment (HIRE) Act, and is 
                      designed to increase transparency for the Internal Revenue Service (IRS) with respect to U.S. persons 
                      who may be investing and earning income through non-U.S. institutions.
                    </p>
                  </div>  
                </div>
              </section>

              <section id="purpose" className="mb-12">
                <div className="flex items-center mb-6">
                  <DocumentTextIcon className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Purpose of Declaration</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The FATCA declaration is a self-certification form that individuals and entities must complete to declare 
                    their U.S. or non-U.S. tax status. This declaration helps financial institutions determine whether they need 
                    to report certain account information to tax authorities under FATCA regulations.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h3 className="text-green-700 dark:text-green-400 font-medium mb-2">Benefits of Compliance</h3>
                      <ul className="text-green-700 dark:text-green-300 text-sm space-y-2">
                        <li>Avoid potential withholding tax (30%) on U.S. source income</li>
                        <li>Maintain good standing with financial institutions</li>
                        <li>Prevent account restrictions or closure</li>
                        <li>Ensure compliance with international tax laws</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <h3 className="text-red-700 dark:text-red-400 font-medium mb-2">Risks of Non-Compliance</h3>
                      <ul className="text-red-700 dark:text-red-300 text-sm space-y-2">
                        <li>30% withholding on certain U.S. source payments</li>
                        <li>Potential account closures by financial institutions</li>
                        <li>Additional scrutiny from tax authorities</li>
                        <li>Potential legal penalties</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="who-needs" className="mb-12">
                <div className="flex items-center mb-6">
                  <GlobeAltIcon className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Who Needs to Declare</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The FATCA declaration is generally required from individuals and entities who are:
                  </p>
                  
                  <div className="mt-6 space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Individuals</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">U.S. citizens or U.S. tax residents (including Green Card holders)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Individuals with a U.S. place of birth</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Individuals with a U.S. address or U.S. telephone number</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Individuals with standing instructions to transfer funds to an account maintained in the U.S.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Entities</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">U.S. corporations, partnerships, or associations created or organized in the U.S.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Non-U.S. entities with substantial U.S. owners (generally, owning more than 10%)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Passive Non-Financial Foreign Entities (Passive NFFEs) with U.S. controlling persons</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">Financial institutions that are not participating FFIs or deemed-compliant FFIs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <h4 className="text-yellow-700 dark:text-yellow-400 font-medium">Important Note</h4>
                    </div>
                    <p className="mt-2 text-yellow-700 dark:text-yellow-300 text-sm">
                      Even if you are not a U.S. person, you may still need to complete a FATCA declaration to certify your non-U.S. status. 
                      This helps financial institutions confirm that they do not need to report your account information under FATCA.
                    </p>
                  </div>
                </div>
              </section>

              <section id="declaration-form" className="mb-12">
                <div className="flex items-center mb-6">
                  <DocumentTextIcon className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Declaration Form</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    The FATCA declaration form typically includes the following information:
                  </p>
                  
                  <div className="mt-6 space-y-3 ml-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Full name and address</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Country of tax residence</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Tax identification number (TIN) if applicable</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Place of birth</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Declaration of U.S. or non-U.S. status</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-600 dark:text-gray-400">Signature and date</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      Download FATCA Declaration Form
                    </a>
                  </div>
                </div>
              </section>

              <section id="contact" className="mb-6">
                <div className="flex items-center mb-6">
                  <FingerPrintIcon className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about FATCA requirements or need assistance with your declaration, please contact us at:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mt-4 shadow-sm border border-gray-200 dark:border-gray-600">
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