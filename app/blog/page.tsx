"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Search, ChevronRight, Clock, Calendar, Tag, ChevronLeft, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function BlogPage() {
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = useState("All")

  // Sample blog categories
  const categories = ["All", "Market Analysis", "Investment Tips", "IPO Updates", "Trading Strategies", "Mutual Funds", "Personal Finance"]
  
  // Sample blog posts (you can replace these with your actual data)
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the Impact of RBI Policy on Stock Markets",
      excerpt: "Analysis of how the Reserve Bank of India's monetary policy decisions affect equity markets and what investors should watch for.",
      category: "Market Analysis",
      author: "Rahul Sharma",
      date: "June 15, 2023",
      readTime: "8 min read",
      image: "/assets/blog/post1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "5 Key Metrics to Evaluate Before Investing in an IPO",
      excerpt: "Essential financial and business metrics that every investor should analyze before participating in an Initial Public Offering.",
      category: "IPO Updates",
      author: "Priya Mehta",
      date: "May 28, 2023",
      readTime: "6 min read",
      image: "/assets/blog/post2.jpg",
      featured: false
    },
    {
      id: 3,
      title: "The Beginner's Guide to Options Trading in India",
      excerpt: "A comprehensive introduction to options trading for new investors, covering basic strategies and risk management techniques.",
      category: "Trading Strategies",
      author: "Vikram Patel",
      date: "May 12, 2023",
      readTime: "10 min read",
      image: "/assets/blog/post3.jpg",
      featured: false
    },
    {
      id: 4,
      title: "How to Build a Diversified Mutual Fund Portfolio",
      excerpt: "Step-by-step approach to creating a balanced mutual fund portfolio that aligns with your financial goals and risk tolerance.",
      category: "Mutual Funds",
      author: "Neha Singh",
      date: "April 29, 2023",
      readTime: "7 min read",
      image: "/assets/blog/post4.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Tax-Saving Investment Options for the New Financial Year",
      excerpt: "Detailed overview of tax-efficient investment vehicles that can help you minimize your tax burden while building wealth.",
      category: "Personal Finance",
      author: "Amit Kumar",
      date: "April 10, 2023",
      readTime: "9 min read",
      image: "/assets/blog/post5.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Technical Analysis: Key Patterns Every Trader Should Know",
      excerpt: "Essential chart patterns and technical indicators that can help traders make more informed decisions in volatile markets.",
      category: "Trading Strategies",
      author: "Sanjay Gupta",
      date: "March 22, 2023",
      readTime: "8 min read",
      image: "/assets/blog/post6.jpg",
      featured: false
    }
  ]

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)
  
  const filteredPosts = activeCategory === "All" 
    ? regularPosts 
    : regularPosts.filter(post => post.category === activeCategory)

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section with Featured Post */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gradient-to-r from-gray-50 to-gray-100' : 'bg-gradient-to-r from-gray-900 to-gray-800'
      }`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              DSR GROUP MANDSAUR <br/> Insights
            </h1>
            <div className={`mt-6 md:mt-0 flex items-center rounded-lg px-4 py-2 w-full md:w-auto ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
            }`}>
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search articles..."
                className={`bg-transparent border-none focus:outline-none w-full ${
                  theme === 'light' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'
                }`}
              />
            </div>
          </div>

          {featuredPost && (
            <div className={`rounded-xl overflow-hidden ${
              theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-400'
                  }`}>
                    {featuredPost.category}
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                      }`}>
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{featuredPost.author}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {featuredPost.date}
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`} className={`flex items-center font-medium ${
                      theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                    }`}>
                      Read more <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Categories and Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Categories */}
          <div className="mb-12 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 md:space-x-4 min-w-max">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? theme === 'light'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-700 text-white'
                      : theme === 'light'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className={`rounded-xl overflow-hidden ${
                theme === 'light' ? 'bg-white shadow border border-gray-100' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className="relative h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-400'
                    }`}>
                      {post.category}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                      }`}>
                        <User size={14} />
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className={`text-sm font-medium flex items-center ${
                      theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                    }`}>
                      Read more <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4, 5].map(page => (
                <button 
                  key={page} 
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    page === 1
                      ? theme === 'light'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-700 text-white'
                      : theme === 'light'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Stay Updated with Market Insights
            </h2>
            <p className="mb-8">
              Subscribe to our newsletter and get the latest market updates, investment ideas, and trading strategies delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`px-4 py-3 rounded-lg w-full ${
                  theme === 'light' 
                    ? 'bg-white border border-gray-200' 
                    : 'bg-gray-800 border border-gray-700'
                }`}
              />
              <button className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-700 text-white hover:bg-blue-600'
              }`}>
                Subscribe <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              We respect your privacy. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 