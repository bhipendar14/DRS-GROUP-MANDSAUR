"use client"

import { useTheme } from '@/context/theme-context'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const { theme } = useTheme()
  
  return (
    <footer className={`pt-16 ${
      theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-950 text-gray-400'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info & Address */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.jpg"
                alt="DSR Group Logo"
                width={140}
                height={42}
                className="h-auto"
              />
            </Link>
            
            <div className="text-sm mb-6">
              <div className="flex items-start mb-3">
                <MapPin size={16} className="mt-1 mr-2 flex-shrink-0 text-purple-500" />
                <p>
                DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3 (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh, 458001
                </p>
              </div>
              
              <div className="flex items-start mb-3">
                <Phone size={16} className="mt-1 mr-2 flex-shrink-0 text-purple-500" />
                <div>
                  <p className="mb-1">Mobile: +91-9024138649</p>
                  <p>Landline: 07422 - 496399</p>
                </div>
              </div>
              
              <div className="flex items-start mb-3">
                <Mail size={16} className="mt-1 mr-2 flex-shrink-0 text-purple-500" />
                <a href="mailto:dsrgroupmandsaur@gmail.com" className="hover:text-purple-500">
                  dsrgroupmandsaur@gmail.com
                </a>
              </div>
              
              <p className="mb-3">
                <Link href="/contact" className="hover:text-purple-500">
                  Contact Us
                </Link>
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, url: "https://facebook.com/dsrgroup" },
                { icon: <Twitter size={18} />, url: "https://twitter.com/dsrgroup" },
                { icon: <Youtube size={18} />, url: "https://www.youtube.com/@dsrgroupmandsaur" },
                { icon: <Instagram size={18} />, url: "https://www.instagram.com/dsrgroupmandsaur/" },
                { icon: <Linkedin size={18} />, url: "https://www.linkedin.com/in/dsr-group-684b29246/" },
             
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit DSR Group on ${social.url.split('/').pop()}`}
                  className="hover:text-purple-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className={`text-sm font-semibold mb-6 uppercase tracking-wider ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-300'
            }`}>
              Products
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Stocks', path:'/stocks' },
                { name: 'Futures & Options', path: '/products/futures-options' },
                { name: 'MTF', path: '/products/mtf' },
                { name: 'IPO', path: '/products/ipo' },
                { name: 'Mutual Funds', path: '/#mutual-funds' },
                { name: 'NFO', path: '/products/nfo' },
                { name: 'ETF', path: '/products/etf' },
                { name: 'Loans', path: '/loans' },
                { name: 'Analytics', path: '/analytics' },
                { name: 'PMS', path: '/products/pms' },
                { name: 'IAP', path: '/products/iap' },
                { name: 'SLBM', path: '/products/slbm' },
                { name: 'Unlisted Share', path: '/products/unlisted-share' },
                { name: 'AIF', path: '/products/aif' },
                { name: 'Insurance', path: '/products/insurance' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-sm hover:text-purple-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DSR GROUP */}
          <div>
            <h3 className={`text-sm font-semibold mb-6 uppercase tracking-wider ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-300'
            }`}>
              DSR GROUP MANDSAUR
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Blog', path: '/blog' },
                { name: 'Media & Press', path: '/media-press' },
                { name: 'Careers', path: '/careers' },
                { name: 'Help and Support', path: '/help-support' },
                { name: 'Trust and Safety', path: '/trust-safety' },
                { name: 'Partners', path: '/partners' },
                { name: 'Investors', path: '/investors' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-sm hover:text-purple-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className={`text-sm font-semibold mb-6 uppercase tracking-wider ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-300'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'AMC Mutual Funds', path: '/amc-mutual-funds' },
                { name: 'Calculators', path: '/calculators' },
                { name: 'Glossary', path: '/glossary' },
                { name: 'Open Demat Account', path: '/open-demat-account' },
                { name: 'DSR Group Digest', path: '/dsr-group-digest' },
                { name: 'Sitemap', path: '/sitemap' },
                { name: 'Income Tax', path: '/tax' },
                { name: 'Market News', path: '/market-news' },
                { name: 'Learning Center', path: '/learning-center' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-sm hover:text-purple-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Section */}
        <div className={`mt-16 pt-8 border-t ${
          theme === 'light' ? 'border-gray-100' : 'border-gray-800'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Regulatory Information */}
            <div>
              <h4 className={`text-sm font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-300'
              }`}>
                Regulatory
              </h4>
              <p className="text-xs mb-3">
                DSR GROUP MANDSAUR™ operates as an Authorized Business Associate of Motilal Oswal Financial Services Limited, providing comprehensive financial and investment services under applicable regulatory frameworks.
              </p>
              <p className="text-xs mb-4">
                Regulatory Credentials: NSE: AP0297130541 | BSE: AP01044601140 | MCX: MCX/AP/151388 | AMFI: ARN-175170 | LIC Code: 07980346
              </p>
            </div>

            {/* Disclaimer */}
            <div>
              <h4 className={`text-sm font-semibold mb-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-300'
              }`}>
                Disclaimer
              </h4>
              <p className="text-xs">
                Investments in securities market are subject to market risks; read all the related documents carefully before investing. 
                Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance, 
                investment goal, and time frame associated with the investment before choosing a fund or designing a portfolio.
              </p>
            </div>
          </div>
          
          {/* Bottom Links & Copyright */}
          <div className={`mt-8 py-6 border-t ${
            theme === 'light' ? 'border-gray-100' : 'border-gray-800'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs mb-4 md:mb-0">
                © {new Date().getFullYear()} DSR GROUP MANDSAUR™. All rights reserved.
              </p>
              
              <div className="flex flex-wrap gap-6">
                {[
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Refund Policy', path: '/refund-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' },
                  { name: 'FATCA Declaration', path: '/fatca-declaration' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-xs hover:text-purple-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

