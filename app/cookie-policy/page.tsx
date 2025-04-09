'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { CogIcon, GlobeAltIcon, ShieldCheckIcon, BellIcon, FingerPrintIcon, ClockIcon, DocumentTextIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

export default function CookiePolicyPage() {
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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">WEBSITE POLICY</span>
            </div>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            This Cookie Policy explains how DSR GROUP MANDSAUR uses cookies and similar technologies to recognize you when you visit our website.
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
                  onClick={() => scrollToSection('what-are-cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'what-are-cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  What Are Cookies
                </button>
                <button 
                  onClick={() => scrollToSection('types-of-cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'types-of-cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Types of Cookies
                </button>
                <button 
                  onClick={() => scrollToSection('how-we-use-cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'how-we-use-cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  How We Use Cookies
                </button>
                <button 
                  onClick={() => scrollToSection('third-party-cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'third-party-cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Third-Party Cookies
                </button>
                <button 
                  onClick={() => scrollToSection('managing-cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'managing-cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Managing Cookies
                </button>
                <button 
                  onClick={() => scrollToSection('policy-updates')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'policy-updates' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Policy Updates
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
              <section id="introduction" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    This Cookie Policy explains how DSR GROUP MANDSAUR ("we", "us", or "our") uses cookies and similar 
                    technologies to recognize you when you visit our website at <a href="https://www.dsrgroupmandsaur.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">www.dsrgroupmandsaur.com</a> ("Website"). 
                    It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                  </p>
                  <p>
                    In some cases, we may use cookies to collect personal information, or information that becomes personal 
                    information if we combine it with other data. In such cases, our Privacy Policy will apply in addition to this Cookie Policy.
                  </p>
                </div>
              </section>

              <section id="what-are-cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Are Cookies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                    Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
                    as well as to provide reporting information.
                  </p>
                  <p>
                    Cookies set by the website owner (in this case, DSR GROUP MANDSAUR) are called "first-party cookies". 
                    Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies 
                    enable third-party features or functionality to be provided on or through the website (e.g., advertising, 
                    interactive content, and analytics). The parties that set these third-party cookies can recognize your 
                    computer both when it visits the website in question and also when it visits certain other websites.
                  </p>
                </div>
              </section>

              <section id="types-of-cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <CogIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Cookies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We use the following types of cookies:
                  </p>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        These cookies are necessary for the Website to function and cannot be switched off in our systems. 
                        They are usually only set in response to actions made by you which amount to a request for services, 
                        such as setting your privacy preferences, logging in, or filling in forms.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Performance & Analytics Cookies</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
                        They help us know which pages are the most and least popular and see how visitors move around the site.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Functionality Cookies</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        These cookies enable the Website to provide enhanced functionality and personalization. They may be set by us or by 
                        third-party providers whose services we have added to our pages.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Targeting & Advertising Cookies</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        These cookies may be set through our site by our advertising partners. They may be used by those companies to build 
                        a profile of your interests and show you relevant advertisements on other sites.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="how-we-use-cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldExclamationIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Cookies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We use cookies for several reasons. Some cookies are required for technical reasons in order for our 
                    Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies 
                    also enable us to track and target the interests of our users to enhance the experience on our Website. 
                    Third parties serve cookies through our Website for advertising, analytics, and other purposes.
                  </p>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Specifically, we use cookies for the following purposes:</h3>
                      <ul className="mt-2 list-disc pl-5 space-y-2">
                        <li>To enable you to log in and access secure areas of our Website</li>
                        <li>To remember your preferences and settings</li>
                        <li>To analyze how our Website is used and improve its performance</li>
                        <li>To help us understand how visitors interact with our Website</li>
                        <li>To identify and prevent security risks</li>
                        <li>To personalize content and remember your site preferences</li>
                        <li>To show you relevant advertising on and off our Website</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="third-party-cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Cookies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. 
                    These companies may use information about your visits to this and other websites in order to provide relevant 
                    advertisements about goods and services that you may be interested in. They may also employ technology that is 
                    used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons 
                    to collect information about your visits to this and other sites in order to provide relevant advertisements about 
                    goods and services of potential interest to you.
                  </p>
                  
                  <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Third-Party Services We Use</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Google Analytics</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          We use Google Analytics to analyze the use of our Website. Google Analytics gathers information about website 
                          use by means of cookies. The information gathered relating to our Website is used to create reports about the 
                          use of our Website.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media Buttons</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Our Website includes social media features, such as Facebook, Twitter, and LinkedIn buttons. These features 
                          may collect your IP address, which page you are visiting on our Website, and may set a cookie to enable the 
                          feature to function properly. Your interactions with these features are governed by the privacy policy of the 
                          company providing it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="managing-cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <BellIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Managing Cookies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser 
                    to browser, and from version to version.
                  </p>
                  
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-yellow-800 dark:text-yellow-400 font-medium mb-2">Please Note</h3>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Blocking all cookies will have a negative impact upon the usability of many websites. If you block cookies, 
                      you will not be able to use all the features on our Website.
                    </p>
                  </div>
                </div>
              </section>

              <section id="policy-updates" className="mb-12">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Policy Updates</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use 
                    or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to 
                    stay informed about our use of cookies and related technologies.
                  </p>
                  <p className="mt-2">
                    The date at the top of this Cookie Policy indicates when it was last updated.
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-6">
                <div className="flex items-center mb-4">
                  <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about our use of cookies or other technologies, please contact us at:
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