import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    X, Search, MapPin, Users, Award, TrendingUp, 
    School, Filter, ChevronRight, Star, BookOpen,
    Globe, Clock, CheckCircle, Building2, Loader2,
    AlertCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { schoolAPI } from '@/services/api';

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

// Fallback demo data in case API fails
const fallbackSchools = [
  {
    id: 1,
    code: 'LECLERC-001',
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
    status: 'active',
    description: 'Premier government high school in Yaoundé with excellent academic record.'
  },
  {
    id: 2,
    code: 'VOGT-001',
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
    status: 'active',
    description: 'Leading private school in Douala with modern facilities.'
  },
  {
    id: 3,
    code: 'BIYEM-001',
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
    status: 'active',
    description: 'Well-known high school in the Biyem-Assi neighborhood.'
  }
];

const SchoolSelectionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { selectSchool } = useAuth();
  
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredSchool, setHoveredSchool] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch schools from API when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchSchools();
    }
  }, [isOpen, retryCount]);

  const fetchSchools = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await schoolAPI.getAll();
      console.log('Schools API Response:', response);
      
      // Extract schools data from response
      let schoolsData = [];
      if (response.data && Array.isArray(response.data)) {
        schoolsData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        schoolsData = response.data.data;
      } else if (Array.isArray(response)) {
        schoolsData = response;
      }
      
      console.log('Extracted schools data:', schoolsData);
      
      if (!schoolsData || schoolsData.length === 0) {
        console.warn('No schools data received from API');
        setError('No schools found in the database. Please contact administrator.');
        setSchools(fallbackSchools);
        setLoading(false);
        return;
      }
      
      // Transform API data to match component format
      const transformedSchools = schoolsData.map(school => ({
        id: school.id,
        code: school.code || `SCH-${school.id}`,
        name: school.name || 'Unnamed School',
        location: school.city || school.location || 'Unknown Location',
        region: school.region || 'Unknown Region',
        type: getSchoolType(school.name, school.type),
        email: school.email || 'contact@school.com',
        phone: school.phone || 'Not provided',
        logo: getInitials(school.name),
        color: getRandomColor(school.id),
        students: school.students_count || Math.floor(Math.random() * 3000) + 500,
        teachers: school.teachers_count || Math.floor(Math.random() * 150) + 30,
        rating: school.rating || (Math.random() * 1.5 + 3.5).toFixed(1),
        established: school.established || new Date(school.created_at).getFullYear() || 2000,
        status: school.status || 'active',
        description: school.description || `${school.name || 'This school'} is a premier educational institution in ${school.city || 'Cameroon'}.`,
        website: school.website,
        created_at: school.created_at
      }));
      
      // Filter only active schools
      const activeSchools = transformedSchools.filter(school => school.status === 'active');
      
      setSchools(activeSchools.length > 0 ? activeSchools : transformedSchools);
      setError(null);
      
    } catch (err) {
      console.error('Failed to fetch schools:', err);
      
      // Provide more detailed error message
      let errorMessage = 'Unable to load schools from server. Showing demo data.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Authentication required. Please login to view schools.';
        } else if (err.response.status === 404) {
          errorMessage = 'School endpoint not found. Please check API configuration.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = 'Cannot connect to server. Please check if the backend is running at http://localhost:8000';
      }
      
      setError(errorMessage);
      // Use fallback data
      setSchools(fallbackSchools);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get school initials
  const getInitials = (name) => {
    if (!name) return 'SC';
    const words = name.split(' ');
    if (words.length === 1) return name.substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // Helper function to get school type from name
  const getSchoolType = (name, existingType = null) => {
    if (existingType) return existingType;
    if (!name) return 'Educational Institution';
    if (name.includes('Lycée') || name.includes('High School')) return 'Government High School';
    if (name.includes('Collège') || name.includes('College')) return 'Private School';
    if (name.includes('Technique')) return 'Technical College';
    if (name.includes('Bilingual')) return 'Bilingual School';
    return 'Educational Institution';
  };

  // Helper function to get random color
  const getRandomColor = (id) => {
    const colors = ['blue', 'purple', 'green', 'orange', 'teal', 'red', 'indigo', 'pink'];
    return colors[id % colors.length];
  };

  // Get unique regions and types for filters
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(schools.map(s => s.region).filter(Boolean))];
    return ['all', ...uniqueRegions.sort()];
  }, [schools]);

  const schoolTypes = useMemo(() => {
    const uniqueTypes = [...new Set(schools.map(s => s.type).filter(Boolean))];
    return ['all', ...uniqueTypes.sort()];
  }, [schools]);

  // Filter and sort schools
  const filteredSchools = useMemo(() => {
    let filtered = schools.filter(school => {
      // Only show active schools
      if (school.status && school.status !== 'active') return false;
      
      const matchesSearch = !searchTerm || 
                           school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.region?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
      const matchesType = selectedType === 'all' || school.type === selectedType;
      
      return matchesSearch && matchesRegion && matchesType;
    });

    // Sort schools
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'students':
          return (b.students || 0) - (a.students || 0);
        case 'established':
          return (a.established || 0) - (b.established || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [schools, searchTerm, selectedRegion, selectedType, sortBy]);

  const handleSelectSchool = (school) => {
    selectSchool(school.id);
    onClose();
    navigate(`/school/${school.code}/login`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSortBy('name');
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (!isOpen) return null;

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin" style={{ color: colors.primary.main }} />
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading schools...</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Fetching from server...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} available
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Retry fetching schools
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    onClick={() => handleSelectSchool(school)}
                  >
                    {/* Top Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${
                      school.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      school.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      school.color === 'green' ? 'from-green-500 to-green-600' :
                      school.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      school.color === 'teal' ? 'from-teal-500 to-teal-600' :
                      school.color === 'red' ? 'from-red-500 to-red-600' :
                      school.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                      school.color === 'pink' ? 'from-pink-500 to-pink-600' :
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
                          school.color === 'red' ? 'from-red-500 to-red-600' :
                          school.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                          school.color === 'pink' ? 'from-pink-500 to-pink-600' :
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
                            <span>{school.students?.toLocaleString()}</span>
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

                      {/* Contact Info */}
                      <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                        <p className="truncate">📧 {school.email}</p>
                        <p className="truncate">📞 {school.phone}</p>
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
