"use client"

import { useTheme } from "@/context/theme-context"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ChevronRight, Award, Coffee, Heart, Clock, MapPin, DollarSign, Zap, Calendar, Globe, Check, Smile, Send, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export default function CareersPage() {
  const { theme } = useTheme()
  const [activeJobId, setActiveJobId] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: ""
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ""
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-dismiss success message after 8 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (status.success) {
      timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }))
      }, 8000)
    }
    return () => clearTimeout(timer)
  }, [status.success])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          loading: false,
          success: false,
          error: "File size exceeds 5MB limit"
        })
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      setResumeFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: "" })
    
    if (!resumeFile) {
      setStatus({
        loading: false,
        success: false,
        error: "Please upload your resume"
      })
      return
    }
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("position", formData.position)
      formDataToSend.append("experience", formData.experience)
      formDataToSend.append("coverLetter", formData.coverLetter)
      formDataToSend.append("resume", resumeFile)
      
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Something went wrong")
      }
      
      setStatus({ loading: false, success: true, error: "" })
      setFormData({ name: "", email: "", phone: "", position: "", experience: "", coverLetter: "" })
      setResumeFile(null)
      
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = ""
      
      // Scroll to the success message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Application submission error:", error)
      setStatus({ 
        loading: false, 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to submit application" 
      })
    }
  }

  // Sample job openings
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Equity Research Analyst",
      department: "Research",
      location: "Mumbai",
      type: "Full-time",
      experience: "5-8 years",
      description: "We're looking for an experienced Equity Research Analyst to join our research team. The ideal candidate will have strong analytical skills and deep knowledge of Indian equity markets.",
      responsibilities: [
        "Conduct in-depth research and analysis on assigned sectors and companies",
        "Develop financial models to forecast company performance",
        "Prepare detailed research reports with investment recommendations",
        "Interact with company management teams and industry experts",
        "Present investment ideas to portfolio managers and clients"
      ],
      requirements: [
        "5-8 years of experience in equity research or related field",
        "CFA or MBA in Finance from a reputed institution",
        "Strong understanding of financial statements and valuation methodologies",
        "Excellent analytical and critical thinking skills",
        "Outstanding written and verbal communication abilities"
      ]
    },
    {
      id: 2,
      title: "Derivatives Trader",
      department: "Trading",
      location: "Delhi",
      type: "Full-time",
      experience: "3-5 years",
      description: "Join our trading desk as a Derivatives Trader specializing in options and futures. You'll be responsible for executing trading strategies to maximize returns while managing risk.",
      responsibilities: [
        "Execute trading strategies for proprietary desk and client accounts",
        "Monitor market conditions to identify trading opportunities",
        "Analyze option pricing and volatility patterns",
        "Develop and implement risk management strategies",
        "Stay updated on market events affecting derivatives markets"
      ],
      requirements: [
        "3-5 years of experience trading derivatives products",
        "Strong understanding of options pricing and Greeks",
        "Experience with trading platforms and analytical tools",
        "Ability to perform under pressure in fast-paced environments",
        "Excellent risk management skills"
      ]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      department: "Technology",
      location: "Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description: "We're seeking a talented Full Stack Developer to help build and maintain our trading platforms and client-facing applications.",
      responsibilities: [
        "Develop and maintain front-end and back-end components of our trading platforms",
        "Optimize applications for maximum speed and scalability",
        "Build reusable code and libraries for future use",
        "Collaborate with cross-functional teams to define and implement new features",
        "Ensure the technical feasibility of UI/UX designs"
      ],
      requirements: [
        "2-4 years of experience in full stack development",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with RESTful APIs and microservices architecture",
        "Knowledge of database technologies (SQL and NoSQL)",
        "Understanding of financial market data structures (preferred)"
      ]
    },
    {
      id: 4,
      title: "Relationship Manager",
      department: "Sales",
      location: "Mumbai",
      type: "Full-time",
      experience: "3-6 years",
      description: "We're looking for a Relationship Manager to join our growing sales team. The ideal candidate will have excellent people skills and a passion for financial markets.",
      responsibilities: [
        "Acquire and manage a portfolio of high-net-worth clients",
        "Understand client investment needs and recommend suitable products",
        "Conduct regular portfolio reviews and client meetings",
        "Achieve defined sales targets and business metrics",
        "Stay updated on market trends and product offerings"
      ],
      requirements: [
        "3-6 years of experience in financial sales or relationship management",
        "Strong network and proven track record in client acquisition",
        "Excellent communication and interpersonal skills",
        "NISM/AMFI certifications",
        "Good understanding of investment products and markets"
      ]
    }
  ]

  const activeJob = jobOpenings.find(job => job.id === activeJobId) || jobOpenings[0]

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-950 text-gray-200'}`}>
      <NavBar />

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-12 sm:py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50' 
          : 'bg-gradient-to-r from-green-950 to-emerald-950'
      }`}>
        <div className="absolute inset-0 opacity-20">
          {/* Abstract pattern */}
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill={theme === 'light' ? '#10B981' : '#065F46'} d="M45.7,-51.9C59.1,-41.3,70,-25.4,71.8,-8.5C73.7,8.5,66.4,26.4,53.9,37.5C41.3,48.5,23.4,52.8,4.4,49.2C-14.6,45.7,-35,34.4,-48.2,16.8C-61.5,-0.8,-67.7,-24.6,-59.8,-39.5C-51.9,-54.4,-30.2,-60.4,-10.2,-55.3C9.8,-50.2,32.3,-34.1,45.7,-51.9Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900/60 text-green-300'
              }`}>
                Join Our Team
              </span>
              <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Grow Your Career<br/>With DSR Group<br className="hidden sm:block"/>MANDSAUR
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                Join a team of passionate professionals in the financial markets. We offer exciting opportunities for growth, learning, and innovation in a dynamic environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#openings" className={`py-2.5 px-6 rounded-lg font-medium transition-all text-center ${
                  theme === 'light' 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-700 text-white hover:bg-green-600'
                }`}>
                  View Open Positions
                </a>
                <a href="#culture" className={`py-2.5 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-green-600 hover:bg-gray-100 border border-green-200' 
                    : 'bg-gray-800 text-green-400 hover:bg-gray-700 border border-gray-700'
                }`}>
                  Our Culture <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className={`relative rounded-xl overflow-hidden shadow-xl mx-auto max-w-[400px] ${
                theme === 'light' ? 'bg-white' : 'bg-gray-800'
              }`}>
                <Image 
                  src="/logo.jpg" 
                  width={400} 
                  height={300}
                  alt="DSR Group Logo"
                  className="w-full h-auto object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section id="culture" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Our Culture & Values
            </h2>
            <p className="text-lg">
              At DSR Group, we're building a workplace where talent thrives, innovation is encouraged, and excellence is the standard. Our culture is the foundation of our success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Award className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from market analysis to client service."
              },
              {
                icon: <Heart className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Integrity",
                description: "We operate with the highest standards of ethics and transparency in all our dealings."
              },
              {
                icon: <Zap className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Innovation",
                description: "We continuously innovate to stay ahead in the ever-evolving financial markets."
              },
              {
                icon: <Coffee className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Collaboration",
                description: "We believe in the power of teamwork and collaborative problem-solving."
              },
              {
                icon: <Smile className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Work-Life Balance",
                description: "We value the importance of balancing professional excellence with personal well-being."
              },
              {
                icon: <Globe className={theme === 'light' ? 'text-green-600' : 'text-green-400'} />,
                title: "Growth Mindset",
                description: "We foster continuous learning and development for personal and professional growth."
              }
            ].map((value, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
                }`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {value.title}
                </h3>
                <p>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-16 px-4 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Employee Benefits
            </h2>
            <p className="text-lg">
              At DSR Group, we offer a comprehensive range of benefits to ensure our employees' well-being and growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="md:col-span-1 order-2 md:order-1">
              <div className={`h-full rounded-xl overflow-hidden ${
                theme === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-bold p-6 border-b ${
                  theme === 'light' ? 'border-gray-100' : 'border-gray-700'
                }`}>
                  Financial Benefits
                </h3>
                <div className="p-6">
                  {[
                    "Comprehensive health insurance for you and your family",
                    "Retirement plans with company matching",
                    "Performance-based bonuses",
                    "Stock options and employee stock purchase plans",
                    "Education assistance and professional development allowance",
                    "Mental health support and wellness programs"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start mb-4">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'
                      }`}>
                        <Check size={12} />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 order-1 md:order-2">
              <div className={`h-full rounded-xl overflow-hidden ${
                theme === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h3 className={`text-xl font-bold p-6 border-b ${
                  theme === 'light' ? 'border-gray-100' : 'border-gray-700'
                }`}>
                  Work Perks
                </h3>
                <div className="p-6">
                  {[
                    "Flexible work arrangements and remote work options",
                    "Casual dress code and relaxed atmosphere",
                    "Fully stocked pantry and complimentary lunches",
                    "Game room and recreational facilities",
                    "Paid volunteering time off",
                    "Team outings and regular social events"
                  ].map((perk, index) => (
                    <div key={index} className="flex items-start mb-4">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                        theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'
                      }`}>
                        <Check size={12} />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Current Openings
            </h2>
            <p className="text-lg mb-8">
              We currently don't have any open positions, but we're always interested in meeting talented individuals. Feel free to submit a general application, and we'll keep your profile in our database for future opportunities.
            </p>
            <div className={`p-8 rounded-xl text-center ${
              theme === 'light' 
                ? 'bg-white border border-gray-200' 
                : 'bg-gray-800 border border-gray-700'
            }`}>
              <Calendar className={`w-12 h-12 mx-auto mb-4 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>No Current Openings</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Check back later for new opportunities or submit a general application below.
              </p>
              <a href="#apply" className={`inline-block py-3 px-8 rounded-lg font-medium transition-all ${
                theme === 'light' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-green-700 text-white hover:bg-green-600'
              }`}>
                Submit General Application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className={`py-16 px-4 ${
        theme === 'light' ? 'bg-green-50' : 'bg-green-900/20'
      }`}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Submit Your Application
              </h2>
              <p className="text-base sm:text-lg">
                Interested in joining our team? Submit your application and we'll contact you when relevant opportunities arise.
              </p>
            </div>
            
            {/* Success Message */}
            {status.success && (
              <div className={`mb-6 p-4 rounded-lg flex items-start ${
                theme === 'light' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-green-900/20 border border-green-800 text-green-400'
              }`}>
                <Check size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Application Submitted Successfully!</h4>
                  <p className="text-sm mt-1">
                    Thank you for your interest in joining DSR Group. Our recruitment team will review your application and contact you shortly.
                  </p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {status.error && (
              <div className={`mb-6 p-4 rounded-lg flex items-start ${
                theme === 'light' 
                  ? 'bg-red-50 border border-red-200 text-red-700' 
                  : 'bg-red-900/20 border border-red-800 text-red-400'
              }`}>
                <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Application Submission Error</h4>
                  <p className="text-sm mt-1">
                    {status.error}
                  </p>
                </div>
              </div>
            )}
            
            <div className={`rounded-xl overflow-hidden ${
              theme === 'light' ? 'bg-white border border-gray-100 shadow-lg' : 'bg-gray-800 border border-gray-700'
            }`}>
              <form onSubmit={handleSubmit} className="p-8" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Position Applying For*
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                    >
                      <option value="">Select a position</option>
                      {jobOpenings.map(job => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                      <option value="General Application">General Application</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Years of Experience*
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                      placeholder="e.g., 3 years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Resume/CV*
                    </label>
                    <input
                      type="file"
                      name="resume"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'light' 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-gray-700 border border-gray-600'
                      }`}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Cover Letter / Additional Information
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light' 
                        ? 'bg-gray-50 border border-gray-200' 
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status.loading}
                  className={`py-3 px-8 rounded-lg font-medium transition-all flex items-center ${
                    theme === 'light' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-green-700 text-white hover:bg-green-600'
                  } ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status.loading ? 
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                    : 'Submit Application'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with improved mobile responsiveness */}
      <section className={`py-16 sm:py-20 px-4 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
          : 'bg-gradient-to-r from-green-900 to-emerald-900 text-white'
      }`}>
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto">
            Even though we don't have current openings, we're always looking for talented individuals who can add value to our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#apply" className="py-3 px-8 rounded-lg font-medium transition-all bg-white text-green-700 hover:bg-gray-100">
              Submit Application
            </a>
            <Link href="/contact" className="py-3 px-8 rounded-lg font-medium transition-all bg-transparent text-white border border-white hover:bg-white/10">
              Contact Recruitment Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 