"use client"

import { useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import { 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Phone, 
  Calculator, 
  HelpCircle, 
  Building, 
  Book, 
  Grid, 
  Share2, 
  User, 
  Award, 
  MessageSquare,
  Mail,
  Search,
  ChevronRight,
  TrendingUp,
  LineChart,
  Wallet,
  Landmark,
  BarChart3,
  ShieldCheck,
  PieChart,
  ArrowUpRight,
  Gem,
  Lock,
  Newspaper,
  BriefcaseIcon,
  Handshake,
  Users2,
  BookOpen,
  FileSpreadsheet,
  Globe,
  NewspaperIcon,
  GraduationCap,
  Building2,
  FileCheck,
  UserPlus
} from 'lucide-react'
import Image from 'next/image'

export default function SitemapPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  
  // Define all site pages with their paths, titles and descriptions
  const sitePages = [
    {
      id: 'home',
      path: '/',
      title: 'Home',
      description: 'Main landing page',
      icon: <Home size={20} />,
      category: 'Main'
    },
    {
      id: 'about',
      path: '/about',
      title: 'About Us',
      description: 'Learn about DSR Group, our history and mission',
      icon: <Users size={20} />,
      category: 'Main'
    },
    {
      id: 'contact',
      path: '/contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: <Phone size={20} />,
      category: 'Main'
    },
    // DSR Group Category
    {
      id: 'media-press',
      path: '/media-press',
      title: 'Media & Press',
      description: 'Latest news and media coverage',
      icon: <Newspaper size={20} />,
      category: 'DSR Group'
    },
    {
      id: 'careers',
      path: '/careers',
      title: 'Careers',
      description: 'Join our growing team',
      icon: <BriefcaseIcon size={20} />,
      category: 'DSR Group'
    },
    {
      id: 'help-support',
      path: '/help-support',
      title: 'Help & Support',
      description: 'FAQs and support resources',
      icon: <HelpCircle size={20} />,
      category: 'DSR Group'
    },
    {
      id: 'trust-safety',
      path: '/trust-safety',
      title: 'Trust and Safety',
      description: 'Our commitment to security and trust',
      icon: <ShieldCheck size={20} />,
      category: 'DSR Group'
    },
    {
      id: 'partners',
      path: '/partners',
      title: 'Partners',
      description: 'Our trusted partners and collaborators',
      icon: <Handshake size={20} />,
      category: 'DSR Group'
    },
    {
      id: 'investors',
      path: '/investors',
      title: 'Investors',
      description: 'Information for our investors',
      icon: <Users2 size={20} />,
      category: 'DSR Group'
    },
    // Quick Links Category
    {
      id: 'amc-mutual-funds',
      path: '/amc-mutual-funds',
      title: 'AMC Mutual Funds',
      description: 'Asset Management Company mutual fund options',
      icon: <PieChart size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'calculators',
      path: '/calculators',
      title: 'Calculators',
      description: 'Financial calculators for planning',
      icon: <Calculator size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'glossary',
      path: '/glossary',
      title: 'Glossary',
      description: 'Financial terms and definitions',
      icon: <BookOpen size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'open-demat-account',
      path: '/open-demat-account',
      title: 'Open Demat Account',
      description: 'Start your investment journey with us',
      icon: <FileSpreadsheet size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'dsr-group-digest',
      path: '/dsr-group-digest',
      title: 'DSR Group Digest',
      description: 'Monthly newsletter and insights',
      icon: <NewspaperIcon size={20} />,
      category: 'Quick Links'
    },

    {
      id: 'income-tax',
      path: '/tax',
      title: 'Income Tax',
      description: 'Tax filing and planning services',
      icon: <FileCheck size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'market-news',
      path: '/market-news',
      title: 'Market News',
      description: 'Latest market updates and analysis',
      icon: <TrendingUp size={20} />,
      category: 'Quick Links'
    },
    {
      id: 'learning-center',
      path: '/learning-center',
      title: 'Learning Center',
      description: 'Educational resources and guides',
      icon: <GraduationCap size={20} />,
      category: 'Quick Links'
    },
    // Products Category
    {
      id: 'stocks',
      path: '/stocks',
      title: 'Stocks',
      description: 'Stock trading and investment services',
      icon: <TrendingUp size={20} />,
      category: 'Products'
    },
    {
      id: 'futures-options',
      path: '/products/futures-options',
      title: 'Futures & Options',
      description: 'Derivatives trading and strategic investments',
      icon: <LineChart size={20} />,
      category: 'Products'
    },
    {
      id: 'mtf',
      path: '/products/mtf',
      title: 'MTF',
      description: 'Margin Trading Facility services',
      icon: <Wallet size={20} />,
      category: 'Products'
    },
    {
      id: 'ipo',
      path: '/products/ipo',
      title: 'IPO',
      description: 'Initial Public Offering services',
      icon: <Landmark size={20} />,
      category: 'Products'
    },
    {
      id: 'mutual-funds',
      path: '/#mutual-funds',
      title: 'Mutual Funds',
      description: 'Diversified mutual fund investment options',
      icon: <BarChart3 size={20} />,
      category: 'Products'
    },
    {
      id: 'nfo',
      path: '/products/nfo',
      title: 'NFO',
      description: 'New Fund Offer opportunities',
      icon: <PieChart size={20} />,
      category: 'Products'
    },
    {
      id: 'etf',
      path: '/products/etf',
      title: 'ETF',
      description: 'Exchange Traded Funds investments',
      icon: <Share2 size={20} />,
      category: 'Products'
    },
    {
      id: 'loans',
      path: '/loans',
      title: 'Loans',
      description: 'Various loan and financing solutions',
      icon: <Building size={20} />,
      category: 'Products'
    },
    {
      id: 'analytics',
      path: '/analytics',
      title: 'Analytics',
      description: 'Market analysis and research tools',
      icon: <LineChart size={20} />,
      category: 'Products'
    },
    {
      id: 'pms',
      path: '/products/pms',
      title: 'PMS',
      description: 'Portfolio Management Services',
      icon: <Briefcase size={20} />,
      category: 'Products'
    },
    {
      id: 'iap',
      path: '/products/iap',
      title: 'IAP',
      description: 'Investment Advisory Program',
      icon: <Award size={20} />,
      category: 'Products'
    },
    {
      id: 'slbm',
      path: '/products/slbm',
      title: 'SLBM',
      description: 'Securities Lending and Borrowing Mechanism',
      icon: <ArrowUpRight size={20} />,
      category: 'Products'
    },
    {
      id: 'unlisted-share',
      path: '/products/unlisted-share',
      title: 'Unlisted Share',
      description: 'Investment in unlisted company shares',
      icon: <Gem size={20} />,
      category: 'Products'
    },
    {
      id: 'aif',
      path: '/products/aif',
      title: 'AIF',
      description: 'Alternative Investment Fund opportunities',
      icon: <Briefcase size={20} />,
      category: 'Products'
    },
    {
      id: 'insurance',
      path: '/products/insurance',
      title: 'Insurance',
      description: 'Life and General Insurance solutions',
      icon: <ShieldCheck size={20} />,
      category: 'Products'
    },
    // Resources Category
    {
      id: 'blog',
      path: '/blog',
      title: 'Blog',
      description: 'Latest updates and financial insights',
      icon: <Book size={20} />,
      category: 'Resources'
    }
  ]
  
  // Filter pages based on search term
  const filteredPages = sitePages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Group pages by category
  const pagesByCategory = filteredPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = []
    }
    acc[page.category].push(page)
    return acc
  }, {} as Record<string, typeof sitePages>)
  
  // Order categories
  const categoryOrder = ['Main', 'DSR Group', 'Products', 'Quick Links', 'Resources']
  const sortedCategories = Object.keys(pagesByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className={`py-16 px-4 ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white'}`}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Site Map
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Explore all pages and services available at DSR Group
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-5 py-3 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              <Search className="absolute right-4 top-3 text-gray-500" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Sitemap Content */}
      <section className="container mx-auto py-12 px-4">
        {sortedCategories.length === 0 ? (
          <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            <p className="text-xl">No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {sortedCategories.map(category => (
              <div key={category}>
                <h2 className={`text-2xl font-semibold mb-4 pb-2 border-b ${
                  theme === 'light' ? 'text-gray-800 border-gray-200' : 'text-white border-gray-700'
                }`}>
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pagesByCategory[category].map(page => (
                    <Link 
                      href={page.path} 
                      key={page.id}
                      className={`p-4 rounded-lg flex items-start transition-all ${
                        theme === 'light'
                          ? 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow border border-gray-100'
                          : 'bg-gray-800 hover:bg-gray-750 text-white shadow-sm hover:shadow border border-gray-700'
                      }`}
                    >
                      <div className={`mr-3 p-2 rounded-full ${
                        theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 text-blue-300'
                      }`}>
                        {page.icon}
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center">
                          {page.title}
                          <ChevronRight size={16} className="ml-1 opacity-50" />
                        </h3>
                        <p className={`text-sm mt-1 ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {page.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Visual Sitemap Diagram */}
      <section className={`py-16 px-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-850'}`}>
        <div className="container mx-auto">
          <h2 className={`text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            <Image
              src="/logo.jpg"
              alt="DSR Group Logo"
              width={40}
              height={40}
              className="rounded"
            />
            Site Structure
          </h2>
          
          <div className="overflow-x-auto">
            <div className="w-full p-4 md:p-8">
              {/* Main Home Node */}
              <div className="flex flex-col items-center">
                <div className={`px-8 py-4 rounded-xl shadow-lg mb-12 ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white'
                }`}>
                  <span className="text-xl font-bold">DSR GROUP MANDSAUR</span>
                </div>
                
                {/* Main Categories Level */}
                <div className="relative w-full">
                  {/* Connecting Lines */}
                  <div className={`absolute left-1/2 -top-12 w-0.5 h-12 -translate-x-1/2 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-b from-pink-500 to-gray-300' 
                      : 'bg-gradient-to-b from-pink-700 to-gray-600'
                  }`}></div>
                  
                  {/* Main Category Boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {/* Products Section */}
                    <div className="flex flex-col items-center w-full">
                      <div className={`w-full px-4 py-3 rounded-lg mb-4 text-center font-semibold shadow-lg ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                          : 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white'
                      }`}>
                        Products
                      </div>
                      <div className={`w-full rounded-lg shadow-lg overflow-hidden ${
                        theme === 'light' 
                          ? 'bg-gradient-to-b from-blue-50 to-indigo-50' 
                          : 'bg-gradient-to-b from-gray-800 to-gray-900'
                      }`}>
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                          {[
                            'Stocks',
                            'Futures & Options',
                            'MTF',
                            'IPO',
                            'Mutual Funds',
                            'NFO',
                            'ETF',
                            'Loans',
                            'Analytics',
                            'PMS',
                            'IAP',
                            'SLBM',
                            'Unlisted Share',
                            'AIF',
                            'Insurance'
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              className={`px-4 py-3 transition-all border-b last:border-b-0 hover:pl-6 ${
                                theme === 'light' 
                                  ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-100 border-blue-100/30' 
                                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-indigo-900/30 border-gray-700/30'
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* DSR Group Section */}
                    <div className="flex flex-col items-center w-full">
                      <div className={`w-full px-4 py-3 rounded-lg mb-4 text-center font-semibold shadow-lg ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white' 
                          : 'bg-gradient-to-r from-purple-700 to-fuchsia-800 text-white'
                      }`}>
                        DSR GROUP
                      </div>
                      <div className={`w-full rounded-lg shadow-lg overflow-hidden ${
                        theme === 'light' 
                          ? 'bg-gradient-to-b from-purple-50 to-fuchsia-50' 
                          : 'bg-gradient-to-b from-gray-800 to-gray-900'
                      }`}>
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                          {[
                            'About Us',
                            'Contact Us',
                            'Blog',
                            'Media & Press',
                            'Careers',
                            'Help and Support',
                            'Trust and Safety',
                            'Partners',
                            'Investors'
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              className={`px-4 py-3 transition-all border-b last:border-b-0 hover:pl-6 ${
                                theme === 'light' 
                                  ? 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-100 border-purple-100/30' 
                                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-fuchsia-900/30 border-gray-700/30'
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col items-center w-full">
                      <div className={`w-full px-4 py-3 rounded-lg mb-4 text-center font-semibold shadow-lg ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                          : 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white'
                      }`}>
                        Quick Links
                      </div>
                      <div className={`w-full rounded-lg shadow-lg overflow-hidden ${
                        theme === 'light' 
                          ? 'bg-gradient-to-b from-emerald-50 to-teal-50' 
                          : 'bg-gradient-to-b from-gray-800 to-gray-900'
                      }`}>
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                          {[
                            'AMC Mutual Funds',
                            'Calculators',
                            'Glossary',
                            'Open Demat Account',
                            'DSR Group Digest',
                            'Income Tax',
                            'Market News',
                            'Learning Center'
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              className={`px-4 py-3 transition-all border-b last:border-b-0 hover:pl-6 ${
                                theme === 'light' 
                                  ? 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-100 border-emerald-100/30' 
                                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-teal-900/30 border-gray-700/30'
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Legal & Support Section */}
                    <div className="flex flex-col items-center w-full">
                      <div className={`w-full px-4 py-3 rounded-lg mb-4 text-center font-semibold shadow-lg ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' 
                          : 'bg-gradient-to-r from-amber-700 to-orange-800 text-white'
                      }`}>
                        Legal & Support
                      </div>
                      <div className={`w-full rounded-lg shadow-lg overflow-hidden ${
                        theme === 'light' 
                          ? 'bg-gradient-to-b from-amber-50 to-orange-50' 
                          : 'bg-gradient-to-b from-gray-800 to-gray-900'
                      }`}>
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                          {[
                            'Terms & Conditions',
                            'Privacy Policy',
                            'Refund Policy',
                            'Cookie Policy',
                            'FATCA Declaration',
                            'Regulatory Info',
                            'Disclaimer'
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              className={`px-4 py-3 transition-all border-b last:border-b-0 hover:pl-6 ${
                                theme === 'light' 
                                  ? 'text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-100 border-amber-100/30' 
                                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-orange-900/30 border-gray-700/30'
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Access Bar */}
                <div className="mt-12 pt-8 w-full">
                  <div className="flex justify-center">
                    <Link 
                      href="/contact"
                      className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white shadow-lg'
                      }`}>
                      <Phone size={16} />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${theme === 'light' ? '#cbd5e1' : '#1f2937'};
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${theme === 'light' ? '#94a3b8' : '#374151'};
          }
        `}</style>
      </section>
      
      <Footer />
    </div>
  )
} 