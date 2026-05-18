// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, schoolAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(() => {
    try {
      const saved = localStorage.getItem('selected_school');
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('selected_school');
      return null;
    }
  });

  // Load schools on mount
  useEffect(() => {
    loadSchools();
  }, []);

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  const loadSchools = async () => {
    try {
      const response = await schoolAPI.getAll();
      console.log('Schools loaded:', response.data);
      
      // Handle different response formats
      let schoolsData = response.data;
      if (response.data && response.data.data) {
        schoolsData = response.data.data;
      }
      
      // Ensure schoolsData is an array
      if (!Array.isArray(schoolsData)) {
        console.error('Schools data is not an array:', schoolsData);
        schoolsData = [];
      }
      
      // Transform backend data to frontend format with consistent ID types
      const transformedSchools = schoolsData.map(school => ({
        id: Number(school.id), // Force to number for consistency
        code: school.code || `SCH-${school.id}`,
        name: school.name,
        location: school.city || school.location || 'Cameroon',
        region: school.region,
        email: school.email,
        phone: school.phone,
        address: school.address,
        city: school.city,
        principal_name: school.principal_name,
        website: school.website,
        curriculum: school.curriculum,
        status: school.status,
        color: getSchoolColor(school.id),
        logo: getInitials(school.name)
      }));
      
      console.log('Transformed schools:', transformedSchools);
      setSchools(transformedSchools);
    } catch (error) {
      console.error('Failed to load schools:', error);
      // Fallback demo data with consistent number IDs
      const fallbackSchools = [
        { id: 1, name: 'Lycée Général Leclerc', code: 'LECLERC-001', location: 'Yaoundé', region: 'Centre', email: 'contact@leclerc.edu.cm', phone: '+237 222 123 456', color: 'blue', status: 'active' },
        { id: 2, name: 'Collège Vogt', code: 'VOGT-001', location: 'Douala', region: 'Littoral', email: 'info@vogt.edu.cm', phone: '+237 233 456 789', color: 'green', status: 'active' },
        { id: 3, name: 'Lycée de Biyem-Assi', code: 'BIYEM-001', location: 'Yaoundé', region: 'Centre', email: 'contact@biyemassi.edu.cm', phone: '+237 222 987 654', color: 'orange', status: 'active' },
      ];
      setSchools(fallbackSchools);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'SC';
    const words = name.split(' ');
    if (words.length === 1) return name.substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getSchoolColor = (id) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'red', 'indigo', 'pink'];
    const index = typeof id === 'number' ? id : parseInt(id) || 0;
    return colors[index % colors.length];
  };

  const validateToken = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, schoolId = null) => {
    try {
      const normalizedSchoolId = schoolId ? Number(schoolId) : null;
      const apiSchoolId = Number.isFinite(normalizedSchoolId) ? normalizedSchoolId : null;
      
      console.log('Login attempt with:', { email, schoolId: apiSchoolId });
      
      const response = await authAPI.login(email, password, apiSchoolId);
      
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        
        return { success: true, user: response.data.user };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error details:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || 
                           error.response.data?.message || 
                           'Authentication failed';
        return { success: false, error: errorMessage };
      } else if (error.request) {
        return { success: false, error: 'Cannot connect to server. Please check your connection.' };
      } else {
        return { success: false, error: error.message || 'An unexpected error occurred' };
      }
    }
  };

  const registerSchool = async (formData) => {
    try {
      const apiData = {
        schoolName: formData.schoolName,
        schoolType: formData.schoolType,
        address: formData.address || '',
        city: formData.city,
        region: formData.region,
        phone: formData.phone,
        email: formData.email,
        website: formData.website || '',
        principalName: formData.principalName,
        curriculum: formData.curriculum,
        password: formData.password,
      };
      
      const response = await authAPI.registerSchool(apiData);
      
      if (response.data.message) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error details:', error);
      
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        return { success: false, error: errors[0] };
      }
      
      if (error.response?.data?.error) {
        return { success: false, error: error.response.data.error };
      }
      
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const activateAccount = async (userId, email, phone, password) => {
    try {
      const response = await authAPI.activateAccount(userId, email, password);
      
      if (response.data.success) {
        return { success: true };
      }
      
      return { success: false, error: 'Activation failed' };
    } catch (error) {
      console.error('Activation error:', error);
      
      if (error.response?.data?.error) {
        return { success: false, error: error.response.data.error };
      }
      
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        return { success: false, error: errors[0] };
      }
      
      return { success: false, error: 'Activation failed. Please check your details.' };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const selectSchool = (schoolId) => {
    const school = schools.find(s => Number(s.id) === Number(schoolId));
    setCurrentSchool(school);
    setSelectedSchool(school || null);
    if (school) {
      localStorage.setItem('selected_school', JSON.stringify(school));
    }
    return school;
  };

  const clearSelectedSchool = () => {
    setCurrentSchool(null);
    setSelectedSchool(null);
    localStorage.removeItem('selected_school');
  };

  const value = {
    user,
    setUser,
    loading,
    schools,
    currentSchool,
    selectedSchool,
    login,
    registerSchool,
    activateAccount,
    logout,
    selectSchool,
    clearSelectedSchool,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    isParent: user?.role === 'parent',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
