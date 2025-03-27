'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, ArrowLongRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Sample digest data - replace with actual data or API call
const digestArticles = [
  {
    id: 1,
    title: 'Quarterly Market Review: Insights for Investors',
    excerpt: 'A comprehensive analysis of market trends, performance metrics, and strategic outlook for the coming quarter.',
    category: 'Market Analysis',
    date: 'May 15, 2023',
    readTime: '8 min read',
    image: '/images/market-review.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Understanding Mutual Funds: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of mutual funds, how they work, and why they might be a good addition to your investment portfolio.',
    category: 'Investment Education',
    date: 'April 28, 2023',
    readTime: '6 min read',
    image: '/images/mutual-funds.jpg',
    featured: false
  },
  {
    id: 3,
    title: 'Tax-Saving Investment Options for the New Financial Year',
    excerpt: 'Explore various tax-saving investment vehicles that can help optimize your tax liability while building wealth.',
    category: 'Tax Planning',
    date: 'April 10, 2023',
    readTime: '7 min read',
    image: '/images/tax-saving.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'How to Build a Diversified Portfolio in Volatile Markets',
    excerpt: 'Strategic approaches to maintain balance in your investment portfolio during unpredictable market conditions.',
    category: 'Investment Strategy',
    date: 'March 22, 2023',
    readTime: '9 min read',
    image: '/images/diversified-portfolio.jpg',
    featured: false
  },
  {
    id: 5,
    title: 'The Impact of Global Events on Indian Markets',
    excerpt: 'Analysis of how international economic and political developments affect domestic market performance.',
    category: 'Market Analysis',
    date: 'March 15, 2023',
    readTime: '10 min read',
    image: '/images/global-impact.jpg',
    featured: false
  },
  {
    id: 6,
    title: 'Digital Transformation in Financial Services',
    excerpt: 'How technology is reshaping the landscape of financial services and what it means for investors.',
    category: 'Industry Trends',
    date: 'February 28, 2023',
    readTime: '5 min read',
    image: '/images/digital-finance.jpg',
    featured: false
  },
  {
    id: 7,
    title: 'Retirement Planning: Start Early, Retire Comfortably',
    excerpt: 'The importance of early retirement planning and strategies to ensure financial security in your golden years.',
    category: 'Financial Planning',
    date: 'February 15, 2023',
    readTime: '7 min read',
    image: '/images/retirement.jpg',
    featured: false
  },
  {
    id: 8,
    title: 'Understanding IPOs: Opportunities and Risks',
    excerpt: 'A detailed guide on Initial Public Offerings, their evaluation, and considerations before investing.',
    category: 'Investment Education',
    date: 'January 30, 2023',
    readTime: '8 min read',
    image: '/images/ipo.jpg',
    featured: false
  }
];

// Categories for filtering
const categories = [
  'All',
  'Market Analysis',
  'Investment Education',
  'Tax Planning',
  'Investment Strategy',
  'Industry Trends',
  'Financial Planning'
];

export default function DSRGroupDigestPage() {
  const { theme, toggleTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredArticles, setFilteredArticles] = useState(digestArticles)
  const [featuredArticle, setFeaturedArticle] = useState(digestArticles.find(article => article.featured))
  const [emailSubscription, setEmailSubscription] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Filter articles based on search term and category
  useEffect(() => {
    let filtered = digestArticles;
    
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(lowercaseSearchTerm) || 
        article.excerpt.toLowerCase().includes(lowercaseSearchTerm) ||
        article.category.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would handle the subscription logic here
    console.log('Subscribing email:', emailSubscription);
    setIsSubscribed(true);
    setEmailSubscription('');
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            DSR Group Digest
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with our latest insights, market analysis, and investment strategies to help you make sound financial decisions.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/2 relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  {/* Replace with actual image in production */}
                  {/* <Image 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    layout="fill"
                    objectFit="cover"
                  /> */}
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <Link href={`/dsr-group-digest/${featuredArticle.id}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                    Read Full Article
                    <ArrowLongRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Articles</h2>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    {/* Replace with actual image in production */}
                    {/* <Image 
                      src={article.image} 
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    /> */}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-xs">
                        {article.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </span>
                      <Link href={`/dsr-group-digest/${article.id}`} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm flex items-center">
                        Read More
                        <ArrowLongRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="mb-16">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 sm:text-3xl">
                  Subscribe to DSR Group Digest
                </h2>
                <p className="mt-2 text-lg text-indigo-700 dark:text-indigo-300">
                  Get our latest articles, market insights, and investment tips delivered directly to your inbox.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                {isSubscribed ? (
                  <div className="bg-green-100 dark:bg-green-800 rounded-md p-4 text-green-800 dark:text-green-100">
                    Thank you for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="sm:flex sm:max-w-md">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      value={emailSubscription}
                      onChange={(e) => setEmailSubscription(e.target.value)}
                      className="w-full px-5 py-3 border border-indigo-300 dark:border-indigo-700 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md dark:bg-gray-800 dark:text-white"
                    />
                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                )}
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