'use client'

import { useTheme } from '@/context/theme-context'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Dynamically import framer-motion components with SSR disabled
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })
const MotionSection = dynamic(() => import('framer-motion').then(mod => mod.motion.section), { ssr: false })

// Partner categories with actual data
const partnerCategories = [
  {
    id: 'financial',
    title: 'Financial Partners',
    description: 'Our key financial institutions and brokerage partners.',
    partners: [
      {
        id: 'motilal',
        name: 'Motilal Oswal Financial Services Ltd',
        logo: '/Motilal Oswal.jpg',
        description: 'We are an Authorized Business Associate of Motilal Oswal Financial Services Limited, one of India\'s leading financial services firms. This partnership allows us to offer premier stock broking services, innovative investment products, and research-backed advisory to our clients across equity, derivatives, commodities, and more.',
        website: 'https://www.motilaloswal.com/'
      },
      {
        id: 'prudent',
        name: 'Prudent Corporate Advisory Services',
        logo: '/Prudent Partnership.jpg',
        description: 'Our strategic partnership with Prudent enables us to deliver cutting-edge wealth management solutions and mutual fund distribution services. This collaboration strengthens our ability to provide clients with diverse investment options and personalized financial planning.',
        website: 'https://www.prudentcorporate.com/'
      },
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Partners',
    description: 'Our trusted insurance providers offering comprehensive coverage for health, general and life insurance needs.',
    partners: [
      {
        id: 'sbi-general',
        name: 'SBI General Insurance',
        logo: '/SBI General Insurance.png'
      },
      {
        id: 'hdfc-ergo',
        name: 'HDFC ERGO',
        logo: '/HDFC ERGO.jpg'
      },
      {
        id: 'manipal-cigna',
        name: 'Manipal Cigna Health Insurance',
        logo: '/Manipal Cigna Health Insurance.png'
      },
      {
        id: 'care',
        name: 'Care Health Insurance',
        logo: '/Care Health Insurance.png'
      },
      {
        id: 'tata-aig',
        name: 'Tata AIG',
        logo: '/Tata AIG.png'
      },
      {
        id: 'bajaj',
        name: 'Bajaj Allianz',
        logo: '/Bajaj Allianz.webp'
      }
    ]
  },
  {
    id: 'technology',
    title: 'Technology Partners',
    description: 'Our technology partners that help power our digital platform and services.',
    partners: [
      {
        id: 'motilal-tech',
        name: 'Motilal Oswal Technology Services',
        logo: '/Motilal Oswal.jpg',
        description: 'Leveraging cutting-edge technology solutions from Motilal Oswal to power our trading platforms, customer portals, and financial analytics tools.',
        website: 'https://www.motilaloswal.com/'
      }
    ]
  },
  {
    id: 'advisory',
    title: 'Advisory Partners',
    description: 'Our expert advisory partners for specialized financial guidance.',
    partners: [
      {
        id: 'motilal-advisory',
        name: 'Motilal Oswal Advisory Services',
        logo: '/Motilal Oswal.jpg',
        description: 'We collaborate with Motilal Oswal\'s expert advisory team to provide our clients with research-backed investment strategies, market insights, and personalized financial planning.',
        website: 'https://www.motilaloswal.com/'
      }
    ]
  }
]

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

// Certificate data with proper web paths
const certificates = [
  {
    id: 1,
    title: 'Columbia Business School - Corporate Finance',
    image: '/certificates/ColumbiaX CORPFIN2x Certificate _ edX_page-0001.jpg',
    institution: 'Columbia University'
  },
  {
    id: 2,
    title: 'Columbia Business School - Corporate Finance (Advanced)',
    image: '/certificates/ColumbiaX CORPFIN3x Certificate _ edX_page-0001.jpg',
    institution: 'Columbia University'
  },
  {
    id: 3,
    title: 'Harvard University - Leadership Program',
    image: '/certificates/HarvardX SW47x Certificate _ edX_page-0001.jpg',
    institution: 'Harvard University'
  },
  {
    id: 4,
    title: 'New York Institute of Finance - Financial Analysis',
    image: '/certificates/NYIF FAIC.PC1x Certificate _ edX_page-0001.jpg',
    institution: 'NYIF'
  },
  {
    id: 5,
    title: 'New York Institute of Finance - Financial Planning',
    image: '/certificates/NYIF FAPC.PC3x Certificate _ edX_page-0001.jpg',
    institution: 'NYIF'
  },
  {
    id: 6,
    title: 'New York Institute of Finance - Investment Analysis',
    image: '/certificates/NYIF ITA.PC1x Certificate _ edX_page-0001.jpg',
    institution: 'NYIF'
  },
  {
    id: 7,
    title: 'New York Institute of Finance - Risk Management',
    image: '/certificates/NYIF RMPC1.3x Certificate _ edX_page-0001.jpg',
    institution: 'NYIF'
  },
  {
    id: 8,
    title: 'New York Institute of Finance - Strategic Trading',
    image: '/certificates/NYIF Stpcx.2.0 Certificate _ edX_page-0001.jpg',
    institution: 'NYIF'
  },
  {
    id: 9,
    title: 'State Bank of India - Banking Principles',
    image: '/certificates/State-Bank-of-India SBSC0012x Certificate _ edX_page-0001.jpg',
    institution: 'State Bank of India'
  },
  {
    id: 10,
    title: 'Prudent Corporate Partnership',
    image: '/Prudent Partnership.jpg',
    institution: 'Prudent Corporate'
  }
]

interface Certificate {
  id: number;
  title: string;
  image: string;
  institution: string;
}

export default function PartnersPage() {
  const { theme, toggleTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCertificate(null)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? <NavBar /> : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DSR Group Mandsaur
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Home
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our Partners
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
            At DSR Group Mandsaur, we collaborate with industry-leading companies to provide our clients with the best financial services and solutions.
          </p>
        </div>

        {/* Partners Sections */}
        {partnerCategories.map((category) => (
          <section key={category.id} className="mb-12 sm:mb-20">
            {isMounted ? (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-10"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {category.title}
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-10 max-w-3xl">
                  {category.description}
                </p>
              </MotionDiv>
            ) : (
              <div className="mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  {category.title}
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-10 max-w-3xl">
                  {category.description}
                </p>
              </div>
            )}
            
            {category.partners && category.partners.length > 0 ? (
              isMounted ? (
                <MotionDiv 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={category.id === 'insurance' ? 
                    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6" : 
                    category.id === 'financial' ?
                    "grid md:grid-cols-2 gap-6 sm:gap-8 mx-auto max-w-5xl" :
                    "grid md:grid-cols-2 gap-6 sm:gap-8 mx-auto max-w-4xl"}
                >
                  {category.partners.map((partner) => (
                    <MotionDiv 
                      key={partner.id}
                      variants={itemVariants}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden 
                        transition-all hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900
                        ${category.id === 'insurance' ? 'flex flex-col items-center p-4 sm:p-6' : 
                          category.id === 'technology' || category.id === 'advisory' ? 'flex flex-col h-full md:col-span-2 mx-auto w-full max-w-3xl' : 
                          category.id === 'financial' ? 'flex flex-col h-full' : 'flex flex-col h-full'}`}
                      whileHover={{ y: -5 }}
                    >
                      {category.id === 'insurance' ? (
                        // Insurance partner - simplified card with just logo and name
                        <>
                          <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 sm:mb-4 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <h3 className="text-sm sm:text-lg font-semibold text-center text-gray-900 dark:text-white">
                            {partner.name}
                          </h3>
                        </>
                      ) : category.id === 'financial' ? (
                        // Financial partners - modern card layout
                        <Link 
                          href={'website' in partner ? partner.website : '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-full group transition-all duration-300"
                        >
                          <div className="flex flex-col h-full">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 sm:p-6 rounded-t-xl">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {partner.name}
                                </h3>
                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="text-sm">Visit</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </div>
                              </div>
                              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-lg overflow-hidden bg-white shadow-sm">
                                <Image
                                  src={partner.logo}
                                  alt={`${partner.name} logo`}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 flex-grow">
                              {'description' in partner && (
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  {partner.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        // Technology or Advisory partners
                        <Link 
                          href={'website' in partner ? partner.website : '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`p-4 sm:p-6 flex h-full group transition-all duration-300 
                            ${category.id === 'technology' || category.id === 'advisory' 
                              ? 'flex-row items-center gap-6' 
                              : 'flex-row items-center gap-6'}`}
                        >
                          <div className={`relative flex-shrink-0 bg-white dark:bg-white rounded-lg flex items-center justify-center overflow-hidden 
                            ${category.id === 'technology' || category.id === 'advisory'
                              ? 'w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48'
                              : 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'} 
                            mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-105`}>
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              className="object-contain p-3"
                            />
                          </div>
                          <div className="flex-grow flex flex-col">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {partner.name}
                            </h3>
                            {'description' in partner && (
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 flex-grow">
                                {partner.description}
                              </p>
                            )}
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-2">
                              <span>Learn more</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      )}
                    </MotionDiv>
                  ))}
                </MotionDiv>
              ) : (
                <div className={category.id === 'insurance' ? 
                  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6" : 
                  category.id === 'financial' ?
                  "grid md:grid-cols-2 gap-6 sm:gap-8 mx-auto max-w-5xl" :
                  "grid md:grid-cols-2 gap-6 sm:gap-8 mx-auto max-w-4xl"}
                >
                  {category.partners.map((partner) => (
                    <div 
                      key={partner.id}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden 
                        transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700
                        ${category.id === 'insurance' ? 'flex flex-col items-center p-4 sm:p-6' : 
                          category.id === 'technology' || category.id === 'advisory' ? 'flex flex-col h-full md:col-span-2 mx-auto w-full max-w-3xl' : 
                          category.id === 'financial' ? 'flex flex-col h-full' : 'flex flex-col h-full'}`}
                    >
                      {category.id === 'insurance' ? (
                        // Insurance partner - simplified card with just logo and name
                        <>
                          <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-3 sm:mb-4 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <h3 className="text-sm sm:text-lg font-semibold text-center text-gray-900 dark:text-white">
                            {partner.name}
                          </h3>
                        </>
                      ) : category.id === 'financial' ? (
                        // Financial partners - modern card layout
                        <Link 
                          href={'website' in partner ? partner.website : '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-full group transition-all duration-300"
                        >
                          <div className="flex flex-col h-full">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 sm:p-6 rounded-t-xl">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {partner.name}
                                </h3>
                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="text-sm">Visit</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </div>
                              </div>
                              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-lg overflow-hidden bg-white shadow-sm">
                                <Image
                                  src={partner.logo}
                                  alt={`${partner.name} logo`}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 flex-grow">
                              {'description' in partner && (
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  {partner.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        // Technology or Advisory partners
                        <Link 
                          href={'website' in partner ? partner.website : '#'}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`p-4 sm:p-6 flex h-full group transition-all duration-300 
                            ${category.id === 'technology' || category.id === 'advisory' 
                              ? 'flex-row items-center gap-6' 
                              : 'flex-row items-center gap-6'}`}
                        >
                          <div className={`relative flex-shrink-0 bg-white dark:bg-white rounded-lg flex items-center justify-center overflow-hidden 
                            ${category.id === 'technology' || category.id === 'advisory'
                              ? 'w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48'
                              : 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'} 
                            mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-105`}>
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              className="object-contain p-3"
                            />
                          </div>
                          <div className="flex-grow flex flex-col">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {partner.name}
                            </h3>
                            {'description' in partner && (
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 flex-grow">
                                {partner.description}
                              </p>
                            )}
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-2">
                              <span>Learn more</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              // Empty category - "Coming Soon" section - This part is now redundant but kept for fallback
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-10 shadow-md border border-gray-200 dark:border-gray-700 text-center mx-auto max-w-3xl">
                <div className="text-2xl sm:text-3xl font-light text-gray-400 dark:text-gray-500 mb-3">Coming Soon</div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  We're currently expanding our network of partners in this category.
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Certifications Section */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400">
              Our Achievements & Certifications
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              We pride ourselves on continuous learning and professional development.
            </p>
            <div className="mt-3 sm:mt-4">
              <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
            </div>
          </div>
          
          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain bg-white p-2"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="text-white text-center">
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 h-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm sm:text-base font-medium">View Full Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mt-2">
                    {cert.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Become a Partner Section */}
        <section className="mt-16 sm:mt-24">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-8 py-8 sm:py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Interested in Becoming a Partner?</h2>
                <p className="text-blue-100 text-sm sm:text-lg max-w-2xl">
                  We're always looking to expand our ecosystem with partners who share our values and commitment to excellence in financial services.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 md:mt-0 md:ml-8">
                <Link 
                  href="/contact"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white text-indigo-600 font-semibold text-sm sm:text-base shadow-md hover:bg-indigo-50 transition-all duration-200 hover:shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {Footer ? <Footer /> : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DSR Group Mandsaur. All rights reserved.
            </p>
          </div>
        </footer>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 sm:p-6 md:p-10"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute right-4 top-4 z-10 bg-white/90 dark:bg-gray-700 rounded-full p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white shadow-lg"
              onClick={() => setSelectedCertificate(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 h-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full overflow-auto bg-white">
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                width={1000}
                height={700}
                className="w-full h-auto"
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
            <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedCertificate.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Issued by {selectedCertificate.institution}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 