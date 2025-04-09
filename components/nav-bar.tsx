"use client"

import Image from "next/image"
import Link from "next/link"
import { Home, TrendingUp, LineChart, Landmark, Users, Sun, Moon, Briefcase, Building, Mail, Menu, X } from "lucide-react"
import { motion } from 'framer-motion'
import { useTheme } from '@/context/theme-context'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Define types for search data
type SearchItem = {
  name: string;
  path: string;
}

type SearchCategory = {
  category: string;
  items: SearchItem[];
}

// Define search data structure based on footer links
const searchData: SearchCategory[] = [
  { 
    category: 'Products',
    items: [
      { name: 'Stocks', path: '/stocks' },
      { name: 'Futures & Options', path: '/products/futures-options' },
      { name: 'MTF', path: '/products/mtf' },
      { name: 'IPO', path: '/products/ipo' },
      { name: 'Mutual Funds', path: '/#mutual-funds' },
      { name: 'NFO', path: '/products/nfo' },
      { name: 'ETF', path: '/products/etf' },
      { name: 'Loans', path: '/loans' },
      { name: 'Analytics', path: '/analytics' },
      { name: 'PMS', path: '/products/pms' },
      { name: 'IAP', path: '/products/iap' },
      { name: 'SLBM', path: '/products/slbm' },
      { name: 'Unlisted Share', path: '/products/unlisted-share' },
      { name: 'AIF', path: '/products/aif' },
      { name: 'Insurance', path: '/products/insurance' }
    ]
  },
  {
    category: 'Company',
    items: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Media & Press', path: '/media-press' },
      { name: 'Careers', path: '/careers' },
      { name: 'Help and Support', path: '/help-support' },
      { name: 'Trust and Safety', path: '/trust-safety' },
      { name: 'Partners', path: '/partners' },
      { name: 'Investors', path: '/investors' }
    ]
  },
  {
    category: 'Quick Links',
    items: [
      { name: 'AMC Mutual Funds', path: '/amc-mutual-funds' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Glossary', path: '/glossary' },
      { name: 'Open Demat Account', path: '/open-demat-account' },
      { name: 'DSR Group Digest', path: '/dsr-group-digest' },
      { name: 'Sitemap', path: '/sitemap' },
      { name: 'Income Tax', path: '/tax' },
      { name: 'Market News', path: '/market-news' },
      { name: 'Learning Center', path: '/learning-center' }
    ]
  }
]

// Enhanced Search component
function SearchBar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<any[]>([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Filter results based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([])
      setSelectedItemIndex(-1)
      return
    }
    
    const query = searchQuery.toLowerCase()
    const results = searchData.map(category => {
      const matchedItems = category.items.filter(item => 
        item.name.toLowerCase().includes(query)
      )
      
      return {
        category: category.category,
        items: matchedItems
      }
    }).filter(category => category.items.length > 0)
    
    setFilteredResults(results)
    setSelectedItemIndex(-1)
  }, [searchQuery])
  
  // Handle outside click to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Calculate total items across all categories
    const totalItems = filteredResults.reduce((total, category) => total + category.items.length, 0)
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedItemIndex(prev => (prev + 1) % totalItems)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedItemIndex(prev => (prev - 1 + totalItems) % totalItems)
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (selectedItemIndex >= 0) {
        e.preventDefault()
        // Find and navigate to the selected item
        let itemCounter = 0
        
        for (const category of filteredResults) {
          for (const item of category.items) {
            if (itemCounter === selectedItemIndex) {
              navigateToResult(item.path)
              return
            }
            itemCounter++
          }
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }
  
  // Navigate to search result
  const navigateToResult = (path: string) => {
    router.push(path)
    setSearchQuery('')
    setIsOpen(false)
  }
  
  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <div className="flex items-center">
          {/* Search input wrapper with subtle border and shadow */}
          <div className="relative w-full h-11">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for products, services, or resources..."
              className={`w-full h-11 pl-11 pr-4 rounded-full text-sm 
                bg-gray-100 dark:bg-gray-700/70
                border border-gray-200 dark:border-gray-600
                shadow-sm
                text-gray-700 dark:text-gray-300
                transition-all duration-200
                focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20
                ${isOpen ? 'border-blue-500 dark:border-blue-400 shadow-md' : ''}`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (!isOpen) setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
            
          {/* Close button (mobile) */}
          {isOpen && (
            <button 
              className="md:hidden p-2 mx-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
            
        {/* Search results - positioned absolutely */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            {/* Filter categories */}
            {filteredResults.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
                <div className="flex items-center overflow-x-auto space-x-2 pb-1">
                  <button 
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-200 ${
                      activeCategory === null 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveCategory(null)}
                  >
                    All
                  </button>
                  {searchData.map((category) => (
                    <button 
                      key={category.category}
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-200 ${
                        activeCategory === category.category 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveCategory(category.category)}
                    >
                      {category.category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search results */}
            {filteredResults.length > 0 && (
              <div className="bg-white dark:bg-gray-800 max-h-96 overflow-y-auto">
                <div className="p-3">
                  {filteredResults
                    .filter(category => activeCategory === null || category.category === activeCategory)
                    .map((category, categoryIndex) => (
                      <div key={category.category} className="mb-4 last:mb-0">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          {category.category}
                        </h3>
                        <ul className="space-y-1">
                          {category.items.map((item: SearchItem, itemIndex: number) => {
                            // Calculate item's absolute index across all categories
                            let absoluteIndex = 0
                            for (let i = 0; i < categoryIndex; i++) {
                              if (activeCategory === null || filteredResults[i].category === activeCategory) {
                                absoluteIndex += filteredResults[i].items.length
                              }
                            }
                            absoluteIndex += itemIndex
                            
                            const isSelected = selectedItemIndex === absoluteIndex
                            
                            return (
                              <li key={item.name}>
                                <button 
                                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                                    isSelected 
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                  }`}
                                  onClick={() => navigateToResult(item.path)}
                                  onMouseEnter={() => setSelectedItemIndex(absoluteIndex)}
                                >
                                  <span>{item.name}</span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* No results state */}
            {searchQuery.trim() !== '' && filteredResults.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-b-xl">
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Try using different keywords or checking for typos
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-20 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl border-b px-4 md:px-6 shadow-sm
                transition-colors duration-200
                dark:bg-gray-900/90 dark:border-gray-800 dark:text-white
                bg-white/90 border-gray-200 text-gray-800"
    >
      {/* Logo and Brand */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center"
      >
        <Link href="/" className="flex items-center space-x-2.5">
          <Image 
            src="/logo.jpg" 
            alt="DSR Group Logo" 
            width={44} 
            height={44}
            className="rounded-md"
          />
          <span className="font-bold text-lg tracking-tight dark:text-white text-gray-800">
            DSR GROUP MANDSAUR™
          </span>
        </Link>
      </motion.div>

      {/* Primary Navigation - Desktop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:flex items-center ml-6 space-x-1"
      >
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/stocks", icon: LineChart, label: "Stocks" },
          { href: "/#mutual-funds", icon: Briefcase, label: "Mutual Funds" },
          { href: "/products/ipo", icon: TrendingUp, label: "IPO" },
          { href: "/about", icon: Building, label: "About Us" },
          { href: "/contact", icon: Mail, label: "Contact Us" }
        ].map((item, index) => (
          <Link href={item.href} key={index}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-all duration-200
                        dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/70
                        text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Search bar in the center - Desktop only */}
      <div className="hidden md:flex flex-1 items-center justify-center px-4 max-w-md">
        <SearchBar />
      </div>

      {/* Theme toggle and mobile menu */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center"
      >
        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 flex items-center justify-center rounded-full 
                      transition-colors duration-200 ml-2
                      ${theme === 'light' 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'dark' ? 
            <Sun className="w-4.5 h-4.5" strokeWidth={2} /> : 
            <Moon className="w-4.5 h-4.5" strokeWidth={2} />
          }
        </motion.button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden ml-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </motion.div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
          {/* Mobile Search */}
          <div className="mb-4">
            <SearchBar />
          </div>
          
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-2">
            {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/stocks", icon: LineChart, label: "Stocks" },
          { href: "/#mutual-funds", icon: Briefcase, label: "Mutual Funds" },
          { href: "/products/ipo", icon: TrendingUp, label: "IPO" },
          { href: "/about", icon: Building, label: "About Us" },
          { href: "/contact", icon: Mail, label: "Contact Us" }
            ].map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg
                              transition-colors duration-200
                              dark:text-gray-200 dark:hover:bg-gray-800
                              text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}

