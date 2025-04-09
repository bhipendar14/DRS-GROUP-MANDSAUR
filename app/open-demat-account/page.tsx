'use client'

import { useState } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowRightIcon, CheckCircleIcon, DocumentTextIcon, IdentificationIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function OpenDematAccountPage() {
  const { theme, toggleTheme } = useTheme()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    accountType: 'individual',
    queryType: 'general',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setFormSubmitted(true)
      } else {
        alert('There was an error submitting your query. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your query. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const requirements = [
    { id: 1, name: 'PAN Card', description: 'Valid and active PAN card is mandatory for all account holders' },
    { id: 2, name: 'Aadhaar Card', description: 'For address proof and e-KYC verification' },
    { id: 3, name: 'Bank Account', description: 'Active savings account with a valid IFSC code' },
    { id: 4, name: 'Passport-sized Photographs', description: 'Recent passport-sized photographs' },
    { id: 5, name: 'Income Proof', description: 'For trading accounts (like salary slips, ITR, etc.)' }
  ]

  const benefits = [
    { id: 1, title: 'Safety & Security', description: 'Electronic storage eliminates risks associated with physical certificates', icon: ShieldCheckIcon },
    { id: 2, title: 'Seamless Trading', description: 'Buy or sell securities with ease through our trading platforms', icon: CheckCircleIcon },
    { id: 3, title: 'Reduced Paperwork', description: 'No physical handling of documents for most transactions', icon: DocumentTextIcon },
    { id: 4, title: 'Lower Transaction Costs', description: 'Reduced charges compared to physical share transactions', icon: LockClosedIcon },
    { id: 5, title: 'Easy Portfolio Tracking', description: 'Monitor all your investments in one place', icon: IdentificationIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DSR GROUP MANDSAUR</h1>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Open Your Demat Account
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start your investment journey with DSR GROUP MANDSAUR. Open a Demat account today and gain access to a world of investment opportunities.
          </p>
          
          {/* New CTA Section with the TRX20 Scheme Link - Without Border */}
          <div className="mt-10">
            <div className="mx-auto max-w-3xl rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  Open your Free Demat Account with Scheme TRX20
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get started with our special offer scheme - quick account opening with premium benefits!
                </p>
                <a 
                  href="https://ekyc.motilaloswal.com/Partner/?diyid=0b5fb411-b64a-4ec8-bc49-b316540e42d5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 text-xl"
                >
                  Open Account Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </a>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Fast, secure, and hassle-free account opening process
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Benefits of a Demat Account
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
                  <benefit.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Account Opening Process */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Account Opening Process
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <ol className="list-none space-y-10 relative border-l border-gray-300 dark:border-gray-700 ml-4">
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 text-white">1</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Complete the Registration Form</h3>
                  <p className="text-gray-600 dark:text-gray-300">Fill in your basic details in our online form below or visit our office to get started.</p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 text-white">2</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">KYC Verification</h3>
                  <p className="text-gray-600 dark:text-gray-300">Complete your KYC verification through in-person verification or e-KYC.</p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 text-white">3</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sign the Agreement</h3>
                  <p className="text-gray-600 dark:text-gray-300">Review and sign the account opening agreement digitally or physically.</p>
                </li>
                <li className="ml-8">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full -left-4 text-white">4</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Account Activation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Your Demat account will be activated within 24-48 hours of completing all requirements.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Documents Required
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {requirements.map((requirement) => (
                <li key={requirement.id} className="p-6">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-3" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{requirement.name}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">{requirement.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Add Another CTA Before the Form - Updated without border */}
        <section className="mb-20 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
              Ready to Open Your Account?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Skip the paperwork and open your Demat account online with our special TRX20 scheme. Get started in minutes!
            </p>
            <a 
              href="https://ekyc.motilaloswal.com/Partner/?diyid=0b5fb411-b64a-4ec8-bc49-b316540e42d5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              Open Your Free Demat Account
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>

        {/* Registration Form - Renamed to Queries Box */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
            Open Demat Account Queries
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              {/* Purple header bar */}
              <div className="bg-indigo-600 h-16"></div>
              
              <div className="p-8">
                {formSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="h-12 w-12 text-green-500 dark:text-green-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                      We've received your query. Our team will contact you shortly to assist with your Demat account needs.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="John Doe"
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="example@email.com"
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="+91 9876543210"
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            placeholder="Mumbai"
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <select
                            id="accountType"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleInputChange}
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                          >
                            <option value="individual">Individual</option>
                            <option value="joint">Joint</option>
                            <option value="corporate">Corporate</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Query Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <select
                            id="queryType"
                            name="queryType"
                            value={formData.queryType}
                            onChange={handleInputChange}
                            className="pl-10 block w-full h-12 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="account_opening">Account Opening</option>
                            <option value="kyc">KYC Process</option>
                            <option value="documents">Required Documents</option>
                            <option value="charges">Charges & Fees</option>
                            <option value="technical">Technical Support</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Please provide any specific details about your query..."
                            className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                            I agree to the{' '}
                            <Link href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline">
                              terms and conditions
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-12 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-all duration-200 text-center w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Query'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <dl className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="px-6 py-4 sm:p-6">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">What is a Demat account?</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  A Demat account is an account that holds your financial securities in electronic form, eliminating the need for physical certificates and making trading easier and more secure.
                </dd>
              </div>
              <div className="px-6 py-4 sm:p-6">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">Is there any annual maintenance charge?</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Yes, there is an Annual Maintenance Charge (AMC) associated with Demat accounts. Please contact us for our current fee structure.
                </dd>
              </div>
              <div className="px-6 py-4 sm:p-6">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">How long does it take to open a Demat account?</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Once all required documents and forms are submitted, your Demat account can be opened within 1-2 business days.
                </dd>
              </div>
              <div className="px-6 py-4 sm:p-6">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">Can I have multiple Demat accounts?</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Yes, you can have multiple Demat accounts with different depository participants (DPs).
                </dd>
              </div>
              <div className="px-6 py-4 sm:p-6">
                <dt className="text-lg font-medium text-gray-900 dark:text-white">How do I check my Demat account balance?</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  You can check your Demat account balance through our online portal, mobile app, or by requesting a statement from our office.
                </dd>
              </div>
            </dl>
          </div>
        </section>
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