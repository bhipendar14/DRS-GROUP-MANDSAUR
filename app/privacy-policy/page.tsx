'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheckIcon, LockClosedIcon, DocumentTextIcon, FingerPrintIcon, CogIcon, GlobeAltIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            At DSR GROUP MANDSAUR, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
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
                  onClick={() => scrollToSection('information-collection')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'information-collection' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Information We Collect
                </button>
                <button 
                  onClick={() => scrollToSection('information-use')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'information-use' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  How We Use Your Information
                </button>
                <button 
                  onClick={() => scrollToSection('information-sharing')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'information-sharing' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Information Sharing
                </button>
                <button 
                  onClick={() => scrollToSection('cookies')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'cookies' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Cookies & Tracking
                </button>
                <button 
                  onClick={() => scrollToSection('data-security')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'data-security' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Data Security
                </button>
                <button 
                  onClick={() => scrollToSection('your-rights')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'your-rights' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Your Rights
                </button>
                <button 
                  onClick={() => scrollToSection('children')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'children' 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/30'
                  }`}
                >
                  Children's Privacy
                </button>
                <button 
                  onClick={() => scrollToSection('updates')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'updates' 
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <section id="introduction" className="mb-12">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    This Privacy Policy explains how DSR GROUP MANDSAUR ("we," "us," or "our") collects, uses, discloses, and safeguards your information 
                    when you visit our website, use our mobile application, or engage with our services, including financial services, investment advisory, 
                    and related products and services (collectively, the "Services").
                  </p>
                  <p>
                    We respect your privacy and are committed to protecting your personal information. Please read this Privacy Policy carefully to understand 
                    our practices regarding your personal data. By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with 
                    our policies and practices, please do not use our Services.
                  </p>
                  <p>
                    This Privacy Policy applies to information we collect:
                  </p>
                  <ul>
                    <li>On our website and mobile application</li>
                    <li>Through email, text, and other electronic communications</li>
                    <li>When you interact with our advertising and applications on third-party websites and services</li>
                    <li>When you provide information for our financial and investment services</li>
                  </ul>
                </div>
              </section>

              <section id="information-collection" className="mb-12">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We collect several types of information from and about users of our Services, including:
                  </p>
                  
                  <h3>Personal Information</h3>
                  <p>
                    Personal information is data that can be used to identify you individually. This may include:
                  </p>
                  <ul>
                    <li>Contact information (name, email address, postal address, phone number)</li>
                    <li>Government-issued identification (PAN, Aadhaar, etc.)</li>
                    <li>Financial information (bank details, income details, investment history)</li>
                    <li>Employment information</li>
                    <li>Profile information when you create an account</li>
                    <li>Information you provide when filling out forms on our Services</li>
                  </ul>
                  
                  <h3>Non-Personal Information</h3>
                  <p>
                    We also collect non-personal information, which does not directly identify you. This may include:
                  </p>
                  <ul>
                    <li>Device information (browser type, operating system, device type)</li>
                    <li>Usage data (pages visited, time spent, clicks, interactions)</li>
                    <li>IP address and general location information</li>
                    <li>Referring websites or applications</li>
                  </ul>
                  
                  <h3>Information Collection Methods</h3>
                  <p>
                    We collect information through:
                  </p>
                  <ul>
                    <li>Direct interactions (forms, applications, account registration)</li>
                    <li>Automated technologies (cookies, web beacons, tracking technologies)</li>
                    <li>Third-party sources (KYC verification agencies, credit bureaus, business partners)</li>
                  </ul>
                </div>
              </section>

              <section id="information-use" className="mb-12">
                <div className="flex items-center mb-4">
                  <CogIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We use the information we collect about you for various purposes, including:
                  </p>
                  <ul>
                    <li>Providing, maintaining, and improving our Services</li>
                    <li>Processing transactions and completing financial operations</li>
                    <li>Fulfilling our contractual obligations to you</li>
                    <li>Verifying your identity and conducting KYC checks as required by regulations</li>
                    <li>Sending administrative notifications, service updates, and support messages</li>
                    <li>Sending marketing communications and promotional offers (with your consent where required)</li>
                    <li>Personalizing your experience and delivering content relevant to your interests</li>
                    <li>Monitoring and analyzing usage patterns and trends to improve our Services</li>
                    <li>Detecting, preventing, and addressing technical issues, security breaches, or fraudulent activities</li>
                    <li>Complying with legal obligations and regulatory requirements</li>
                  </ul>
                  <p>
                    We may combine information we collect about you from various sources to create a more tailored, secure, and efficient experience.
                  </p>
                </div>
              </section>

              <section id="information-sharing" className="mb-12">
                <div className="flex items-center mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information Sharing</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We may share your information in the following situations:
                  </p>
                  
                  <h3>Service Providers</h3>
                  <p>
                    We share information with third-party vendors, service providers, and business partners who perform services on our behalf, 
                    such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                  </p>
                  
                  <h3>Legal Requirements</h3>
                  <p>
                    We may disclose your information where required to comply with laws, regulations, legal processes, or governmental requests, 
                    including to meet national security or law enforcement requirements.
                  </p>
                  
                  <h3>Business Transfers</h3>
                  <p>
                    If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company assets, your information 
                    may be transferred as part of such a transaction.
                  </p>
                  
                  <h3>With Your Consent</h3>
                  <p>
                    We may share your information with third parties when you have given us your consent to do so.
                  </p>
                  
                  <h3>Affiliates and Business Partners</h3>
                  <p>
                    We may share your information with our affiliates or business partners to offer you certain products, services, or promotions.
                  </p>
                  
                  <p>
                    We do not sell, rent, or lease your personal information to third parties without your consent, except as disclosed in this Privacy Policy.
                  </p>
                </div>
              </section>

              <section id="cookies" className="mb-12">
                <div className="flex items-center mb-4">
                  <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies & Tracking Technologies</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We use cookies and similar tracking technologies to track activity on our Services and store certain information. 
                    Cookies are files with a small amount of data that may include an anonymous unique identifier. They are sent to your 
                    browser from a website and stored on your device.
                  </p>
                  
                  <p>
                    We use different types of cookies:
                  </p>
                  <ul>
                    <li><strong>Essential cookies</strong>: Necessary for the operation of our Services.</li>
                    <li><strong>Analytical/performance cookies</strong>: Allow us to recognize and count the number of visitors and see how visitors move around our Services.</li>
                    <li><strong>Functionality cookies</strong>: Used to recognize you when you return to our Services and to personalize content.</li>
                    <li><strong>Targeting cookies</strong>: Record your visit to our Services, the pages you have visited, and the links you have followed.</li>
                  </ul>
                  
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
                    you may not be able to use some portions of our Services.
                  </p>
                </div>
              </section>

              <section id="data-security" className="mb-12">
                <div className="flex items-center mb-4">
                  <LockClosedIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information from 
                    accidental loss, unauthorized access, use, alteration, or disclosure. Our security measures include:
                  </p>
                  <ul>
                    <li>Encryption of sensitive data</li>
                    <li>Secure socket layer (SSL) technology</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Physical security measures for our facilities</li>
                  </ul>
                  <p>
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially 
                    acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                    unless a longer retention period is required or permitted by law, such as tax, accounting, or other legal requirements.
                  </p>
                </div>
              </section>

              <section id="your-rights" className="mb-12">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul>
                    <li><strong>Access</strong>: You may request access to your personal information we hold about you.</li>
                    <li><strong>Correction</strong>: You may request that we correct inaccurate or incomplete personal information.</li>
                    <li><strong>Deletion</strong>: You may request that we delete your personal information in certain circumstances.</li>
                    <li><strong>Restriction</strong>: You may request that we restrict the processing of your personal information.</li>
                    <li><strong>Data portability</strong>: You may request to receive your personal information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Objection</strong>: You may object to our processing of your personal information.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below. 
                    We may need to verify your identity before responding to your request.
                  </p>
                  <p>
                    Please note that these rights may be limited in some circumstances by local law requirements.
                  </p>
                </div>
              </section>

              <section id="children" className="mb-12">
                <div className="flex items-center mb-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Children's Privacy</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our Services are not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally 
                    identifiable information from Children. If you are a parent or guardian and you are aware that your Child has provided 
                    us with personal information, please contact us. If we become aware that we have collected personal information from 
                    Children without verification of parental consent, we take steps to remove that information from our servers.
                  </p>
                </div>
              </section>

              <section id="updates" className="mb-12">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Policy Updates</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                    on this page and updating the "Last updated" date at the top of this page.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective 
                    when they are posted on this page. Your continued use of our Services after we post any modifications to the Privacy Policy 
                    will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                  </p>
                  <p>
                    If we make material changes to this Privacy Policy, we will notify you either through the email address you have provided us 
                    or by placing a prominent notice on our website.
                  </p>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <div className="flex items-center mb-4">
                  <FingerPrintIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
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