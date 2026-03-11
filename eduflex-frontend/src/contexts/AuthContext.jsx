
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const DUMMY_SCHOOLS = [
  { id: 'LECLERC-001', name: 'Lycée Général Leclerc', location: 'Yaoundé', email: 'leclerc@edu.cm', phone: '+237-123-4567', logo: 'LGL', color: 'teal' },
  { id: 'VOGT-001', name: 'Collège Vogt', location: 'Douala', email: 'vogt@edu.cm', phone: '+237-234-5678', logo: 'CV', color: 'blue' },
  { id: 'BIYEM-001', name: 'Lycée de Biyem-Assi', location: 'Yaoundé', email: 'biyem@edu.cm', phone: '+237-345-6789', logo: 'LBA', color: 'orange' },
  { id: 'LIBERMANN-001', name: 'Collège Libermann', location: 'Douala', email: 'libermann@edu.cm', phone: '+237-456-7890', logo: 'CL', color: 'purple' },
  { id: 'JOSS-001', name: 'Lycée Joss', location: 'Douala', email: 'joss@edu.cm', phone: '+237-567-8901', logo: 'LJ', color: 'green' },
  { id: 'CCBD-001', name: 'Collège Catholique Bilingue de Douala', location: 'Douala', email: 'ccbd@edu.cm', phone: '+237-678-9012', logo: 'CCBD', color: 'teal' },
  { id: 'BUEA-001', name: 'Lycée Buea', location: 'Buea', email: 'buea@edu.cm', phone: '+237-789-0123', logo: 'LB', color: 'blue' },
  { id: 'MODERNE-001', name: 'Collège Moderne de Yaoundé', location: 'Yaoundé', email: 'moderne@edu.cm', phone: '+237-890-1234', logo: 'CMY', color: 'orange' },
  { id: 'TECHNIQUE-001', name: 'Lycée Technique de Douala', location: 'Douala', email: 'technique@edu.cm', phone: '+237-901-2345', logo: 'LTD', color: 'purple' },
  { id: 'LIMBE-001', name: "Collège d'Enseignement Général de Limbe", location: 'Limbe', email: 'limbe@edu.cm', phone: '+237-012-3456', logo: 'CEGL', color: 'green' }
];

const DUMMY_USERS = [
  { id: 'LECLERC-001-ADMIN-001', schoolId: 'LECLERC-001', role: 'admin', name: 'Admin User', email: 'admin@leclerc.edu.cm', password: 'password123', active: true },
  { id: 'LECLERC-001-TEACHER-001', schoolId: 'LECLERC-001', role: 'teacher', name: 'Teacher User', email: 'teacher@leclerc.edu.cm', password: 'password123', active: true },
  { id: 'LECLERC-001-STUDENT-001', schoolId: 'LECLERC-001', role: 'student', name: 'Student User', email: 'student@leclerc.edu.cm', password: 'password123', active: true },
  { id: 'LECLERC-001-PARENT-001', schoolId: 'LECLERC-001', role: 'parent', name: 'Parent User', email: 'parent@leclerc.edu.cm', password: 'password123', active: true },
  { id: 'LECLERC-001-STUDENT-002', schoolId: 'LECLERC-001', role: 'student', name: 'New Student', email: 'new@leclerc.edu.cm', phone: '+237-111-2222', password: '', active: false }, // For activation
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('eduflex_schools')) {
      localStorage.setItem('eduflex_schools', JSON.stringify(DUMMY_SCHOOLS));
    }
    if (!localStorage.getItem('eduflex_users')) {
      localStorage.setItem('eduflex_users', JSON.stringify(DUMMY_USERS));
    }

    const loadedSchools = JSON.parse(localStorage.getItem('eduflex_schools') || '[]');
    setSchools(loadedSchools);

    const savedSchoolId = localStorage.getItem('eduflex_selectedSchool');
    if (savedSchoolId) {
      const school = loadedSchools.find(s => s.id === savedSchoolId);
      if (school) setSelectedSchool(school);
    }

    const currentUser = localStorage.getItem('eduflex_currentUser');
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        setUser(userData);
        setIsAuthenticated(true);
        
        if (userData.schoolId) {
          const userSchool = loadedSchools.find(s => s.id === userData.schoolId);
          if (userSchool) {
            setSelectedSchool(userSchool);
            localStorage.setItem('eduflex_selectedSchool', userSchool.id);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('eduflex_currentUser');
      }
    }
    setLoading(false);
  }, []);

  const selectSchool = (schoolId) => {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      setSelectedSchool(school);
      localStorage.setItem('eduflex_selectedSchool', schoolId);
      return true;
    }
    return false;
  };

  const clearSelectedSchool = () => {
    setSelectedSchool(null);
    localStorage.removeItem('eduflex_selectedSchool');
  };

  const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('eduflex_users') || '[]');
    
    const roleUsers = users.filter(u => u.schoolId === userData.schoolId && u.role === userData.role);
    const nextNum = String(roleUsers.length + 1).padStart(3, '0');
    const newId = `${userData.schoolId}-${userData.role.toUpperCase()}-${nextNum}`;

    const newUser = {
      id: newId,
      schoolId: userData.schoolId,
      role: userData.role,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password || '',
      active: !!userData.password,
      profilePicture: null
    };

    users.push(newUser);
    localStorage.setItem('eduflex_users', JSON.stringify(users));

    return { success: true, user: newUser };
  };

  const activateAccount = (id, email, phone, newPassword) => {
    const users = JSON.parse(localStorage.getItem('eduflex_users') || '[]');
    const userIndex = users.findIndex(u => u.id === id && (u.email === email || u.phone === phone));

    if (userIndex !== -1) {
      if (users[userIndex].active) {
        return { success: false, error: 'Account is already active. Please login.' };
      }

      users[userIndex].password = newPassword;
      users[userIndex].active = true;
      localStorage.setItem('eduflex_users', JSON.stringify(users));
      return { success: true };
    }

    return { success: false, error: 'Invalid ID, Email, or Phone combination.' };
  };

  const login = (email, password, schoolId) => {
    const users = JSON.parse(localStorage.getItem('eduflex_users') || '[]');
    const user = users.find(u => 
      u.email === email && 
      u.password === password && 
      (schoolId ? u.schoolId === schoolId : true)
    );

    if (user) {
      if (!user.active) {
        return { success: false, error: 'Account not activated. Please activate your account first.' };
      }
      localStorage.setItem('eduflex_currentUser', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      
      selectSchool(user.schoolId);
      
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('eduflex_currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('eduflex_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('eduflex_users', JSON.stringify(users));
      localStorage.setItem('eduflex_currentUser', JSON.stringify(users[userIndex]));
      setUser(users[userIndex]);
      return { success: true };
    }

    return { success: false, error: 'User not found' };
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    schools,
    selectedSchool,
    selectSchool,
    clearSelectedSchool,
    registerUser,
    activateAccount,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
