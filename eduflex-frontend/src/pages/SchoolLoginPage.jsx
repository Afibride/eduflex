import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
    ArrowLeft, LogIn, UserPlus, MapPin, Mail, Phone, 
    GraduationCap, Building2, Users, BookOpen, Award,
    Calendar, Clock, ChevronRight, Star, Shield, Sparkles,
    CheckCircle, TrendingUp, Globe, BookMarked
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext.jsx';

// Color palette matching your brand
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
  },
  accent: {
    main: '#9333ea',
    light: '#c084fc',
    dark: '#7e22ce',
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
  }
};

// School-specific data (would come from API in real app)
const schoolFeatures = {
  'LECLERC-001': {
    about: "Lycée Général Leclerc is a premier educational institution in Yaoundé, known for academic excellence and holistic student development since 1965.",
    achievements: [
      "95% GCE Advanced Level pass rate",
      "Ranked top 3 in Centre Region",
      "Over 50 university scholarships in 2024"
    ],
    programs: [
      "GCE Advanced Level (Science, Arts, Economics)",
      "GCE Ordinary Level",
      "Technical & Vocational Training",
      "Bilingual Education Program"
    ],
    stats: {
      students: "3,200+",
      teachers: "180+",
      passRate: "95%",
      founded: "1965"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      campus: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      students: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  'VOGT-001': {
    about: "Collège Vogt has been shaping young minds in Douala for over 50 years, combining academic rigor with character development.",
    achievements: [
      "98% success rate in Baccalaureate",
      "Excellence in Mathematics & Sciences",
      "Nationwide debate champions 2023"
    ],
    programs: [
      "French Baccalaureate (S, ES, L)",
      "Bilingual Section",
      "Arts & Music Program",
      "Sports Excellence"
    ],
    stats: {
      students: "2,800+",
      teachers: "150+",
      passRate: "98%",
      founded: "1970"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      campus: "https://images.unsplash.com/photo-1497633762265-9d0c5d6b4b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      students: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  'BIYEM-001': {
    about: "Lycée de Biyem-Assi stands as a beacon of educational excellence in Yaoundé, fostering innovation and academic achievement.",
    achievements: [
      "Leading in STEM education",
      "100% university placement rate",
      "Regional sports champions"
    ],
    programs: [
      "Science & Mathematics",
      "Literature & Humanities",
      "Computer Science",
      "Sports & Arts"
    ],
    stats: {
      students: "2,500+",
      teachers: "140+",
      passRate: "92%",
      founded: "1982"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      campus: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      students: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  }
};

const SchoolLoginPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { schools, selectSchool } = useAuth();
  const [activeTab, setActiveTab] = useState('about');

  const school = schools.find(s => s.id === schoolId);
  const schoolData = schoolFeatures[schoolId] || {
    about: `${school?.name} is dedicated to providing quality education and fostering academic excellence.`,
    achievements: [
      "High academic standards",
      "Dedicated teaching staff",
      "Modern learning facilities"
    ],
    programs: [
      "General Education",
      "Science Programs",
      "Arts & Humanities",
      "Vocational Training"
    ],
    stats: {
      students: "2,500+",
      teachers: "120+",
      passRate: "90%",
      founded: "1980"
    },
    images: {
      hero: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      campus: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      students: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  };

  useEffect(() => {
    if (school) {
      selectSchool(school.id);
    } else {
      navigate('/');
    }
  }, [school, selectSchool, navigate]);

  if (!school) return null;

  // Get gradient color based on school color
  const getSchoolGradient = () => {
    const colorMap = {
      teal: 'from-teal-500 to-teal-600',
      blue: 'from-blue-500 to-blue-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600'
    };
    return colorMap[school.color] || 'from-primary-600 to-primary-700';
  };

  return (
    <>
      <Helmet>
        <title>{school.name} - EduFlex School Portal</title>
        <meta name="description" content={schoolData.about} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{
              background: `radial-gradient(circle, ${colors.primary[200]} 0%, transparent 70%)`,
              animationDelay: '0s'
            }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{
              background: `radial-gradient(circle, ${colors.secondary[200]} 0%, transparent 70%)`,
              animationDelay: '2s'
            }} />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-10 animate-float"
            style={{
              background: `radial-gradient(circle, ${colors.accent[200]} 0%, transparent 70%)`,
              animationDelay: '4s'
            }} />
        </div>

        {/* Navigation Bar */}
        <div className="relative z-10 p-4 max-w-7xl mx-auto w-full">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to School Selection
          </Button>
        </div>

        {/* Hero Section with School Image */}
        <div className="relative z-10">
          <div className="h-[400px] md:h-[500px] relative overflow-hidden">
            <img 
              src={schoolData.images.hero}
              alt={school.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            
            {/* School Header Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${getSchoolGradient()} shadow-2xl`}>
                    <span className="font-extrabold text-4xl text-white">
                      {school.logo || school.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">{school.name}</h1>
                    <p className="text-xl text-white/90">Est. {schoolData.stats.founded}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Stats Bar */}
        <div className="relative z-10 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{schoolData.stats.students}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{schoolData.stats.teachers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Qualified Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{schoolData.stats.passRate}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Portal Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
              {['about', 'programs', 'achievements', 'portal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-all duration-300 border-b-2 ${
                    activeTab === tab
                      ? `border-${school.color || 'primary'}-600 text-${school.color || 'primary'}-600 dark:text-${school.color || 'primary'}-400`
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {activeTab === 'about' && (
                  <>
                    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                      <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {school.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                          {schoolData.about}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 mt-1" style={{ color: colors.secondary.main }} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{school.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 mt-1" style={{ color: colors.secondary.main }} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{school.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 mt-1" style={{ color: colors.secondary.main }} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{school.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 mt-1" style={{ color: colors.secondary.main }} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Founded</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{schoolData.stats.founded}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Campus Image */}
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={schoolData.images.campus}
                        alt="Campus"
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'programs' && (
                  <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Academic Programs</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {schoolData.programs.map((program, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <BookOpen size={20} style={{ color: colors.primary.main }} />
                            <span className="text-gray-700 dark:text-gray-300">{program}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'achievements' && (
                  <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">School Achievements</h2>
                      <div className="space-y-4">
                        {schoolData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle size={20} style={{ color: colors.secondary.main }} />
                            <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'portal' && (
                  <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">EduFlex Portal</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Access your personalized dashboard to manage your academic journey, view grades, and stay connected with your school community.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <GraduationCap size={20} style={{ color: colors.primary.main }} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Track Academic Progress</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Users size={20} style={{ color: colors.secondary.main }} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Parent-Teacher Communication</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Calendar size={20} style={{ color: colors.accent.main }} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Event Calendar</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Award size={20} style={{ color: colors.primary.main }} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Achievement Tracking</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Action Cards */}
              <div className="space-y-6">
                {/* Login Card */}
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group bg-white dark:bg-gray-800 hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${getSchoolGradient()} w-full`}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Existing Users</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Login to access your dashboard and continue your academic journey.
                        </p>
                      </div>
                      <Button 
                        className={`w-full bg-gradient-to-r ${getSchoolGradient()} text-white h-12 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                        onClick={() => navigate(`/school/${school.id}/login-form?action=login`)}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Login to Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Activate Card */}
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group bg-white dark:bg-gray-800 hover:-translate-y-1">
                  <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-700 w-full"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <UserPlus className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">New Users</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Received a school ID? Activate your account to get started.
                        </p>
                      </div>
                      <Button 
                        className="w-full bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-600 dark:hover:text-white h-12 text-base rounded-xl transition-all duration-300"
                        onClick={() => navigate(`/school/${school.id}/login-form?action=activate`)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Activate Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        School Calendar
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Exam Schedule
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Staff Directory
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Parent Resources
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm">
                    <Shield size={14} className="text-green-600" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Secured by EduFlex • AES-256 Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default SchoolLoginPage;