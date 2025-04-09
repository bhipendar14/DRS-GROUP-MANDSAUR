"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import {
  Shield,
  Heart,
  Home,
  Car,
  Plane,
  Umbrella,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Building,
  Activity,
  ShieldCheck,
  Clock,
  Sparkles,
  HandHeart,
  Leaf,
  Wallet,
  ScrollText,
  BadgeCheck,
  ArrowUpRight
} from "lucide-react"

type InsuranceFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

type InsuranceType = {
  title: string;
  description: string;
  features: InsuranceFeature[];
  products: InsuranceFeature[];
}

type InsuranceTypes = {
  [key: string]: InsuranceType;
}

export default function InsurancePage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'life' | 'general'>('life')

  const insuranceTypes: InsuranceTypes = {
    life: {
      title: "Life Insurance",
      description: "Secure your family's future with comprehensive life insurance solutions",
      features: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Financial Security",
          description: "Protect your loved ones with guaranteed financial support"
        },
        {
          icon: <Wallet className="w-6 h-6" />,
          title: "Wealth Creation",
          description: "Build long-term wealth with investment-linked policies"
        },
        {
          icon: <ScrollText className="w-6 h-6" />,
          title: "Tax Benefits",
          description: "Enjoy tax advantages under Section 80C and 10(10D)"
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "Retirement Planning",
          description: "Secure your retirement with pension plans"
        }
      ],
      products: [
        {
          icon: <Users className="w-6 h-6" />,
          title: "Term Life Insurance",
          description: "Pure protection plan with high coverage at affordable premiums"
        },
        {
          icon: <Briefcase className="w-6 h-6" />,
          title: "Endowment Plans",
          description: "Combination of insurance protection and savings"
        },
        {
          icon: <Building className="w-6 h-6" />,
          title: "ULIPs",
          description: "Market-linked insurance plans for wealth creation"
        },
        {
          icon: <Activity className="w-6 h-6" />,
          title: "Child Plans",
          description: "Secure your child's future education and needs"
        }
      ]
    },
    general: {
      title: "General Insurance",
      description: "Protect your assets and health with comprehensive coverage options",
      features: [
        {
          icon: <HandHeart className="w-6 h-6" />,
          title: "Health Protection",
          description: "Comprehensive health coverage for you and your family"
        },
        {
          icon: <Car className="w-6 h-6" />,
          title: "Asset Security",
          description: "Protect your valuable assets against damages and losses"
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          title: "Travel Safety",
          description: "Worldwide travel protection and emergency assistance"
        },
        {
          icon: <BadgeCheck className="w-6 h-6" />,
          title: "Business Coverage",
          description: "Comprehensive protection for your business operations"
        }
      ],
      products: [
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Health Insurance",
          description: "Medical coverage for individuals and families"
        },
        {
          icon: <Home className="w-6 h-6" />,
          title: "Property Insurance",
          description: "Protection for homes and commercial properties"
        },
        {
          icon: <Plane className="w-6 h-6" />,
          title: "Travel Insurance",
          description: "Worldwide travel protection and assistance"
        },
        {
          icon: <Umbrella className="w-6 h-6" />,
          title: "Liability Insurance",
          description: "Protection against third-party claims"
        }
      ]
    }
  }

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute h-[400px] w-[400px] rounded-full blur-3xl ${
                theme === 'light'
                  ? 'bg-blue-400/20'
                  : 'bg-blue-500/10'
              }`}
              style={{
                left: `${10 + i * 30}%`,
                top: `${20 + i * 25}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 3
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-5xl lg:text-6xl font-bold mb-6 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                Comprehensive Insurance
                <span className={
                  theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                }> Solutions</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-xl mb-12 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Protect what matters most with our comprehensive range of life and general insurance solutions.
                Expert guidance to secure your future and assets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="/contact"
                  className={`group inline-flex items-center px-8 py-4 rounded-full font-medium
                    ${theme === 'light'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-all duration-300 hover:scale-105`}
                >
                  Get Protected Now
                  <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <button
                  onClick={() => document.getElementById('insurance-types')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group inline-flex items-center px-8 py-4 rounded-full font-medium
                    ${theme === 'light'
                      ? 'bg-white text-gray-900 hover:bg-gray-50 shadow-md'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                    } transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Insurance Types Section */}
        <section id="insurance-types" className={`py-20 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Tabs */}
              <div className="flex justify-center mb-12">
                <div className={`inline-flex rounded-full p-1 ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
                }`}>
                  {['life', 'general'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'life' | 'general')}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        activeTab === tab
                          ? theme === 'light'
                            ? 'bg-white text-blue-600 shadow-md'
                            : 'bg-gray-700 text-blue-400'
                          : theme === 'light'
                            ? 'text-gray-600 hover:text-gray-900'
                            : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab === 'life' ? 'Life Insurance' : 'General Insurance'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-16">
                    <h2 className={`text-3xl font-bold mb-4 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {insuranceTypes[activeTab].title}
                    </h2>
                    <p className={`text-lg ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {insuranceTypes[activeTab].description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {insuranceTypes[activeTab].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
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

                  {/* Products Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {insuranceTypes[activeTab].products.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`p-6 rounded-2xl ${
                          theme === 'light'
                            ? 'bg-blue-50 hover:bg-blue-100'
                            : 'bg-blue-900/20 hover:bg-blue-900/30'
                        } transition-all duration-300`}
                      >
                        <div className={`mb-4 ${
                          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {product.icon}
                        </div>
                        <h3 className={`text-xl font-semibold mb-3 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {product.title}
                        </h3>
                        <p className={
                          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        }>
                          {product.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                Why Choose DSR Group Mandsaur for Insurance?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`text-lg ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                Experience the DSR Group Mandsaur advantage with our comprehensive insurance solutions
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "Expert Guidance",
                  description: "Our experienced advisors help you choose the right insurance plans"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Customized Solutions",
                  description: "Tailored insurance packages to meet your specific needs"
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Quick Claims Support",
                  description: "Efficient claims processing and dedicated support"
                }
              ].map((item, index) => (
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
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }>
                    {item.description}
                  </p>
                </motion.div>
              ))}
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
                Ready to Secure Your Future?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Get in touch with our insurance experts and find the perfect coverage for your needs.
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full font-medium
                  ${theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-all duration-300 hover:scale-105`}
              >
                Contact Us Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
} 