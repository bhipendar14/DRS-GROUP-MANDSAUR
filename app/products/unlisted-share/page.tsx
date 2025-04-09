"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { 
  TrendingUp,
  Building2,
  Gem,
  LineChart,
  ShieldCheck,
  Users2,
  ArrowRight,
  CheckCircle2,
  X,
  Briefcase,
  Target,
  BadgeCheck,
  Scale,
  ChevronRight,
  BarChart3,
  PieChart,
  ArrowUpRight
} from "lucide-react"

export default function UnlistedSharePage() {
  const { theme } = useTheme()
  const [showLearnMore, setShowLearnMore] = useState(false)

  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Pre-IPO Opportunities",
      description: "Access shares of promising companies before they go public."
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Exclusive Deals",
      description: "Get access to unique investment opportunities in private companies."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Due Diligence",
      description: "Thorough verification and analysis of unlisted companies."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Potential",
      description: "Invest early in high-growth companies with significant upside potential."
    }
  ]

  const whyChooseUs = [
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Our team of experts provides comprehensive analysis and guidance for unlisted share investments."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Transparent Pricing",
      description: "Fair and transparent pricing with complete disclosure of all charges."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Curated Opportunities",
      description: "Carefully selected unlisted shares with strong growth potential."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Portfolio Diversification",
      description: "Access to diverse sectors and companies for balanced investment."
    }
  ]

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
        
        {/* Cloud Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className={`absolute rounded-full blur-3xl ${
                theme === 'light'
                  ? 'bg-white/30'
                  : 'bg-gray-800/30'
              }`}
              style={{
                width: `${300 + i * 100}px`,
                height: `${200 + i * 50}px`,
                left: `${i * 20}%`,
                top: `${i * 15}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className={`absolute w-[300px] h-[300px] rounded-full blur-3xl ${
                theme === 'light'
                  ? 'bg-purple-500/10'
                  : 'bg-purple-400/10'
              }`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                theme === 'light'
                  ? 'bg-purple-500/20'
                  : 'bg-purple-400/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Unlisted 
                    <span className={
                      theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                    }> Shares</span>
                  </h1>
                  <p className={`text-xl ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    Discover exceptional investment opportunities in pre-IPO and private companies. 
                    Get early access to tomorrow's market leaders.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className={`group inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                        } transition-all duration-300 hover:scale-105`}
                    >
                      Start Investing 
                      <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                      onClick={() => setShowLearnMore(true)}
                      className={`group inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-white text-gray-900 hover:bg-gray-50 shadow-md'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                        } transition-all duration-300`}
                    >
                      Learn More
                      <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>

                {/* Right Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[400px]"
                >
                  <div className="absolute inset-0">
                    {[
                      { Icon: BarChart3, position: { top: '10%', left: '20%' } },
                      { Icon: PieChart, position: { top: '40%', right: '10%' } },
                      { Icon: LineChart, position: { bottom: '20%', left: '30%' } }
                    ].map(({ Icon, position }, index) => (
                      <motion.div
                        key={index}
                        className={`absolute ${
                          theme === 'light' 
                            ? 'bg-white shadow-lg' 
                            : 'bg-gray-800 border border-gray-700'
                        } rounded-2xl p-6`}
                        style={position}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [-1, 1, -1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        <Icon className={`w-8 h-8 ${
                          theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                        }`} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Our Offerings
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Discover the advantages of investing in unlisted shares with us
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
                    theme === 'light' ? 'text-purple-600' : 'text-purple-400'
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

        {/* Why Choose Us Section */}
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
                  Why Choose Us
                </h2>
                <p className={`text-lg ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Experience the DSR GROUP MANDSAUR advantage in unlisted share investments
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {whyChooseUs.map((item, index) => (
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
                    <div className={`flex-shrink-0 ${
                      theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                    }`}>
                      {item.icon}
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
                  ? 'bg-gradient-to-r from-purple-50 via-white to-blue-50 shadow-lg border border-gray-100'
                  : 'bg-gradient-to-r from-purple-900/20 via-gray-900/10 to-blue-900/20 border border-gray-800'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Invest in Unlisted Shares?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Join DSR GROUP MANDSAUR and access exclusive pre-IPO investment opportunities.
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                  ${theme === 'light'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-500 hover:bg-purple-600'
                  } text-white transition-all duration-300 hover:scale-105`}
              >
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Learn More Modal */}
        <AnimatePresence>
          {showLearnMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-900'
                } shadow-2xl`}
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
                  {/* What are Unlisted Shares */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      What are Unlisted Shares?
                    </h3>
                    <p className={`text-lg ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      Unlisted shares are securities of companies that are not traded on stock exchanges. These shares represent ownership in private companies, pre-IPO companies, or delisted companies. Investing in unlisted shares can offer unique opportunities to participate in a company's growth journey before it goes public.
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Benefits of Unlisted Shares
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "High Growth Potential",
                        "Early Investment Advantage",
                        "Portfolio Diversification",
                        "Lower Competition",
                        "Pre-IPO Opportunities",
                        "Long-term Value Creation"
                      ].map((benefit, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                          }`}
                        >
                          <CheckCircle2 className={
                            theme === 'light' ? 'text-purple-600' : 'text-purple-400'
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
                      Why Choose DSR GROUP MANDSAUR for Unlisted Shares?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {whyChooseUs.map((item, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${
                            theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                          }`}
                        >
                          <div className={`mb-3 ${
                            theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                          }`}>
                            {item.icon}
                          </div>
                          <h4 className={`text-lg font-semibold mb-2 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {item.title}
                          </h4>
                          <p className={
                            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                          }>
                            {item.description}
                          </p>
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
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                        } transition-all duration-300 hover:scale-105`}
                    >
                      Start Investing Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  )
} 