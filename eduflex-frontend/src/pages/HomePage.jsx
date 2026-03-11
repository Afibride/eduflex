// HomePage.jsx - Updated with full dark theme support
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
    GraduationCap, Users, Award, TrendingUp, Building2, 
    ChevronRight, Sparkles, BookOpen, Globe, BarChart3, 
    MessageSquare, Clock, Shield, Target, Star, CheckCircle,
    BookMarked, PenTool, Bell, UserPlus, School, Zap,
    ChevronLeft, Quote, Play, Camera, Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchoolSelectionModal from '@/components/SchoolSelectionModal.jsx';

// Color palette based on the logo
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  accent: {
    main: '#9333ea',
    light: '#c084fc',
    dark: '#7e22ce',
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
  },
  neutral: {
    white: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
};

// Dark theme colors
const darkColors = {
  background: '#0f172a',
  surface: '#1e293b',
  surfaceHover: '#334155',
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
    muted: '#64748b'
  },
  border: '#334155'
};

// Data constants
const schoolStats = [
  { icon: School, value: '2,500+', label: 'Schools Across Cameroon' },
  { icon: Users, value: '50K+', label: 'Active Users' },
  { icon: Award, value: '98%', label: 'Satisfaction Rate' },
  { icon: TrendingUp, value: '30%', label: 'Efficiency Gain' },
];

const cameroonFeatures = [
  {
    icon: BookOpen,
    title: 'Bilingual Support',
    description: 'Full support for both English and French curriculum requirements',
    color: colors.primary.main
  },
  {
    icon: Globe,
    title: 'Regional Adaptation',
    description: 'Tailored for Cameroon\'s educational structure and examination systems',
    color: colors.secondary.main
  },
  {
    icon: Users,
    title: 'Community Focused',
    description: 'Bridging the gap between urban and rural educational institutions',
    color: colors.accent.main
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with local data sovereignty compliance',
    color: '#f97316'
  }
];

const successStories = [
  {
    school: 'Government Bilingual High School',
    location: 'Yaoundé',
    improvement: '40% reduction in admin time',
    highlight: 'Streamlined attendance tracking and report generation',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    principal: 'Mme. Marie Claire'
  },
  {
    school: 'Saker Baptist College',
    location: 'Limbe',
    improvement: '60% faster parent-teacher communication',
    highlight: 'Real-time updates and automated progress reports',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    principal: 'Rev. Dr. Samuel Njie'
  },
  {
    school: 'Collège Jean Tabi',
    location: 'Douala',
    improvement: '35% increase in parent engagement',
    highlight: 'Mobile access to student performance and school events',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    principal: 'M. Jean-Pierre Mbala'
  },
  {
    school: 'Government High School Buea',
    location: 'Buea',
    improvement: '45% reduction in paperwork',
    highlight: 'Digital attendance and report cards',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    principal: 'Dr. Emilia Motaze'
  },
  {
    school: 'Our Lady of Lourdes College',
    location: 'Mankon',
    improvement: '50% faster result processing',
    highlight: 'Automated grade computation and analysis',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1497633762265-9d0c5d6b4b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    principal: 'Sr. Catherine Nchang'
  }
];

const testimonials = [
  {
    name: 'Dr. Emmanuel Ndi',
    role: 'Principal, GBHS Bamenda',
    content: 'EduFlex has revolutionized how we manage our school. The bilingual support is perfect for our diverse student body.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    name: 'Mme. Rose Mballa',
    role: 'Head Teacher, École Publique Douala',
    content: 'The parent-teacher communication features have brought our school community closer together.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    name: 'Mr. Peter Taniform',
    role: 'IT Director, Saker Baptist College',
    content: 'Implementation was smooth and the support team is exceptional. Highly recommended for Cameroon schools.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    name: 'Sr. Catherine Nchang',
    role: 'Principal, Our Lady of Lourdes College',
    content: 'The platform has made result processing 50% faster. Our teachers love it!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    name: 'M. Jean-Pierre Mbala',
    role: 'Principal, Collège Jean Tabi',
    content: 'Parent engagement has increased significantly since we started using EduFlex.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];

const howItWorksSteps = [
  {
    icon: BookMarked,
    title: "Register Your School",
    description: "Complete a simple registration form to get started",
    step: "1",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: PenTool,
    title: "Configure Your Platform",
    description: "Set up your school profile, staff, and curriculum",
    step: "2",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Bell,
    title: "Launch & Engage",
    description: "Start using the platform with all stakeholders",
    step: "3",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Users,
    title: "Train Your Staff",
    description: "Comprehensive training for teachers and administrators",
    step: "4",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Award,
    title: "Achieve Excellence",
    description: "Monitor progress and celebrate success",
    step: "5",
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Scroll state for success stories
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  // Scroll state for testimonials
  const [showTestimonialsLeftArrow, setShowTestimonialsLeftArrow] = useState(false);
  const [showTestimonialsRightArrow, setShowTestimonialsRightArrow] = useState(true);
  const testimonialsScrollRef = useRef(null);

  // Scroll state for how it works
  const [showHowItWorksLeftArrow, setShowHowItWorksLeftArrow] = useState(false);
  const [showHowItWorksRightArrow, setShowHowItWorksRightArrow] = useState(true);
  const howItWorksScrollRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(false);

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // Scroll handlers for success stories
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Scroll handlers for testimonials
  const handleTestimonialsScroll = () => {
    if (testimonialsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = testimonialsScrollRef.current;
      setShowTestimonialsLeftArrow(scrollLeft > 0);
      setShowTestimonialsRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTestimonialsLeft = () => {
    if (testimonialsScrollRef.current) {
      testimonialsScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollTestimonialsRight = () => {
    if (testimonialsScrollRef.current) {
      testimonialsScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Scroll handlers for how it works
  const handleHowItWorksScroll = () => {
    if (howItWorksScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = howItWorksScrollRef.current;
      setShowHowItWorksLeftArrow(scrollLeft > 0);
      setShowHowItWorksRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollHowItWorksLeft = () => {
    if (howItWorksScrollRef.current) {
      howItWorksScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollHowItWorksRight = () => {
    if (howItWorksScrollRef.current) {
      howItWorksScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const testimonialsContainer = testimonialsScrollRef.current;
    if (testimonialsContainer) {
      testimonialsContainer.addEventListener('scroll', handleTestimonialsScroll);
      handleTestimonialsScroll();
      
      return () => {
        testimonialsContainer.removeEventListener('scroll', handleTestimonialsScroll);
      };
    }
  }, []);

  useEffect(() => {
    const howItWorksContainer = howItWorksScrollRef.current;
    if (howItWorksContainer) {
      howItWorksContainer.addEventListener('scroll', handleHowItWorksScroll);
      handleHowItWorksScroll();
      
      return () => {
        howItWorksContainer.removeEventListener('scroll', handleHowItWorksScroll);
      };
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>EduFlex - Empowering Education, Inspiring Growth</title>
        <meta name="description" content="EduFlex is a comprehensive school management system that helps educational institutions manage students, teachers, parents, and academic activities efficiently." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Dynamic Background with Images - Dark mode optimized */}
        <div className="fixed inset-0 z-0">
          {/* Base gradient - Adapts to dark mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/50 to-green-50/70 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 transition-colors duration-300"></div>
          
          {/* Pattern Overlay - Dark mode version */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating Image Elements - Dark mode optimized */}
          <div className="absolute top-20 right-0 w-96 h-96 opacity-30 dark:opacity-10 rotate-12 hidden lg:block mix-blend-overlay dark:mix-blend-soft-light">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="absolute bottom-20 left-0 w-80 h-80 opacity-30 dark:opacity-10 -rotate-12 hidden lg:block mix-blend-overlay dark:mix-blend-soft-light">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 opacity-25 dark:opacity-10 hidden lg:block mix-blend-overlay dark:mix-blend-soft-light">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* Animated background elements - Dark mode optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full animate-float opacity-20 dark:opacity-10"
            style={{
              background: `radial-gradient(circle, ${colors.primary[200]} 0%, transparent 70%)`,
              animationDelay: '0s'
            }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full animate-float opacity-20 dark:opacity-10"
            style={{
              background: `radial-gradient(circle, ${colors.secondary[200]} 0%, transparent 70%)`,
              animationDelay: '2s'
            }} />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full animate-float opacity-10 dark:opacity-5"
            style={{
              background: `radial-gradient(circle, ${colors.accent[200]} 0%, transparent 70%)`,
              animationDelay: '4s'
            }} />
        </div>

        <div className="relative z-10 flex-1 pt-24">
          <div className="container mx-auto px-4">
            {/* Hero Section with Dark Mode */}
            <div className="relative mb-16">
              <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-40 dark:opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/80"></div>
              </div>
              
              <div className="relative text-center">
                <div className="flex items-center justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <img 
                    src="/public/eduflex.png" 
                    alt="EduFlex Logo" 
                    className="h-24 md:h-32 w-auto drop-shadow-2xl dark:brightness-90"
                  />
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm mb-6 hover:shadow-md transition-shadow duration-300 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary.main }} />
                  <span className="text-sm font-semibold" style={{ color: colors.primary.main }}>
                    Trusted by 2,500+ Schools Across Cameroon
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
                  Empowering Education in
                  <span className="block mt-2" style={{ color: colors.primary.main }}>Cameroon</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                  A unified platform designed to streamline operations, enhance communication, 
                  and improve educational outcomes for schools across Cameroon.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button
                    onClick={handleGetStarted}
                    className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                      color: colors.neutral.white,
                      border: 'none'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles size={20} />
                      Login to Your School
                      <ChevronRight size={20} />
                    </span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 active:scale-[0.98] transition-all duration-300 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus size={20} />
                      Register Your School
                    </span>
                  </button>
                </div>
                
                {/* Stats Bar */}
                <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mb-12">
                  {schoolStats.map((stat, index) => (
                    <div key={index} className="flex-1 min-w-[140px] backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {React.createElement(stat.icon, { 
                          size: 16,
                          style: { color: colors.primary.main }
                        })}
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Showcase Section - Dark Mode */}
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-green-200/50 dark:from-blue-900/30 dark:to-green-900/30 rounded-3xl -m-4 blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt="Students studying"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent dark:from-black/90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">See EduFlex in Action</h3>
                  <p className="text-white/90 drop-shadow">Watch how schools across Cameroon are transforming education</p>
                </div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:bg-blue-50 dark:hover:bg-gray-700">
                  <Play className="w-8 h-8 ml-1" style={{ color: colors.primary.main }} />
                </button>
              </div>
            </div>

            {/* Cameroon Features - Dark Mode */}
            <div id="features" className="mb-16 relative">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="w-full h-full object-cover opacity-30 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80"></div>
              </div>
              
              <div className="relative">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Built for <span style={{ color: colors.secondary.main }}>Cameroon's Education System</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Specifically designed to meet the unique needs of Cameroon schools
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cameroonFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 active:scale-95 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                          style={{ 
                            backgroundColor: `${feature.color}20`,
                            border: `1px solid ${feature.color}30`
                          }}>
                          <IconComponent size={20} color={feature.color} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-300">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Features Cards with Image Headers - Dark Mode */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Everything You Need to <span style={{ color: colors.accent.main }}>Succeed</span>
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  EduFlex brings administrators, teachers, students, and parents together in one seamless, intuitive ecosystem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Schools Card with Image */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="School building"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 -mt-10 bg-white dark:bg-gray-700 shadow-xl border-2 border-white dark:border-gray-600">
                      <Building2 size={20} color={colors.primary.main} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">For Schools</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Centralized management of all operations. Coordinate seamlessly between teachers, students, and parents with powerful administrative tools.
                    </p>
                  </div>
                </div>

                {/* Teachers Card with Image */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Teacher in classroom"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 -mt-10 bg-white dark:bg-gray-700 shadow-xl border-2 border-white dark:border-gray-600">
                      <Users size={20} color={colors.secondary.main} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">For Teachers</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Easy mark uploads, comprehensive assignment management, and detailed class tracking to focus more on teaching and less on paperwork.
                    </p>
                  </div>
                </div>

                {/* Students Card with Image */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Students studying"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 -mt-10 bg-white dark:bg-gray-700 shadow-xl border-2 border-white dark:border-gray-600">
                      <GraduationCap size={20} color={colors.accent.main} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">For Students</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Instantly view grades, track attendance records, and access assignments anytime, anywhere to stay on top of academic goals.
                    </p>
                  </div>
                </div>

                {/* Parents Card with Image */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1497633762265-9d0c5d6b4b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Parents meeting"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 -mt-10 bg-white dark:bg-gray-700 shadow-xl border-2 border-white dark:border-gray-600">
                      <Award size={20} color="#f97316" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">For Parents</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Actively monitor your child's progress, view fee structures, and track overall performance with real-time updates and reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories with Horizontal Scroll - Dark Mode */}
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 to-purple-200/40 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl -m-4 blur-xl"></div>
              <div className="relative">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Success Stories from <span style={{ color: colors.primary.main }}>Cameroon Schools</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    See how schools across Cameroon are transforming with EduFlex
                  </p>
                </div>
                
                {/* Scroll Arrows for Desktop */}
                <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between z-20 px-4 transform -translate-y-1/2 pointer-events-none">
                  <button
                    onClick={scrollLeft}
                    className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                      showLeftArrow ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ border: `1px solid ${colors.neutral[200]}` }}
                  >
                    <ChevronLeft size={24} style={{ color: colors.primary.main }} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                      showRightArrow ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ border: `1px solid ${colors.neutral[200]}` }}
                  >
                    <ChevronRight size={24} style={{ color: colors.primary.main }} />
                  </button>
                </div>
                
                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {successStories.map((story, index) => (
                    <div
                      key={index}
                      className="flex-none w-[300px] md:w-[380px] snap-start bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={story.image}
                          alt={story.school}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-primary-50 dark:bg-primary-900/50 border-2 border-primary-100 dark:border-primary-800">
                            <GraduationCap size={20} style={{ color: colors.primary.main }} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">{story.school}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{story.location}</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={16} style={{ color: colors.secondary.main }} />
                            <span className="text-sm font-semibold" style={{ color: colors.secondary.main }}>
                              {story.improvement}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{story.highlight}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < story.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials Section with Horizontal Scroll - Dark Mode */}
            <div className="mb-16 relative">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  What <span style={{ color: colors.primary.main }}>Educators Say</span>
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  Hear from school leaders who have transformed their institutions with EduFlex
                </p>
              </div>

              {/* Scroll Arrows for Desktop */}
              <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between z-20 px-4 transform -translate-y-1/2 pointer-events-none">
                <button
                  onClick={scrollTestimonialsLeft}
                  className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                    showTestimonialsLeftArrow ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ border: `1px solid ${colors.neutral[200]}` }}
                >
                  <ChevronLeft size={24} style={{ color: colors.primary.main }} />
                </button>
                <button
                  onClick={scrollTestimonialsRight}
                  className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                    showTestimonialsRightArrow ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ border: `1px solid ${colors.neutral[200]}` }}
                >
                  <ChevronRight size={24} style={{ color: colors.primary.main }} />
                </button>
              </div>

              {/* Scrollable Container for Mobile */}
              <div
                ref={testimonialsScrollRef}
                className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-none w-[300px] md:w-auto snap-start bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative group"
                  >
                    <Quote className="absolute top-4 right-4 w-8 h-8 opacity-10 dark:opacity-5 group-hover:opacity-20 transition-opacity" style={{ color: colors.primary.main }} />
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 shadow-md"
                        style={{ borderColor: colors.primary.main }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator Dots for Mobile */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index === 0 ? colors.primary.main : colors.neutral[300]
                    }}
                  />
                ))}
              </div>
            </div>

            {/* How It Works - Dark Mode */}
            <div className="mb-16 relative">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="w-full h-full object-cover opacity-30 dark:opacity-10 rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-gray-900/90 dark:to-gray-800/90 rounded-3xl"></div>
              </div>
              
              <div className="relative p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">How EduFlex Works</h2>
                  <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    A simple step-by-step process to transform your school's digital ecosystem
                  </p>
                </div>

                {/* Scroll Arrows for Desktop */}
                <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between z-20 px-4 transform -translate-y-1/2 pointer-events-none">
                  <button
                    onClick={scrollHowItWorksLeft}
                    className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                      showHowItWorksLeftArrow ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ border: `1px solid ${colors.neutral[200]}` }}
                  >
                    <ChevronLeft size={24} style={{ color: colors.primary.main }} />
                  </button>
                  <button
                    onClick={scrollHowItWorksRight}
                    className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto ${
                      showHowItWorksRightArrow ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ border: `1px solid ${colors.neutral[200]}` }}
                  >
                    <ChevronRight size={24} style={{ color: colors.primary.main }} />
                  </button>
                </div>

                {/* Scrollable Container for Mobile */}
                <div
                  ref={howItWorksScrollRef}
                  className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {howItWorksSteps.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex-none w-[280px] md:w-auto snap-start text-center group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                          style={{ backgroundColor: colors.primary.main }}>
                          {feature.step}
                        </div>
                        <div className="h-32 w-full mb-4 rounded-xl overflow-hidden">
                          <img 
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-primary-100 dark:bg-primary-900 border-2 border-primary-200 dark:border-primary-800">
                          <IconComponent size={24} color={colors.primary.main} />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-300">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Scroll Indicator Dots for Mobile */}
                <div className="flex justify-center gap-2 mt-4 md:hidden">
                  {howItWorksSteps.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: index === 0 ? colors.primary.main : colors.neutral[300]
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Key Benefits with Image Background - Dark Mode */}
            <div className="mb-16 relative">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="w-full h-full object-cover opacity-30 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80"></div>
              </div>
              
              <div className="relative">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Key Benefits for <span style={{ color: colors.primary.main }}>Educational Excellence</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Comprehensive solutions designed to elevate education quality and administration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: BarChart3,
                      title: "Academic Analytics",
                      description: "Track student performance and identify areas for improvement",
                      color: colors.primary.main,
                      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      icon: MessageSquare,
                      title: "Seamless Communication",
                      description: "Connect teachers, parents, and administrators instantly",
                      color: colors.secondary.main,
                      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      icon: Shield,
                      title: "Data Security",
                      description: "Enterprise-grade security for all student and staff data",
                      color: colors.accent.main,
                      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                      icon: Clock,
                      title: "Time Efficiency",
                      description: "Reduce administrative workload by up to 70%",
                      color: "#f97316",
                      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                  ].map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-3 border-white dark:border-gray-700 shadow-xl">
                          <img 
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md"
                          style={{ 
                            backgroundColor: `${feature.color}20`,
                            border: `1px solid ${feature.color}30`
                          }}>
                          <IconComponent size={24} color={feature.color} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Final CTA with Image - Dark Mode */}
            <div className="text-center mb-16 relative">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                  className="w-full h-full object-cover opacity-40 dark:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-gray-900/90 dark:to-gray-800/90"></div>
              </div>
              <div className="relative py-16 px-4">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Transform Your School?
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                  Join thousands of schools across Cameroon that are already experiencing the benefits of digital transformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGetStarted}
                    className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                      color: colors.neutral.white,
                      border: 'none'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Target size={20} />
                      Login to Your School
                      <ChevronRight size={20} />
                    </span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 active:scale-[0.98] transition-all duration-300 bg-white/95 dark:bg-gray-800/95 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus size={20} />
                      Register Your School Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Selection Modal */}
        <SchoolSelectionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default HomePage;