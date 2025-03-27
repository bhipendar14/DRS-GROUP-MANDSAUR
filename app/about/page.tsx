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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          {isClient ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 style={rgbStyles.rgbText} className="text-5xl font-bold mb-6">DSR Group MANDSAUR</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                At DSR Group Mandsaur, we are committed to delivering exceptional financial services 
                with integrity and innovation. Our team of experts combines years of industry experience 
                with cutting-edge technology to provide you with the best financial solutions.
              </p>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h1 style={rgbStyles.rgbText} className="text-5xl font-bold mb-6">DSR Group MANDSAUR</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                At DSR Group Mandsaur, we are committed to delivering exceptional financial services 
                with integrity and innovation. Our team of experts combines years of industry experience 
                with cutting-edge technology to provide you with the best financial solutions.
              </p>
            </div>
          )}
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {isClient ? (
              <>
                <motion.div 
                  className={`p-8 rounded-2xl rgb-border ${
                    theme === 'light' 
                      ? 'bg-white shadow-lg' 
                      : 'bg-gray-900 backdrop-blur-sm'
                  } relative overflow-hidden vision-card`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-3xl font-bold mb-6 flex items-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <span className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                    Our Vision
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    To be the leading financial services provider, recognized globally for our innovative 
                    solutions, exceptional client service, and commitment to creating lasting value for all 
                    our stakeholders.
                  </p>
                </motion.div>
                
                <motion.div 
                  className={`p-8 rounded-2xl rgb-border ${
                    theme === 'light' 
                      ? 'bg-white shadow-lg' 
                      : 'bg-gray-900 backdrop-blur-sm'
                  } relative overflow-hidden mission-card`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-3xl font-bold mb-6 flex items-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <span className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 14 4-4"></path>
                        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                      </svg>
                    </span>
                    Our Mission
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    To empower our clients with strategic financial guidance and innovative solutions that 
                    enable them to achieve their financial goals, while maintaining the highest standards of 
                    integrity, transparency, and excellence in everything we do.
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <div className={`p-8 rounded-2xl rgb-border ${
                  theme === 'light' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-900 backdrop-blur-sm'
                } relative overflow-hidden vision-card`}>
                  <h2 className={`text-3xl font-bold mb-6 flex items-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <span className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                    Our Vision
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    To be the leading financial services provider, recognized globally for our innovative 
                    solutions, exceptional client service, and commitment to creating lasting value for all 
                    our stakeholders.
                  </p>
                </div>
                
                <div className={`p-8 rounded-2xl rgb-border ${
                  theme === 'light' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-900 backdrop-blur-sm'
                } relative overflow-hidden mission-card`}>
                  <h2 className={`text-3xl font-bold mb-6 flex items-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    <span className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 14 4-4"></path>
                        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                      </svg>
                    </span>
                    Our Mission
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    To empower our clients with strategic financial guidance and innovative solutions that 
                    enable them to achieve their financial goals, while maintaining the highest standards of 
                    integrity, transparency, and excellence in everything we do.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          {isClient ? (
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Our Core Values</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                These principles guide everything we do and define who we are as an organization.
              </p>
            </motion.div>
          ) : (
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'gradient-text'}`}>Our Core Values</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
              <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                These principles guide everything we do and define who we are as an organization.
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "John Doe",
                title: "Chief Executive Officer",
                image: "/team/john-doe.jpg",
                description: "With over 20 years of experience in financial services, John leads our company with vision and integrity.",
                delay: 0.1
              },
              {
                name: "Jane Smith",
                title: "HR & Administration",
                image: "/team/jane-smith.jpg",
                description: "Jane brings her expertise in organizational development to build and nurture our talented team.",
                delay: 0.2
              },
              {
                name: "Michael Johnson",
                title: "Chief Technology Officer",
                image: "/team/michael-johnson.jpg",
                description: "Michael drives our technological innovation, ensuring we deliver cutting-edge financial solutions.",
                delay: 0.3
              },
              {
                name: "Sarah Williams",
                title: "Marketing Director",
                image: "/team/sarah-williams.jpg",
                description: "Sarah crafts our brand strategy and ensures our message resonates with clients around the world.",
                delay: 0.4
              }
            ].map((leader, index) => (
              isClient ? (
                <motion.div
                  key={leader.name}
                  className={`${
                    theme === 'light'
                      ? 'bg-white shadow-md hover:shadow-lg border border-gray-100'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50'
                  } rounded-xl overflow-hidden transition-all`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: leader.delay }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-64 relative overflow-hidden">
                    <div className={`w-full h-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} flex items-center justify-center`}>
                      {/* Placeholder for image - replace with actual images */}
                      <span className={`text-5xl font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      
                      {/* Uncomment when you have actual images */}
                      {/* <Image 
                        src={leader.image} 
                        alt={leader.name} 
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      /> */}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{leader.name}</h3>
                    <p className="text-purple-500 font-medium mb-4">{leader.title}</p>
                    <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{leader.description}</p>
                  </div>
                </motion.div>
              ) : (
                <div
                  key={leader.name}
                  className={`${
                    theme === 'light'
                      ? 'bg-white shadow-md border border-gray-100'
                      : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                  } rounded-xl overflow-hidden`}
                >
                  <div className="w-full h-64 relative overflow-hidden">
                    <div className={`w-full h-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} flex items-center justify-center`}>
                      <span className={`text-5xl font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{leader.name}</h3>
                    <p className="text-purple-500 font-medium mb-4">{leader.title}</p>
                    <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{leader.description}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 