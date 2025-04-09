"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { 
  ArrowRightLeft, 
  BarChart2, 
  Shield, 
  TrendingUp, 
  Clock, 
  LineChart,
  PieChart,
  Percent,
  CircleDollarSign,
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react"

export default function SLBMPage() {
  const { theme } = useTheme()
  const [showLearnMore, setShowLearnMore] = useState(false)

  const features = [
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "Seamless Lending",
      description: "Lend your securities easily and earn additional returns on your portfolio."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Borrowing",
      description: "Access securities for short-term needs with robust safety mechanisms."
    },
    {
      icon: <Percent className="w-6 h-6" />,
      title: "Competitive Rates",
      description: "Get attractive lending fees and competitive borrowing rates."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Duration",
      description: "Choose lending/borrowing periods that suit your strategy."
    }
  ]

  const whyChooseUs = [
    "15+ Years of Market Experience",
    "Robust Risk Management",
    "Real-time Market Analytics",
    "Dedicated Support Team",
    "Transparent Fee Structure",
    "Advanced Trading Platform"
  ]

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-[0.03]">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={theme === 'light' ? '#000' : '#fff'} strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px ${
                theme === 'light' ? 'bg-blue-600/20' : 'bg-blue-400/20'
              }`}
              style={{
                width: '200px',
                top: `${30 + i * 25}%`,
                left: '-200px'
              }}
              animate={{
                x: ['0vw', '100vw'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Securities Lending & 
                    <span className={
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }> Borrowing</span>
                  </h1>
                  <p className={`text-xl ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    Unlock the potential of your portfolio with our advanced SLBM platform. 
                    Generate additional returns through securities lending or access securities 
                    for your short-term needs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                        } transition-all duration-300 hover:scale-105`}
                    >
                      Start Trading <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => setShowLearnMore(true)}
                      className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                        } transition-all duration-300`}
                    >
                      Learn More
                    </button>
                    <a
                      href="https://www.nseindia.com/market-data/securities-lending-and-borrowing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                        } transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                      NSE SLBM Data <TrendingUp className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                </motion.div>

                {/* Right Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[400px]"
                >
                  <div className={`absolute inset-0 rounded-3xl ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-lg'
                      : 'bg-gradient-to-br from-blue-900/20 via-gray-900/10 to-purple-900/20 border border-gray-800'
                  }`}>
                    {/* Animated Trading Elements */}
                    {[LineChart, BarChart2, PieChart, CircleDollarSign].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className={`absolute ${
                          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                        }`}
                        style={{
                          top: `${20 + index * 20}%`,
                          left: `${20 + index * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        <Icon size={40} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Learn More Modal */}
        {showLearnMore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`}
            >
              <button
                onClick={() => setShowLearnMore(false)}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-8">
                {/* What is SLBM */}
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    What is Securities Lending and Borrowing (SLBM)?
                  </h3>
                  <p className={`text-lg ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    SLBM is a mechanism through which investors can temporarily lend their securities to other investors and earn additional returns. It allows for efficient market functioning, better price discovery, and provides opportunities for both lenders and borrowers to optimize their investment strategies.
                  </p>
                </div>

                {/* Key Benefits */}
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Key Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Additional Income Generation",
                      "Enhanced Portfolio Returns",
                      "Improved Market Liquidity",
                      "Risk Management Tool",
                      "Short-term Trading Opportunities",
                      "Flexible Investment Options"
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                        }`}
                      >
                        <CheckCircle2 className={
                          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                        } />
                        <span className={
                          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Why Choose DSR Group Mandsaur for SLBM?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {whyChooseUs.map((reason, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                        }`}
                      >
                        <CheckCircle2 className={
                          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                        } />
                        <span className={
                          theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                        }>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Get Started Button */}
                <div className="text-center pt-4">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                      ${theme === 'light'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      } transition-all duration-300 hover:scale-105`}
                  >
                    Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Features Grid */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl font-bold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                SLBM Features
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Explore the benefits of our Securities Lending & Borrowing platform
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`p-6 rounded-2xl ${
                    theme === 'light'
                      ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                  } transition-all duration-300`}
                >
                  <div className={`mb-4 ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className={`text-3xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  How SLBM Works
                </h2>
                <p className={`text-lg ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Understanding the securities lending and borrowing process
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Register & Verify",
                    description: "Complete a simple registration process and verify your account."
                  },
                  {
                    step: "02",
                    title: "Choose Your Role",
                    description: "Decide whether you want to lend your securities or borrow from others."
                  },
                  {
                    step: "03",
                    title: "Set Terms",
                    description: "Specify your lending duration, rates, and other preferences."
                  },
                  {
                    step: "04",
                    title: "Start Trading",
                    description: "Begin lending or borrowing securities through our platform."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-start gap-6 p-6 rounded-2xl ${
                      theme === 'light'
                        ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    } transition-all duration-300`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      theme === 'light'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-blue-900/30 text-blue-400'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                      }>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`max-w-4xl mx-auto text-center p-12 rounded-3xl ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-lg border border-gray-100'
                  : 'bg-gradient-to-r from-blue-900/20 via-gray-900/10 to-purple-900/20 border border-gray-800'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Start Trading?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Join our SLBM platform and discover new opportunities in securities trading.
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                  ${theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-all duration-300 hover:scale-105`}
              >
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
} 