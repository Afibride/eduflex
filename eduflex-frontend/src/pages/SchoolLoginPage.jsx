import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle,
  GraduationCap,
  LogIn,
  Mail,
  MapPin,
  Megaphone,
  Newspaper,
  Phone,
  Shield,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { schoolAPI } from '@/services/api';

const colors = {
  primary: '#2563eb',
  secondary: '#16a34a',
  accent: '#9333ea',
};

const CAMEROON_SCHOOL_IMAGES = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Lerclerc%20Yaound%C3%A9.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Vogt%20Yaound%C3%A9.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Lyc%C3%A9e%20Bilingue%20de%20Dschang.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Primary%20school%20in%20Ngoulmakong%20East%20Region%20Cameroon.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/SalleClasse.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Des%20consignes%20donn%C3%A9es%20aux%20%C3%A9l%C3%A8ves%20%C3%A0%20Mb%C3%B4%20%28Bandjoun%29.jpg',
];

const getPaginatedItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.posts)) return payload.posts;
  return [];
};

const formatPostDate = (post) => {
  const rawDate = post?.published_at || post?.created_at;
  if (!rawDate) return 'Latest';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(rawDate));
};

const SchoolLoginPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { schools } = useAuth();
  const [schoolDetails, setSchoolDetails] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loadingDetails, setLoadingDetails] = React.useState(true);

  const school = React.useMemo(() => {
    const paramId = String(schoolId || '').toLowerCase();
    return schoolDetails || schools.find(s =>
      String(s.id).toLowerCase() === paramId ||
      String(s.code || '').toLowerCase() === paramId
    ) || null;
  }, [schools, schoolDetails, schoolId]);

  React.useEffect(() => {
    let active = true;

    const loadPublicSchoolPage = async () => {
      setLoadingDetails(true);
      try {
        const [schoolResponse, postsResponse] = await Promise.all([
          schoolAPI.getById(schoolId),
          schoolAPI.getPublicPosts(schoolId, { per_page: 8 }),
        ]);

        if (!active) return;

        setSchoolDetails(schoolResponse.data?.school || schoolResponse.data);
        setStats(schoolResponse.data?.stats || null);
        setPosts(getPaginatedItems(postsResponse.data));
      } catch (error) {
        if (!active) return;
        setSchoolDetails(null);
        setPosts([]);
      } finally {
        if (active) setLoadingDetails(false);
      }
    };

    if (schoolId) {
      loadPublicSchoolPage();
    }

    return () => {
      active = false;
    };
  }, [schoolId]);

  const schoolRouteId = school?.code || schoolId;
  const schoolName = school?.name || 'Your School';
  const schoolLocation = school?.location || school?.city || 'Cameroon';
  const curriculum = React.useMemo(() => {
    if (!school?.curriculum) return [];
    if (Array.isArray(school.curriculum)) return school.curriculum;
    try {
      const parsed = JSON.parse(school.curriculum);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [school]);

  const profileImage = school?.profile_image_url || school?.logo || CAMEROON_SCHOOL_IMAGES[0];
  const coverImage = school?.cover_image_url || school?.profile_image_url || CAMEROON_SCHOOL_IMAGES[2];
  const featuredSchoolPost = posts.find(post => post.is_featured) || posts[0];
  const fallbackFeaturedPost = {
    category: 'Featured update',
    title: `Welcome to ${schoolName}`,
    summary: 'School administrators will publish news, highlights, events, and important information here for the school community.',
    date: 'Latest',
    image: profileImage,
  };
  const featuredPost = featuredSchoolPost ? {
    category: featuredSchoolPost.category || 'School update',
    title: featuredSchoolPost.title,
    summary: featuredSchoolPost.excerpt || featuredSchoolPost.content,
    date: formatPostDate(featuredSchoolPost),
    image: featuredSchoolPost.image_url || profileImage,
  } : fallbackFeaturedPost;

  const fallbackPosts = [
    {
      icon: Megaphone,
      category: 'Announcement',
      title: 'Term notices and school circulars',
      text: 'Important admin messages will appear here when published.',
      color: colors.primary,
    },
    {
      icon: CalendarDays,
      category: 'Event',
      title: 'Upcoming academic events',
      text: 'Open days, PTA meetings, exams, and school programs can be shared here.',
      color: colors.secondary,
    },
    {
      icon: Trophy,
      category: 'Highlight',
      title: 'Achievements and school life',
      text: 'Celebrate awards, projects, clubs, and student success stories.',
      color: colors.accent,
    },
  ];
  const iconMap = {
    news: Megaphone,
    achievement: Trophy,
    event: CalendarDays,
    admissions: UserPlus,
    community: Users,
    general: Newspaper,
  };
  const colorMap = {
    news: colors.primary,
    achievement: colors.accent,
    event: colors.secondary,
    admissions: '#ea580c',
    community: '#0f766e',
    general: '#4f46e5',
  };
  const schoolPosts = posts
    .filter(post => post.id !== featuredSchoolPost?.id)
    .slice(0, 3)
    .map((post) => ({
      icon: iconMap[post.category] || Newspaper,
      category: post.category || 'Update',
      title: post.title,
      text: post.excerpt || post.content,
      color: colorMap[post.category] || colors.primary,
      image: post.image_url || profileImage,
    }));
  const visiblePosts = schoolPosts.length ? schoolPosts : fallbackPosts;
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/schools');
    }
  };

  if (loadingDetails && !school) {
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

      <div className="min-h-screen bg-[#f6f8fb]">
        <section className="relative overflow-hidden bg-white">
          <img
            src={coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          />
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68)_45%,rgba(255,255,255,0.80))]" />

          <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
            <Button variant="ghost" onClick={goBack} className="mb-8 text-gray-600 hover:bg-white/70">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:items-center">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 text-3xl font-bold text-white shadow-xl ring-4 ring-white">
                    {profileImage ? (
                      <img src={profileImage} alt={`${school.name} profile`} className="h-full w-full rounded-2xl object-cover" />
                    ) : school.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">EduFlex School Portal</p>
                    <h1 className="mt-1 text-3xl font-bold leading-tight text-gray-950 md:text-5xl">{school.name}</h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                    <MapPin className="h-4 w-4 text-green-600" />
                    {schoolLocation}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {school.email}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                    <Phone className="h-4 w-4 text-purple-600" />
                    {school.phone}
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                  Explore school updates, announcements, and community highlights before accessing your EduFlex account.
                </p>

                <div className="mt-8 rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-gray-200 backdrop-blur md:p-5">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">Choose your login method</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Button
                      className="h-14 justify-between rounded-xl px-4 text-sm font-semibold text-white shadow-lg sm:h-20 sm:flex-col sm:items-start sm:justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                      onClick={() => navigate(`/school/${schoolRouteId}/login-form?action=login`)}
                    >
                      <span className="inline-flex items-center">
                        <LogIn className="mr-2 h-5 w-5" />
                        Student/Staff
                      </span>
                      <ArrowRight className="h-5 w-5 sm:hidden" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 justify-between rounded-xl border-purple-200 bg-white px-4 text-sm font-semibold text-purple-700 hover:bg-purple-50 sm:h-20 sm:flex-col sm:items-start sm:justify-center"
                      onClick={() => navigate(`/school/${schoolRouteId}/login-form?action=activate`)}
                    >
                      <span className="inline-flex items-center">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Activate
                      </span>
                      <ArrowRight className="h-5 w-5 sm:hidden" />
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="h-14 justify-between rounded-xl border-blue-100 bg-white px-4 text-sm font-semibold text-gray-700 hover:bg-blue-50 sm:h-20 sm:flex-col sm:items-start sm:justify-center"
                    >
                      <Link to={`/login?email=${encodeURIComponent(school.email || '')}`}>
                        <span className="inline-flex items-center">
                          <Shield className="mr-2 h-5 w-5 text-blue-600" />
                          Admin Login
                        </span>
                        <ArrowRight className="h-5 w-5 sm:hidden" />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-blue-800">Accounts are managed by your school administrator.</p>
                </div>

                <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                  {[
                    ['Students', stats?.students ?? school.students_count ?? ''],
                    ['Teachers', stats?.teachers ?? school.teachers_count ?? ''],
                    ['Classes', stats?.classes ?? school.classes_count ?? ''],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-white/85 px-4 py-4 shadow-sm ring-1 ring-gray-200">
                      <p className="text-2xl font-bold text-gray-950">{value || 'N/A'}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="overflow-hidden border-0 bg-white/95 shadow-2xl ring-1 ring-gray-200">
                <img src={featuredPost.image} alt={`${schoolName} featured update`} className="h-48 w-full object-cover" />
                <CardHeader>
                  <CardDescription className="font-semibold uppercase tracking-wide text-green-700">{featuredPost.category}</CardDescription>
                  <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 text-sm leading-6 text-gray-600">{featuredPost.summary}</p>
                  <p className="mt-4 text-xs font-medium text-gray-500">{featuredPost.date}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="border-0 bg-white shadow-sm ring-1 ring-gray-200">
              <CardContent className="p-6">
                <img
                  src={profileImage}
                  alt={`${schoolName} campus profile`}
                  className="mb-5 h-44 w-full rounded-xl object-cover"
                />
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">School profile</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-950">About {schoolName}</h2>
                {school.about && <p className="mt-3 text-sm leading-6 text-gray-600">{school.about}</p>}
                <div className="mt-5 space-y-4 text-sm text-gray-700">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="font-semibold text-gray-950">Principal</p>
                    <p className="mt-1">{school.principal_name || 'School administrator'}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="font-semibold text-gray-950">Location</p>
                    <p className="mt-1">{school.address ? `${school.address}, ${schoolLocation}` : schoolLocation}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="font-semibold text-gray-950">Contact</p>
                    <p className="mt-1">{school.email}</p>
                    <p className="mt-1">{school.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm ring-1 ring-gray-200">
              <CardContent className="p-6">
                <img
                  src={CAMEROON_SCHOOL_IMAGES[5]}
                  alt={`${schoolName} pupils receiving school updates`}
                  className="mb-5 h-44 w-full rounded-xl object-cover"
                />
                <p className="text-sm font-semibold uppercase tracking-wide text-green-700">Admin-managed content</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-950">Programs, posts, and achievements</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="font-semibold text-blue-950">Academic programs</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(curriculum.length ? curriculum : ['GCE Ordinary Level', 'GCE Advanced Level']).map(item => (
                        <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                    <p className="font-semibold text-purple-950">Achievements</p>
                    <p className="mt-2 text-sm leading-6 text-purple-900">
                      Awards, club wins, examination milestones, and school highlights posted by admins will appear here.
                    </p>
                  </div>
                  <div className="rounded-xl border border-green-100 bg-green-50 p-4 md:col-span-2">
                    <p className="font-semibold text-green-950">Profile updates</p>
                    <p className="mt-2 text-sm leading-6 text-green-900">
                      School admins can keep this public profile current with the latest school story, admissions notes, public contacts, and media.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <div className="grid min-h-[360px] md:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[240px]">
                <img
                  src={featuredPost.image}
                  alt={`${schoolName} school update`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm">
                  {featuredPost.category}
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Newspaper className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{featuredPost.date}</p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-950 md:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-gray-600">{featuredPost.summary}</p>
                </div>
                <div className="mt-8 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                  Published school content will appear in this space.
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-4">
            <div className="rounded-2xl bg-gray-950 p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-300">From the administration</p>
              <h2 className="mt-2 text-2xl font-bold">School news and notices</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                This page is ready for admin-posted content such as public announcements, events, admissions information, and achievements.
              </p>
            </div>

            {visiblePosts.map(({ icon: Icon, category, title, text, color, image }, index) => (
              <article key={title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18` }}>
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{category}</p>
                    <h3 className="mt-1 font-semibold text-gray-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
                  </div>
                </div>
                <img
                  src={image || CAMEROON_SCHOOL_IMAGES[index + 3]}
                  alt={`${category} from ${schoolName}`}
                  className="mt-4 h-28 w-full rounded-xl object-cover"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-8 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: 'Students', text: 'View assignments, results, attendance, and materials.', color: colors.primary, image: CAMEROON_SCHOOL_IMAGES[5] },
            { icon: BookOpen, title: 'Teachers', text: 'Manage classes, marks, attendance, and announcements.', color: colors.secondary, image: CAMEROON_SCHOOL_IMAGES[4] },
            { icon: Users, title: 'Parents', text: 'Follow performance, fees, reports, and school updates.', color: colors.accent, image: CAMEROON_SCHOOL_IMAGES[3] },
          ].map(({ icon: Icon, title, text, color, image }) => (
            <Card key={title} className="border-0 bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <img src={image} alt={`${title} portal access`} className="mb-4 h-32 w-full rounded-xl object-cover" />
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
          <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-950">Secure school workspace</h2>
                <p className="text-sm text-gray-600">Access is protected and accounts are managed by {schoolName}.</p>
              </div>
            </div>
            <Button
              className="h-11 rounded-xl px-5 text-white"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              onClick={() => navigate(`/school/${schoolRouteId}/login-form?action=login`)}
            >
              Continue to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SchoolLoginPage;
