import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  BookOpen,
  Users,
  Check,
  X,
  Eye,
  EyeOff,
  School,
  ChevronRight,
  Building2,
  Sparkles,
  Globe,
  Award,
  Clock,
  Shield,
  GraduationCap,
} from "lucide-react";

const colors = {
  primary: {
    main: "#2563eb",
    light: "#60a5fa",
    dark: "#1d4ed8",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  secondary: {
    main: "#16a34a",
    light: "#4ade80",
    dark: "#15803d",
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    600: "#16a34a",
  },
  accent: {
    main: "#9333ea",
    light: "#c084fc",
    dark: "#7e22ce",
    50: "#faf5ff",
    100: "#f3e8ff",
  },
  neutral: {
    white: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// Step Indicator Component
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "School Info" },
    { number: 2, label: "Contact Details" },
    { number: 3, label: "Curriculum & Security" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.number ? <Check size={18} /> : step.number}
              </div>
              <span className="text-sm mt-2 text-gray-600">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                  currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Step 1: School Information
const Step1SchoolInfo = ({ schoolForm, handleSchoolFormChange, schoolTypes, regions }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Building2 size={20} className="text-blue-600" />
        School Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">School Name *</label>
          <div className="relative">
            <input
              name="schoolName"
              value={schoolForm.schoolName}
              onChange={handleSchoolFormChange}
              placeholder="Enter school name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">School Type *</label>
          <select
            name="schoolType"
            value={schoolForm.schoolType}
            onChange={handleSchoolFormChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            required
          >
            <option value="">Select school type</option>
            {schoolTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Region *</label>
          <select
            name="region"
            value={schoolForm.region}
            onChange={handleSchoolFormChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            required
          >
            <option value="">Select region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">City *</label>
          <div className="relative">
            <input
              name="city"
              value={schoolForm.city}
              onChange={handleSchoolFormChange}
              placeholder="Enter city"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            name="address"
            value={schoolForm.address}
            onChange={handleSchoolFormChange}
            placeholder="Enter full address"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

// Step 2: Contact Details
const Step2ContactDetails = ({ schoolForm, handleSchoolFormChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Users size={20} className="text-blue-600" />
        Contact Details
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">School Email *</label>
          <div className="relative">
            <input
              name="email"
              type="email"
              value={schoolForm.email}
              onChange={handleSchoolFormChange}
              placeholder="school@example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number *</label>
          <div className="relative">
            <input
              name="phone"
              value={schoolForm.phone}
              onChange={handleSchoolFormChange}
              placeholder="+237 6XX XXX XXX"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Principal Name *</label>
          <div className="relative">
            <input
              name="principalName"
              value={schoolForm.principalName}
              onChange={handleSchoolFormChange}
              placeholder="Full name of principal"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Website (Optional)</label>
          <div className="relative">
            <input
              name="website"
              value={schoolForm.website}
              onChange={handleSchoolFormChange}
              placeholder="www.yourschool.edu"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
            />
            <Globe size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3: Curriculum & Security
const Step3CurriculumSecurity = ({
  schoolForm,
  handleCurriculumToggle,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  acceptTerms,
  setAcceptTerms,
  curriculums,
  handleSchoolFormChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Award size={20} className="text-blue-600" />
        Curriculum & Security
      </h3>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Curriculum Offered *</label>
        <div className="grid md:grid-cols-2 gap-3">
          {curriculums.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCurriculumToggle(c)}
              className={`flex items-center gap-3 px-4 py-3 border-2 rounded-xl transition-all bg-gray-50 ${
                schoolForm.curriculum.includes(c)
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 text-gray-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center ${
                  schoolForm.curriculum.includes(c)
                    ? "bg-blue-600 text-white"
                    : "border-2 border-gray-300 bg-white"
                }`}
              >
                {schoolForm.curriculum.includes(c) && <Check size={14} />}
              </div>
              <span className="text-sm">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={schoolForm.password}
              onChange={handleSchoolFormChange}
              placeholder="Create a strong password"
              className="w-full pl-10 pr-10 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
              minLength={8}
            />
            <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={schoolForm.confirmPassword}
              onChange={handleSchoolFormChange}
              placeholder="Re-enter your password"
              className="w-full pl-10 pr-10 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              required
            />
            <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{" "}
          <a href="/terms" className="text-blue-600 hover:underline font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>
        </label>
      </div>
    </div>
  );
};

// Main School Registration Form Component
const SchoolRegistrationForm = ({
  step,
  schoolForm,
  handleSchoolFormChange,
  handleCurriculumToggle,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  acceptTerms,
  setAcceptTerms,
  regions,
  schoolTypes,
  curriculums,
}) => {
  return (
    <div className="space-y-6">
      {step === 1 && (
        <Step1SchoolInfo
          schoolForm={schoolForm}
          handleSchoolFormChange={handleSchoolFormChange}
          schoolTypes={schoolTypes}
          regions={regions}
        />
      )}

      {step === 2 && (
        <Step2ContactDetails
          schoolForm={schoolForm}
          handleSchoolFormChange={handleSchoolFormChange}
        />
      )}

      {step === 3 && (
        <Step3CurriculumSecurity
          schoolForm={schoolForm}
          handleCurriculumToggle={handleCurriculumToggle}
          handleSchoolFormChange={handleSchoolFormChange}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
          curriculums={curriculums}
        />
      )}
    </div>
  );
};

/* ------------------------------ */
/* REGISTER PAGE */
/* ------------------------------ */

const RegisterPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [schoolForm, setSchoolForm] = useState({
    schoolName: "",
    schoolType: "",
    address: "",
    city: "",
    region: "",
    phone: "",
    email: "",
    website: "",
    principalName: "",
    curriculum: [],
    password: "",
    confirmPassword: "",
  });

  const regions = [
    "Centre",
    "Littoral",
    "Nord",
    "Sud",
    "Est",
    "Ouest",
    "Nord-Ouest",
    "Sud-Ouest",
    "Adamaoua",
    "Extrême-Nord",
  ];

  const schoolTypes = [
    "Government High School",
    "Bilingual High School",
    "Technical College",
    "Primary School",
    "Nursery School",
    "Comprehensive School",
  ];

  const curriculums = [
    "GCE Ordinary Level",
    "GCE Advanced Level",
    "French Baccalaureate",
    "Technical Education",
    "International Baccalaureate",
  ];

  const handleSchoolFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setSchoolForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCurriculumToggle = useCallback((curriculum) => {
    setSchoolForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.includes(curriculum)
        ? prev.curriculum.filter((c) => c !== curriculum)
        : [...prev.curriculum, curriculum],
    }));
  }, []);

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!schoolForm.schoolName || !schoolForm.schoolType || !schoolForm.region || !schoolForm.city) {
          alert("Please fill in all required fields");
          return false;
        }
        break;
      case 2:
        if (!schoolForm.email || !schoolForm.phone || !schoolForm.principalName) {
          alert("Please fill in all required fields");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolForm.email)) {
          alert("Please enter a valid email address");
          return false;
        }
        break;
      case 3:
        if (schoolForm.curriculum.length === 0) {
          alert("Please select at least one curriculum");
          return false;
        }
        if (!schoolForm.password || !schoolForm.confirmPassword) {
          alert("Please enter a password");
          return false;
        }
        if (schoolForm.password.length < 8) {
          alert("Password must be at least 8 characters long");
          return false;
        }
        if (schoolForm.password !== schoolForm.confirmPassword) {
          alert("Passwords do not match");
          return false;
        }
        if (!acceptTerms) {
          alert("Please accept the Terms and Privacy Policy");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("REGISTER DATA", {
        ...schoolForm,
        password: "[REDACTED]",
        confirmPassword: "[REDACTED]",
      });

      toast.success("Registration successful! Please check your email to activate your account.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register Your School - EduFlex Cameroon</title>
        <meta name="description" content="Register your school with EduFlex Cameroon and transform your educational management experience." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4"
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

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Branding and Info */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img 
                  src="/eduflex.png" 
                  alt="EduFlex Logo" 
                  className="h-16 w-auto"
                />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Register Your{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  School with EduFlex
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Join thousands of schools across Cameroon that trust EduFlex for their educational management needs.
              </p>

              {/* Feature List */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: GraduationCap, text: 'Complete school management solution', color: colors.primary.main },
                  { icon: Shield, text: 'Secure data protection & privacy', color: colors.secondary.main },
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

            {/* Right Side - Registration Card */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`
                      }}>
                      <span className="text-white font-bold text-2xl">E</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Register Your School
                  </h2>
                  <p className="text-center text-gray-500 mb-8">
                    Fill in the details below to get started
                  </p>

                  <StepIndicator currentStep={step} />

                  <form onSubmit={handleSubmit} className="mt-8">
                    <SchoolRegistrationForm
                      step={step}
                      schoolForm={schoolForm}
                      handleSchoolFormChange={handleSchoolFormChange}
                      handleCurriculumToggle={handleCurriculumToggle}
                      showPassword={showPassword}
                      showConfirmPassword={showConfirmPassword}
                      setShowPassword={setShowPassword}
                      setShowConfirmPassword={setShowConfirmPassword}
                      acceptTerms={acceptTerms}
                      setAcceptTerms={setAcceptTerms}
                      regions={regions}
                      schoolTypes={schoolTypes}
                      curriculums={curriculums}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={step === 1 || isLoading}
                        className={`px-6 py-3 border-2 border-gray-200 rounded-xl flex items-center gap-2 transition-all bg-white ${
                          step === 1 || isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-blue-600 hover:text-blue-600"
                        }`}
                      >
                        <ArrowLeft size={18} />
                        Previous
                      </button>

                      <div className="text-sm text-gray-500">
                        Step {step} of 3
                      </div>

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={isLoading}
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
                        >
                          Next
                          <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isLoading || !acceptTerms}
                          className={`px-8 py-3 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl relative overflow-hidden group ${
                            isLoading ? "opacity-75 cursor-wait" : ""
                          }`}
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Sparkles size={18} />
                              Complete Registration
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Login Link */}
                  <p className="text-center mt-8 text-gray-600">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

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
        
        @keyframes slide-in-from-bottom {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation: slide-in-from-bottom 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default RegisterPage;