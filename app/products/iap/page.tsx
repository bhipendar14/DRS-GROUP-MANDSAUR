"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Lightbulb, Target, Gem, BarChart, Brain, Coins, ScrollText, Sparkles } from "lucide-react"

export default function IAPPage() {
  const { theme } = useTheme()

  const services = [
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Strategic Investment Advice",
      description: "Get personalized investment strategies based on your goals and risk profile."
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: "Goal-Based Planning",
      description: "Align your investments with specific life goals and financial objectives."
    },
    {
      icon: <Gem className="w-8 h-8 text-blue-500" />,
      title: "Asset Allocation",
      description: "Optimize your portfolio with the right mix of different asset classes."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Research Insights",
      description: "Access to in-depth market research and investment recommendations."
    }
  ]

  const benefits = [
    "Personalized investment strategies",
    "Regular portfolio reviews",
    "Market insights and updates",
    "Risk assessment and management",
    "Tax-efficient investment planning",
    "Direct access to expert advisors"
  ]

  return (
    <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-float ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-amber-200/30 to-amber-400/30' 
              : 'bg-gradient-to-r from-amber-900/20 to-amber-700/20'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-float-delayed ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-purple-200/30 to-purple-400/30' 
              : 'bg-gradient-to-r from-purple-900/20 to-purple-700/20'
          }`} />
        </div>

        {/* Animated icons */}
        <div className="absolute inset-0">
          {[Coins, BarChart, ScrollText, Sparkles].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.1,
                scale: 1,
                rotate: [0, 360],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                delay: index * 2,
                repeatType: "reverse"
              }}
              className={`absolute ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
              style={{
                top: `${15 + index * 20}%`,
                left: `${5 + index * 25}%`,
              }}
            >
              <Icon size={40} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Investment Advisory{" "}
                  <span className={
                    theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                  }>Products</span>
                </h1>
                <p className={`text-xl mb-8 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Expert guidance for your investment journey. Make informed decisions with our professional advisory services.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    className={`inline-flex items-center px-8 py-4 rounded-full text-white font-medium
                      ${theme === 'light'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-amber-500 hover:bg-amber-600'
                      } transition-all duration-300 hover:scale-105`}
                  >
                    Get Expert Advice <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className={`py-20 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* What is IAP */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className={`text-3xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    What is Investment Advisory Products (IAP)?
                  </h2>
                  <div className={`space-y-4 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    <p>
                      Investment Advisory Products (IAP) is a comprehensive suite of financial advisory services designed to help investors make informed decisions about their investments. Our expert advisors provide personalized guidance, market insights, and strategic recommendations tailored to your financial goals.
                    </p>
                    <p>
                      Through IAP, you gain access to professional investment advice, detailed market analysis, and customized portfolio strategies that align with your risk tolerance and investment objectives.
                    </p>
                  </div>
                  <div className={`grid grid-cols-2 gap-4 pt-4 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <div className={`p-4 rounded-xl ${
                      theme === 'light' 
                        ? 'bg-amber-50' 
                        : 'bg-amber-900/10'
                    }`}>
                      <h4 className="font-semibold mb-1">15+ Years</h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>Market Experience</p>
                    </div>
                    <div className={`p-4 rounded-xl ${
                      theme === 'light' 
                        ? 'bg-purple-50' 
                        : 'bg-purple-900/10'
                    }`}>
                      <h4 className="font-semibold mb-1">500+</h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>Satisfied Clients</p>
                    </div>
                  </div>
                </motion.div>

                {/* Why Choose Us */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`p-8 rounded-2xl ${
                    theme === 'light'
                      ? 'bg-gray-50 shadow-lg'
                      : 'bg-gray-800'
                  }`}
                >
                  <h3 className={`text-2xl font-bold mb-6 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Why Choose DSR Group Mandsaur for IAP?
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Expert Advisory Team",
                        description: "Our team of certified financial advisors brings years of market expertise to guide your investments."
                      },
                      {
                        title: "Customized Solutions",
                        description: "We create personalized investment strategies that align with your unique financial goals and risk appetite."
                      },
                      {
                        title: "Comprehensive Research",
                        description: "Access to in-depth market research, analysis, and real-time investment opportunities."
                      },
                      {
                        title: "Transparent Approach",
                        description: "Clear communication, regular updates, and complete transparency in all our advisory services."
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl ${
                          theme === 'light'
                            ? 'bg-white'
                            : 'bg-gray-700'
                        }`}
                      >
                        <h4 className={`font-semibold mb-2 ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {item.title}
                        </h4>
                        <p className={
                          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        }>
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                Our Advisory Services
              </h2>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Comprehensive investment solutions tailored to your needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl ${
                    theme === 'light'
                      ? 'bg-gray-50 hover:bg-white hover:shadow-xl'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } transition-all duration-300`}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                  Benefits of Our Advisory
                </h2>
                <p className={`text-lg ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Why choose our investment advisory services
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center p-4 rounded-xl ${
                      theme === 'light'
                        ? 'bg-white shadow-sm hover:shadow-md'
                        : 'bg-gray-800 hover:bg-gray-700'
                    } transition-all duration-300`}
                  >
                    <div className={`mr-4 p-2 rounded-full ${
                      theme === 'light'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-amber-900/30 text-amber-400'
                    }`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className={`font-medium ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {benefit}
                    </span>
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
                  ? 'bg-gradient-to-r from-amber-500/10 to-purple-500/10'
                  : 'bg-gradient-to-r from-amber-900/20 to-purple-900/20'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Ready to Make Informed Investment Decisions?
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Get in touch with our expert advisors and start your journey towards financial success.
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-4 rounded-full text-white font-medium
                  ${theme === 'light'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-amber-500 hover:bg-amber-600'
                  } transition-all duration-300 hover:scale-105`}
              >
                Schedule a Consultation <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(1.05); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
} 