'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Glossary terms organized alphabetically
const glossaryTerms = {
  A: [
    { term: 'Asset', definition: 'Anything of value that is owned by a person or entity, which can be converted to cash.' },
    { term: 'Asset Allocation', definition: 'The strategy of dividing investments among different asset categories, such as stocks, bonds, and cash to optimize the risk/reward ratio.' },
    { term: 'Annual Report', definition: 'A document published yearly by public companies providing comprehensive information about the company\'s financial performance and future prospects.' },
    { term: 'Arbitrage', definition: 'The simultaneous purchase and sale of an asset to profit from a difference in the price across different markets.' },
    { term: 'Asset Management Company (AMC)', definition: 'A company that invests pooled funds from clients in various securities, providing investors with more diversification and investment options than they would have alone.' }
  ],
  B: [
    { term: 'Bear Market', definition: 'A market condition in which prices of securities fall 20% or more from recent highs amid widespread pessimism and negative investor sentiment.' },
    { term: 'Benchmark', definition: 'A standard against which the performance of a security, mutual fund, or investment manager can be measured.' },
    { term: 'Blue Chip', definition: 'A well-established, financially sound, and historically secure company that has demonstrated reliable performance over time.' },
    { term: 'Bond', definition: 'A fixed-income investment that represents a loan made by an investor to a borrower, typically a corporation or government entity.' },
    { term: 'Bull Market', definition: 'A market condition in which prices are rising or are expected to rise, encouraging buying.' }
  ],
  C: [
    { term: 'Capital Gain', definition: 'An increase in the value of a capital asset that gives it a higher worth than the purchase price.' },
    { term: 'Compound Interest', definition: 'Interest calculated on the initial principal and also on the accumulated interest from previous periods.' },
    { term: 'Credit Rating', definition: 'An assessment of the creditworthiness of a borrower in general terms or with respect to a particular debt or financial obligation.' },
    { term: 'Call Option', definition: 'A contract that gives the buyer the right, but not the obligation, to purchase a specific number of shares of a security at a predetermined price within a specified time period.' },
    { term: 'Current Ratio', definition: 'A liquidity ratio that measures a company\'s ability to pay short-term obligations by dividing current assets by current liabilities.' }
  ],
  D: [
    { term: 'Dividend', definition: 'A distribution of a portion of a company\'s earnings, decided by the board of directors, paid to shareholders.' },
    { term: 'Diversification', definition: 'The strategy of investing in a variety of assets to reduce the risk associated with putting all money in one place.' },
    { term: 'Debt-to-Equity Ratio', definition: 'A financial ratio indicating the relative proportion of shareholders\' equity and debt used to finance a company\'s assets.' },
    { term: 'Debenture', definition: 'A type of debt instrument that is not secured by physical assets or collateral, but backed only by the general creditworthiness of the issuer.' },
    { term: 'Derivatives', definition: 'Financial contracts whose value is dependent on an underlying asset, group of assets, or benchmark.' }
  ],
  E: [
    { term: 'Equity', definition: 'The value of an owned asset minus the amount of all debts on that asset. In the context of stocks, it refers to the ownership of shares in a company.' },
    { term: 'Exchange Traded Fund (ETF)', definition: 'A type of investment fund and exchange-traded product that tracks an index, sector, commodity, or other asset but can be purchased or sold on a stock exchange the same as a regular stock.' },
    { term: 'ELSS (Equity Linked Savings Scheme)', definition: 'A type of diversified equity mutual fund that offers tax benefits under Section 80C of the Income Tax Act, with a lock-in period of 3 years.' },
    { term: 'Expense Ratio', definition: 'The annual fee charged by mutual funds and ETFs to cover operating expenses, expressed as a percentage of assets.' },
    { term: 'Earnings Per Share (EPS)', definition: 'A company\'s profit divided by the outstanding shares of its common stock, serving as an indicator of the company\'s profitability.' }
  ],
  F: [
    { term: 'Fixed Income', definition: 'A type of investment security that pays investors fixed interest payments until its maturity date.' },
    { term: 'Fundamental Analysis', definition: 'A method of evaluating a security in an attempt to measure its intrinsic value by examining related economic, financial, and other qualitative and quantitative factors.' },
    { term: 'Futures Contract', definition: 'A legal agreement to buy or sell a particular commodity or asset at a predetermined price at a specified time in the future.' },
    { term: 'Face Value', definition: 'The nominal value or dollar value of a security stated by the issuer, also known as par value.' },
    { term: 'Fiscal Year', definition: 'A 12-month period used by governments and businesses for accounting purposes and preparing financial statements.' }
  ],
  G: [
    { term: 'Growth Investing', definition: 'An investment strategy focused on stocks of companies expected to grow at an above-average rate compared to their industry or the market.' },
    { term: 'Good Till Cancelled (GTC)', definition: 'An order to buy or sell a stock that remains active until it is executed or cancelled by the investor.' },
    { term: 'Gross Domestic Product (GDP)', definition: 'The total monetary or market value of all the finished goods and services produced within a country\'s borders in a specific time period.' },
    { term: 'Gilt Funds', definition: 'Mutual funds that invest primarily in government securities and bonds, known for their relatively low risk compared to equity funds.' },
    { term: 'GST (Goods and Services Tax)', definition: 'A value-added tax levied on most goods and services sold for domestic consumption in India.' }
  ],
  H: [
    { term: 'Hedge', definition: 'An investment position intended to offset potential losses that may be incurred by a companion investment.' },
    { term: 'High-Yield Bond', definition: 'A bond with a lower credit rating than investment-grade corporate bonds, Treasury bonds, and municipal bonds, offering higher yields due to higher risk.' },
    { term: 'Holding Period', definition: 'The length of time an investment is held by an investor, or the period between the acquisition and disposal of an asset.' },
    { term: 'Hybrid Fund', definition: 'A mutual fund that invests in both stocks and bonds to provide a balanced portfolio.' },
    { term: 'Hurdle Rate', definition: 'The minimum rate of return on a project or investment required by a manager or investor.' }
  ],
  I: [
    { term: 'Index', definition: 'A statistical measure of change in a securities market. Examples include the Sensex, Nifty, S&P 500.' },
    { term: 'Inflation', definition: 'A general increase in prices and fall in the purchasing value of money.' },
    { term: 'Initial Public Offering (IPO)', definition: 'The first sale of stock by a private company to the public.' },
    { term: 'Interest Rate', definition: 'The amount a lender charges a borrower for the use of assets, expressed as a percentage of the principal.' },
    { term: 'Investment Portfolio', definition: 'A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including closed-end funds and ETFs.' }
  ],
  J: [
    { term: 'Joint Account', definition: 'A bank or brokerage account shared by two or more individuals.' },
    { term: 'Joint Venture', definition: 'A business arrangement in which two or more parties agree to pool their resources for the purpose of accomplishing a specific task.' }
  ],
  K: [
    { term: 'Key Rate', definition: 'The specific interest rate that determines all other interest rates in an economy.' },
    { term: 'Know Your Customer (KYC)', definition: 'The process of verifying the identity of clients and assessing potential risks of illegal intentions for the business relationship.' }
  ],
  L: [
    { term: 'Leverage', definition: 'The use of borrowed money to increase the potential return of an investment.' },
    { term: 'Liquidity', definition: 'The degree to which an asset or security can be quickly bought or sold in the market without affecting the asset\'s price.' },
    { term: 'Limit Order', definition: 'An order to buy or sell a stock at a specific price or better.' },
    { term: 'Large Cap', definition: 'A company with a market capitalization value of more than ₹20,000 crores.' },
    { term: 'Lock-in Period', definition: 'A predetermined time period during which investors cannot redeem or sell their investments.' }
  ],
  M: [
    { term: 'Market Capitalization', definition: 'The total market value of a company\'s outstanding shares, calculated by multiplying the stock\'s price by the total number of shares outstanding.' },
    { term: 'Mutual Fund', definition: 'An investment vehicle made up of a pool of funds collected from many investors for the purpose of investing in securities such as stocks, bonds, money market instruments, and similar assets.' },
    { term: 'Mid Cap', definition: 'A company with a market capitalization between ₹5,000 crores and ₹20,000 crores.' },
    { term: 'Money Market', definition: 'A segment of the financial market in which financial instruments with high liquidity and very short maturities are traded.' },
    { term: 'Margin Trading', definition: 'The practice of buying securities with borrowed funds from a broker.' }
  ],
  N: [
    { term: 'Net Asset Value (NAV)', definition: 'The value of a fund\'s asset less the value of its liabilities per unit or share.' },
    { term: 'NIFTY 50', definition: 'A benchmark Indian stock market index that represents the weighted average of 50 Indian company stocks in various sectors.' },
    { term: 'Nominee', definition: 'A person designated to receive the proceeds of an investment in the event of the investor\'s death.' },
    { term: 'Non-Performing Asset (NPA)', definition: 'A loan or advance for which the principal or interest payment remains overdue for a specified period.' },
    { term: 'Nondisclosure Agreement (NDA)', definition: 'A legally binding contract in which one party agrees not to disclose confidential information to a third party.' }
  ],
  O: [
    { term: 'Options', definition: 'A contract that gives the buyer the right, but not the obligation, to buy or sell an underlying asset at a specific price on or before a certain date.' },
    { term: 'Open-End Fund', definition: 'A mutual fund that continues to sell shares to investors and will buy back shares when investors wish to sell.' },
    { term: 'Overhead', definition: 'The ongoing business expenses not directly attributed to creating a product or service.' },
    { term: 'Overweight', definition: 'An investment recommendation indicating that an investor should hold more of a particular security compared to the security\'s weight in the underlying benchmark portfolio.' },
    { term: 'Operating Income', definition: 'A company\'s profit after deducting operating expenses but before deducting taxes and interest.' }
  ],
  P: [
    { term: 'P/E Ratio (Price-to-Earnings Ratio)', definition: 'A valuation ratio of a company\'s current share price compared to its per-share earnings.' },
    { term: 'Portfolio', definition: 'A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents.' },
    { term: 'PMS (Portfolio Management Service)', definition: 'A specialized investment service offered to high net worth individuals where professional money managers make investment decisions on their behalf.' },
    { term: 'Premium', definition: 'The amount by which the price of a security exceeds its face value, or in options trading, the price paid by the buyer to the seller for the option.' },
    { term: 'Prospectus', definition: 'A formal legal document that provides details about an investment offering for sale to the public, required by securities regulators.' }
  ],
  Q: [
    { term: 'Quantum', definition: 'The amount or quantity of a security or financial asset.' },
    { term: 'Quote', definition: 'The most recent price at which a security has traded.' },
    { term: 'Quick Ratio', definition: 'A liquidity ratio measuring a company\'s ability to pay its short-term obligations with its most liquid assets.' }
  ],
  R: [
    { term: 'Return on Investment (ROI)', definition: 'A performance measure used to evaluate the efficiency of an investment or compare the efficiency of several different investments.' },
    { term: 'Risk Management', definition: 'The process of identification, analysis, and acceptance or mitigation of uncertainty in investment decisions.' },
    { term: 'Redemption', definition: 'The return of an investor\'s principal in a fixed-income security, such as a bond, mutual fund, or preferred stock.' },
    { term: 'Recurring Deposit', definition: 'A type of term deposit offered by banks in India which help people with regular incomes to deposit a fixed amount every month and earn interest.' },
    { term: 'Rights Issue', definition: 'An issue of shares offered at a special price to existing shareholders in proportion to their current holding.' }
  ],
  S: [
    { term: 'Sensex', definition: 'A benchmark index of the 30 largest and most actively traded stocks on the Bombay Stock Exchange.' },
    { term: 'Systematic Investment Plan (SIP)', definition: 'An investment strategy in which investors regularly contribute a fixed amount of money to mutual funds, stocks, or other financial instruments.' },
    { term: 'Small Cap', definition: 'A company with a market capitalization below ₹5,000 crores.' },
    { term: 'Sector Fund', definition: 'A mutual fund that invests solely in businesses that operate in a particular industry or sector of the economy.' },
    { term: 'Securities and Exchange Board of India (SEBI)', definition: 'The regulatory body for the securities and commodity market in India.' }
  ],
  T: [
    { term: 'Technical Analysis', definition: 'A trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume.' },
    { term: 'Tax-Deferred', definition: 'Investment earnings such as dividends, interest, or capital gains that accumulate tax-free until the investor takes constructive receipt of the gains.' },
    { term: 'Treasury Bills', definition: 'Short-term government securities with maturities ranging from a few days to 52 weeks.' },
    { term: 'Trading Volume', definition: 'The total number of shares or contracts traded in a security or an entire market during a given period.' },
    { term: 'Term Insurance', definition: 'A type of life insurance policy that provides coverage for a specified term or period at a fixed payment amount.' }
  ],
  U: [
    { term: 'Unit Linked Insurance Plan (ULIP)', definition: 'A product offered by insurance companies that provides both insurance coverage and investment exposure.' },
    { term: 'Underlying Asset', definition: 'A security or commodity on which a derivative\'s price is based.' },
    { term: 'Underwriter', definition: 'A company or other entity that administers the public issuance and distribution of securities from a corporation or other issuing body.' },
    { term: 'Upside', definition: 'The potential increase in value of an investment above its current or expected value.' },
    { term: 'Unrealized Gain/Loss', definition: 'A profit or loss that exists on paper but has not been realized yet through a transaction.' }
  ],
  V: [
    { term: 'Valuation', definition: 'The process of determining the current worth of an asset or a company.' },
    { term: 'Value Investing', definition: 'An investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value.' },
    { term: 'Volatility', definition: 'A statistical measure of the dispersion of returns for a given security or market index.' },
    { term: 'Volume Weighted Average Price (VWAP)', definition: 'A trading benchmark used by traders that gives the average price a security has traded at throughout the day, based on both volume and price.' },
    { term: 'Venture Capital', definition: 'A form of private equity financing provided by firms or funds to startups, early-stage, and emerging companies with high growth potential.' }
  ],
  W: [
    { term: 'Withdrawal', definition: 'The removal of funds from an account, investment, or benefit.' },
    { term: 'Wholesale Price Index (WPI)', definition: 'A measure of the average change in price of goods sold in bulk by wholesalers over time.' },
    { term: 'Working Capital', definition: 'The difference between a company\'s current assets and current liabilities, representing the capital available for daily operations.' },
    { term: 'Warrant', definition: 'A derivative that gives the holder the right to purchase securities from the issuer at a specific price within a certain time frame.' },
    { term: 'Wealth Management', definition: 'A service that combines financial/investment advice, accounting/tax services, retirement planning, and legal/estate planning for a client fee.' }
  ],
  X: [
    { term: 'XD (Ex-Dividend)', definition: 'A security trading without the value of the next dividend payment.' },
    { term: 'X-Efficiency', definition: 'The degree of efficiency maintained by individuals and firms under conditions of imperfect competition.' }
  ],
  Y: [
    { term: 'Yield', definition: 'The earnings generated and realized on an investment over a particular period, expressed as a percentage of the amount invested.' },
    { term: 'Yield Curve', definition: 'A line that plots yields (interest rates) of bonds having equal credit quality but differing maturity dates.' },
    { term: 'Yield to Maturity (YTM)', definition: 'The total return anticipated on a bond if it is held until it matures.' }
  ],
  Z: [
    { term: 'Zero Coupon Bond', definition: 'A debt security that does not pay interest but is traded at a deep discount, rendering profit at maturity when the bond is redeemed for its full face value.' },
    { term: 'Zero-Based Budgeting', definition: 'A method of budgeting in which all expenses must be justified for each new period, starting from a zero base.' }
  ]
}

// Alphabet letters for navigation
const alphabetLetters = Object.keys(glossaryTerms)

export default function GlossaryPage() {
  const { theme, toggleTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms)
  const [selectedLetter, setSelectedLetter] = useState('A')
  const [showNavigationArrows, setShowNavigationArrows] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Filter terms based on search
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTerms(glossaryTerms)
      return
    }
    
    const lowercaseSearchTerm = searchTerm.toLowerCase()
    const filtered: Partial<typeof glossaryTerms> = {}
    
    Object.keys(glossaryTerms).forEach(letter => {
      const key = letter as keyof typeof glossaryTerms
      const letterTerms = glossaryTerms[key].filter(item => 
        item.term.toLowerCase().includes(lowercaseSearchTerm) || 
        item.definition.toLowerCase().includes(lowercaseSearchTerm)
      )
      
      if (letterTerms.length > 0) {
        filtered[key] = letterTerms
      }
    })
    
    setFilteredTerms(filtered)
    
    // Set selected letter to the first one that has filtered results
    const firstLetterWithResults = Object.keys(filtered)[0]
    if (firstLetterWithResults) {
      setSelectedLetter(firstLetterWithResults)
    }
  }, [searchTerm])
  
  // Show navigation arrows only while scrolling and not when at the footer
  useEffect(() => {
    const handleScroll = () => {
      // Only show arrows if scrolled down at least 300px
      if (window.scrollY > 300) {
        // Check if we're near the footer
        const footerElement = document.querySelector('footer')
        const windowHeight = window.innerHeight
        const footerPosition = footerElement?.getBoundingClientRect().top || 0
        
        // Hide arrows if footer is visible in viewport (with some buffer)
        if (footerPosition < windowHeight - 100) {
          setShowNavigationArrows(false)
          return
        }
        
        setShowNavigationArrows(true)
        
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        
        // Set a new timeout to hide the arrows after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setShowNavigationArrows(false)
        }, 1500) // Hide after 1.5 seconds of no scrolling
      } else {
        setShowNavigationArrows(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Clear timeout on component unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])
  
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter)
    // Scroll to the letter section
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  const scrollToTop = () => {
    const element = document.getElementById(`letter-A`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSelectedLetter('A')
    }
  }
  
  const scrollToBottom = () => {
    const element = document.getElementById(`letter-Z`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSelectedLetter('Z')
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DSR GROUP MANDSAUR
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Home
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 sm:text-5xl">
            Financial Glossary
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your comprehensive guide to financial and investment terms. Understanding these terms will help you make more informed decisions about your financial future.
          </p>
          
          {/* Improved Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative rounded-md shadow-md overflow-hidden">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-0 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 sm:text-sm rounded-md"
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Improved Alphabet Navigation */}
        <div className="flex justify-center flex-wrap max-w-4xl mx-auto mb-12 sticky top-0 bg-gray-50 dark:bg-gray-900 py-4 z-10 border-b border-gray-200 dark:border-gray-700">
          {alphabetLetters.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mx-1 ${
                selectedLetter === letter 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              disabled={!filteredTerms[letter as keyof typeof filteredTerms]}
            >
              {letter}
            </button>
          ))}
        </div>
        
        {/* Terms Sections */}
        <div className="space-y-16">
          {Object.keys(filteredTerms).map(letter => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredTerms[letter as keyof typeof filteredTerms].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {item.term}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* No Results */}
        {Object.keys(filteredTerms).length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No terms found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try a different search term</p>
          </div>
        )}
      </main>

      {/* Centered Navigation Arrows with hover effect */}
      {showNavigationArrows && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-16 flex gap-3 z-20">
          <button
            onClick={scrollToTop}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-800 hover:scale-110 transition-all duration-200"
            aria-label="Scroll to top"
            onMouseEnter={() => {
              // Clear timeout on hover to keep arrows visible
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
              }
            }}
            onMouseLeave={() => {
              // Set timeout to hide arrows after mouse leaves
              scrollTimeoutRef.current = setTimeout(() => {
                setShowNavigationArrows(false)
              }, 1500)
            }}
          >
            <ChevronUpIcon className="h-6 w-6" />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-800 hover:scale-110 transition-all duration-200"
            aria-label="Scroll to bottom"
            onMouseEnter={() => {
              // Clear timeout on hover to keep arrows visible
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
              }
            }}
            onMouseLeave={() => {
              // Set timeout to hide arrows after mouse leaves
              scrollTimeoutRef.current = setTimeout(() => {
                setShowNavigationArrows(false)
              }, 1500)
            }}
          >
            <ChevronDownIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {Footer ? <Footer /> : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-20">
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