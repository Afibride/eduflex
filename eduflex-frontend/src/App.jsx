// App.jsx - Updated with all routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

// Public Pages
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SchoolLoginPage from '@/pages/SchoolLoginPage.jsx';
import SchoolLoginFormPage from '@/pages/SchoolLoginFormPage.jsx';
import AccountActivationPage from '@/pages/AccountActivationPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import About from '@/pages/About.jsx';
import Documentation from '@/pages/Documentation.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import TermsOfService from '@/pages/TermsOfService.jsx';
import ContactSupport from '@/pages/ContactSupport.jsx';

// Dashboard Pages
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import TeacherDashboard from '@/pages/TeacherDashboard.jsx';
import StudentDashboard from '@/pages/StudentDashboard.jsx';
import ParentDashboard from '@/pages/ParentDashboard.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';

// Admin Pages
import TeachersPage from '@/pages/admin/TeachersPage.jsx';
import StudentsPage from '@/pages/admin/StudentsPage.jsx';
import ParentsPage from '@/pages/admin/ParentsPage.jsx';
import MarksVerificationPage from '@/pages/admin/MarksVerificationPage.jsx';
import SchoolsPage from '@/pages/admin/SchoolsPage.jsx';
import AdminReportsPage from '@/pages/admin/ReportsPage.jsx';
import AdminAnnouncementsPage from '@/pages/admin/AnnouncementsPage.jsx';
import AdminSettingsPage from '@/pages/admin/SettingsPage.jsx';

// Teacher Pages
import TeacherMarksPage from '@/pages/teacher/MarksPage.jsx';
import TeacherAssignmentsPage from '@/pages/teacher/AssignmentsPage.jsx';
import TeacherSubjectsPage from '@/pages/teacher/SubjectsPage.jsx';
import TeacherClassesPage from '@/pages/teacher/ClassesPage.jsx';
import TeacherAttendancePage from '@/pages/teacher/AttendancePage.jsx';
import TeacherSchedulePage from '@/pages/teacher/SchedulePage.jsx';
import TeacherAnnouncementsPage from '@/pages/teacher/AnnouncementsPage.jsx';

// Student Pages
import StudentResultsPage from '@/pages/student/ResultsPage.jsx';
import StudentAssignmentsPage from '@/pages/student/AssignmentsPage.jsx';
import StudentAttendancePage from '@/pages/student/AttendancePage.jsx';
import StudentClassesPage from '@/pages/student/ClassesPage.jsx';
import StudentTimetablePage from '@/pages/student/TimetablePage.jsx';
import StudentMaterialsPage from '@/pages/student/MaterialsPage.jsx';
import StudentAnnouncementsPage from '@/pages/student/AnnouncementsPage.jsx';

// Parent Pages
import ParentResultsPage from '@/pages/parent/ResultsPage.jsx';
import ParentFeesPage from '@/pages/parent/FeesPage.jsx';
import ParentReportsPage from '@/pages/parent/ReportsPage.jsx';
import ParentAttendancePage from '@/pages/parent/AttendancePage.jsx';
import ParentAssignmentsPage from '@/pages/parent/AssignmentsPage.jsx';
import ParentAnnouncementsPage from '@/pages/parent/AnnouncementsPage.jsx';
import ParentPerformancePage from '@/pages/parent/PerformancePage.jsx';

// Layout wrapper for public pages
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/documentation/*" element={<PublicLayout><Documentation /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
          <Route path="/contact-support" element={<PublicLayout><ContactSupport /></PublicLayout>} />
          
          {/* School-specific public routes */}
          <Route path="/school/:schoolId/login" element={<PublicLayout><SchoolLoginPage /></PublicLayout>} />
          <Route path="/school/:schoolId/login-form" element={<PublicLayout><SchoolLoginFormPage /></PublicLayout>} />
          <Route path="/school/:schoolId/activate" element={<PublicLayout><AccountActivationPage /></PublicLayout>} />
          <Route path="/account-activation" element={<PublicLayout><AccountActivationPage /></PublicLayout>} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={['admin']}><TeachersPage /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><StudentsPage /></ProtectedRoute>} />
          <Route path="/admin/parents" element={<ProtectedRoute allowedRoles={['admin']}><ParentsPage /></ProtectedRoute>} />
          <Route path="/admin/marks" element={<ProtectedRoute allowedRoles={['admin']}><MarksVerificationPage /></ProtectedRoute>} />
          <Route path="/admin/schools" element={<ProtectedRoute allowedRoles={['admin']}><SchoolsPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReportsPage /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnnouncementsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettingsPage /></ProtectedRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/marks" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherMarksPage /></ProtectedRoute>} />
          <Route path="/teacher/assignments" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAssignmentsPage /></ProtectedRoute>} />
          <Route path="/teacher/subjects" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherSubjectsPage /></ProtectedRoute>} />
          <Route path="/teacher/classes" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherClassesPage /></ProtectedRoute>} />
          <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendancePage /></ProtectedRoute>} />
          <Route path="/teacher/schedule" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherSchedulePage /></ProtectedRoute>} />
          <Route path="/teacher/announcements" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnnouncementsPage /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute allowedRoles={['student']}><StudentResultsPage /></ProtectedRoute>} />
          <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={['student']}><StudentAssignmentsPage /></ProtectedRoute>} />
          <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendancePage /></ProtectedRoute>} />
          <Route path="/student/classes" element={<ProtectedRoute allowedRoles={['student']}><StudentClassesPage /></ProtectedRoute>} />
          <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={['student']}><StudentTimetablePage /></ProtectedRoute>} />
          <Route path="/student/materials" element={<ProtectedRoute allowedRoles={['student']}><StudentMaterialsPage /></ProtectedRoute>} />
          <Route path="/student/announcements" element={<ProtectedRoute allowedRoles={['student']}><StudentAnnouncementsPage /></ProtectedRoute>} />
          
          {/* Parent Routes */}
          <Route path="/parent-dashboard" element={<ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>} />
          <Route path="/parent/results" element={<ProtectedRoute allowedRoles={['parent']}><ParentResultsPage /></ProtectedRoute>} />
          <Route path="/parent/fees" element={<ProtectedRoute allowedRoles={['parent']}><ParentFeesPage /></ProtectedRoute>} />
          <Route path="/parent/reports" element={<ProtectedRoute allowedRoles={['parent']}><ParentReportsPage /></ProtectedRoute>} />
          <Route path="/parent/attendance" element={<ProtectedRoute allowedRoles={['parent']}><ParentAttendancePage /></ProtectedRoute>} />
          <Route path="/parent/assignments" element={<ProtectedRoute allowedRoles={['parent']}><ParentAssignmentsPage /></ProtectedRoute>} />
          <Route path="/parent/announcements" element={<ProtectedRoute allowedRoles={['parent']}><ParentAnnouncementsPage /></ProtectedRoute>} />
          <Route path="/parent/performance" element={<ProtectedRoute allowedRoles={['parent']}><ParentPerformancePage /></ProtectedRoute>} />
          
          {/* Common Routes */}
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student', 'parent']}><ProfilePage /></ProtectedRoute>} />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </Router>
    </AuthProvider>
  );
}

export default App;