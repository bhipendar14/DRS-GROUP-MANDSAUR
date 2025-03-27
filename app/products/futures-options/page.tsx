"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { 
  ChevronRight, 
  TrendingUp, 
  ArrowRightLeft, 
  Shield, 
  LineChart, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  BarChart2,
  RefreshCw
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FuturesOptionsPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50' 
          : 'bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950'
      }`}>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Futures & Options Trading
              </h1>
              <p className="text-lg mb-8 leading-relaxed">
                Enhance your trading strategy with derivatives. Futures and options provide leverage, hedging capabilities, and trading opportunities in both rising and falling markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/open-account" className={`py-3 px-8 rounded-lg font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-indigo-700 text-white hover:bg-indigo-600'
                }`}>
                  Start F&O Trading
                </Link>
                <Link href="#fo-basics" className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-indigo-600 hover:bg-gray-100 border border-indigo-200' 
                    : 'bg-gray-800 text-indigo-400 hover:bg-gray-700 border border-gray-700'
                }`}>
                  Learn the Basics <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg transform rotate-6 bg-indigo-500/5"></div>
                <div className="absolute inset-0 rounded-lg transform -rotate-3 bg-purple-500/5"></div>
                <div className={`relative p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-xl' : 'bg-gray-800 border border-gray-700'
                }`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Nifty 50 Futures
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900/60 text-green-300'
                    }`}>
                      +1.2%
                    </span>
                  </div>
                  
                  <div className="h-48 w-full mb-6">
                    <LineChart className={`w-full h-full ${
                      theme === 'light' ? 'text-indigo-500/20' : 'text-indigo-400/20'
                    }`} />
                    <div className="mt-2 text-right text-sm">
                      <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
                        Last Updated: 5 min ago
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Bid</div>
                      <div className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        22,456.25
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Ask</div>
                      <div className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        22,458.50
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Open Interest</div>
                      <div className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        12.8M
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
                      <div className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        3.1M
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F&O Basics - FIXED WITH BETTER SPACING */}
      <section id="fo-basics" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Understanding Futures & Options
            </h2>
            
            {/* Futures Section */}
            <div className="mb-12">
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                Futures Contracts
              </h3>
              <p className="mb-6 text-lg leading-relaxed">
                A futures contract is an agreement to buy or sell an underlying asset at a predetermined price at a specified time in the future. Both the buyer and seller are obligated to fulfill the contract terms at expiration.
              </p>
              
              {/* Key Features Box */}
              <div className={`p-6 rounded-xl mb-12 ${
                theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
              }`}>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`}>
                  Key Features of Futures Trading
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-blue-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Leverage:</span> Control a large position with a relatively small amount of capital
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-blue-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Obligation:</span> Both parties must fulfill the contract at expiration
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-blue-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Margin:</span> Initial and maintenance margins are required
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-blue-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Settlement:</span> Can be cash-settled or physically delivered
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-blue-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Expiry:</span> Monthly or quarterly expiration cycles
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Options Section - With improved spacing */}
            <div className="pt-6"> {/* Added padding-top for better separation */}
              <div className="flex items-center mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'
                }`}>
                  <RefreshCw className={theme === 'light' ? 'text-purple-600' : 'text-purple-400'} size={20} />
                </div>
                <h3 className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  Options Contracts
                </h3>
              </div>
              
              <p className="mb-6 text-lg leading-relaxed">
                Options give the buyer the right, but not the obligation, to buy (call option) or sell (put option) an underlying asset at a specified price (strike price) before or on the expiration date.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-purple-50 border border-purple-100' : 'bg-purple-900/20 border border-purple-900/30'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'}`}>
                    Call Options
                  </h4>
                  <p>
                    Right to buy the underlying asset at the strike price. Profitable when prices rise above the strike price plus premium.
                  </p>
                </div>
                <div className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-purple-50 border border-purple-100' : 'bg-purple-900/20 border border-purple-900/30'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'}`}>
                    Put Options
                  </h4>
                  <p>
                    Right to sell the underlying asset at the strike price. Profitable when prices fall below the strike price minus premium.
                  </p>
                </div>
              </div>
              
              {/* Options Key Concepts */}
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-indigo-50' : 'bg-indigo-900/20'
              }`}>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-400'}`}>
                  Key Options Concepts
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-indigo-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Premium:</span> Price paid by the buyer to the seller for the option contract
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-indigo-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Strike Price:</span> The price at which the underlying can be bought (call) or sold (put)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-indigo-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">Expiration:</span> Date when the option contract expires
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[8px] h-2 rounded-full bg-indigo-500 mt-2.5 mr-3"></div>
                    <div>
                      <span className="font-semibold">In/Out of the Money:</span> Relation between current market price and strike price
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Rest of the sections can remain unchanged */}
          </div>
        </div>
      </section>

      {/* Benefits and Risks */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Benefits and Risks of F&O Trading
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Benefits */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Advantages
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <DollarSign size={24} />,
                    title: "Leverage",
                    description: "Control larger positions with less capital, amplifying potential returns."
                  },
                  {
                    icon: <Shield size={24} />,
                    title: "Hedging",
                    description: "Protect existing portfolios against adverse price movements."
                  },
                  {
                    icon: <Activity size={24} />,
                    title: "Market Opportunities",
                    description: "Profit from both rising and falling markets using different strategies."
                  },
                  {
                    icon: <BarChart2 size={24} />,
                    title: "Portfolio Diversification",
                    description: "Add a new dimension to your investment portfolio with derivative products."
                  }
                ].map((benefit, index) => (
                  <div key={index} className={`p-5 rounded-xl ${
                    theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                  }`}>
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'
                      }`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {benefit.title}
                        </h4>
                        <p>{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Risks */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Risks
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <AlertTriangle size={24} />,
                    title: "Leverage Risk",
                    description: "While leverage can amplify gains, it can also magnify losses significantly."
                  },
                  {
                    icon: <AlertTriangle size={24} />,
                    title: "Volatility",
                    description: "F&O markets can experience extreme price fluctuations in short periods."
                  },
                  {
                    icon: <AlertTriangle size={24} />,
                    title: "Time Decay",
                    description: "Options lose value as they approach expiration, potentially affecting investments."
                  },
                  {
                    icon: <AlertTriangle size={24} />,
                    title: "Complexity",
                    description: "Derivatives require understanding complex strategies and market mechanics."
                  }
                ].map((risk, index) => (
                  <div key={index} className={`p-5 rounded-xl ${
                    theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                  }`}>
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        theme === 'light' ? 'bg-red-100 text-red-600' : 'bg-red-900/30 text-red-400'
                      }`}>
                        {risk.icon}
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {risk.title}
                        </h4>
                        <p>{risk.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular F&O Strategies */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Popular F&O Trading Strategies
          </h2>
          <p className="text-center mb-12 max-w-3xl mx-auto">
            Discover effective futures and options strategies used by traders to generate income, protect existing positions, or speculate on market movements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Covered Call",
                description: "Selling call options against stock you own to generate additional income while limiting upside potential.",
                level: "Beginner",
                color: "blue"
              },
              {
                title: "Bull Call Spread",
                description: "Buying a call option while selling another call with a higher strike price to reduce cost while maintaining upside exposure.",
                level: "Intermediate",
                color: "indigo"
              },
              {
                title: "Protective Put",
                description: "Buying put options to protect an existing long position against potential downside risk.",
                level: "Beginner",
                color: "blue"
              },
              {
                title: "Iron Condor",
                description: "Combining a bull put spread with a bear call spread to profit from a security trading within a specific range.",
                level: "Advanced",
                color: "purple"
              },
              {
                title: "Calendar Spread",
                description: "Selling a near-term option while buying a longer-term option at the same strike price to profit from time decay.",
                level: "Intermediate",
                color: "indigo"
              },
              {
                title: "Straddle",
                description: "Buying both a call and put option at the same strike price to profit from significant price movements in either direction.",
                level: "Intermediate",
                color: "indigo"
              }
            ].map((strategy, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {strategy.title}
                </h3>
                <p className="mb-4">
                  {strategy.description}
                </p>
                <div className="flex items-center mt-auto">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    theme === 'light'
                      ? strategy.color === 'blue' ? 'bg-blue-100 text-blue-800' 
                      : strategy.color === 'indigo' ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-purple-100 text-purple-800'
                      : strategy.color === 'blue' ? 'bg-blue-900/40 text-blue-300' 
                      : strategy.color === 'indigo' ? 'bg-indigo-900/40 text-indigo-300' 
                      : 'bg-purple-900/40 text-purple-300'
                  }`}>
                    {strategy.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our F&O Services */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our F&O Trading Services
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Comprehensive F&O Trading Solutions
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Ultra-low brokerage starting at just ₹20 per executed order",
                      "Advanced options chain analysis tools",
                      "Real-time premium calculators and payoff diagrams",
                      "Expert F&O research and strategy recommendations",
                      "Options Greeks visualization and analytics",
                      "Automated position rolling facility",
                      "Margin calculator for complex strategies",
                      "Risk management tools with automated stop-losses"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                          theme === 'light' ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/50 text-indigo-400'
                        }`}>
                          <CheckCircle size={12} />
                        </div>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link href="/open-account" className={`inline-block py-3 px-6 rounded-lg font-medium transition-all ${
                      theme === 'light' 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-indigo-700 text-white hover:bg-indigo-600'
                    }`}>
                      Open F&O Trading Account
                    </Link>
                  </div>
                </div>
                
                <div className={`hidden md:block ${
                  theme === 'light' ? 'bg-indigo-50' : 'bg-indigo-900/20'
                }`}>
                  <div className="h-full flex items-center justify-center p-10">
                    <Image 
                      src="/assets/fo-trading.png" 
                      width={300} 
                      height={300} 
                      alt="F&O Trading Illustration"
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[{
                question: "What is the minimum capital required to start F&O trading?",
                answer: "For F&O trading, SEBI mandates a minimum margin requirement, which varies based on the specific contract and market conditions. At DSR Group, you can start with as low as ₹50,000 for index options and around ₹1,00,000 for futures trading, though higher capital is recommended to manage risks effectively."
              }, {
                question: "What are the span and exposure margins in F&O trading?",
                answer: "SPAN (Standard Portfolio Analysis of Risk) margin is the minimum margin required to cover the largest potential loss in a portfolio under various market scenarios. Exposure margin is an additional margin collected to cover any mark-to-market losses. Together, they form the total initial margin requirement for F&O positions."
              }, {
                question: "How does options expiry work in Indian markets?",
                answer: "In India, equity and index options typically expire on the last Thursday of each month. If that Thursday is a holiday, expiry occurs on the previous trading day. Weekly options for major indices are also available, expiring on designated Thursdays of each week."
              }, {
                question: "Can I exit my F&O positions before expiry?",
                answer: "Yes, you can exit your F&O positions anytime before expiry by taking an offsetting position. For futures, you can square off by taking the opposite position. For options, you can sell options that you bought or buy back options that you sold, effectively closing your position."
              }, {
                question: "What happens if I don't square off my futures position before expiry?",
                answer: "If you don't square off a futures position before expiry, it will be settled as per the exchange settlement process. For cash-settled futures like index futures, the difference between your entry price and the final settlement price will be credited or debited. For physically settled futures, you may need to take/give delivery of the underlying assets."
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
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
          : 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Trading?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Start trading futures and options with DSR Group today. Get access to professional tools, expert research, and ultra-low brokerage rates to maximize your trading potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/open-account" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-indigo-700 hover:bg-gray-100">
              Open F&O Trading Account
            </Link>
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-transparent text-white border border-white hover:bg-white/10">
              Talk to an F&O Specialist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 