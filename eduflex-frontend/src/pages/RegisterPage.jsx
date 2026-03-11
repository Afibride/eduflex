// RegisterPage.jsx - Fixed input fields
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    GraduationCap, ArrowLeft, Mail, Lock, User, Phone, MapPin,
    BookOpen, Users, Briefcase, Shield, Check, X, Eye, EyeOff,
    School, Globe, Calendar, Award, ChevronRight, Building2,
    Sparkles, Target, Star, Clock
} from 'lucide-react';

// Color palette based on the logo
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  accent: {
    main: '#9333ea',
    50: '#faf5ff',
    100: '#f3e8ff',
  },
  neutral: {
    white: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Form states
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // School registration form
    const [schoolForm, setSchoolForm] = useState({
        schoolName: '',
        schoolType: '',
        address: '',
        city: '',
        region: '',
        phone: '',
        email: '',
        principalName: '',
        principalEmail: '',
        principalPhone: '',
        totalStudents: '',
        totalTeachers: '',
        curriculum: [],
        password: '',
        confirmPassword: ''
    });

    // Get form type from URL parameter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');
        // If individual type is specified, redirect to individual registration or handle accordingly
        if (type === 'individual') {
            // You can either show a message or redirect to a different page
            console.log('Individual registration selected');
        }
    }, [location]);

    // Regions of Cameroon
    const regions = [
        'Centre', 'Littoral', 'Nord', 'Sud', 'Est', 'Ouest', 
        'Nord-Ouest', 'Sud-Ouest', 'Adamaoua', 'Extrême-Nord'
    ];

    // School types
    const schoolTypes = [
        'Government High School',
        'Bilingual High School',
        'Technical College',
        'Commercial College',
        'Primary School',
        'Nursery School',
        'Private School',
        'Mission School',
        'Comprehensive School'
    ];

    // Curriculums
    const curriculums = [
        'GCE Ordinary Level',
        'GCE Advanced Level',
        'French Baccalaureate',
        'Bilingual (GCE + Baccalaureate)',
        'Technical Education',
        'Vocational Training',
        'Primary Education',
        'Nursery Education'
    ];

    const handleBack = () => {
        navigate('/');
    };

    // safer onChange: use functional updater, don't trim/format here (do onBlur or submit)
    const handleSchoolFormChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        // Use functional update to avoid stale closures and unnecessary re-renders
        setSchoolForm(prev => ({
            ...prev,
            [name]: newValue
        }));
    }, []);

    const handleCurriculumToggle = (curriculum) => {
        setSchoolForm(prev => {
            const current = prev.curriculum;
            if (current.includes(curriculum)) {
                return {
                    ...prev,
                    curriculum: current.filter(c => c !== curriculum)
                };
            } else {
                return {
                    ...prev,
                    curriculum: [...current, curriculum]
                };
            }
        });
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate passwords match
        if (schoolForm.password !== schoolForm.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate at least one curriculum selected
        if (schoolForm.curriculum.length === 0) {
            alert('Please select at least one curriculum');
            return;
        }

        // TODO: Implement registration API call
        console.log('School registration data:', schoolForm);
        
        // Simulate API call
        setTimeout(() => {
            alert('School registration submitted successfully! We will contact you within 24 hours.');
            navigate('/');
        }, 1000);
    };

    const SchoolRegistrationForm = () => (
        <div className="space-y-6">
            {/* Step 1: School Information */}
            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${colors.primary[100]}` }}>
                                <School size={20} color={colors.primary.main} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">School Information</h3>
                                <p className="text-sm text-gray-500">Tell us about your institution</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">School Name *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="schoolName"
                                        value={schoolForm.schoolName}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="e.g., Government Bilingual High School"
                                        required
                                    />
                                    <Building2 size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">School Type *</label>
                                <select
                                    name="schoolType"
                                    value={schoolForm.schoolType}
                                    onChange={handleSchoolFormChange}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                    style={{
                                        background: colors.neutral[50],
                                        borderColor: colors.neutral[300]
                                    }}
                                    required
                                >
                                    <option value="">Select school type</option>
                                    {schoolTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Region *</label>
                                <select
                                    name="region"
                                    value={schoolForm.region}
                                    onChange={handleSchoolFormChange}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                    style={{
                                        background: colors.neutral[50],
                                        borderColor: colors.neutral[300]
                                    }}
                                    required
                                >
                                    <option value="">Select region</option>
                                    {regions.map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">City/Town *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="city"
                                        value={schoolForm.city}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="Enter city"
                                        required
                                    />
                                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Address *</label>
                                <textarea
                                    name="address"
                                    value={schoolForm.address}
                                    onChange={handleSchoolFormChange}
                                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300 resize-none"
                                    style={{
                                        background: colors.neutral[50],
                                        borderColor: colors.neutral[300]
                                    }}
                                    placeholder="Enter complete address with landmark"
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${colors.secondary[100]}` }}>
                                <Users size={20} color={colors.secondary.main} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                                <p className="text-sm text-gray-500">How can we reach you and your school</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">School Email *</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={schoolForm.email}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="school@example.com"
                                        required
                                    />
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={schoolForm.phone}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="+237 XXX XXX XXX"
                                        required
                                    />
                                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Principal Name *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="principalName"
                                        value={schoolForm.principalName}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="Enter principal's full name"
                                        required
                                    />
                                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Principal Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="principalEmail"
                                        value={schoolForm.principalEmail}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="principal@example.com"
                                    />
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Principal Phone</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="principalPhone"
                                        value={schoolForm.principalPhone}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="+237 XXX XXX XXX"
                                    />
                                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">School Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Total Students *</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="totalStudents"
                                        value={schoolForm.totalStudents}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="e.g., 500"
                                        min="1"
                                        required
                                    />
                                    <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Total Teachers *</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="totalTeachers"
                                        value={schoolForm.totalTeachers}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="e.g., 25"
                                        min="1"
                                        required
                                    />
                                    <BookOpen size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Curriculum & Account Setup */}
            {step === 3 && (
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: colors.accent[100] }}>
                                <BookOpen size={20} color={colors.accent.main} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Curriculum & Account</h3>
                                <p className="text-sm text-gray-500">Select your curriculum and set up your account</p>
                            </div>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-3">Curriculum Offered *</h4>
                        <p className="text-sm text-gray-500 mb-4">Select all curriculums your school offers:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {curriculums.map(curriculum => (
                                <button
                                    key={curriculum}
                                    type="button"
                                    onClick={() => handleCurriculumToggle(curriculum)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:shadow-md ${
                                        schoolForm.curriculum.includes(curriculum)
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    style={{
                                        borderColor: schoolForm.curriculum.includes(curriculum) ? colors.primary.main : colors.neutral[200],
                                        backgroundColor: schoolForm.curriculum.includes(curriculum) ? colors.primary[50] : 'transparent'
                                    }}
                                >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                        schoolForm.curriculum.includes(curriculum)
                                            ? 'bg-primary-500'
                                            : 'bg-gray-100 border border-gray-300'
                                    }`}
                                    style={{
                                        backgroundColor: schoolForm.curriculum.includes(curriculum) ? colors.primary.main : colors.neutral[100]
                                    }}>
                                        {schoolForm.curriculum.includes(curriculum) ? (
                                            <Check size={14} className="text-white" />
                                        ) : (
                                            <X size={14} className="text-gray-400" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${
                                        schoolForm.curriculum.includes(curriculum)
                                            ? 'text-primary-700'
                                            : 'text-gray-700'
                                    }`}
                                    style={{
                                        color: schoolForm.curriculum.includes(curriculum) ? colors.primary[700] : colors.neutral[700]
                                    }}>
                                        {curriculum}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">Account Setup</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={schoolForm.password}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="Create strong password"
                                        required
                                        minLength={8}
                                    />
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} className="text-gray-400" />
                                        ) : (
                                            <Eye size={18} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">Minimum 8 characters with letters and numbers</p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={schoolForm.confirmPassword}
                                        onChange={handleSchoolFormChange}
                                        className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border focus:ring-2 focus:ring-offset-1 outline-none transition-all duration-300"
                                        style={{
                                            background: colors.neutral[50],
                                            borderColor: colors.neutral[300]
                                        }}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} className="text-gray-400" />
                                        ) : (
                                            <Eye size={18} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                style={{ accentColor: colors.primary.main }}
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="font-medium hover:underline" style={{ color: colors.primary.main }}>
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-medium hover:underline" style={{ color: colors.primary.main }}>
                                    Privacy Policy
                                </a>. I understand that my school's registration will be verified by the Ministry of Secondary Education.
                            </label>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="updates"
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                style={{ accentColor: colors.primary.main }}
                            />
                            <label htmlFor="updates" className="text-sm text-gray-700">
                                I want to receive updates, news, and educational resources from EduFlex Cameroon.
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group mb-6"
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: `1px solid ${colors.neutral[200]}`,
                        color: colors.primary.main
                    }}
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                {/* Header with Logo */}
                <div className="flex items-center justify-center mb-6">
                    <img 
                        src="/public/eduflex.png" 
                        alt="EduFlex Logo" 
                        className="h-16 w-auto"
                    />
                </div>

                {/* Registration Card */}
                <div className="backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden"
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderColor: colors.neutral[200],
                        backdropFilter: 'blur(20px)'
                    }}>
                    
                    {/* Header */}
                    <div className="p-8 border-b text-center"
                        style={{ borderColor: colors.neutral[200] }}>
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm mb-4"
                            style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: `1px solid ${colors.neutral[200]}`
                            }}>
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.secondary.main }} />
                            <span className="text-xs font-semibold" style={{ color: colors.secondary.main }}>
                                School Registration Portal
                            </span>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Register Your School
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join 2,500+ schools across Cameroon already using EduFlex to transform education
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-8 pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Step {step} of 3
                            </span>
                            <span className="text-sm font-medium" style={{ color: colors.primary.main }}>
                                {step === 1 ? '🏫 School Info' : step === 2 ? '📞 Contact Info' : '🔐 Final Step'}
                            </span>
                        </div>
                        <div className="h-2.5 rounded-full overflow-hidden bg-gray-100">
                            <div 
                                className="h-full rounded-full transition-all duration-500 relative"
                                style={{
                                    width: `${(step / 3) * 100}%`,
                                    background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`
                                }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="p-8">
                        <SchoolRegistrationForm />
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-8 border-t mt-8"
                            style={{ borderColor: colors.neutral[200] }}>
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                disabled={step === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                    step === 1
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:shadow-md hover:scale-105 active:scale-95'
                                }`}
                                style={{
                                    background: colors.neutral[100],
                                    border: `1px solid ${colors.neutral[200]}`,
                                    color: colors.neutral[700]
                                }}
                            >
                                <ArrowLeft size={18} />
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-4">
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                            color: colors.neutral.white,
                                            border: 'none'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        <span className="relative flex items-center gap-2">
                                            Next
                                            <ChevronRight size={18} />
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!acceptTerms}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group ${
                                            !acceptTerms ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                        style={{
                                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%)`,
                                            color: colors.neutral.white,
                                            border: 'none'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        <span className="relative flex items-center gap-2">
                                            <Sparkles size={18} />
                                            Submit Registration
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Features Banner */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Globe, title: 'Bilingual Platform', desc: 'English & French' },
                        { icon: Clock, title: '30-Day Free Trial', desc: 'Full access' },
                        { icon: Award, title: '24/7 Support', desc: 'Dedicated team' }
                    ].map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={index} className="backdrop-blur-sm p-4 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: `1px solid ${colors.neutral[200]}`
                                }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                                    style={{
                                        background: colors.primary[50],
                                        border: `1px solid ${colors.primary[100]}`
                                    }}>
                                    <IconComponent size={20} style={{ color: colors.primary.main }} />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                                <p className="text-xs text-gray-500">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have a school account?{' '}
                        <button
                            type="button"
                            onClick={() => {
                                // You can open the school selection modal or navigate to login
                                navigate('/?login=school');
                            }}
                            className="font-semibold hover:underline"
                            style={{ color: colors.primary.main }}
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>

            {/* Add animation styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;