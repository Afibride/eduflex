// Footer.jsx - Updated with all links configured
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

// Color palette based on the logo - using more green and accent colors
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
  },
  accent: {
    main: '#9333ea',
    light: '#c084fc',
    dark: '#7e22ce',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
  },
  orange: {
    main: '#f97316',
    light: '#fb923c',
    dark: '#ea580c',
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    facebook: 'https://facebook.com/eduflexcameroon',
    twitter: 'https://twitter.com/eduflexcm',
    instagram: 'https://instagram.com/eduflexcameroon',
    linkedin: 'https://linkedin.com/company/eduflex-cameroon'
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <footer 
      className="pt-12 md:pt-16 pb-8 rounded-t-3xl mt-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2e1065 100%)`,
        color: '#ffffff'
      }}
    >
      {/* Decorative elements - using accent colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.accent.light} 0%, transparent 70%)`,
          }} />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.secondary.light} 0%, transparent 70%)`,
          }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${colors.orange.main} 0%, transparent 70%)`,
          }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-12">
          
          {/* Brand Section - spans full width on mobile, first column on desktop */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/public/eduflex.png" 
                alt="EduFlex Logo" 
                className="h-8 md:h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-purple-200 text-xs md:text-sm leading-relaxed">
              Empowering educational institutions with modern, centralized management tools to inspire growth and streamline operations across Cameroon.
            </p>
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => handleSocialClick(socialLinks.facebook)}
                className="text-purple-300 hover:text-white transition-colors hover:scale-110 transform duration-200 bg-white/10 p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleSocialClick(socialLinks.twitter)}
                className="text-green-300 hover:text-white transition-colors hover:scale-110 transform duration-200 bg-white/10 p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleSocialClick(socialLinks.instagram)}
                className="text-orange-300 hover:text-white transition-colors hover:scale-110 transform duration-200 bg-white/10 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="text-purple-300 hover:text-white transition-colors hover:scale-110 transform duration-200 bg-white/10 p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base md:text-lg mb-3 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 rounded-full" 
                style={{ backgroundColor: colors.secondary.main }}></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-green-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-orange-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Register School
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-purple-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base md:text-lg mb-3 text-white relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 rounded-full" 
                style={{ backgroundColor: colors.accent.main }}></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-support" className="text-purple-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-green-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-orange-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-purple-200 hover:text-white transition-colors text-xs md:text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="font-semibold text-base md:text-lg mb-3 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 rounded-full" 
                style={{ backgroundColor: colors.orange.main }}></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-xs md:text-sm text-purple-200 group">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 transition-colors" 
                  style={{ color: colors.secondary.main }} />
                <span>
                  123 Education Boulevard<br />
                  Yaoundé, Cameroon
                </span>
              </li>
              <li className="flex items-center space-x-2 text-xs md:text-sm text-green-200 group">
                <Phone className="h-4 w-4 shrink-0 transition-colors" 
                  style={{ color: colors.accent.main }} />
                <a href="tel:+237222333444" className="hover:text-white transition-colors">
                  +237 222 333 444
                </a>
              </li>
              <li className="flex items-center space-x-2 text-xs md:text-sm text-orange-200 group">
                <Mail className="h-4 w-4 shrink-0 transition-colors" 
                  style={{ color: colors.orange.main }} />
                <a href="mailto:support@eduflex.cm" className="hover:text-white transition-colors">
                  support@eduflex.cm
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-purple-300">
                <span className="font-semibold text-white">Support Hours:</span><br />
                Mon - Fri: 8:00 AM - 6:00 PM<br />
                Sat: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-purple-300 text-center sm:text-left">
            &copy; {currentYear} EduFlex Systems. All rights reserved. | 
            <Link to="/privacy" className="hover:text-white ml-1">Privacy</Link> | 
            <Link to="/terms" className="hover:text-white ml-1">Terms</Link>
          </p>
          
          {/* Trust badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" 
                style={{ backgroundColor: colors.secondary.main }}></span>
            </div>
            <div className="flex items-center gap-1 text-xs text-purple-300">
              <span>Made with</span>
              <Heart size={12} style={{ color: colors.orange.main }} className="animate-pulse" />
              <span>in Cameroon</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;