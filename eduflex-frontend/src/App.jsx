// App.jsx - Updated with all routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SchoolLoginPage from '@/pages/SchoolLoginPage.jsx';
import SchoolLoginFormPage from '@/pages/SchoolLoginFormPage.jsx';
import AccountActivationPage from '@/pages/AccountActivationPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import TeacherDashboard from '@/pages/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/StudentDashboard.jsx';
import ParentDashboard from '@/pages/ParentDashboard.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import About from '@/pages/About.jsx';
import Documentation from '@/pages/Documentation.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import TermsOfService from '@/pages/TermsOfService.jsx';
import ContactSupport from '@/pages/ContactSupport.jsx';

// Layout wrapper for public pages to include Header and Footer
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout wrapper for dashboard pages (handles their own layout)
const DashboardLayout = ({ children }) => {
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Header and Footer */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/documentation" element={<PublicLayout><Documentation /></PublicLayout>} />
          <Route path="/documentation/*" element={<PublicLayout><Documentation /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
          <Route path="/contact-support" element={<PublicLayout><ContactSupport /></PublicLayout>} />
          
          {/* School-specific public routes */}
          <Route path="/school/:schoolId/login" element={<PublicLayout><SchoolLoginPage /></PublicLayout>} />
          <Route path="/school/:schoolId/login-form" element={<PublicLayout><SchoolLoginFormPage /></PublicLayout>} />
          <Route path="/school/:schoolId/activate" element={<PublicLayout><AccountActivationPage /></PublicLayout>} />
          <Route path="/account-activation" element={<PublicLayout><AccountActivationPage /></PublicLayout>} />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher', 'student', 'parent']}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </Router>
    </AuthProvider>
  );
}

export default App;