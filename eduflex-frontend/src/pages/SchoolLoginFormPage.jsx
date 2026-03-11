// SchoolLoginFormPage.jsx - Updated to match LoginPage style
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { 
    Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap, 
    Shield, Sparkles, UserPlus, LogIn, School, Building2,
    MapPin, Phone, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext.jsx';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const activationSchema = z.object({
  userId: z.string().min(1, 'School ID is required'),
  emailOrPhone: z.string().min(1, 'Email or Phone is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

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

const SchoolLoginFormPage = () => {
  const { schoolId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { schools, login, activateAccount } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');

  const action = searchParams.get('action') || 'login';
  const isLogin = action === 'login';

  const school = schools.find(s => s.id === schoolId);

  useEffect(() => {
    if (!school) {
      navigate('/');
    }
  }, [school, navigate]);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setValue: setLoginValue,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {
    register: registerActivate,
    handleSubmit: handleActivateSubmit,
    setValue: setActivateValue,
    formState: { errors: activateErrors, isSubmitting: isActivateSubmitting }
  } = useForm({
    resolver: zodResolver(activationSchema)
  });

  const onLogin = async (data) => {
    const result = login(data.email, data.password, schoolId);

    if (result.success) {
      toast.success('Login successful! Redirecting...', {
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

  const onActivate = async (data) => {
    const isEmail = data.emailOrPhone.includes('@');
    const email = isEmail ? data.emailOrPhone : '';
    const phone = !isEmail ? data.emailOrPhone : '';

    const result = activateAccount(data.userId, email, phone, data.newPassword);

    if (result.success) {
      toast.success('Account activated successfully! You can now login.', {
        duration: 4000,
        icon: <CheckCircle className="text-green-500" />
      });
      setSearchParams({ action: 'login' });
    } else {
      toast.error(result.error || 'Activation failed. Please check your details.', {
        duration: 4000
      });
    }
  };

  const fillDemoCredentials = (role) => {
    setSelectedRole(role);
    const credentials = {
      admin: { email: 'admin@leclerc.edu.cm', password: 'password123' },
      teacher: { email: 'teacher@leclerc.edu.cm', password: 'password123' },
      student: { email: 'student@leclerc.edu.cm', password: 'password123' },
      parent: { email: 'parent@leclerc.edu.cm', password: 'password123' }
    };
    
    setLoginValue('email', credentials[role].email);
    setLoginValue('password', credentials[role].password);
  };

  const fillActivationDemo = () => {
    setActivateValue('userId', `${schoolId}-STUDENT-002`);
    setActivateValue('emailOrPhone', 'new@leclerc.edu.cm');
    setActivateValue('newPassword', 'password123');
    setActivateValue('confirmPassword', 'password123');
  };

  if (!school) return null;

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Activate Account'} - {school.name}</title>
        <meta name="description" content={`${isLogin ? 'Login to' : 'Activate'} your ${school.name} account on EduFlex.`} />
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
            {/* Left Side - School Branding and Info */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                    {school.logo || school.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{school.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-green-600" />
                      <span>{school.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {isLogin ? 'Welcome Back to' : 'Join'}{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  {school.name}
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                {isLogin 
                  ? 'Access your personalized dashboard to manage your academic journey and stay connected with your school community.'
                  : 'Activate your account to start your journey with EduFlex and access all the features available to you.'}
              </p>

              {/* School Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">2,500+</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-xs text-gray-500">Teachers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-500">Pass Rate</div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="mt-8 space-y-3 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                    <School size={20} color={colors.primary.main} />
                  </div>
                  <span className="text-sm text-gray-700">Est. {school.established || '1980'}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50">
                    <Phone size={20} color={colors.secondary.main} />
                  </div>
                  <span className="text-sm text-gray-700">{school.phone}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-50">
                    <Mail size={20} color={colors.accent.main} />
                  </div>
                  <span className="text-sm text-gray-700">{school.email}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login/Activation Card */}
            <div className="flex-1 w-full max-w-md">
              <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="space-y-1 pb-6 pt-8 px-8">
                  <div className="flex items-center justify-center mb-2">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg ${
                      isLogin ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gradient-to-br from-purple-600 to-purple-700'
                    }`}>
                      {isLogin ? (
                        <LogIn className="h-6 w-6 text-white" />
                      ) : (
                        <UserPlus className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Activate Account'}
                  </CardTitle>
                  <CardDescription className="text-center text-gray-500">
                    {isLogin ? 'Enter your credentials to login' : 'Enter your details to activate your account'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {isLogin ? (
                    <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@school.edu.cm"
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                            {...registerLogin('email')}
                          />
                        </div>
                        {loginErrors.email && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {loginErrors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                          </Label>
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                            {...registerLogin('password')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {loginErrors.password && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {loginErrors.password.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-white font-semibold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`
                        }}
                        disabled={isLoginSubmitting}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center justify-center gap-2">
                          {isLoginSubmitting ? (
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

                      <div className="mt-6 text-center text-sm">
                        <p className="text-gray-500">
                          First time here?{' '}
                          <button 
                            type="button"
                            onClick={() => setSearchParams({ action: 'activate' })} 
                            className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                          >
                            Activate your account
                          </button>
                        </p>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleActivateSubmit(onActivate)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
                          School ID
                        </Label>
                        <Input
                          id="userId"
                          placeholder={`e.g. ${schoolId}-STUDENT-001`}
                          className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-gray-900"
                          {...registerActivate('userId')}
                        />
                        {activateErrors.userId && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {activateErrors.userId.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          Format: {schoolId}-ROLE-NUMBER (e.g., {schoolId}-STUDENT-002)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailOrPhone" className="text-sm font-medium text-gray-700">
                          Registered Email or Phone
                        </Label>
                        <Input
                          id="emailOrPhone"
                          placeholder="name@example.com or +237..."
                          className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-gray-900"
                          {...registerActivate('emailOrPhone')}
                        />
                        {activateErrors.emailOrPhone && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {activateErrors.emailOrPhone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                          New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
                            className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-gray-900"
                            {...registerActivate('newPassword')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {activateErrors.newPassword && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {activateErrors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                            className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-gray-900"
                            {...registerActivate('confirmPassword')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {activateErrors.confirmPassword && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {activateErrors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-white font-semibold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${colors.accent.main}, ${colors.primary.main})`
                        }}
                        disabled={isActivateSubmitting}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center justify-center gap-2">
                          {isActivateSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Activating...
                            </>
                          ) : (
                            <>
                              Activate Account
                              <ArrowRight size={18} />
                            </>
                          )}
                        </span>
                      </Button>

                      <div className="mt-6 text-center text-sm">
                        <p className="text-gray-500">
                          Already activated?{' '}
                          <button 
                            type="button"
                            onClick={() => setSearchParams({ action: 'login' })} 
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                          >
                            Login here
                          </button>
                        </p>
                      </div>
                    </form>
                  )}

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

                    {isLogin ? (
                      <>
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
                      </>
                    ) : (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={fillActivationDemo}
                          className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200"
                        >
                          Fill Demo Activation Data
                        </button>
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-xs text-purple-800 font-medium mb-1">Test Account:</p>
                          <p className="text-xs text-purple-700">ID: {schoolId}-STUDENT-002</p>
                          <p className="text-xs text-purple-700">Email: new@leclerc.edu.cm</p>
                        </div>
                      </div>
                    )}
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

export default SchoolLoginFormPage;