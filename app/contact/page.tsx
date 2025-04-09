"use client"

import { useState, FormEvent, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Check, Send, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/context/theme-context'

export default function ContactPage() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: '',
    message: ''
  })
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  })
  
  const formRef = useRef<HTMLFormElement>(null)
  
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (status.success) {
      timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }))
      }, 8000)
    }
    return () => clearTimeout(timer)
  }, [status.success])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.queryType) {
      setStatus({ loading: false, success: false, error: 'Please fill all required fields' })
      return
    }
    
    if (!validateEmail(formData.email)) {
      setStatus({ loading: false, success: false, error: 'Please enter a valid email address' })
      return
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }
      
      setStatus({ loading: false, success: true, error: '' })
      formRef.current?.reset()
      setFormData({
        name: '',
        phone: '',
        email: '',
        queryType: '',
        message: ''
      })
      
      console.log('Form submitted successfully, success state:', true)
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus({ 
        loading: false, 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send message' 
      })
    }
  }
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-100'}`}>
      <NavBar />
      
      {/* Background effects - theme aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[800px] h-[800px] ${
          theme === 'light' ? 'bg-purple-100/50' : 'bg-purple-900/20'
        } rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/3 right-1/4 w-[600px] h-[600px] ${
          theme === 'light' ? 'bg-blue-100/50' : 'bg-blue-900/20'
        } rounded-full blur-3xl`}></div>
        <div className={`absolute -top-20 -left-20 w-[300px] h-[300px] border ${
          theme === 'light' ? 'border-gray-200' : 'border-gray-800'
        } rounded-full`}></div>
      </div>
      
      {/* Contact page content */}
      <div className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Get in Touch
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column: Contact info and map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className={`${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-gray-900 border-gray-800'
            } backdrop-blur-sm border rounded-2xl p-8 shadow-md`}>
              <h2 className={`text-2xl font-semibold mb-6 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-100'
              }`}>Our Office</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`font-medium ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-100'
                    }`}>Address</h3>
                    <p className={`${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`font-medium ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-100'
                    }`}>Phone</h3>
                    <p className={`${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>Mobile: +91-9024138649</p>
                    <p className={`${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>Landline: 07422 - 496399</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className={`font-medium ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-100'
                    }`}>Email</h3>
                    <p className={`${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>dsrgroupmandsaur@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl overflow-hidden ${
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
          </motion.div>
          
          {/* Right column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={`${
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-gray-900 border-gray-800'
            } backdrop-blur-sm border rounded-2xl p-8 shadow-md`}>
              <h2 className={`text-2xl font-semibold mb-6 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-100'
              }`}>Send us a Message</h2>
              
              {status.success && (
                <div className="mb-8 rounded-lg bg-green-100 dark:bg-green-900/50 p-5 border-l-4 border-green-500 shadow-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-semibold text-green-800 dark:text-green-200">
                        Success! Your message has been sent successfully.
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {status.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                    {status.error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                        : 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                        : 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                        : 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="queryType" className={`block text-sm font-medium mb-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>Query Type *</label>
                  <select
                    id="queryType"
                    name="queryType"
                    value={formData.queryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                        : 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    required
                  >
                    <option value="">Select a query type</option>
                    <option value="Stocks Trading">Stocks Trading</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="IPO">IPO Services</option>
                    <option value="Futures & Options">Futures & Options</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Demat Account">Open Demat Account</option>
                    <option value="Tax Services">Tax Services</option>
                    <option value="Investment Advisory">Investment Advisory</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other </option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                        : 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status.loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-70"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 