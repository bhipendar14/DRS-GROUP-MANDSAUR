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
  ArrowUpRight,
  Coins,
  Wallet,
  Globe,
  Zap,
  Lock,
  ChartBar,
  Award,
  Sparkles
} from "lucide-react"

export default function AIFPage() {
  const { theme } = useTheme()
  const [showLearnMore, setShowLearnMore] = useState(false)

  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Diversified Portfolio",
      description: "Access a wide range of alternative investments across different asset classes."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Professional Management",
      description: "Expert fund managers handle your investments with strategic oversight."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Opportunities",
      description: "Invest in international markets and diverse geographical regions."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High Growth Potential",
      description: "Target higher returns through specialized investment strategies."
    }
  ]

  const whyChooseUs = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Track Record",
      description: "Our AIFs have consistently delivered superior returns across market cycles."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Regulated Framework",
      description: "All our AIFs operate within SEBI's regulatory framework for investor protection."
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "Strategic Allocation",
      description: "Optimal asset allocation strategies tailored to market conditions."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovative Approach",
      description: "Cutting-edge investment strategies leveraging market inefficiencies."
    }
  ]

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
        
        {/* Animated Waves */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className={`absolute h-[300px] w-[300px] rounded-full blur-3xl ${
                theme === 'light'
                  ? 'bg-blue-400/20'
                  : 'bg-blue-500/10'
              }`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className={`absolute w-2 h-2 rounded-full ${
                theme === 'light'
                  ? 'bg-blue-400/30'
                  : 'bg-blue-500/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                delay: i * 0.3,
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
                    Alternative 
                    <span className={
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }> Investment Funds</span>
                  </h1>
                  <p className={`text-xl ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    Discover sophisticated investment opportunities beyond traditional markets. 
                    Access exclusive alternative investments managed by industry experts.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className={`group inline-flex items-center px-8 py-4 rounded-full font-medium
                        ${theme === 'light'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
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
                  className="relative h-[500px]"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                    {/* Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl"
                    >
                      <img
                        src="/logo.jpg"
                        alt="DSR Group Logo"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Key Statistics */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      {[
                        {
                          icon: <TrendingUp className="w-6 h-6" />,
                          title: "Category I & II",
                          value: "SEBI Registered"
                        },
                        {
                          icon: <Building2 className="w-6 h-6" />,
                          title: "Infrastructure",
                          value: "Strong Foundation"
                        },
                        {
                          icon: <Gem className="w-6 h-6" />,
                          title: "Experience",
                          value: "15+ Years"
                        },
                        {
                          icon: <ShieldCheck className="w-6 h-6" />,
                          title: "Compliance",
                          value: "100% Adherence"
                        }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className={`p-4 rounded-xl ${
                            theme === 'light'
                              ? 'bg-white shadow-lg border border-gray-100'
                              : 'bg-gray-800 border border-gray-700'
                          }`}
                        >
                          <div className={`mb-2 ${
                            theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                          }`}>
                            {stat.icon}
                          </div>
                          <div className={`text-sm font-medium ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {stat.title}
                          </div>
                          <div className={`text-lg font-semibold ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {stat.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                        theme === 'light'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-blue-900/20 text-blue-400'
                      }`}
                    >
                      <Users2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Trusted by 1000+ Investors</span>
                    </motion.div>
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
                Our AIF Offerings
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Discover the advantages of investing in Alternative Investment Funds
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
                  Experience the DSR Group advantage in Alternative Investment Funds
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
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
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
                  ? 'bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-lg border border-gray-100'
                  : 'bg-gradient-to-r from-blue-900/20 via-gray-900/10 to-indigo-900/20 border border-gray-800'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Invest in Alternative Investment Funds?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Join DSR Group and access exclusive alternative investment opportunities.
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
                  {/* What are AIFs */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      What are Alternative Investment Funds (AIFs)?
                    </h3>
                    <p className={`text-lg ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      Alternative Investment Funds (AIFs) are privately pooled investment vehicles that collect funds from sophisticated investors, whether Indian or foreign, for investing in accordance with a defined investment policy. AIFs are regulated by the Securities and Exchange Board of India (SEBI) and offer exposure to non-traditional asset classes beyond stocks, bonds, and cash.
                    </p>
                  </div>

                  {/* Introduction */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Introduction to AIFs
                    </h3>
                    <p className={`text-lg ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      AIFs represent a sophisticated investment avenue that allows investors to diversify their portfolios beyond traditional asset classes. These funds can invest in a wide range of assets including private equity, venture capital, real estate, infrastructure, and other alternative investments. AIFs are typically structured as trusts or companies and are managed by professional fund managers with expertise in specific investment strategies.
                    </p>
                  </div>

                  {/* About Our AIFs */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      About Our AIFs
                    </h3>
                    <p className={`text-lg mb-4 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      DSR Group offers a range of SEBI-registered Alternative Investment Funds designed to provide sophisticated investors with access to high-potential investment opportunities. Our AIFs are managed by experienced professionals with deep expertise in their respective investment domains.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl ${
                        theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                      }`}>
                        <h4 className={`text-lg font-semibold mb-2 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Our Mission
                        </h4>
                        <p className={
                          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        }>
                          To provide sophisticated investors with access to high-quality alternative investment opportunities while maintaining the highest standards of transparency and risk management.
                        </p>
                      </div>
                      <div className={`p-4 rounded-xl ${
                        theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                      }`}>
                        <h4 className={`text-lg font-semibold mb-2 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          Our Approach
                        </h4>
                        <p className={
                          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        }>
                          We combine thorough due diligence, market expertise, and risk management to identify and offer high-potential investment opportunities across various alternative asset classes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits of AIFs */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      Benefits of Investing in AIFs
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Portfolio Diversification",
                        "Access to Exclusive Opportunities",
                        "Professional Management",
                        "Potential for Higher Returns",
                        "Tax Efficiency",
                        "Regulated Framework"
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
                      Why Choose DSR Group for AIFs?
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
                            theme === 'light' ? 'text-blue-600' : 'text-blue-400'
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

                  {/* AIF Categories */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      AIF Categories
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Category I",
                          description: "Venture capital funds, SME funds, social venture funds, and infrastructure funds"
                        },
                        {
                          title: "Category II",
                          description: "Private equity funds, debt funds, fund of funds, and other funds not falling under Category I or III"
                        },
                        {
                          title: "Category III",
                          description: "Hedge funds, PIPE funds, and other funds that employ diverse or complex trading strategies"
                        }
                      ].map((category, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${
                            theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                          }`}
                        >
                          <h4 className={`text-lg font-semibold mb-2 ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {category.title}
                          </h4>
                          <p className={
                            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                          }>
                            {category.description}
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
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
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