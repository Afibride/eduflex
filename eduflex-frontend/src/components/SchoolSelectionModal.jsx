// SchoolSelectionModal.jsx - Enhanced with filters and improved styling
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    X, Search, MapPin, Users, Award, TrendingUp, 
    School, Filter, ChevronRight, Star, BookOpen,
    Globe, Clock, CheckCircle, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    600: '#2563eb',
  },
  secondary: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    50: '#f0fdf4',
    100: '#dcfce7',
  },
  accent: {
    main: '#9333ea',
    light: '#c084fc',
    dark: '#7e22ce',
    50: '#faf5ff',
    100: '#f3e8ff',
  }
};

// Enhanced school data with more details
const enhancedSchools = [
  {
    id: 'LECLERC-001',
    name: 'Lycée Général Leclerc',
    location: 'Yaoundé',
    region: 'Centre',
    type: 'Government High School',
    email: 'leclerc@edu.cm',
    phone: '+237-123-4567',
    logo: 'LGL',
    color: 'blue',
    students: 3200,
    teachers: 180,
    rating: 4.8,
    established: 1965,
    achievements: ['Top 3 in Centre Region', '95% Pass Rate', 'STEM Excellence'],
    programs: ['GCE Advanced', 'GCE Ordinary', 'Technical', 'Bilingual'],
    description: 'Premier institution known for academic excellence and holistic development.'
  },
  {
    id: 'VOGT-001',
    name: 'Collège Vogt',
    location: 'Douala',
    region: 'Littoral',
    type: 'Private School',
    email: 'vogt@edu.cm',
    phone: '+237-234-5678',
    logo: 'CV',
    color: 'purple',
    students: 2800,
    teachers: 150,
    rating: 4.9,
    established: 1970,
    achievements: ['98% Baccalaureate Rate', 'Math Excellence', 'Debate Champions'],
    programs: ['French Baccalaureate', 'Bilingual', 'Arts', 'Sports'],
    description: 'Shaping young minds with academic rigor and character development.'
  },
  {
    id: 'BIYEM-001',
    name: 'Lycée de Biyem-Assi',
    location: 'Yaoundé',
    region: 'Centre',
    type: 'Government High School',
    email: 'biyem@edu.cm',
    phone: '+237-345-6789',
    logo: 'LBA',
    color: 'green',
    students: 2500,
    teachers: 140,
    rating: 4.7,
    established: 1982,
    achievements: ['STEM Leadership', '100% University Placement', 'Sports Champions'],
    programs: ['Science', 'Literature', 'Computer Science', 'Sports'],
    description: 'Beacon of educational excellence fostering innovation.'
  },
  {
    id: 'LIBERMANN-001',
    name: 'Collège Libermann',
    location: 'Douala',
    region: 'Littoral',
    type: 'Mission School',
    email: 'libermann@edu.cm',
    phone: '+237-456-7890',
    logo: 'CL',
    color: 'orange',
    students: 2200,
    teachers: 130,
    rating: 4.8,
    established: 1955,
    achievements: ['Values-Based Education', 'Academic Excellence', 'Community Service'],
    programs: ['General Education', 'Science', 'Humanities', 'Vocational'],
    description: 'Catholic institution combining faith with academic excellence.'
  },
  {
    id: 'JOSS-001',
    name: 'Lycée Joss',
    location: 'Douala',
    region: 'Littoral',
    type: 'Government High School',
    email: 'joss@edu.cm',
    phone: '+237-567-8901',
    logo: 'LJ',
    color: 'teal',
    students: 3000,
    teachers: 170,
    rating: 4.6,
    established: 1968,
    achievements: ['Sports Excellence', 'Arts & Culture', 'Academic Diversity'],
    programs: ['Science', 'Arts', 'Economics', 'Languages'],
    description: 'Celebrated for diversity and holistic education.'
  },
  {
    id: 'CCBD-001',
    name: 'Collège Catholique Bilingue de Douala',
    location: 'Douala',
    region: 'Littoral',
    type: 'Mission School',
    email: 'ccbd@edu.cm',
    phone: '+237-678-9012',
    logo: 'CCBD',
    color: 'blue',
    students: 2600,
    teachers: 155,
    rating: 4.9,
    established: 1975,
    achievements: ['Bilingual Excellence', 'Moral Formation', 'Academic Success'],
    programs: ['Bilingual Education', 'Science', 'Arts', 'Technology'],
    description: 'Premier bilingual Catholic institution in Douala.'
  },
  {
    id: 'BUEA-001',
    name: 'Lycée Buea',
    location: 'Buea',
    region: 'Sud-Ouest',
    type: 'Government High School',
    email: 'buea@edu.cm',
    phone: '+237-789-0123',
    logo: 'LB',
    color: 'green',
    students: 2100,
    teachers: 125,
    rating: 4.7,
    established: 1978,
    achievements: ['Academic Excellence', 'Environmental Education', 'Community Impact'],
    programs: ['GCE Programs', 'Science', 'Arts', 'Environmental Studies'],
    description: 'Leading school in the Southwest region with focus on excellence.'
  },
  {
    id: 'MODERNE-001',
    name: 'Collège Moderne de Yaoundé',
    location: 'Yaoundé',
    region: 'Centre',
    type: 'Private School',
    email: 'moderne@edu.cm',
    phone: '+237-890-1234',
    logo: 'CMY',
    color: 'purple',
    students: 1800,
    teachers: 110,
    rating: 4.5,
    established: 1985,
    achievements: ['Modern Curriculum', 'Tech Integration', 'Student-Centered'],
    programs: ['Modern Education', 'ICT', 'Languages', 'Sciences'],
    description: 'Forward-thinking institution embracing modern educational methods.'
  },
  {
    id: 'TECHNIQUE-001',
    name: 'Lycée Technique de Douala',
    location: 'Douala',
    region: 'Littoral',
    type: 'Technical College',
    email: 'technique@edu.cm',
    phone: '+237-901-2345',
    logo: 'LTD',
    color: 'orange',
    students: 2400,
    teachers: 145,
    rating: 4.8,
    established: 1972,
    achievements: ['Technical Excellence', 'Industry Partnerships', 'Job Placement'],
    programs: ['Engineering', 'ICT', 'Business', 'Vocational Training'],
    description: 'Premier technical institution preparing students for industry.'
  },
  {
    id: 'LIMBE-001',
    name: "Collège d'Enseignement Général de Limbe",
    location: 'Limbe',
    region: 'Sud-Ouest',
    type: 'Government High School',
    email: 'limbe@edu.cm',
    phone: '+237-012-3456',
    logo: 'CEGL',
    color: 'teal',
    students: 1900,
    teachers: 115,
    rating: 4.6,
    established: 1980,
    achievements: ['Academic Growth', 'Cultural Diversity', 'Community Engagement'],
    programs: ['General Education', 'Science', 'Arts', 'Languages'],
    description: 'Diverse learning community in beautiful Limbe.'
  }
];

const SchoolSelectionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { schools, selectSchool } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredSchool, setHoveredSchool] = useState(null);

  // Get unique regions and types for filters
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(enhancedSchools.map(s => s.region))];
    return ['all', ...uniqueRegions.sort()];
  }, []);

  const schoolTypes = useMemo(() => {
    const uniqueTypes = [...new Set(enhancedSchools.map(s => s.type))];
    return ['all', ...uniqueTypes.sort()];
  }, []);

  // Filter and sort schools
  const filteredSchools = useMemo(() => {
    let filtered = enhancedSchools.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
      const matchesType = selectedType === 'all' || school.type === selectedType;
      
      return matchesSearch && matchesRegion && matchesType;
    });

    // Sort schools
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
        case 'established':
          return a.established - b.established;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedRegion, selectedType, sortBy]);

  const handleSelectSchool = (schoolId) => {
    selectSchool(schoolId);
    onClose();
    navigate(`/school/${schoolId}/login`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSortBy('name');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-xl">
                <School className="h-6 w-6" style={{ color: colors.primary.main }} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Your School</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose from {filteredSchools.length} schools across Cameroon</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by school name, location, or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
              </div>

              {/* Filter Toggle Button */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="lg:w-auto flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(selectedRegion !== 'all' || selectedType !== 'all') && (
                  <span className="ml-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                    Active
                  </span>
                )}
              </Button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-300">
                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>
                        {region === 'all' ? 'All Regions' : region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* School Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    School Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {schoolTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="name">School Name</option>
                    <option value="rating">Highest Rated</option>
                    <option value="students">Most Students</option>
                    <option value="established">Oldest First</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium border border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* School Grid */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
            {filteredSchools.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <School className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No schools found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchools.map((school) => (
                  <div
                    key={school.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1 cursor-pointer"
                    onMouseEnter={() => setHoveredSchool(school.id)}
                    onMouseLeave={() => setHoveredSchool(null)}
                    onClick={() => handleSelectSchool(school.id)}
                  >
                    {/* Top Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${
                      school.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      school.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      school.color === 'green' ? 'from-green-500 to-green-600' :
                      school.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      school.color === 'teal' ? 'from-teal-500 to-teal-600' :
                      'from-primary-500 to-primary-600'
                    }`} />

                    <div className="p-6">
                      {/* School Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${
                          school.color === 'blue' ? 'from-blue-500 to-blue-600' :
                          school.color === 'purple' ? 'from-purple-500 to-purple-600' :
                          school.color === 'green' ? 'from-green-500 to-green-600' :
                          school.color === 'orange' ? 'from-orange-500 to-orange-600' :
                          school.color === 'teal' ? 'from-teal-500 to-teal-600' :
                          'from-primary-500 to-primary-600'
                        } text-white flex items-center justify-center text-xl font-bold shadow-lg`}>
                          {school.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 truncate">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: colors.secondary.main }} />
                            <span className="truncate">{school.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* School Type & Region */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                          {school.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300">
                          {school.region}
                        </span>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                            <Users className="h-3 w-3" style={{ color: colors.primary.main }} />
                            <span>{school.students}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                            <Award className="h-3 w-3" style={{ color: colors.secondary.main }} />
                            <span>{school.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                            <TrendingUp className="h-3 w-3" style={{ color: colors.accent.main }} />
                            <span>{school.established}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Founded</p>
                        </div>
                      </div>

                      {/* Description - shown on hover */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        hoveredSchool === school.id ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {school.description}
                        </p>
                      </div>

                      {/* Programs Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {school.programs.slice(0, 3).map((program, idx) => (
                          <span key={idx} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">
                            {program}
                          </span>
                        ))}
                        {school.programs.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{school.programs.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Select Button */}
                      <button
                        className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <Building2 className="h-4 w-4" />
                        Select School
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>Showing <strong>{filteredSchools.length}</strong> schools</span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                <span>Trusted by <strong>50,000+</strong> users</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: colors.secondary.main }} />
                <span>Cameroon's #1 School Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slideInFromTop 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SchoolSelectionModal;