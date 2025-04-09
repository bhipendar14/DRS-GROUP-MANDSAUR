"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChevronRight, PieChart, Briefcase, Lightbulb, Compass, ShieldCheck, Clock, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NFOPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`py-20 px-4 ${theme === 'light' ? 'bg-gradient-to-br from-teal-50 to-blue-50' : 'bg-gradient-to-br from-teal-950 to-blue-950'}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                New Fund Offerings (NFO)
              </h1>
              <p className="text-lg mb-8 leading-relaxed">
                Get in on the ground floor with new mutual fund schemes. Discover early investment opportunities with potentially lower NAVs and innovative fund strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className={`py-3 px-8 rounded-lg font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'bg-teal-700 text-white hover:bg-teal-600'
                }`}>
                  Invest in NFOs
                </Link>
                <Link href="#current-nfos" className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-teal-600 hover:bg-gray-100 border border-teal-200' 
                    : 'bg-gray-800 text-teal-400 hover:bg-gray-700 border border-gray-700'
                }`}>
                  Explore NFOs <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className={`absolute inset-0 rounded-lg transform rotate-6 ${
                theme === 'light' ? 'bg-teal-100' : 'bg-teal-900/30'
              }`}></div>
              <div className={`absolute inset-0 rounded-lg transform -rotate-3 ${
                theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
              }`}></div>
              <div className={`relative rounded-lg overflow-hidden ${
                theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 border border-gray-700'
              }`}>
                <Image
                  src="/logo.jpg"
                  width={540}
                  height={400}
                  alt="NFO Investment Illustration"
                  className="w-full h-auto"
                  style={{ opacity: theme === 'light' ? 1 : 0.8 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is NFO Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Understanding New Fund Offerings (NFOs)
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              A New Fund Offering (NFO) is the first subscription offering for a new mutual fund launched by an asset management company (AMC). Similar to an IPO in the stock market, an NFO is the first time investors can subscribe to a new fund scheme.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              NFOs are launched for a limited period during which investors can purchase units of the mutual fund scheme at a fixed price, typically at ₹10 per unit. After the NFO period ends, the fund opens for ongoing subscriptions and redemptions at the prevailing Net Asset Value (NAV).
            </p>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-teal-50 border border-teal-100' : 'bg-teal-900/20 border border-teal-900/30'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-teal-700' : 'text-teal-400'}`}>
                  Types of NFOs
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Equity Funds:</strong> Invest primarily in stocks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Debt Funds:</strong> Invest in fixed-income securities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Hybrid Funds:</strong> Balanced mix of equity and debt</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Thematic Funds:</strong> Focus on specific sectors or themes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Index Funds:</strong> Track a specific market index</span>
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-blue-50 border border-blue-100' : 'bg-blue-900/20 border border-blue-900/30'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`}>
                  Potential Advantages
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Lower NAV:</strong> Initial units at ₹10 (psychological advantage)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Innovative Strategies:</strong> Access to new investment approaches</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Unique Exposure:</strong> Access to new market segments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Equal Starting Point:</strong> All investors enter at the same price</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NFO Investment Process - FIXED VERSION */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              How to Invest in NFOs
            </h2>
            
            <div className="space-y-10">
              {[{
                title: "Research the NFO",
                description: "Review the fund's investment objectives, strategy, fund manager's track record, and the AMC's reputation before making a decision."
              }, {
                title: "Check Fund Documents",
                description: "Go through the Scheme Information Document (SID) to understand investment strategies, risks, expenses, and exit loads."
              }, {
                title: "Apply Through DSR Group",
                description: "Complete your NFO application through our platform. We offer paperless applications with digital KYC verification."
              }, {
                title: "Make Payment",
                description: "Pay for your NFO subscription through multiple options including UPI, net banking, or NEFT/RTGS transfer."
              }, {
                title: "Receive Units",
                description: "Once the NFO closes, units are allotted at ₹10 each and reflected in your investment account within 5 business days."
              }].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${
                    theme === 'light' ? 'bg-teal-100 text-teal-600' : 'bg-teal-900/50 text-teal-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current NFOs Section */}
      <section id="current-nfos" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Current NFO Opportunities
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 rounded-xl ${
              theme === 'light' ? 'bg-white border border-gray-200 shadow-md' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}>
                  <Calendar size={36} className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'} />
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className={`text-xl md:text-2xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Stay Updated on New Fund Offerings
                  </h3>
                  <p className="mb-6 text-lg">
                    Our team continuously monitors upcoming NFOs from top AMCs in India. Contact our investment advisors to get personalized recommendations on current and upcoming NFO opportunities that align with your financial goals.
                  </p>
                  <Link href="/contact" className={`inline-flex items-center py-2.5 px-5 rounded-lg font-medium ${
                    theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}>
                    Speak with an Advisor <ChevronRight size={16} className="ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of NFO Section */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Why Consider NFO Investments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[{
              icon: <Lightbulb size={24} />,
              color: "yellow",
              title: "Novel Investment Strategies",
              description: "Access to innovative fund strategies that may not be available in existing funds."
            }, {
              icon: <Compass size={24} />,
              color: "teal",
              title: "Untapped Market Segments",
              description: "Exposure to new or niche market segments with potential growth opportunities."
            }, {
              icon: <PieChart size={24} />,
              color: "purple",
              title: "Diversification Opportunities",
              description: "Add unique assets to your portfolio that complement your existing investments."
            }, {
              icon: <Briefcase size={24} />,
              color: "blue",
              title: "Equal Entry Advantage",
              description: "All investors enter at the same NAV, creating an equal starting point."
            }].map((benefit, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  theme === 'light' 
                    ? benefit.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' 
                    : benefit.color === 'teal' ? 'bg-teal-100 text-teal-600' 
                    : benefit.color === 'purple' ? 'bg-purple-100 text-purple-600'
                    : 'bg-blue-100 text-blue-600'
                    : benefit.color === 'yellow' ? 'bg-yellow-900/30 text-yellow-400' 
                    : benefit.color === 'teal' ? 'bg-teal-900/30 text-teal-400' 
                    : benefit.color === 'purple' ? 'bg-purple-900/30 text-purple-400'
                    : 'bg-blue-900/30 text-blue-400'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {benefit.title}
                </h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className={`mt-12 p-6 rounded-xl max-w-4xl mx-auto ${
            theme === 'light' ? 'bg-yellow-50 border border-yellow-100' : 'bg-yellow-900/20 border border-yellow-900/30'
          }`}>
            <div className="flex items-start">
              <ShieldCheck size={24} className={`mr-4 flex-shrink-0 ${
                theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
              }`} />
              <div>
                <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-yellow-800' : 'text-yellow-400'}`}>
                  Important Note
                </h4>
                <p className="text-sm">
                  While NFOs can offer unique opportunities, they lack historical performance data for evaluation. It's important to 
                  assess the fund house's track record, fund manager's experience, and the fund's investment strategy before investing. 
                  Always align NFO investments with your financial goals and risk tolerance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our NFO Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our NFO Services
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Comprehensive NFO Solutions
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "NFO notifications and calendars",
                      "Detailed NFO analysis and comparisons",
                      "Expert recommendations and insights",
                      "Paperless investment process",
                      "SIP setup after NFO conversion",
                      "Portfolio tracking and performance analysis",
                      "Zero commission NFO investments"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                          theme === 'light' ? 'bg-teal-100 text-teal-600' : 'bg-teal-900/50 text-teal-400'
                        }`}>
                          <CheckCircle size={12} />
                        </div>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link href="/contact" className={`inline-block py-3 px-6 rounded-lg font-medium transition-all ${
                      theme === 'light' 
                        ? 'bg-teal-600 text-white hover:bg-teal-700' 
                        : 'bg-teal-700 text-white hover:bg-teal-600'
                    }`}>
                      Open Investment Account
                    </Link>
                  </div>
                </div>
                
                <div className={`hidden md:block ${
                  theme === 'light' ? 'bg-teal-50' : 'bg-teal-900/20'
                }`}>
                  <div className="h-full flex items-center justify-center p-10">
                    <Image 
                      src="/logo.jpg" 
                      width={300} 
                      height={300} 
                      alt="NFO Services Illustration"
                      className="max-w-full h-auto"
                      style={{ opacity: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[{
                question: "What is the difference between an NFO and an existing mutual fund?",
                answer: "An NFO is a new fund scheme being offered for the first time, while existing mutual funds have an established track record and NAV history. NFOs are available at a fixed initial price (typically ₹10 per unit) during the subscription period."
              }, {
                question: "Is investing in an NFO better than existing mutual funds?",
                answer: "Not necessarily. NFOs lack performance history for evaluation, which can make them riskier. However, they may offer unique investment strategies or market exposures not available in existing funds. Both options should be evaluated based on your investment goals."
              }, {
                question: "What is the minimum investment amount for NFOs?",
                answer: "The minimum investment amount typically ranges from ₹1,000 to ₹5,000, depending on the specific NFO. Some funds also offer a lower entry point for SIP investments post-NFO period."
              }, {
                question: "How long does the NFO period last?",
                answer: "Most NFOs remain open for subscription for 15-30 days. Once closed, the fund collects all the money raised, finalizes the unit allotment, and begins investing according to its stated objectives."
              }, {
                question: "When will I get units after investing in an NFO?",
                answer: "Units are typically allotted within 5 business days after the NFO closes. The allotment is made at the initial offer price (usually ₹10 per unit), and you can view these units in your DSR Group account once processed."
              }].map((faq, index) => (
                <div key={index} className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                }`}>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  <p>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white' 
          : 'bg-gradient-to-r from-teal-900 to-blue-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your NFO Investment Journey Today
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Access exclusive new fund offerings with expert insights and zero commissions. Our investment advisors can help you select NFOs that align with your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-teal-700 hover:bg-gray-100">
              Open Investment Account
            </Link>
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-transparent text-white border border-white hover:bg-white/10">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 