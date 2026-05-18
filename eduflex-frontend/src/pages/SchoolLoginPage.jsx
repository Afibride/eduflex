import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  GraduationCap,
  LogIn,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserPlus,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const colors = {
  primary: '#2563eb',
  secondary: '#16a34a',
  accent: '#9333ea',
};

const SchoolLoginPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { schools } = useAuth();

  const school = React.useMemo(() => {
    const paramId = String(schoolId || '').toLowerCase();
    return schools.find(s =>
      String(s.id).toLowerCase() === paramId ||
      String(s.code || '').toLowerCase() === paramId
    ) || null;
  }, [schools, schoolId]);

  const schoolRouteId = school?.code || schoolId;

  if (schools.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading school information...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">School Not Found</CardTitle>
            <CardDescription className="text-center">
              The school you selected does not exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{school.name} Portal - EduFlex</title>
        <meta name="description" content={`Access the ${school.name} EduFlex portal.`} />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden border-b bg-white">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600" />
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <Button variant="ghost" asChild className="mb-8 text-gray-600">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to schools
              </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 text-2xl font-bold text-white shadow-lg">
                    {school.logo || school.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-600">School Portal</p>
                    <h1 className="text-3xl font-bold text-gray-950 md:text-5xl">{school.name}</h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {school.location || school.city || 'Cameroon'}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {school.email}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
                    <Phone className="h-4 w-4 text-purple-600" />
                    {school.phone}
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-lg text-gray-600">
                  Choose how you want to continue. Students, teachers, and parents can login or activate their school-issued account here.
                </p>
              </div>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Continue to {school.name}</CardTitle>
                  <CardDescription>Select an action for this school portal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="h-12 w-full justify-start text-white"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                    onClick={() => navigate(`/school/${schoolRouteId}/login-form?action=login`)}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Login as Student or Staff
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                    onClick={() => navigate(`/school/${schoolRouteId}/login-form?action=activate`)}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Activate Account
                  </Button>
                  <Button variant="ghost" asChild className="h-12 w-full justify-start">
                    <Link to="/login">
                      <Shield className="mr-2 h-5 w-5" />
                      School Admin Login
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: 'Students', text: 'View assignments, results, attendance, and materials.', color: colors.primary },
            { icon: BookOpen, title: 'Teachers', text: 'Manage classes, marks, attendance, and announcements.', color: colors.secondary },
            { icon: Users, title: 'Parents', text: 'Follow performance, fees, reports, and school updates.', color: colors.accent },
          ].map(({ icon: Icon, title, text, color }) => (
            <Card key={title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18` }}>
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <h2 className="font-semibold text-gray-950">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{text}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="flex items-center gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
            <CheckCircle className="h-5 w-5 shrink-0" />
            Secure access is enabled for this school workspace.
          </div>
        </section>
      </div>
    </>
  );
};

export default SchoolLoginPage;
