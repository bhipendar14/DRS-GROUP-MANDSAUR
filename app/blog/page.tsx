"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Coming Soon Hero Section */}
      <section className={`py-20 sm:py-32 relative overflow-hidden ${
        theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-white' : 'bg-gradient-to-br from-gray-900 to-gray-800'
      }`}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute top-40 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
              }`}>
                <BookOpen className={`w-8 h-8 ${
                  theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                }`} />
              </div>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Blog Coming Soon
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className={`text-lg sm:text-xl leading-relaxed mb-12 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              We're crafting insightful articles to help you navigate the financial world. Our blog will feature market analysis, investment strategies, and expert financial advice.
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/about" 
                className={`px-8 py-3 rounded-lg font-medium text-base sm:text-lg transition-all transform hover:-translate-y-0.5 ${
                  theme === 'light' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
                    : 'bg-blue-700 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25'
                }`}>
                About Us
              </Link>
              <Link href="/contact" 
                className={`px-8 py-3 rounded-lg font-medium text-base sm:text-lg transition-all transform hover:-translate-y-0.5 ${
                  theme === 'light'
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-purple-700 text-white hover:bg-purple-600 shadow-lg hover:shadow-purple-500/25'
                }`}>
                Contact Us
              </Link>
            </div>

            {/* Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Market Analysis",
                  description: "Expert insights on market trends and investment opportunities.",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                },
                {
                  title: "Investment Tips",
                  description: "Strategic advice for building and managing your portfolio.",
                  icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                },
                {
                  title: "Financial Education",
                  description: "Learn about financial markets and investment strategies.",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                }
              ].map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-1 ${
                    theme === 'light'
                      ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 