
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  UserCircle,
  CheckCircle,
  Settings,
  User,
  Upload,
  FileText,
  Award,
  Calendar,
  DollarSign,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { cn } from '@/lib/utils';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', path: '/admin-dashboard' },
          { icon: Users, label: 'Teachers', path: '/admin/teachers' },
          { icon: GraduationCap, label: 'Students', path: '/admin/students' },
          { icon: UserCircle, label: 'Parents', path: '/admin/parents' },
          { icon: CheckCircle, label: 'Marks Verification', path: '/admin/marks' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
          { icon: User, label: 'Profile', path: '/profile' }
        ];
      case 'teacher':
        return [
          { icon: Home, label: 'Dashboard', path: '/teacher-dashboard' },
          { icon: Upload, label: 'Upload Marks', path: '/teacher/marks' },
          { icon: FileText, label: 'Assignments', path: '/teacher/assignments' },
          { icon: Users, label: 'Classes', path: '/teacher/classes' },
          { icon: User, label: 'Profile', path: '/profile' }
        ];
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/student-dashboard' },
          { icon: Award, label: 'Results', path: '/student/results' },
          { icon: FileText, label: 'Assignments', path: '/student/assignments' },
          { icon: Calendar, label: 'Attendance', path: '/student/attendance' },
          { icon: User, label: 'Profile', path: '/profile' }
        ];
      case 'parent':
        return [
          { icon: Home, label: 'Dashboard', path: '/parent-dashboard' },
          { icon: Award, label: "Child's Results", path: '/parent/results' },
          { icon: DollarSign, label: 'Fees', path: '/parent/fees' },
          { icon: Download, label: 'Reports', path: '/parent/reports' },
          { icon: User, label: 'Profile', path: '/profile' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-4">
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} onClick={onClose}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-teal-100 text-teal-900 dark:bg-teal-900 dark:text-teal-100'
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <Separator className="my-4" />

          <div className="text-xs text-muted-foreground text-center">
            <p>EduFlex v1.0</p>
            <p className="mt-1">© 2026 All rights reserved</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
