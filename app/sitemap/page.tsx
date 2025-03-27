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
  ChevronRight
} from 'lucide-react'

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
      id: 'team',
      path: '/team',
      title: 'Our Team',
      description: 'Meet our experienced professionals',
      icon: <User size={20} />,
      category: 'About'
    },
    {
      id: 'testimonials',
      path: '/testimonials',
      title: 'Testimonials',
      description: 'What our clients say about us',
      icon: <MessageSquare size={20} />,
      category: 'About'
    },
    {
      id: 'services',
      path: '/services',
      title: 'Services',
      description: 'Explore our range of financial services',
      icon: <Briefcase size={20} />,
      category: 'Main'
    },
    {
      id: 'stock',
      path: '/services/stock',
      title: 'Stock Market',
      description: 'Stock trading and market insights',
      icon: <Share2 size={20} />,
      category: 'Services'
    },
    {
      id: 'loans',
      path: '/loans',
      title: 'Loans',
      description: 'Various loan options and services',
      icon: <Building size={20} />,
      category: 'Services'
    },
    {
      id: 'tax',
      path: '/tax',
      title: 'Income Tax',
      description: 'Tax filing and planning services',
      icon: <FileText size={20} />,
      category: 'Services'
    },
    {
      id: 'gst',
      path: '/services/gst',
      title: 'GST Services',
      description: 'GST registration and filing services',
      icon: <FileText size={20} />,
      category: 'Services'
    },
    {
      id: 'rera',
      path: '/services/rera',
      title: 'RERA',
      description: 'Real Estate services',
      icon: <Building size={20} />,
      category: 'Services'
    },
    {
      id: 'audit',
      path: '/services/audit',
      title: 'Audit & Assurance',
      description: 'Audit and financial assurance services',
      icon: <Award size={20} />,
      category: 'Services'
    },
    {
      id: 'mutual-funds',
      path: '/services/mutual-funds',
      title: 'Mutual Funds',
      description: 'Mutual fund investment services',
      icon: <Grid size={20} />,
      category: 'Services'
    },
    {
      id: 'blog',
      path: '/blog',
      title: 'Blog',
      description: 'Latest updates and financial insights',
      icon: <Book size={20} />,
      category: 'Resources'
    },
    {
      id: 'calculators',
      path: '/calculators',
      title: 'Calculators',
      description: 'Financial calculators for planning',
      icon: <Calculator size={20} />,
      category: 'Resources'
    },
    {
      id: 'contact',
      path: '/contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: <Phone size={20} />,
      category: 'Main'
    },
    {
      id: 'help-support',
      path: '/help-support',
      title: 'Help & Support',
      description: 'FAQs and support resources',
      icon: <HelpCircle size={20} />,
      category: 'Support'
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
  const categoryOrder = ['Main', 'About', 'Services', 'Resources', 'Support']
  const sortedCategories = Object.keys(pagesByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className={`py-16 px-4 ${theme === 'light' ? 'bg-purple-600 text-white' : 'bg-purple-900 text-white'}`}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Site Map
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Explore all the pages and resources available on our website
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-5 py-3 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300`}
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
                        theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900 text-purple-300'
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
      
      {/* Site Structure Visual */}
      <section className={`py-12 px-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-850'}`}>
        <div className="container mx-auto">
          <h2 className={`text-2xl font-semibold mb-8 text-center ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Site Structure
          </h2>
          
          <div className="overflow-auto">
            <div className="flex justify-center min-w-[800px]">
              <div className="relative">
                {/* Home node */}
                <div className={`absolute left-1/2 top-0 -translate-x-1/2 px-4 py-2 rounded-lg ${
                  theme === 'light' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-700 text-white'
                }`}>
                  Home
                </div>
                
                {/* Level 1 nodes */}
                <div className="mt-16 flex justify-center space-x-32">
                  {['About Us', 'Services', 'Resources', 'Contact'].map((item, i) => (
                    <div key={i} className="relative">
                      <div className={`px-3 py-1 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-700 text-white'
                      }`}>
                        {item}
                      </div>
                      
                      {/* Connecting lines */}
                      <div className={`absolute left-1/2 -top-12 w-0.5 h-12 -translate-x-1/2 ${
                        theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                      }`}></div>
                      
                      {/* Level 2 nodes */}
                      {item === 'About Us' && (
                        <div className="mt-8 flex flex-col space-y-3 items-center">
                          {['Team', 'Testimonials'].map((subitem, j) => (
                            <div key={j} className="relative">
                              <div className={`px-3 py-1 rounded-lg ${
                                theme === 'light' 
                                  ? 'bg-indigo-400 text-white' 
                                  : 'bg-indigo-600 text-white'
                              }`}>
                                {subitem}
                              </div>
                              {j === 0 && (
                                <div className={`absolute left-1/2 -top-5 w-0.5 h-5 -translate-x-1/2 ${
                                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item === 'Services' && (
                        <div className="mt-8 grid grid-cols-2 gap-3">
                          {['Stock', 'Loans', 'Tax', 'GST', 'RERA', 'Audit'].map((subitem, j) => (
                            <div key={j} className="relative">
                              <div className={`px-3 py-1 rounded-lg ${
                                theme === 'light' 
                                  ? 'bg-indigo-400 text-white' 
                                  : 'bg-indigo-600 text-white'
                              }`}>
                                {subitem}
                              </div>
                              {j === 0 && (
                                <div className={`absolute left-1/2 -top-5 w-0.5 h-5 -translate-x-1/2 ${
                                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item === 'Resources' && (
                        <div className="mt-8 flex space-x-3">
                          {['Blog', 'Calculators'].map((subitem, j) => (
                            <div key={j} className="relative">
                              <div className={`px-3 py-1 rounded-lg ${
                                theme === 'light' 
                                  ? 'bg-indigo-400 text-white' 
                                  : 'bg-indigo-600 text-white'
                              }`}>
                                {subitem}
                              </div>
                              {j === 0 && (
                                <div className={`absolute left-1/2 -top-5 w-0.5 h-5 -translate-x-1/2 ${
                                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item === 'Contact' && (
                        <div className="mt-8 flex space-x-3">
                          {['Contact Us', 'Help & Support'].map((subitem, j) => (
                            <div key={j} className="relative">
                              <div className={`px-3 py-1 rounded-lg ${
                                theme === 'light' 
                                  ? 'bg-indigo-400 text-white' 
                                  : 'bg-indigo-600 text-white'
                              }`}>
                                {subitem}
                              </div>
                              {j === 0 && (
                                <div className={`absolute left-1/2 -top-5 w-0.5 h-5 -translate-x-1/2 ${
                                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Connecting lines from home to level 1 */}
                <div className={`absolute left-1/2 top-10 -translate-x-1/2 w-0.5 h-6 ${
                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                }`}></div>
                <div className={`absolute left-1/2 top-16 -translate-x-1/2 w-[800px] h-0.5 ${
                  theme === 'light' ? 'bg-gray-400' : 'bg-gray-600'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
} 