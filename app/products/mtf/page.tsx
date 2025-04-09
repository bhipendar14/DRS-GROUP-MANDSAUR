"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChevronRight, Shield, TrendingUp, BarChart4, Wallet, Clock, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MTFPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`py-20 px-4 ${theme === 'light' ? 'bg-gradient-to-r from-purple-50 to-indigo-50' : 'bg-gradient-to-r from-gray-900 to-gray-800'}`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Margin Trading Facility (MTF)
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Amplify your investment potential with our Margin Trading Facility. Get up to 5x leverage on your investments and capitalize on market opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className={`py-3 px-8 rounded-lg font-medium transition-all ${
                theme === 'light' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-700 text-white hover:bg-purple-600'
              }`}>
                Open MTF Account
              </Link>
              <Link href="#how-it-works" className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-white text-purple-600 hover:bg-gray-100 border border-purple-200' 
                  : 'bg-gray-800 text-purple-400 hover:bg-gray-700 border border-gray-700'
              }`}>
                Learn More <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* What is MTF Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              What is Margin Trading Facility?
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              Margin Trading Facility (MTF) is a loan facility provided by brokers that allows investors 
              to buy more securities than what would be possible with their available funds. With MTF, 
              you can leverage your existing capital to potentially increase your returns.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              At DSR Group, our MTF service allows you to purchase stocks worth up to 5 times your 
              available funds. This means with just ₹1 lakh, you can buy stocks worth up to ₹5 lakhs 
              by using the margin funding we provide.
            </p>
            <div className={`p-6 rounded-xl mt-10 ${
              theme === 'light' ? 'bg-blue-50 border border-blue-100' : 'bg-blue-900/20 border border-blue-900/30'
            }`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`}>
                Example
              </h3>
              <p className="mb-4">
                If you have ₹1,00,000 as capital and want to buy shares of a company trading at ₹2,000 per share:
              </p>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-800'
                }`}>
                  <p className="font-medium">Without MTF:</p>
                  <p>You can buy maximum 50 shares (₹1,00,000 ÷ ₹2,000 = 50 shares)</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'light' 
                    ? 'bg-white border-l-4 border-green-500' 
                    : 'bg-gray-800 border-l-4 border-green-500'
                }`}>
                  <p className="font-medium">With MTF (5x leverage):</p>
                  <p>You can buy up to 250 shares (₹5,00,000 ÷ ₹2,000 = 250 shares)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              How MTF Works
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 ${
                  theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
                }`}>
                  1
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    You select eligible stocks
                  </h3>
                  <p>
                    Choose from our extensive list of 500+ MTF-eligible securities across various sectors.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 ${
                  theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
                }`}>
                  2
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    We provide the additional capital
                  </h3>
                  <p>
                    DSR Group funds the additional amount (up to 4x your capital) required to purchase the stocks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 ${
                  theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
                }`}>
                  3
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    You pay interest only on the used amount
                  </h3>
                  <p>
                    A competitive interest rate is charged only on the amount borrowed, calculated on a daily basis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 ${
                  theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
                }`}>
                  4
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Flexible repayment options
                  </h3>
                  <p>
                    You can repay the borrowed amount at any time or continue the position as long as margin requirements are met.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Benefits of Margin Trading
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'
              }`}>
                <TrendingUp size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Amplified Returns
              </h3>
              <p>
                Potential to multiply your returns by investing more capital than you currently have available.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
              }`}>
                <BarChart4 size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Diverse Opportunities
              </h3>
              <p>
                Access to 500+ eligible securities across various sectors to diversify your portfolio effectively.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/30 text-purple-400'
              }`}>
                <Wallet size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Capital Efficiency
              </h3>
              <p>
                Make your existing capital work harder and take advantage of market opportunities without liquidating other investments.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-amber-100 text-amber-600' : 'bg-amber-900/30 text-amber-400'
              }`}>
                <Clock size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Flexible Duration
              </h3>
              <p>
                Hold your positions for as long as you need, with no fixed repayment schedule as long as margin requirements are maintained.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-red-100 text-red-600' : 'bg-red-900/30 text-red-400'
              }`}>
                <Zap size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Quick Access
              </h3>
              <p>
                Instant funding available when you spot a market opportunity, with a simple and streamlined process.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                theme === 'light' ? 'bg-teal-100 text-teal-600' : 'bg-teal-900/30 text-teal-400'
              }`}>
                <Shield size={24} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Secure & Transparent
              </h3>
              <p>
                Complete transparency in interest calculations, with real-time monitoring of your positions and margin requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our MTF Services
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    MTF Premium
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                      }`}>
                        ✓
                      </div>
                      <span>Up to 5x leverage on eligible securities</span>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                      }`}>
                        ✓
                      </div>
                      <span>Competitive interest rates starting at 12% per annum</span>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                      }`}>
                        ✓
                      </div>
                      <span>Access to 500+ eligible securities</span>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                      }`}>
                        ✓
                      </div>
                      <span>Dedicated relationship manager</span>
                    </li>
                    <li className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                      }`}>
                        ✓
                      </div>
                      <span>Priority customer support</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <Link href="/contact" className={`inline-block py-3 px-6 rounded-lg font-medium transition-all ${
                      theme === 'light' 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-purple-700 text-white hover:bg-purple-600'
                    }`}>
                      Apply Now
                    </Link>
                  </div>
                </div>
                
                <div className={`hidden md:block ${
                  theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/20'
                }`}>
                  <div className="h-full flex items-center justify-center p-10">
                    <Image 
                      src="/logo.jpg" 
                      width={300} 
                      height={300} 
                      alt="MTF Service Illustration"
                      className="max-w-full h-auto"
                      // This is a placeholder. Replace with your actual illustration
                      style={{ opacity: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`mt-8 p-6 rounded-xl ${
              theme === 'light' ? 'bg-yellow-50 border border-yellow-100' : 'bg-yellow-900/20 border border-yellow-900/30'
            }`}>
              <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-yellow-800' : 'text-yellow-400'}`}>
                Note
              </h4>
              <p className="text-sm">
                Margin trading involves higher risk and may not be suitable for all investors. Please ensure you understand 
                the risks involved before availing our MTF services. Interest rates and eligible securities are subject to 
                change based on market conditions and regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  What is the minimum investment amount for MTF?
                </h3>
                <p>
                  The minimum investment amount to avail our MTF service is ₹50,000.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  How is the interest calculated?
                </h3>
                <p>
                  Interest is calculated on a daily basis only on the amount you borrow. For example, if you use ₹2 lakhs of MTF funding, 
                  interest will be calculated only on that amount and not on your entire available limit.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  What happens if the stock price falls?
                </h3>
                <p>
                  If the value of your securities falls below the required margin maintenance threshold, you'll receive a margin call 
                  notification. You'll need to either deposit additional funds or reduce your position by selling some securities.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Can I repay the MTF loan partially?
                </h3>
                <p>
                  Yes, you can make partial repayments at any time without any prepayment penalties. This will reduce your outstanding 
                  loan amount and consequently the interest charged.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  How do I apply for MTF?
                </h3>
                <p>
                  Existing DSR Group customers can activate MTF directly from their trading dashboard. New customers need to complete 
                  the account opening process first, followed by MTF activation which includes submitting required documents and completing 
                  the risk assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
          : 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Amplify Your Investment Potential?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Open an MTF account today and unlock up to 5x leverage on your investments. Our team is ready to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-purple-700 hover:bg-gray-100">
              Open MTF Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 