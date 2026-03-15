// Header.jsx - Updated version
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, LogOut, User, Building2, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext.jsx';
import SchoolSelectionModal from '@/components/SchoolSelectionModal.jsx';

// Color palette based on the logo
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
  },
  accent: {
    main: '#9333ea',
  }
};

const Header = ({ onMenuClick }) => {
  const [theme, setTheme] = useState('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout, selectedSchool, clearSelectedSchool } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('eduflex_theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('eduflex_theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    // clear selected school and always go to home after logout
    clearSelectedSchool();
    navigate('/');
  };

  const handleSwitchSchool = () => {
    clearSelectedSchool();
    navigate('/');
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      teacher: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      student: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      parent: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm dark:bg-gray-900/95 dark:border-gray-800">
        <div className="flex h-20 items-center px-4 md:px-6 max-w-7xl mx-auto">
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}

          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/public/eduflex.png" 
              alt="EduFlex Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {selectedSchool && (
            <div className="ml-6 pl-6 border-l border-gray-200 dark:border-gray-700 hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Building2 className="h-4 w-4 mr-2" style={{ color: colors.secondary.main }} />
              <span className="font-medium text-gray-900 dark:text-gray-100">{selectedSchool.name}</span>
            </div>
          )}

          <div className="flex-1" />

          <div className="flex items-center space-x-2 md:space-x-4">
            {!user && (
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" asChild className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
                  <Link to="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
                  <Link to="/register">Register School</Link>
                </Button>
                <Button 
                  variant="default" 
                  className="ml-2 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Login/Activate
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-full md:rounded-lg">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none">{user.name}</p>
                      <p className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${getRoleBadgeColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <DropdownMenuLabel className="p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-semibold text-base text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                    <User className="mr-2 h-4 w-4" style={{ color: colors.primary.main }} />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSwitchSchool} className="cursor-pointer p-2 text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                    <ArrowLeftRight className="mr-2 h-4 w-4" style={{ color: colors.secondary.main }} />
                    <span>Switch School</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile Menu Trigger for non-authenticated users */}
            {!user && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                onClick={() => setIsModalOpen(true)}
              >
                <User className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <SchoolSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Header;