"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChevronRight, Calendar, CheckCircle, BarChart4, TrendingUp, Award, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function IPOPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`py-20 px-4 ${theme === 'light' ? 'bg-gradient-to-r from-purple-50 to-indigo-50' : 'bg-gradient-to-r from-gray-900 to-gray-800'}`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Initial Public Offerings (IPO)
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Invest in companies at their early public stage and be part of their growth journey. Apply for IPOs seamlessly with DSR Group.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/open-demat-account" className={`py-3 px-8 rounded-lg font-medium transition-all ${
                theme === 'light' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-700 text-white hover:bg-purple-600'
              }`}>
                Open Demat Account
              </Link>
              <Link href="#how-it-works" className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-white text-purple-600 hover:bg-gray-100 border border-purple-200' 
                  : 'bg-gray-800 text-purple-400 hover:bg-gray-700 border border-gray-700'
              }`}>
                Learn How It Works <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is IPO Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              What is an Initial Public Offering?
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              An Initial Public Offering (IPO) is the process through which a private company offers shares to the public for the first time. This transition from a private to a public company allows companies to raise capital for expansion, debt reduction, or other strategic initiatives.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              IPOs provide an opportunity for retail investors to invest in promising companies early in their public journey, potentially benefiting from future growth and appreciation in share value.
            </p>
            <div className={`p-6 rounded-xl mt-10 ${
              theme === 'light' ? 'bg-blue-50 border border-blue-100' : 'bg-blue-900/20 border border-blue-900/30'
            }`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`}>
                Key IPO Terms to Know
              </h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className={`font-medium min-w-[120px] ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Issue Price:</span>
                  <span>The price at which the company offers its shares to the public</span>
                </div>
                <div className="flex">
                  <span className={`font-medium min-w-[120px] ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Lot Size:</span>
                  <span>The minimum number of shares an investor must apply for</span>
                </div>
                <div className="flex">
                  <span className={`font-medium min-w-[120px] ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Price Band:</span>
                  <span>The range within which investors can bid for shares</span>
                </div>
                <div className="flex">
                  <span className={`font-medium min-w-[120px] ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Listing Gain:</span>
                  <span>The profit from the difference between IPO price and listing price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The IPO Process */}
      <section id="how-it-works" className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              The IPO Process
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  title: "Company Files Draft Red Herring Prospectus (DRHP)",
                  description: "The company submits its DRHP to SEBI containing important information about the company, its finances, business model, and details of the offering."
                },
                {
                  title: "SEBI Review and Approval",
                  description: "SEBI reviews the DRHP and may request changes before approving the document, allowing the company to proceed with the IPO."
                },
                {
                  title: "IPO Opens for Subscription",
                  description: "Investors can bid for shares within the announced price band through their broker or trading platform. IPOs typically remain open for 3-5 days."
                },
                {
                  title: "Allotment of Shares",
                  description: "Based on demand, shares are allotted to applicants. If oversubscribed, shares are allotted proportionally or through a lottery system."
                },
                {
                  title: "Listing on Stock Exchange",
                  description: "The shares are listed on the stock exchange, and trading begins. This usually happens within a week after the allotment process is complete."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 ${
                    theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'
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

      {/* Benefits of IPO */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Benefits of Investing in IPOs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp size={24} />,
                color: "green",
                title: "Growth Potential",
                description: "Early investment opportunity in companies with high growth potential before they gain market traction."
              },
              {
                icon: <BarChart4 size={24} />,
                color: "blue",
                title: "Listing Gains",
                description: "Possibility of significant returns if the shares list at a premium to the issue price."
              },
              {
                icon: <Award size={24} />,
                color: "yellow",
                title: "Regulated Process",
                description: "SEBI-regulated offering process with stringent disclosure requirements for investor protection."
              }
            ].map((benefit, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  theme === 'light' 
                    ? benefit.color === 'green' ? 'bg-green-100 text-green-600' 
                    : benefit.color === 'blue' ? 'bg-blue-100 text-blue-600' 
                    : 'bg-yellow-100 text-yellow-600'
                    : benefit.color === 'green' ? 'bg-green-900/30 text-green-400' 
                    : benefit.color === 'blue' ? 'bg-blue-900/30 text-blue-400' 
                    : 'bg-yellow-900/30 text-yellow-400'
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
        </div>
      </section>

      {/* Our IPO Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our IPO Services
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Seamless IPO Investing
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Digital IPO applications through UPI",
                      "Detailed research reports on upcoming IPOs",
                      "Expert recommendations and analysis",
                      "IPO alerts and notifications",
                      "Post-listing performance tracking",
                      "Zero application fees"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                          theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/50 text-green-400'
                        }`}>
                          <CheckCircle size={12} />
                        </div>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link href="/open-demat-account" className={`inline-block py-3 px-6 rounded-lg font-medium transition-all ${
                      theme === 'light' 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-purple-700 text-white hover:bg-purple-600'
                    }`}>
                      Open Free Demat Account
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
                      alt="IPO Service Illustration"
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

      {/* CTA Section */}
      <section className={`py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
          : 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Invest in the Next Big IPO?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Open a free demat account today and get access to all upcoming IPOs with expert research and zero application fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/open-demat-account" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-purple-700 hover:bg-gray-100">
              Open Demat Account
            </Link>
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-transparent text-white border border-white hover:bg-white/10">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 