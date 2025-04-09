"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChevronRight, BarChart2, TrendingUp, DollarSign, Activity, Scale, Percent, CheckCircle, RefreshCw, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ETFPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-orange-50 to-amber-50' 
          : 'bg-gradient-to-r from-orange-950 to-amber-950'
      }`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform">
            <div className={`h-80 w-80 rounded-full ${
              theme === 'light' ? 'bg-orange-200' : 'bg-orange-800'
            }`}></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform">
            <div className={`h-80 w-80 rounded-full ${
              theme === 'light' ? 'bg-amber-200' : 'bg-amber-800'
            }`}></div>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Exchange Traded Funds (ETFs)
              </h1>
              <p className="text-lg mb-8 leading-relaxed">
                Combine the best of mutual funds and stocks with ETFs. Get diversification, low costs, and the flexibility to trade like stocks, all in one investment vehicle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className={`py-3 px-8 rounded-lg font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-orange-700 text-white hover:bg-orange-600'
                }`}>
                  Start ETF Trading
                </Link>
                <Link href="#etf-benefits" className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-orange-600 hover:bg-gray-100 border border-orange-200' 
                    : 'bg-gray-800 text-orange-400 hover:bg-gray-700 border border-gray-700'
                }`}>
                  Explore Benefits <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className={`relative p-6 rounded-lg ${
                theme === 'light' ? 'bg-white shadow-xl' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-orange-50' : 'bg-orange-900/30'
                  }`}>
                    <BarChart2 className={`mb-2 ${
                      theme === 'light' ? 'text-orange-600' : 'text-orange-400'
                    }`} />
                    <h4 className="font-semibold">Index Tracking</h4>
                    <p className="text-sm mt-1">Follows indices like Nifty, Sensex</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-amber-50' : 'bg-amber-900/30'
                  }`}>
                    <TrendingUp className={`mb-2 ${
                      theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                    }`} />
                    <h4 className="font-semibold">Live Trading</h4>
                    <p className="text-sm mt-1">Buy/sell throughout market hours</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-900/30'
                  }`}>
                    <DollarSign className={`mb-2 ${
                      theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                    }`} />
                    <h4 className="font-semibold">Low Cost</h4>
                    <p className="text-sm mt-1">Lower expense ratios than mutual funds</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'light' ? 'bg-red-50' : 'bg-red-900/30'
                  }`}>
                    <Activity className={`mb-2 ${
                      theme === 'light' ? 'text-red-600' : 'text-red-400'
                    }`} />
                    <h4 className="font-semibold">Diversification</h4>
                    <p className="text-sm mt-1">Exposure to entire sectors in one trade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is ETF Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Understanding Exchange Traded Funds
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              Exchange Traded Funds (ETFs) are investment funds that trade on stock exchanges, similar to stocks. 
              They typically track the performance of a specific index, sector, commodity, or asset class. ETFs combine 
              the diversification benefits of mutual funds with the trading flexibility of stocks.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Unlike mutual funds that are priced once a day after market close, ETFs can be bought and sold throughout 
              the trading day at market prices. They generally have lower expense ratios compared to mutual funds and offer 
              greater tax efficiency due to their unique structure.
            </p>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-orange-50 border border-orange-100' : 'bg-orange-900/20 border border-orange-900/30'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-orange-700' : 'text-orange-400'}`}>
                  Popular ETF Types in India
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Index ETFs:</strong> Track major indices like Nifty 50, Sensex</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Sector ETFs:</strong> Focus on specific industries like banking, IT</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Gold ETFs:</strong> Track gold prices without physical ownership</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>International ETFs:</strong> Provide exposure to global markets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] mr-2">•</div>
                    <span><strong>Bond ETFs:</strong> Invest in fixed-income securities</span>
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-amber-50 border border-amber-100' : 'bg-amber-900/20 border border-amber-900/30'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>
                  ETFs vs. Mutual Funds vs. Stocks
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="font-semibold">Feature</div>
                    <div className="font-semibold">ETFs</div>
                    <div className="font-semibold">Mutual Funds</div>
                    <div className="font-semibold">Stocks</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>Trading</div>
                    <div>Intraday</div>
                    <div>End of day</div>
                    <div>Intraday</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>Diversification</div>
                    <div>High</div>
                    <div>High</div>
                    <div>None</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>Expense Ratio</div>
                    <div>Very Low</div>
                    <div>Medium-High</div>
                    <div>N/A</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>Management</div>
                    <div>Passive</div>
                    <div>Active/Passive</div>
                    <div>N/A</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Invest in ETFs */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              How to Invest in ETFs
            </h2>
            
            <div className="space-y-10">
              {[{
                title: "Open a Demat & Trading Account",
                description: "You need a demat and trading account with DSR Group to buy and sell ETFs on the stock exchange."
              }, {
                title: "Research ETFs",
                description: "Review different ETFs, their underlying indices or assets, expense ratios, and trading volumes before making a decision."
              }, {
                title: "Place an Order",
                description: "You can place buy/sell orders for ETFs just like stocks during market hours through our trading platform."
              }, {
                title: "Monitor Performance",
                description: "Track your ETF investments regularly to ensure they continue to meet your investment objectives."
              }, {
                title: "Rebalance as Needed",
                description: "Periodically review and adjust your ETF portfolio to maintain your desired asset allocation and risk profile."
              }].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${
                    theme === 'light' ? 'bg-orange-100 text-orange-600' : 'bg-orange-900/50 text-orange-400'
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

      {/* ETF Benefits */}
      <section id="etf-benefits" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Benefits of ETF Investing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Scale size={24} />,
                title: "Diversification",
                description: "Gain exposure to a basket of securities with a single trade, reducing single-security risk."
              },
              {
                icon: <Percent size={24} />,
                title: "Cost Efficiency",
                description: "ETFs typically have lower expense ratios compared to mutual funds, maximizing your returns."
              },
              {
                icon: <Activity size={24} />,
                title: "Transparency",
                description: "Holdings are disclosed daily, allowing you to always know what you own."
              },
              {
                icon: <Zap size={24} />,
                title: "Liquidity",
                description: "Trade throughout market hours at real-time prices, unlike mutual funds."
              },
              {
                icon: <Shield size={24} />,
                title: "Tax Efficiency",
                description: "ETFs generally generate fewer capital gains distributions, offering tax advantages."
              },
              {
                icon: <RefreshCw size={24} />,
                title: "Flexibility",
                description: "Implement various strategies like SIPs, lump sum investments, or tactical trading."
              }
            ].map((benefit, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  theme === 'light' ? 'bg-orange-100 text-orange-600' : 'bg-orange-900/30 text-orange-400'
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

      {/* Popular ETFs in India */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-10 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Popular ETFs in India
          </h2>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className={`min-w-full ${
              theme === 'light' 
                ? 'bg-white border border-gray-200' 
                : 'bg-gray-800 border border-gray-700'
            }`}>
              <thead>
                <tr className={
                  theme === 'light' 
                    ? 'bg-orange-50 text-orange-800' 
                    : 'bg-orange-900/20 text-orange-400'
                }>
                  <th className="py-3 px-4 text-left font-semibold">ETF Name</th>
                  <th className="py-3 px-4 text-left font-semibold">Type</th>
                  <th className="py-3 px-4 text-left font-semibold">Tracking</th>
                  <th className="py-3 px-4 text-left font-semibold">Expense Ratio</th>
                  <th className="py-3 px-4 text-left font-semibold">1Y Returns*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  {
                    name: "Nippon India ETF Nifty BeES",
                    type: "Index ETF",
                    tracking: "Nifty 50",
                    expense: "0.05%",
                    returns: "+18.2%"
                  },
                  {
                    name: "SBI-ETF Sensex",
                    type: "Index ETF",
                    tracking: "Sensex",
                    expense: "0.07%",
                    returns: "+17.5%"
                  },
                  {
                    name: "HDFC Gold ETF",
                    type: "Commodity",
                    tracking: "Gold",
                    expense: "0.59%",
                    returns: "+11.3%"
                  },
                  {
                    name: "Nippon India ETF Nifty Bank BeES",
                    type: "Sector ETF",
                    tracking: "Nifty Bank",
                    expense: "0.19%",
                    returns: "+23.1%"
                  },
                  {
                    name: "Motilal Oswal NASDAQ 100 ETF",
                    type: "International",
                    tracking: "NASDAQ 100",
                    expense: "0.54%",
                    returns: "+14.9%"
                  }
                ].map((etf, index) => (
                  <tr key={index} className={
                    theme === 'light' 
                      ? 'hover:bg-orange-50' 
                      : 'hover:bg-orange-900/10'
                  }>
                    <td className="py-3 px-4">{etf.name}</td>
                    <td className="py-3 px-4">{etf.type}</td>
                    <td className="py-3 px-4">{etf.tracking}</td>
                    <td className="py-3 px-4">{etf.expense}</td>
                    <td className={`py-3 px-4 font-medium ${
                      theme === 'light' ? 'text-green-600' : 'text-green-400'
                    }`}>{etf.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              *Past performance is not indicative of future results. Returns as of September 2023.
            </p>
          </div>
        </div>
      </section>

      {/* Our ETF Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our ETF Trading Services
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Complete ETF Trading Solutions
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Zero brokerage on ETF investments",
                      "Advanced ETF screener and comparison tools",
                      "Real-time price tracking and alerts",
                      "Expert ETF research and recommendations",
                      "Tax-optimized ETF portfolio strategies",
                      "Automatic SIP facility for ETF investments",
                      "ETF portfolio analytics and performance tracking"
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                          theme === 'light' ? 'bg-orange-100 text-orange-600' : 'bg-orange-900/50 text-orange-400'
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
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-orange-700 text-white hover:bg-orange-600'
                    }`}>
                      Open Trading Account
                    </Link>
                  </div>
                </div>
                
                <div className={`hidden md:block ${
                  theme === 'light' ? 'bg-orange-50' : 'bg-orange-900/20'
                }`}>
                  <div className="h-full flex items-center justify-center p-10">
                    <Image 
                      src="/logo.jpg" 
                      width={300} 
                      height={300} 
                      alt="ETF Trading Illustration"
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
                question: "What is the minimum investment amount for ETFs?",
                answer: "The minimum investment amount for ETFs is the price of one unit of the ETF, which varies based on the current market price. Most ETFs in India trade between ₹20 to ₹4,000 per unit, making them accessible to investors with different budget levels."
              }, {
                question: "How are ETFs taxed in India?",
                answer: "ETFs are taxed based on their underlying assets. Equity ETFs held for more than 12 months are subject to long-term capital gains tax at 10% above ₹1 lakh per year. For holdings less than 12 months, short-term capital gains tax at 15% applies. Gold ETFs are taxed as non-equity funds with different rates."
              }, {
                question: "Can I start a SIP with ETFs?",
                answer: "Yes, you can create a systematic investment plan (SIP) for ETFs through our platform. While traditional ETF trading happens in whole units, our SIP facility allows you to invest a fixed amount regularly, similar to mutual fund SIPs."
              }, {
                question: "How do ETF expense ratios compare to mutual funds?",
                answer: "ETFs typically have lower expense ratios compared to mutual funds, especially actively managed ones. In India, large index ETFs often have expense ratios between 0.05% to 0.20%, while actively managed mutual funds may charge between 1% to 2.5%."
              }, {
                question: "Are ETFs suitable for beginner investors?",
                answer: "Yes, ETFs can be excellent for beginners due to their simplicity, diversification, and lower costs. They provide exposure to entire markets or sectors with a single purchase, removing the need to select individual stocks. However, understanding how to trade them on exchanges is important."
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
          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' 
          : 'bg-gradient-to-r from-orange-900 to-amber-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Trading ETFs?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Open a free trading account with DSR Group and access a wide range of ETFs with zero brokerage. Our expert research and advanced tools help you build a diversified portfolio effortlessly.
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-orange-700 hover:bg-gray-100">
              Open Trading Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 