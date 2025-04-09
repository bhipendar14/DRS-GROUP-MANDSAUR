"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, TrendingUp, Shield, Users, BarChart4, Target, ArrowRight, LineChart, CandlestickChart, PieChart } from "lucide-react"

export default function PMSPage() {
  const { theme } = useTheme()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: "Expert Portfolio Management",
      description: "Professional fund managers with proven track records handle your investments."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Risk Management",
      description: "Sophisticated risk management strategies to protect and grow your wealth."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Personalized Approach",
      description: "Tailored investment strategies aligned with your financial goals."
    },
    {
      icon: <BarChart4 className="w-6 h-6 text-purple-500" />,
      title: "Performance Tracking",
      description: "Regular updates and detailed reports on your portfolio performance."
    }
  ]

  return (
    <div className={`relative ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}`}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Stock chart pattern */}
        <div className={`absolute top-20 right-0 w-96 h-96 opacity-10 ${
          theme === 'light' ? 'text-purple-600' : 'text-purple-400'
        }`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute" style={{
              left: `${i * 12}%`,
              height: `${Math.sin(i * 0.8) * 50 + 50}%`,
              width: '2px',
              top: '25%',
              background: 'currentColor'
            }} />
          ))}
        </div>

        {/* Candlestick pattern */}
        <div className={`absolute bottom-20 left-0 w-96 h-96 opacity-10 ${
          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
        }`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute" style={{
              left: `${i * 15}%`,
              height: '60%',
              width: '8px',
              top: '20%',
              background: 'currentColor'
            }}>
              <div className="absolute w-[2px] h-[120%] -top-[10%] left-1/2 transform -translate-x-1/2 bg-current" />
            </div>
          ))}
        </div>

        {/* Center grid pattern */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-purple-300/20 via-transparent to-blue-300/20' 
            : 'bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10'
        }`}>
          <div className="absolute inset-0">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(${theme === 'light' ? '#6b46c1' : '#c4b5fd'} 1px, transparent 1px),
                               linear-gradient(90deg, ${theme === 'light' ? '#6b46c1' : '#c4b5fd'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: theme === 'light' ? '0.07' : '0.1'
            }} />
          </div>
        </div>

        {/* Floating finance icons */}
        <div className="absolute inset-0">
          {[LineChart, CandlestickChart, PieChart].map((Icon, index) => (
            <div
              key={index}
              className={`absolute ${
                theme === 'light' ? 'text-gray-400/20' : 'text-gray-600/20'
              }`}
              style={{
                top: `${20 + index * 30}%`,
                left: `${10 + index * 25}%`,
                transform: `rotate(${index * 45}deg)`,
              }}
            >
              <Icon size={80} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <NavBar />
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-purple-500/20' 
                : 'bg-gradient-to-r from-purple-900/20 via-blue-900/10 to-purple-900/20'
            }`} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Portfolio Management Services
                </h1>
                <p className={`text-lg lg:text-xl mb-8 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Expert wealth management solutions tailored to your financial goals. Let our experienced professionals help you build and manage your investment portfolio.
                </p>
                <Link 
                  href="/contact"
                  className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium
                    ${theme === 'light' 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-purple-500 hover:bg-purple-600'
                    } transition-colors duration-200`}
                >
                  Get Started <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-sm lg:max-w-md"
              >
                <div className={`relative rounded-2xl overflow-hidden p-6 ${
                  theme === 'light' 
                    ? 'bg-white/80 backdrop-blur-sm shadow-xl' 
                    : 'bg-gray-800/80 backdrop-blur-sm'
                }`}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  {/* Logo */}
                  <div className="relative">
                    <Image
                      src="/logo.jpg"
                      alt="DSR Group Logo"
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain relative z-10"
                      priority
                    />
                  </div>

                  {/* Stats or highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
                    <div className={`text-center p-3 rounded-lg ${
                      theme === 'light' 
                        ? 'bg-purple-50' 
                        : 'bg-purple-900/20'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                      }`}>15+</div>
                      <div className={`text-sm ${
                        theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                      }`}>Years Experience</div>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${
                      theme === 'light' 
                        ? 'bg-blue-50' 
                        : 'bg-blue-900/20'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                      }`}>5000+</div>
                      <div className={`text-sm ${
                        theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                      }`}>Happy Clients</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About PMS Section */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Understanding Portfolio Management Services
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                PMS is a professional service where qualified and experienced portfolio managers handle your investments, making decisions about your investment mix based on your goals and risk tolerance.
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
                      ? 'bg-gray-50 hover:bg-white hover:shadow-xl' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  } transition-all duration-300`}
                >
                  <div className="mb-4">{feature.icon}</div>
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
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Why Choose DSR Group for PMS?
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                With years of experience in the financial markets and a team of expert portfolio managers, we offer comprehensive PMS solutions that help you achieve your financial goals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-800'
                }`}
              >
                <Target className="w-12 h-12 text-purple-500 mb-6" />
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Our Expertise
                </h3>
                <ul className={`space-y-3 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Experienced portfolio managers with proven track records</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Research-driven investment approach</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Transparent reporting and regular updates</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl ${
                  theme === 'light' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-gray-800'
                }`}
              >
                <Shield className="w-12 h-12 text-purple-500 mb-6" />
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Our Commitment
                </h3>
                <ul className={`space-y-3 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Personalized investment strategies</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Regular portfolio monitoring and rebalancing</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-1" />
                    <span>Dedicated relationship manager</span>
                  </li>
                </ul>
              </motion.div>
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
                  ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'
                  : 'bg-gradient-to-r from-purple-900/20 to-blue-900/20'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Start Your Investment Journey?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Contact us today to learn more about our Portfolio Management Services and how we can help you achieve your financial goals.
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full text-white font-medium
                  ${theme === 'light'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-purple-500 hover:bg-purple-600'
                  } transition-colors duration-200`}
              >
                Contact Us <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
} 