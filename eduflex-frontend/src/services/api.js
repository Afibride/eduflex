// services/api.js
import axios from 'axios';

const getDefaultApiUrl = () => {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:8000/api`;
};

const API_URL = import.meta.env.VITE_API_URL || getDefaultApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  //withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('[API Error]', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  registerSchool: (data) => api.post('/register', data),
  login: (email, password, schoolId = null) => {
    const payload = { email, password };
    if (schoolId) {
      payload.school_id = schoolId;
    }
    return api.post('/login', payload);
  },
  activateAccount: (userId, email, password) => api.post('/activate', { user_id: userId, email, password }),
  logout: () => api.post('/logout'),
  getMe: () => api.get('/me'),
};

// Schools API - Updated to handle response formats
export const schoolAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/schools');
      // Handle different response formats
      let schoolsData = [];
      if (response.data && Array.isArray(response.data)) {
        schoolsData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        schoolsData = response.data.data;
      } else if (response.data && response.data.schools && Array.isArray(response.data.schools)) {
        schoolsData = response.data.schools;
      } else {
        schoolsData = [];
      }
      return { ...response, data: schoolsData };
    } catch (error) {
      console.error('Failed to fetch schools:', error);
      throw error;
    }
  },
  getById: (id) => api.get(`/schools/${id}`),
  getDashboardStats: () => api.get('/school/dashboard'),
};

// Students API
export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  create: (data) => api.post('/students', data),
  getById: (id) => api.get(`/students/${id}`),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getGrades: (id) => api.get(`/students/${id}/grades`),
  getAttendance: (id, params) => api.get(`/students/${id}/attendance`, { params }),
};

// Teachers API
export const teacherAPI = {
  getAll: (params) => api.get('/teachers', { params }),
  create: (data) => api.post('/teachers', data),
  getById: (id) => api.get(`/teachers/${id}`),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

// Parents API
export const parentAPI = {
  getAll: (params) => api.get('/parents', { params }),
  create: (data) => api.post('/parents', data),
  getById: (id) => api.get(`/parents/${id}`),
  update: (id, data) => api.put(`/parents/${id}`, data),
  delete: (id) => api.delete(`/parents/${id}`),
  getChildren: (id) => api.get(`/parents/${id}/children`),
  linkStudent: (id, studentId, relationship) => api.post(`/parents/${id}/link-student`, { student_id: studentId, relationship }),
  unlinkStudent: (id, studentId) => api.delete(`/parents/${id}/unlink-student/${studentId}`),
  getDashboard: () => api.get('/parent/dashboard'),
  getProfile: () => api.get('/parent/profile'),
};

// Classes API
export const classAPI = {
  getAll: (params) => api.get('/classes', { params }),
  create: (data) => api.post('/classes', data),
  getById: (id) => api.get(`/classes/${id}`),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
  getStudents: (id) => api.get(`/classes/${id}/students`),
};

// Subjects API
export const subjectAPI = {
  getAll: (params) => api.get('/subjects', { params }),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// Grades API
export const gradeAPI = {
  getAll: (params) => api.get('/grades', { params }),
  create: (data) => api.post('/grades', data),
  update: (id, data) => api.put(`/grades/${id}`, data),
  delete: (id) => api.delete(`/grades/${id}`),
  getClassGrades: (classId, term) => api.get(`/grades/class/${classId}/term/${term}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params) => api.get('/attendance', { params }),
  create: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  getClassAttendance: (classId, date) => api.get(`/attendance/class/${classId}/date/${date}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
