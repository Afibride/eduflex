// LoginPage.jsx - Fixed version
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext.jsx';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    const result = login(data.email, data.password);

    if (result.success) {
      toast.success('Login successful! Redirecting to your dashboard...', {
        duration: 3000,
        icon: <Sparkles className="text-green-500" />
      });
      
      const dashboardMap = {
        admin: '/admin-dashboard',
        teacher: '/teacher-dashboard',
        student: '/student-dashboard',
        parent: '/parent-dashboard'
      };
      
      setTimeout(() => {
        navigate(dashboardMap[result.user.role] || '/');
      }, 1500);
    } else {
      toast.error(result.error || 'Invalid email or password', {
        duration: 4000
      });
    }
  };

  const fillDemoCredentials = (role) => {
    setSelectedRole(role);
    const credentials = {
      admin: { email: 'admin@demo.edu', password: 'password123' },
      teacher: { email: 'teacher@demo.edu', password: 'password123' },
      student: { email: 'student@demo.edu', password: 'password123' },
      parent: { email: 'parent@demo.edu', password: 'password123' }
    };
    
    setValue('email', credentials[role].email);
    setValue('password', credentials[role].password);
  };

  const colors = {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    secondary: {
      main: '#16a34a',
      light: '#4ade80',
      dark: '#15803d',
      50: '#f0fdf4',
      100: '#dcfce7',
      600: '#16a34a',
    },
    accent: {
      main: '#9333ea',
      light: '#c084fc',
      dark: '#7e22ce',
      50: '#faf5ff',
      100: '#f3e8ff',
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - EduFlex Cameroon</title>
        <meta name="description" content="Login to your EduFlex account to access your dashboard and manage your educational activities." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)`
        }}>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full animate-float opacity-20"
            style={{
              background: `radial-gradient(circle, ${colors.primary[200]} 0%, transparent 70%)`,
              animationDelay: '0s'
            }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full animate-float opacity-20"
            style={{
              background: `radial-gradient(circle, ${colors.secondary[200]} 0%, transparent 70%)`,
              animationDelay: '2s'
            }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-float opacity-10"
            style={{
              background: `radial-gradient(circle, ${colors.accent[200]} 0%, transparent 70%)`,
              animationDelay: '4s'
            }} />
        </div>

        {/* Main Content */}
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Branding and Info */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img 
                  src="/public/eduflex.png" 
                  alt="EduFlex Logo" 
                  className="h-16 w-auto"
                />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Welcome Back to{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  EduFlex Cameroon
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Access your personalized dashboard to manage students, track progress, and collaborate with your educational community.
              </p>

              {/* Feature List */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: GraduationCap, text: 'Track student performance in real-time', color: colors.primary.main },
                  { icon: Shield, text: 'Secure, role-based access control', color: colors.secondary.main },
                  { icon: Sparkles, text: 'Bilingual support (English & French)', color: colors.accent.main }
                ].map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${feature.color}15` }}>
                        <IconComponent size={20} color={feature.color} />
                      </div>
                      <span className="text-sm text-gray-700">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-8 justify-center lg:justify-start">
                <div>
                  <div className="text-2xl font-bold text-gray-900">2,500+</div>
                  <div className="text-xs text-gray-500">Schools</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-xs text-gray-500">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex-1 w-full max-w-md">
              <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 pb-6 pt-8 px-8">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`
                      }}>
                      <span className="text-white font-bold text-2xl">E</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center text-gray-900">Welcome back</CardTitle>
                  <CardDescription className="text-center text-gray-500">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@school.cm"
                          className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          {...register('password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-white font-semibold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`
                      }}
                      disabled={isSubmitting}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>
                            Login
                            <ArrowRight size={18} />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>

                  {/* Demo Credentials Section */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Demo Access</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {['admin', 'teacher', 'student', 'parent'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => fillDemoCredentials(role)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                            selectedRole === role
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-800 font-medium mb-1">Quick Demo:</p>
                      <p className="text-xs text-blue-700">Click any role above to auto-fill credentials</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center text-sm">
                    <p className="text-gray-500">
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        Register your school
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Shield size={14} className="text-green-600" />
                  <span className="text-xs text-gray-600">Secured by EduFlex • AES-256 Encryption</span>
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

export default LoginPage;