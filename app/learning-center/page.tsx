'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { PlayIcon, BookOpenIcon, AcademicCapIcon, ArrowLongRightIcon, MagnifyingGlassIcon, 
  ChartBarIcon, ClockIcon, ArrowPathIcon, FunnelIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

// Sample learning materials data - replace with actual data
const learningMaterials = {
  courses: [
    {
      id: 'c1',
      title: 'Fundamentals of Stock Market Investing',
      description: 'Learn the basics of stock markets, how to analyze companies, and build your first investment portfolio.',
      level: 'Beginner',
      duration: '4 hours',
      modules: 8,
      instructor: 'Rahul Sharma',
      category: 'Stock Market',
      image: '/images/stock-market-basics.jpg'
    },
    {
      id: 'c2',
      title: 'Technical Analysis Masterclass',
      description: 'Master chart patterns, indicators, and technical analysis strategies for better trading decisions.',
      level: 'Intermediate',
      duration: '6 hours',
      modules: 12,
      instructor: 'Priya Patel',
      category: 'Trading',
      image: '/images/technical-analysis.jpg'
    },
    {
      id: 'c3',
      title: 'Mutual Fund Investment Strategies',
      description: 'Comprehensive guide to mutual funds, their types, and how to build a diversified mutual fund portfolio.',
      level: 'Beginner',
      duration: '3 hours',
      modules: 6,
      instructor: 'Vikram Desai',
      category: 'Mutual Funds',
      image: '/images/mutual-funds.jpg'
    },
    {
      id: 'c4',
      title: 'Advanced Options Trading',
      description: 'Learn complex options strategies, Greeks, and risk management techniques for options traders.',
      level: 'Advanced',
      duration: '8 hours',
      modules: 15,
      instructor: 'Anjali Singh',
      category: 'Options',
      image: '/images/options-trading.jpg'
    }
  ],
  videos: [
    {
      id: 'v1',
      title: 'How to Read Financial Statements',
      description: 'A detailed walkthrough of balance sheets, income statements, and cash flow statements for investors.',
      duration: '25 min',
      views: '12.5K',
      date: 'May 5, 2023',
      category: 'Financial Analysis',
      image: '/images/financial-statements.jpg'
    },
    {
      id: 'v2',
      title: 'Understanding Market Cycles',
      description: 'Learn about different market cycles, their indicators, and how to position your investments accordingly.',
      duration: '18 min',
      views: '8.3K',
      date: 'April 12, 2023',
      category: 'Market Analysis',
      image: '/images/market-cycles.jpg'
    },
    {
      id: 'v3',
      title: 'Risk Management Essentials',
      description: 'Essential techniques to manage risk in your portfolio including position sizing and diversification.',
      duration: '22 min',
      views: '9.7K',
      date: 'March 28, 2023',
      category: 'Risk Management',
      image: '/images/risk-management.jpg'
    },
    {
      id: 'v4',
      title: 'Tax Planning for Investors',
      description: 'Strategies to optimize your tax liability while maximizing your investment returns.',
      duration: '30 min',
      views: '15.2K',
      date: 'March 15, 2023',
      category: 'Tax Planning',
      image: '/images/tax-planning.jpg'
    }
  ],
  articles: [
    {
      id: 'a1',
      title: 'Asset Allocation: The Key to Long-Term Success',
      description: 'How to distribute your investments across different asset classes based on your risk tolerance and goals.',
      readTime: '8 min read',
      date: 'May 10, 2023',
      category: 'Investment Strategy',
      image: '/images/asset-allocation.jpg'
    },
    {
      id: 'a2',
      title: 'Behavioral Finance: Understanding Your Investment Biases',
      description: 'Explore common psychological biases that affect investment decisions and how to overcome them.',
      readTime: '10 min read',
      date: 'April 25, 2023',
      category: 'Behavioral Finance',
      image: '/images/behavioral-finance.jpg'
    },
    {
      id: 'a3',
      title: 'Fundamental vs Technical Analysis: Which Approach Is Right for You?',
      description: 'A comparison of the two main analysis methods to help you determine which suits your investing style.',
      readTime: '12 min read',
      date: 'April 18, 2023',
      category: 'Analysis Methods',
      image: '/images/analysis-methods.jpg'
    },
    {
      id: 'a4',
      title: 'Building a Retirement Portfolio: Step-by-Step Guide',
      description: 'Practical steps to create a robust retirement portfolio that can support your future financial needs.',
      readTime: '9 min read',
      date: 'March 30, 2023',
      category: 'Retirement Planning',
      image: '/images/retirement-portfolio.jpg'
    }
  ],
  tools: [
    {
      id: 't1',
      title: 'Investment Return Calculator',
      description: 'Calculate potential returns from your investments based on different parameters.',
      category: 'Calculators',
      image: '/images/return-calculator.jpg'
    },
    {
      id: 't2',
      title: 'Portfolio Analyzer',
      description: 'Analyze your existing portfolio for diversification, risk, and potential optimization opportunities.',
      category: 'Analysis Tools',
      image: '/images/portfolio-analyzer.jpg'
    },
    {
      id: 't3',
      title: 'SIP Calculator',
      description: 'Plan your systematic investment plan and visualize the growth over time.',
      category: 'Calculators',
      image: '/images/sip-calculator.jpg'
    },
    {
      id: 't4',
      title: 'Goal Planner',
      description: 'Set financial goals and create an investment roadmap to achieve them.',
      category: 'Planning Tools',
      image: '/images/goal-planner.jpg'
    }
  ]
};

// All categories for filtering
const allCategories = [
  'All',
  'Stock Market',
  'Trading',
  'Mutual Funds',
  'Options',
  'Financial Analysis',
  'Market Analysis',
  'Risk Management',
  'Tax Planning',
  'Investment Strategy',
  'Behavioral Finance',
  'Analysis Methods',
  'Retirement Planning',
  'Calculators',
  'Analysis Tools',
  'Planning Tools'
];

// Learning resource types
const resourceTypes = [
  { id: 'all', name: 'All Resources', icon: GlobeAltIcon },
  { id: 'courses', name: 'Courses', icon: AcademicCapIcon },
  { id: 'videos', name: 'Videos', icon: PlayIcon },
  { id: 'articles', name: 'Articles', icon: BookOpenIcon },
  { id: 'tools', name: 'Tools', icon: ChartBarIcon }
];

export default function LearningCenterPage() {
  const { theme, toggleTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedResourceType, setSelectedResourceType] = useState('all')
  const [filteredResources, setFilteredResources] = useState(learningMaterials)

  // Filter resources based on search term, category, and resource type
  useEffect(() => {
    const filterContent = () => {
      let result = {};
      
      // Clone the original data structure
      Object.keys(learningMaterials).forEach(key => {
        result[key] = [...learningMaterials[key]];
      });
      
      // Apply search filter if exists
      if (searchTerm) {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        
        Object.keys(result).forEach(key => {
          result[key] = result[key].filter(item => 
            item.title.toLowerCase().includes(lowercaseSearchTerm) || 
            item.description.toLowerCase().includes(lowercaseSearchTerm) ||
            item.category.toLowerCase().includes(lowercaseSearchTerm)
          );
        });
      }
      
      // Apply category filter if not 'All'
      if (selectedCategory !== 'All') {
        Object.keys(result).forEach(key => {
          result[key] = result[key].filter(item => item.category === selectedCategory);
        });
      }
      
      setFilteredResources(result);
    };
    
    filterContent();
  }, [searchTerm, selectedCategory, selectedResourceType]);

  // Get resource types to display based on selected resource type
  const getResourceTypesToDisplay = () => {
    if (selectedResourceType === 'all') {
      return Object.keys(learningMaterials);
    }
    return [selectedResourceType];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DSR GROUP MANDSAUR</h1>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with integrated search */}
        <div className="relative mb-16">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-3xl"></div>
          <div className="absolute -bottom-10 left-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/10 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative py-16 px-8 sm:px-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 sm:text-5xl mb-4">
                Learning Center
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 mb-8">
                Expand your financial knowledge with our curated resources, expert-led courses, 
                and practical tools designed to make you a more confident investor.
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses, videos, articles, or tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-16 py-4 w-full rounded-full bg-gray-50 dark:bg-gray-700 border-0 shadow-md ring-1 ring-gray-200 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-3 rounded-full text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mr-1"
                    aria-label="Toggle filters"
                  >
                    <FunnelIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section - Modern Design */}
        <section className={`transition-all duration-300 ease-in-out overflow-hidden mb-12 ${showFilters ? 'max-h-96' : 'max-h-0'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-3">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-300 dark:shadow-indigo-900/30 transform scale-105'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedResourceType('all');
                }}
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Resource Type Tabs - Modern Design */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-1">
            <div className="flex space-x-2 overflow-x-auto py-2 px-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedResourceType(type.id)}
                  className={`
                    flex-1 min-w-[120px] whitespace-nowrap py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
                    ${selectedResourceType === type.id
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'}
                  `}
                >
                  <div className="flex items-center justify-center">
                    {type.icon && <type.icon className="h-5 w-5 mr-2" />}
                    {type.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Display Resources Based on Selected Type */}
        {getResourceTypesToDisplay().map((resourceType) => (
          <section key={resourceType} className="mb-16">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                {resourceType === 'courses' && <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />}
                {resourceType === 'videos' && <PlayIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />}
                {resourceType === 'articles' && <BookOpenIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />}
                {resourceType === 'tools' && <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />}
                {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
              </h2>
              <Link href={`/learning-center/${resourceType}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center text-sm font-medium group">
                View All {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
                <ArrowLongRightIcon className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* No Results Message */}
            {filteredResources[resourceType].length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">No {resourceType} found matching your criteria.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search term.</p>
              </div>
            )}

            {/* Resource Cards - Enhanced Design */}
            {filteredResources[resourceType].length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {filteredResources[resourceType].map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/learning-center/${resourceType}/${item.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-800">
                      {/* Replace with actual image in production */}
                      {/* <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" /> */}
                      <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
                      
                      {/* Category Tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-gray-800 bg-opacity-90 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                        {item.category}
                      </div>
                      
                      {/* Resource Type Indicator */}
                      {resourceType === 'courses' && (
                        <div className="absolute bottom-4 left-4 flex items-center text-white">
                          <AcademicCapIcon className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">{item.level}</span>
                        </div>
                      )}
                      {resourceType === 'videos' && (
                        <div className="absolute bottom-4 left-4 flex items-center text-white">
                          <PlayIcon className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">{item.duration}</span>
                        </div>
                      )}
                      {resourceType === 'articles' && (
                        <div className="absolute bottom-4 left-4 flex items-center text-white">
                          <ClockIcon className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">{item.readTime}</span>
                        </div>
                      )}

                      {/* Play Button for Videos */}
                      {resourceType === 'videos' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <PlayIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Additional Details */}
                      {resourceType === 'courses' && (
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <span className="flex items-center"><AcademicCapIcon className="h-4 w-4 mr-1" />{item.modules} modules</span>
                          <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1" />{item.duration}</span>
                        </div>
                      )}
                      {resourceType === 'videos' && (
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <span>{item.views} views</span>
                          <span>{item.date}</span>
                        </div>
                      )}
                      {resourceType === 'articles' && (
                        <div className="flex justify-end text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Learning Path Section - Modern Design */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12 sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between relative">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white sm:text-4xl max-w-xl">
                  Ready to take your learning to the next level?
                </h2>
                <p className="mt-3 text-lg text-indigo-100 max-w-lg">
                  Try our personalized learning paths designed for investors at all stages, from beginners to seasoned professionals.
                </p>
              </div>
              
              <div className="mt-8 lg:mt-0 lg:ml-8 flex flex-shrink-0 relative z-10">
                <Link 
                  href="/learning-center/paths" 
                  className="inline-flex items-center px-6 py-4 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200"
                >
                  Explore Learning Paths
                  <ArrowLongRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Modern Design */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Are these learning resources free?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Most of our articles and basic videos are free for all users. Premium courses and advanced tools require a subscription or can be accessed by our investment clients.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Can I download resources for offline use?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Yes, most of our articles and course materials can be downloaded as PDFs for offline reading. Videos are available for offline viewing in our mobile app.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">How often are new resources added?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We add new content weekly, including articles, videos, and tools. Major course updates are released quarterly.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Can I request specific topics?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Absolutely! We welcome content suggestions from our users. Please use the feedback form on our contact page to submit your requests.
                </p>
              </div>
            </div>
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