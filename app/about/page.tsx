"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

// RGB Effect CSS Module
const rgbStyles = {
  rgbText: {
    background: "linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080, #ff0000)",
    backgroundSize: "300% 300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "rgbTextShift 10s ease infinite",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    textShadow: "0 0 15px rgba(162, 0, 255, 0.3)"
  },
  rgbBorder: {
    position: "relative",
    zIndex: 0,
    borderRadius: "10px",
    overflow: "hidden"
  }
}

export default function AboutPage() {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [titleColor, setTitleColor] = useState("rgb(59, 130, 246)") // Start with blue
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Add RGB animation keyframes dynamically when component mounts
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes rgbTextShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .rgb-border:before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-color: #399953;
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        background-image: linear-gradient(#ff3e3e, #ff00c3), linear-gradient(#0077ff, #00ddff),
                          linear-gradient(#00ffd5, #00ff44), linear-gradient(#ffad00, #ffdd00);
        animation: rgbBorderRotate 6s linear infinite;
      }
      
      .rgb-border:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 3px;
        top: 3px;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        background: ${theme === 'light' ? 'white' : '#111827'};
        border-radius: 8px;
      }
      
      @keyframes rgbBorderRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [theme])

  // RGB animation effect for the title
  useEffect(() => {
    const colors = [
      "rgb(59, 130, 246)", // blue
      "rgb(79, 70, 229)",  // indigo
      "rgb(124, 58, 237)", // violet
      "rgb(147, 51, 234)", // purple
      "rgb(192, 38, 211)", // fuchsia
      "rgb(219, 39, 119)", // pink
      "rgb(236, 72, 153)", // pink
      "rgb(245, 158, 11)", // amber
      "rgb(22, 163, 74)",  // green
      "rgb(6, 182, 212)",  // cyan
      "rgb(59, 130, 246)"  // back to blue
    ];
    
    let colorIndex = 0;
    let direction = 1;
    
    const interval = setInterval(() => {
      if (colorIndex >= colors.length - 1) {
        direction = -1;
      } else if (colorIndex <= 0) {
        direction = 1;
      }
      
      colorIndex += direction;
      setTitleColor(colors[colorIndex]);
    }, 700); // Change color every 700ms
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-950 text-white'}>
      <Head>
        <style jsx global>{`
          @keyframes rgb-text-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .rgb-text-effect {
            background: linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080, #ff0000);
            background-size: 300% 300%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rgb-text-shift 10s ease infinite;
            font-weight: 800;
            letter-spacing: -0.03em;
            text-shadow: 0 0 15px rgba(162, 0, 255, 0.3);
          }
          
          .rgb-border {
            position: relative;
            z-index: 0;
            border-radius: 10px;
            overflow: hidden;
          }
          
          .rgb-border:before {
            content: '';
            position: absolute;
            z-index: -2;
            left: -50%;
            top: -50%;
            width: 200%;
            height: 200%;
            background-color: #399953;
            background-repeat: no-repeat;
            background-size: 50% 50%, 50% 50%;
            background-position: 0 0, 100% 0, 100% 100%, 0 100%;
            background-image: linear-gradient(#ff3e3e, #ff00c3), linear-gradient(#0077ff, #00ddff),
                              linear-gradient(#00ffd5, #00ff44), linear-gradient(#ffad00, #ffdd00);
            animation: rgb-border-rotate 6s linear infinite;
          }
          
          .rgb-border:after {
            content: '';
            position: absolute;
            z-index: -1;
            left: 3px;
            top: 3px;
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            background: ${theme === 'light' ? 'white' : '#111827'};
            border-radius: 8px;
          }
          
          @keyframes rgb-border-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Head>
      
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-16 sm:pb-20 relative z-10">
        {/* Hero Section */}
        <div className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${theme === 'light' ? '' : 'bg-gradient-to-b from-gray-900 to-gray-950'}`}>
          {/* Background effects for dark mode */}
          {theme === 'dark' && (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
              <div className="absolute top-40 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
              <div className="absolute top-60 right-20 w-80 h-80 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
            </>
          )}
          
          <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
            {/* Logo and title section */}
            <div className="flex flex-col items-center mb-8 sm:mb-12">
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6 relative"
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/logo.jpg" 
                  alt="DSR Group Logo" 
                  width={128} 
                  height={128}
                  className={`rounded-full object-cover shadow-lg ${
                    theme === 'light' 
                      ? 'border-4 border-blue-500' 
                      : 'border-4 border-blue-600'
                  }`}
                />
              </motion.div>
              
              <motion.h1 
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-center ${
                  theme === 'light' 
                    ? 'text-gray-800' 
                    : 'gradient-text'
                }`}
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                DSR GROUP MANDSAUR
              </motion.h1>
              <div className="h-1 w-36 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 sm:mb-8"></div>
            </div>
            
            {/* Content section - wide, text-justified */}
            <div className="max-w-5xl mx-auto">
              <motion.p 
                className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                } text-left sm:text-justify`}
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                DSR Group Mandsaur is a comprehensive financial services provider dedicated to guiding individuals and businesses through their financial journeys. As an authorized sub-broker of Motilal Oswal Financial Services Ltd, we offer a wide range of investment services, including stock broking services. Our expertise extends beyond traditional stock trading to encompass various financial instruments such as mutual funds, Portfolio Management Services (PMS), Alternative Investment Funds (AIF), as well as a diverse range of insurance solutions.
              </motion.p>
              
              <motion.p 
                className={`text-base sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                } text-left sm:text-justify`}
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                In addition to our investment services, we take pride in offering a holistic financial support system. Our services include Income Tax Return (ITR) filing, Goods and Services Tax (GST) assistance, audits, and a comprehensive suite of accounting services. Whether you're an individual investor looking to optimize your portfolio, a business in need of financial planning, or seeking expert advice on taxation and compliance matters, DSR Group Mandsaur is here to provide tailored solutions to meet your specific needs.
              </motion.p>
              
              <motion.p 
                className={`text-base sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                } text-left sm:text-justify`}
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                At DSR Group Mandsaur, we prioritize transparency, integrity, and client satisfaction. Our team of experienced professionals is committed to delivering personalized financial solutions that align with your goals and aspirations. Explore the world of financial possibilities with us, where expertise meets personalized service.
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Vision & Mission Section - with enhanced styling */}
        <div className="py-12 md:py-16 px-4 md:px-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
              {/* Our Vision */}
              <motion.div 
                className={`rounded-xl overflow-hidden relative ${
                  theme === 'light' 
                    ? 'bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100' 
                    : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                }`}
                whileInView={{ y: [30, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {theme === 'dark' && (
                  <div className="absolute inset-0 border-gradient-rainbow opacity-30 rounded-xl"></div>
                )}
                <div className="p-5 sm:p-8 relative z-10">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ml-3 sm:ml-4 ${
                      theme === 'light' ? 'text-gray-800' : 'text-white'
                    }`}>Our Vision</h2>
                  </div>
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    To be the leading financial services provider, recognized globally for our innovative solutions, exceptional client service, and commitment to creating lasting value for all our stakeholders.
                  </p>
                </div>
              </motion.div>
              
              {/* Our Mission */}
              <motion.div 
                className={`rounded-xl overflow-hidden relative ${
                  theme === 'light' 
                    ? 'bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100' 
                    : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                }`}
                whileInView={{ y: [30, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {theme === 'dark' && (
                  <div className="absolute inset-0 border-gradient-rainbow opacity-30 rounded-xl"></div>
                )}
                <div className="p-5 sm:p-8 relative z-10">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      theme === 'light' ? 'bg-pink-100' : 'bg-pink-900/30'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ml-3 sm:ml-4 ${
                      theme === 'light' ? 'text-gray-800' : 'text-white'
                    }`}>Our Mission</h2>
                  </div>
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    To empower our clients with strategic financial guidance and innovative solutions that enable them to achieve their financial goals, while maintaining the highest standards of integrity, transparency, and excellence in everything we do.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Core Values */}
        <section className="py-12 md:py-20">
          {isClient ? (
            <motion.div 
              className="text-center mb-10 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Our Core Values</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 sm:mb-8"></div>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                These principles guide everything we do and define who we are as an organization.
              </p>
            </motion.div>
          ) : (
            <div className="text-center mb-10 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Our Core Values</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 sm:mb-8"></div>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                These principles guide everything we do and define who we are as an organization.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            {[
              {
                title: "Integrity",
                icon: "M12 11v5m0 0v-5m0 5h5m-5 0h-5",
                description: "We uphold the highest ethical standards in all our interactions.",
                color: "from-blue-500 to-indigo-600",
                delay: 0.1
              },
              {
                title: "Transparency",
                icon: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z",
                description: "We believe in clear, open communication with all stakeholders.",
                color: "from-cyan-500 to-blue-600",
                delay: 0.2
              },
              {
                title: "Superior Quality",
                icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
                description: "We are committed to excellence in all our services and products.",
                color: "from-purple-500 to-indigo-600",
                delay: 0.3
              },
              {
                title: "Client Value",
                icon: "M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
                description: "Our clients' success is our primary measure of achievement.",
                color: "from-pink-500 to-rose-600",
                delay: 0.4
              },
              {
                title: "Pioneering",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                description: "We embrace innovation and lead the way in financial solutions.",
                color: "from-amber-500 to-orange-600",
                delay: 0.5
              },
              {
                title: "Unity",
                icon: "M12 4.354a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 0v8M8.5 8h7",
                description: "We work as one team, valuing diversity and collaboration.",
                color: "from-emerald-500 to-green-600",
                delay: 0.6
              },
              {
                title: "Excellency",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z",
                description: "We strive for extraordinary results in everything we do.",
                color: "from-violet-500 to-purple-600",
                delay: 0.7
              },
              {
                title: "Accountability",
                icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2",
                description: "We take responsibility for our actions and their outcomes.",
                color: "from-blue-500 to-indigo-600",
                delay: 0.8
              }
            ].map((value, index) => (
              isClient ? (
                <motion.div
                  key={value.title}
                  className={`${
                    theme === 'light'
                      ? 'bg-white shadow-lg border border-gray-100 hover:shadow-xl'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50'
                  } rounded-xl p-6 transition-all`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: value.delay }}
                  viewport={{ once: true }}
                >
                  <div className={`bg-gradient-to-br ${value.color} rounded-xl p-3 w-14 h-14 mb-6 flex items-center justify-center text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={value.icon}></path>
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{value.title}</h3>
                  <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{value.description}</p>
                </motion.div>
              ) : (
                <div
                  key={value.title}
                  className={`${
                    theme === 'light'
                      ? 'bg-white shadow-lg border border-gray-100'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                  } rounded-xl p-6`}
                >
                  <div className={`bg-gradient-to-br ${value.color} rounded-xl p-3 w-14 h-14 mb-6 flex items-center justify-center text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={value.icon}></path>
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{value.title}</h3>
                  <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{value.description}</p>
                </div>
              )
            ))}
          </div>
        </section>
        
        {/* Leadership Team Section */}
        <section className="py-16">
          {isClient ? (
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Meet Our Leadership</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Our experienced team of leaders brings diverse expertise and a shared commitment to excellence.
              </p>
            </motion.div>
          ) : (
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Meet Our Leadership</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Our experienced team of leaders brings diverse expertise and a shared commitment to excellence.
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {(() => {
              // Create a state to track expanded cards
              const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
              
              // Toggle function for read more
              const toggleReadMore = (name: string) => {
                setExpandedCards(prev => ({
                  ...prev,
                  [name]: !prev[name]
                }));
              };
              
              return [
                {
                  name: "Deepak Jain",
                  title: "Founder & CEO",
                  image: "/CEO.jpg",
                  description: "Deepak Jain is the founder & CEO of DSR GROUP MANDSAUR, bringing with him a wealth of experience and expertise. He holds an MBA in finance and marketing, which has equipped him with the skills and knowledge needed to lead our organization to success. Prior to joining our team, Deepak worked at Vivo as an assistant VBA manager, where he gained valuable experience and developed his management and leadership skills.",
                  delay: 0.1
                },
                {
                  name: "Barkha Jain",
                  title: "Marketing Director",
                  image: "/logo.jpg",
                  description: "Barkha Jain is managing our company's Marketing, bringing with her a diverse set of skills and experience. She holds a Bachelor's degree in Commerce and an MBA in Finance and HR. With more than two years of experience in the industry, Barkha has a deep understanding of the latest marketing trends and techniques. Her experience includes developing marketing strategies, managing social media campaigns, and leading successful marketing initiatives.",
                  delay: 0.2
                },
                {
                  name: "Rahul Jain",
                  title: "Chief Technology Officer",
                  image: "/CTO.jpg",
                  description: "Mr. Rahul Jain is a Software Engineer, currently managing all technology leads at DSR GROUP Mandsaur. He is a research scholar in Artificial Intelligence and Machine Learning, with M.Tech and B.Tech in Computer Science (Gold Medal). He has tremendous expertise in emerging technology and data analysis tools.",
                  delay: 0.3
                }
              ].map((leader, index) => (
                isClient ? (
                  <motion.div
                    key={leader.name}
                    className={`${
                      theme === 'light'
                        ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                        : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/30'
                    } rounded-xl overflow-hidden transition-all duration-300`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: leader.delay }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-full h-80 relative overflow-hidden">
                      {leader.name === "Deepak Jain" || leader.name === "Rahul Jain" || leader.name === "Barkha Jain" ? (
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full ${theme === 'light' ? 'bg-gradient-to-br from-purple-100 to-blue-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} flex items-center justify-center`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-6xl font-bold ${theme === 'light' ? 'text-purple-300' : 'text-gray-700'}`}>
                              {leader.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{leader.name}</h3>
                      <p className="text-purple-500 font-medium mb-4">{leader.title}</p>
                      <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} ${expandedCards[leader.name] ? '' : 'line-clamp-4'} mb-4`}>
                        {leader.description}
                      </p>
                      <button 
                        onClick={() => toggleReadMore(leader.name)}
                        className={`mt-2 text-sm font-medium flex items-center ${theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-400 hover:text-purple-300'}`}
                      >
                        {expandedCards[leader.name] ? 'Show less' : 'Read more'}
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${expandedCards[leader.name] ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div
                    key={leader.name}
                    className={`${
                      theme === 'light'
                        ? 'bg-white shadow-lg border border-gray-100'
                        : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                    } rounded-xl overflow-hidden`}
                  >
                    <div className="w-full h-80 relative overflow-hidden">
                      {leader.name === "Deepak Jain" || leader.name === "Rahul Jain" || leader.name === "Barkha Jain" ? (
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full ${theme === 'light' ? 'bg-gradient-to-br from-purple-100 to-blue-50' : 'bg-gradient-to-br from-gray-800 to-gray-900'} flex items-center justify-center`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-6xl font-bold ${theme === 'light' ? 'text-purple-300' : 'text-gray-700'}`}>
                              {leader.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{leader.name}</h3>
                      <p className="text-purple-500 font-medium mb-4">{leader.title}</p>
                      <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} line-clamp-4 mb-4`}>
                        {leader.description}
                      </p>
                      <button className={`mt-2 text-sm font-medium flex items-center ${theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-400 hover:text-purple-300'}`}>
                        Read more 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              ))
            })()}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 