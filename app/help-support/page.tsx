"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  User, 
  ChevronDown, 
  MapPin,
  Send,
  Check
} from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

export default function HelpSupportPage() {

  
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('faq')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }
  
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value
    })
  }
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!contactForm.name || !contactForm.phone || !contactForm.email || !contactForm.queryType) {
      setError('Please fill all required fields')
      return
    }
    
    if (!validateEmail(contactForm.email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      formRef.current?.reset()
      setContactForm({
        name: '',
        phone: '',
        email: '',
        queryType: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // FAQ data - simplified
  const faqData = [
    {
      question: "How do I open a trading account with DSR Group Mandsaur?",
      answer: "Opening an account with DSR Group Mandsaur is simple. Visit our 'Open Account' page, fill in the required details, upload your documents (PAN card, Aadhaar, and bank statement), complete the e-KYC process, and sign the digital agreement. Our team will verify your details and activate your account within 24-48 hours."
    },
    {
      question: "What documents are required to open an account?",
      answer: "To open an account, you'll need a PAN card, Aadhaar card for verification, a bank statement or canceled cheque for bank proof, and a recent passport-sized photograph. All documents should be valid and clearly legible."
    },
    {
      question: "How do I place a trade on the DSR trading platform?",
      answer: "To place a trade, log in to your DSR trading platform, search for the desired stock or instrument, click on 'Buy' or 'Sell,' enter the quantity and price (for limit orders), review the order details, and click 'Submit.' You can track your order status in the 'Order Book' section."
    },
    {
      question: "How do I add funds to my trading account?",
      answer: "You can add funds to your trading account through multiple methods: UPI (instant), Net Banking (same-day credit), NEFT/RTGS (may take a few hours), or by setting up an auto-pay mandate. Simply log in to your account, go to 'Funds' section, select 'Add Funds,' choose your preferred payment method, and follow the instructions."
    },
    {
      question: "What is the process for withdrawing funds?",
      answer: "To withdraw funds, log in to your account, navigate to the 'Funds' section, select 'Withdraw Funds,' enter the amount you wish to withdraw, verify your bank details, and confirm the transaction. Withdrawals are processed within 24 hours and credited to your registered bank account only."
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className={`py-12 px-4 ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-white'}`}>
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Help & Support Center
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Get answers to your questions and connect with our support team for assistance.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search for help topics..." 
                className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white text-blue-700">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Options Tabs */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-12">
            <button 
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-lg font-medium mb-2 ${
                activeTab === 'faq' 
                  ? theme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-700 text-white'
                  : theme === 'light' 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <HelpCircle size={18} className="inline mr-2" /> FAQs
            </button>
            
            <button 
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 rounded-lg font-medium mb-2 ${
                activeTab === 'contact' 
                  ? theme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-700 text-white'
                  : theme === 'light' 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <MessageSquare size={18} className="inline mr-2" /> Contact Us
            </button>
            
            <button 
              onClick={() => setActiveTab('offices')}
              className={`px-6 py-3 rounded-lg font-medium mb-2 ${
                activeTab === 'offices' 
                  ? theme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-700 text-white'
                  : theme === 'light' 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <MapPin size={18} className="inline mr-2" /> Office Locations
            </button>
          </div>
          
          {/* FAQ Content */}
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto">
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`rounded-lg overflow-hidden ${
                      theme === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className={`w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none ${
                        theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'
                      }`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {openFaq === index && (
                      <div className={`p-4 pt-0 border-t ${
                        theme === 'light' ? 'border-gray-100' : 'border-gray-700'
                      }`}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact Us Content */}
          {activeTab === 'contact' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Contact Information
                  </h2>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'light' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-purple-900/30 text-purple-400'
                    }`}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Address</h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'light' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-purple-900/30 text-purple-400'
                    }`}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Phone</h3>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Mobile: +91-9024138649<br />
                        Landline: 07422 - 496399
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'light' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-purple-900/30 text-purple-400'
                    }`}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Email</h3>
                      <a 
                        
                        className={`hover ${
                          theme === 'light' ? 'text-white-600' : 'text-white-400'
                        }`}
                      >
                        dsrgroupmandsaur@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className={`rounded-xl p-6 ${
                    theme === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-800 border border-gray-700'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Send Us a Message
                    </h3>
                    
                    {isSubmitted ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">Message Sent Successfully!</h3>
                        <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-6">
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                            {error}
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg ${
                              theme === 'light' 
                                ? 'bg-gray-50 border border-gray-200' 
                                : 'bg-gray-700 border border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Your name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg ${
                              theme === 'light' 
                                ? 'bg-gray-50 border border-gray-200' 
                                : 'bg-gray-700 border border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Your phone number"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg ${
                              theme === 'light' 
                                ? 'bg-gray-50 border border-gray-200' 
                                : 'bg-gray-700 border border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Your email address"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="queryType" className="block text-sm font-medium mb-2">
                            Query Type *
                          </label>
                          <select
                            id="queryType"
                            name="queryType"
                            value={contactForm.queryType}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg ${
                              theme === 'light' 
                                ? 'bg-gray-50 border border-gray-200' 
                                : 'bg-gray-700 border border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          >
                            <option value="">Select a query type</option>
                            <option value="Stock">Stock</option>
                            <option value="Loan">Loan</option>
                            <option value="Income Tax">Income Tax</option>
                            <option value="GST Services">GST Services</option>
                            <option value="RERA">RERA</option>
                            <option value="Audit & Assurance">Audit & Assurance</option>
                            <option value="Mutual Funds">Mutual Funds</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInputChange}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg ${
                              theme === 'light' 
                                ? 'bg-gray-50 border border-gray-200' 
                                : 'bg-gray-700 border border-gray-600'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Please describe your issue in detail..."
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center ${
                            theme === 'light' 
                              ? 'bg-purple-600 text-white hover:bg-purple-700' 
                              : 'bg-purple-700 text-white hover:bg-purple-600'
                          } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'} 
                          {!isSubmitting && <Send size={18} className="ml-2" />}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Office Locations Content */}
          {activeTab === 'offices' && (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                  className={`p-6 rounded-xl ${
                    theme === 'light' 
                      ? 'bg-white border border-gray-100 shadow-sm' 
                      : 'bg-gray-800 border border-gray-700'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Mandsaur (Head Office)
                  </h3>
                  <p className="mb-4">
                    DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      Mobile: +91-9024138649
                    </p>
                    <p className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      Landline: 07422 - 496399
                    </p>
                    <p className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      dsrgroupmandsaur@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className={`rounded-xl overflow-hidden ${
                  theme === 'light' 
                    ? 'border-gray-200' 
                    : 'border-gray-800'
                  } border shadow-md`}>
                  <div className="relative aspect-[4/3] w-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.662825219631!2d75.06658107498772!3d24.08340747779791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39642de670cce563%3A0xc75ed3cf73f3dd1f!2sDSR%20GROUP%20MANDSAUR!5e0!3m2!1sen!2sin!4v1709720284607!5m2!1sen!2sin"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
} 