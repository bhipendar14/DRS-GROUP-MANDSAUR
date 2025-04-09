"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Calculator, 
  Clock, 
  GraduationCap, 
  Heart, 
  Wallet, 
  Plane, 
  Shield, 
  PiggyBank 
} from "lucide-react"

export default function CalculatorsPage() {
  const { theme } = useTheme()
  
  const calculators = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate your wealth growth through Systematic Investment Plan',
      icon: Calculator,
      href: '/calculators/sip'
    },
    {
      id: 'limited-period',
      title: 'Limited Period SIP Calculator',
      description: 'Calculate returns for a specific investment duration',
      icon: Clock,
      href: '/calculators/limited-period'
    },
    {
      id: 'education',
      title: 'Child Education Planning',
      description: "Secure your child's future education needs",
      icon: GraduationCap,
      href: '/calculators/education'
    },
    {
      id: 'marriage',
      title: 'Child Marriage Plan',
      description: "Plan ahead for your child's marriage expenses",
      icon: Heart,
      href: '/calculators/marriage'
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Ensure a comfortable retirement with proper planning',
      icon: Wallet,
      href: '/calculators/retirement'
    },
    {
      id: 'vacation',
      title: 'Dream Vacation Planning',
      description: 'Save for your dream vacation systematically',
      icon: Plane,
      href: '/calculators/vacation'
    },
    {
      id: 'insurance',
      title: 'Life Insurance Calculator',
      description: 'Calculate the ideal life insurance coverage for your family',
      icon: Shield,
      href: '/calculators/insurance'
    },
    {
      id: 'lumpsum',
      title: 'Lumpsum Calculator',
      description: 'Plan your one-time investment returns',
      icon: PiggyBank,
      href: '/calculators/lumpsum'
    }
  ]
  
  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
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
                </div>
                
      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Financial Calculators
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Plan your financial future with our comprehensive suite of calculators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calc, index) => {
              const IconComponent = calc.icon
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl ${
                    theme === 'light'
                      ? 'bg-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80'
                  } transition-all duration-300`}
                >
                  <Link href={calc.href} className="block p-6">
                    <div className="mb-4 relative">
                      <div className={`w-24 h-24 rounded-full mx-auto ${
                        theme === 'light' 
                          ? 'bg-blue-50' 
                          : 'bg-blue-900/20'
                      } flex items-center justify-center`}>
                        <IconComponent 
                          className={`w-12 h-12 ${
                            theme === 'light' 
                              ? 'text-blue-600' 
                              : 'text-blue-400'
                          } transform group-hover:scale-110 transition-transform duration-300`}
                        />
                    </div>
                  </div>
                  
                    <h3 className={`text-xl font-semibold mb-2 text-center ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {calc.title}
                    </h3>
                    
                    <p className={`text-sm text-center ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {calc.description}
                    </p>
                    
                    <div className={`mt-4 text-center text-sm font-medium ${
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      Calculate Now
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
} 