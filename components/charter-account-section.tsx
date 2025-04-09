"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  FileText, BarChart2, FileCheck, Building, Users, 
  PieChart, Calculator, BookOpen, ShieldCheck, Award, 
  Briefcase, Clock, Zap, ArrowRight 
} from "lucide-react"
import { useTheme } from '@/context/theme-context'
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation'

// Typewriter component for animated text
function Typewriter({ text, delay = 30, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])
  
  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-5 bg-purple-500 ml-1 animate-pulse"></span>
      )}
    </div>
  )
}

// Animated number counter
function AnimatedCounter({ value, duration = 2, prefix = "", suffix = "" }: { 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true)
    }
  }, [inView, isVisible])
  
  useEffect(() => {
    let startTime = 0
    let animationFrame: number | null = null
    
    if (isVisible) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * value))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isVisible, value, duration])
  
  return <div ref={ref}>{prefix}{count}{suffix}</div>
}

export function CharterAccountSection() {
  const { theme } = useTheme()
  const router = useRouter()
  const [activeService, setActiveService] = useState<string | null>(null)
  const typewriterRef = useRef(null)
  const inView = useInView(typewriterRef, { once: true, amount: 0.3 })
  
  const stats = [
    { label: "Clients Served", value: 500, prefix: "", suffix: "+" },
    { label: "Tax Returns Filed", value: 2500, prefix: "", suffix: "+" },
    { label: "Years of Experience", value: 7, prefix: "", suffix: "" }
  ]
  
  const services = [
    {
      id: "tax",
      title: "Tax Planning & Compliance",
      icon: <FileText className="w-6 h-6" />,
      description: "Comprehensive tax services for individuals and businesses, ensuring compliance while minimizing liability through strategic planning.",
      features: [
        "Individual & Business Tax Returns",
        "Tax Planning Strategies",
        "IRS Representation",
        "International Tax Compliance",
        "State & Local Tax Advisory",
        "Tax Compliance Reviews"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "gst",
      title: "GST Services",
      icon: <BarChart2 className="w-6 h-6" />,
      description: "End-to-end GST solutions including registration, filing, reconciliation, and compliance management for businesses of all sizes.",
      features: [
        "GST Registration Assistance",
        "Monthly/Quarterly GST Filing",
        "Input Tax Credit Optimization",
        "E-way Bill Management",
        "GST Audit & Annual Returns",
        "GST Reconciliation"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      id: "audit",
      title: "Audit & Assurance",
      icon: <FileCheck className="w-6 h-6" />,
      description: "Independent audit services that enhance credibility of financial information and provide assurance to stakeholders.",
      features: [
        "Statutory Audits",
        "Internal Audits",
        "Compliance Audits",
        "Due Diligence",
        "Process Audits",
        "SOC Reporting"
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "rera",
      title: "RERA Compliance",
      icon: <Building className="w-6 h-6" />,
      description: "Specialized services for real estate professionals to ensure full compliance with Real Estate Regulatory Authority requirements.",
      features: [
        "RERA Registration",
        "Quarterly Compliance Filing",
        "Project Management",
        "Financial Statement Preparation",
        "Compliance Documentation",
        "Advisory Services"
      ],
      color: "from-pink-500 to-rose-600"
    },
    {
      id: "corporate",
      title: "Corporate Services",
      icon: <Briefcase className="w-6 h-6" />,
      description: "Comprehensive corporate services including company formation, secretarial work, and regulatory compliance.",
      features: [
        "Company Formation",
        "Corporate Restructuring",
        "Annual Compliance Management",
        "Board Meeting Support",
        "Corporate Governance",
        "Regulatory Filings"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: "stockbroking",
      title: "Stock Broking",
      icon: <BarChart2 className="w-6 h-6" />,
      description: "Comprehensive stock broking services offering diverse investment opportunities across multiple market segments with expert guidance and cutting-edge trading platforms.",
      features: [
        "Equity Trading",
        "Derivative Trading",
        "Currency Trading",
        "Commodity Trading",
        "Portfolio Management Services",
        "IPO Trading",
        "SLBM",
        "AIF"
      ],
      color: "from-purple-500 to-violet-600"
    }
  ]
  
  const testimonials = [
    {
      text: "The mutual fund and equity advice I received was spot-on. Their team broke down complex terms into easy-to-understand guidance, and I've already seen positive returns thanks to their timely suggestions.",
      author: "Umesh Kumar Pitaliya",
      position: "Chief Manager SBI",
    },
    {
      text: "Their CA-related services are incredibly professional and hassle-free. From tax filings to financial audits, everything was managed efficiently with complete transparency. I finally feel stress-free during tax season!",
      author: "CA Neha Jain",
      position: "Chartered Accountant",
    },
    {
      text: "I approached them for help with RERA documentation and was amazed at the speed and clarity with which they handled everything. Their knowledge and professionalism made the entire process seamless.",
      author: "Alpesh Nagori",
      position: "Real Estate Investor",
    },
    {
      text: "Their GST-related services are a lifesaver! Timely filing, accurate compliance, and instant support—it's everything a business needs to stay on the right side of regulations.",
      author: "Shubham Jain",
      position: "Startup Founder",
    },
    {
      text: "I absolutely love their daily financial updates and the way they promote financial literacy. Their tips are practical, jargon-free, and genuinely helpful in making informed decisions.",
      author: "Shivam Agrawal",
      position: "Freelancer",
    }
  ]

  return (
    <div className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              theme === 'light' 
                ? 'text-gray-900' 
                : 'bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'
            }`}>
              Chartered Accountant Services
            </h2>
            
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>
          
          <div 
            ref={typewriterRef}
            className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
          >
            {inView && (
              <Typewriter 
                text="At DSR Group, our team of experienced chartered accountants provides comprehensive financial services tailored to your unique needs. We combine deep expertise, innovative technology, and personalized attention to help individuals and businesses achieve their financial objectives while ensuring regulatory compliance."
                delay={15}
              />
            )}
          </div>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`p-6 rounded-xl ${
                theme === 'light' 
                  ? 'bg-white shadow-md border border-gray-100' 
                  : 'bg-gray-900 border border-gray-800'
              } text-center`}
            >
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  duration={2}
                />
              </h3>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
        
        {/* Services Section */}
        <div className="mb-20">
          <h3 className={`text-2xl font-bold mb-8 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Our Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  theme === 'light'
                    ? 'bg-white shadow-md hover:shadow-xl border border-gray-200'
                    : 'bg-gray-900 border border-gray-800 hover:border-purple-900/50'
                }`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg mr-4 ${
                      theme === 'light' 
                        ? 'bg-purple-100' 
                        : 'bg-purple-900/30'
                    }`}>
                      {React.cloneElement(service.icon, { 
                        className: `w-6 h-6 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`
                      })}
                    </div>
                    <h4 className={`text-xl font-semibold ${
                      theme === 'light' ? 'text-gray-800' : 'text-white'
                    }`}>
                      {service.title}
                    </h4>
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {service.description}
                  </p>
                  
                  <AnimatePresence>
                    {activeService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <h5 className={`text-sm font-medium mb-3 ${
                          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          Key Features:
                        </h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className={`mt-1 mr-2 h-2 w-2 rounded-full ${
                                theme === 'light' ? 'bg-purple-500' : 'bg-purple-400'
                              }`} />
                              <span className={`text-sm ${
                                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button className={`mt-4 text-sm font-medium flex items-center ${
                    theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-400 hover:text-purple-300'
                  }`}>
                    {activeService === service.id ? 'Show Less' : 'Learn More'}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Process Section */}
        <div className="mb-20">
          <h3 className={`text-2xl font-bold mb-8 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Our Process
          </h3>
          
          <div className={`rounded-xl p-8 ${
            theme === 'light' 
              ? 'bg-white shadow-lg border border-gray-200' 
              : 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Initial Consultation",
                  description: "We begin with a thorough assessment of your needs and objectives.",
                  icon: <Users className="w-6 h-6" />,
                  delay: 0.1
                },
                {
                  step: 2,
                  title: "Strategy Development",
                  description: "Our experts create a customized plan tailored to your specific requirements.",
                  icon: <BookOpen className="w-6 h-6" />,
                  delay: 0.2
                },
                {
                  step: 3,
                  title: "Implementation",
                  description: "We execute the strategy with precision and attention to detail.",
                  icon: <Zap className="w-6 h-6" />,
                  delay: 0.3
                },
                {
                  step: 4,
                  title: "Ongoing Support",
                  description: "We provide continuous monitoring and support to ensure optimal results.",
                  icon: <ShieldCheck className="w-6 h-6" />,
                  delay: 0.4
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6 mx-auto">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                      theme === 'light' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      {React.cloneElement(step.icon, { className: "w-7 h-7" })}
                    </div>
                    {index < 3 && (
                      <div className={`absolute top-1/2 left-full transform -translate-y-1/2 h-0.5 w-full -ml-4 hidden md:block ${
                        theme === 'light' ? 'bg-purple-200' : 'bg-purple-900/40'
                      }`} />
                    )}
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}>
                    Step {step.step}: {step.title}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-20">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            What Our Clients Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-4 sm:p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  theme === 'light' 
                    ? 'bg-white shadow-md hover:shadow-lg border border-gray-200' 
                    : 'bg-gray-900 border border-gray-800 hover:border-purple-900/50'
                }`}
              >
                <div className="mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className={`text-sm sm:text-base italic mb-4 line-clamp-4 hover:line-clamp-none transition-all ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 ${
                    theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/30 text-purple-400'
                  }`}>
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm sm:text-base ${
                      theme === 'light' ? 'text-gray-800' : 'text-white'
                    }`}>
                      {testimonial.author}
                    </p>
                    <p className={`text-xs sm:text-sm ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`p-8 md:p-12 rounded-2xl text-center ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100'
              : 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/40'
          }`}
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Ready to Transform Your Financial Management?
          </h3>
          <p className={`max-w-2xl mx-auto mb-8 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Our chartered accountant team is ready to help you navigate complex financial landscapes, 
            ensure compliance, and optimize your tax strategy. Schedule a consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/contact')}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
            >
              Schedule a Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

