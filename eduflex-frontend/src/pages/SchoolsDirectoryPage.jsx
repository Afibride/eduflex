import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
  Megaphone,
  Search,
  Shield,
  Sparkles,
  Users,
  Mail,
  Phone,
  Globe,
  Clock,
  School,
  Star,
  TrendingUp,
  CheckCircle,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

const colors = ['#2563eb', '#16a34a', '#9333ea', '#0f766e', '#dc2626', '#4f46e5', '#d97706', '#7c3aed'];

const getRouteId = (school) => school.code || school.id;

const getInitials = (name) => {
  if (!name) return 'SC';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const getSeed = (value = '') => (
  String(value).split('').reduce((total, char) => total + char.charCodeAt(0), 0)
);

// Placeholder data until public school posts/profile stats are provided by the API.
const getAdditionalSchoolData = (school) => {
  const seed = getSeed(`${school.id}-${school.code}-${school.name}`);
  const allPrograms = ['Primary', 'Secondary', 'High School', 'College'];
  const programCount = (seed % 3) + 2;

  return {
    studentCount: 450 + (seed * 37) % 4200,
    teacherCount: 28 + (seed * 11) % 170,
    establishedYear: 1955 + seed % 60,
    rating: (3.8 + (seed % 12) / 10).toFixed(1),
    programs: allPrograms.slice(0, programCount),
    achievements: 8 + seed % 42,
    events: 3 + seed % 18,
  };
};

const SchoolsDirectoryPage = () => {
  const { schools } = useAuth();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('all');

  const regions = useMemo(() => {
    const values = schools.map(s => s.region).filter(Boolean);
    return ['all', ...Array.from(new Set(values)).sort()];
  }, [schools]);

  const schoolLevels = ['all', 'Primary', 'Secondary', 'High School', 'College'];

  const filteredAndSortedSchools = useMemo(() => {
    const term = search.trim().toLowerCase();
    let filtered = schools.filter((school) => {
      const matchesSearch = !term ||
        school.name?.toLowerCase().includes(term) ||
        school.location?.toLowerCase().includes(term) ||
        school.region?.toLowerCase().includes(term) ||
        school.city?.toLowerCase().includes(term);
      const matchesRegion = region === 'all' || school.region === region;
      const schoolData = getAdditionalSchoolData(school);
      const matchesLevel = selectedLevel === 'all' || schoolData.programs.includes(selectedLevel);
      return matchesSearch && matchesRegion && matchesLevel;
    });

    // Sort schools
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') {
        const ratingA = parseFloat(getAdditionalSchoolData(a).rating);
        const ratingB = parseFloat(getAdditionalSchoolData(b).rating);
        return ratingB - ratingA;
      }
      if (sortBy === 'students') {
        const studentsA = getAdditionalSchoolData(a).studentCount;
        const studentsB = getAdditionalSchoolData(b).studentCount;
        return studentsB - studentsA;
      }
      return 0;
    });

    return filtered;
  }, [schools, search, region, sortBy, selectedLevel]);

  const activeFilterCount = [region !== 'all', selectedLevel !== 'all', sortBy !== 'name'].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Region</label>
        <select
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {regions.map(item => (
            <option key={item} value={item}>{item === 'all' ? 'All regions' : item}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Education Level</label>
        <select
          value={selectedLevel}
          onChange={(event) => setSelectedLevel(event.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {schoolLevels.map(level => (
            <option key={level} value={level}>
              {level === 'all' ? 'All levels' : level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Sort By</label>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="name">School Name</option>
          <option value="rating">Highest Rated</option>
          <option value="students">Most Students</option>
        </select>
      </div>

      {(region !== 'all' || selectedLevel !== 'all' || sortBy !== 'name') && (
        <Button
          variant="outline"
          onClick={() => {
            setRegion('all');
            setSelectedLevel('all');
            setSortBy('name');
          }}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Browse Schools - EduFlex Cameroon</title>
        <meta name="description" content="Browse available schools on EduFlex and view their public profiles, posts, updates, and achievements." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
      </Helmet>

      <div className="min-h-screen bg-[#f6f8fb]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.08),rgba(22,163,74,0.04)_45%,rgba(147,51,234,0.07))]" />
          <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                  <Sparkles className="h-4 w-4" />
                  Public school directory
                </div>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-gray-950 md:text-5xl lg:text-6xl">
                  Browse schools, updates, and achievements
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
                  Explore schools using EduFlex, visit their public profile pages, and see the information their administrators share with the community.
                </p>
                <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                  {[
                    { label: 'Profiles', value: schools.length || 0 },
                    { label: 'Regions', value: Math.max(regions.length - 1, 0) },
                    { label: 'Public pages', value: 'Live' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/85 px-4 py-3 shadow-sm ring-1 ring-gray-200">
                      <p className="text-xl font-bold text-gray-950">{item.value}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-0 bg-white/95 shadow-xl ring-1 ring-gray-200">
                <CardContent className="space-y-4 p-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search schools or locations..."
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <div className="lg:hidden">
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>Filters & Sort</span>
                            {activeFilterCount > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {activeFilterCount}
                              </Badge>
                            )}
                          </div>
                          <span className="text-muted-foreground text-sm">Tap to customize</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
                        <SheetHeader>
                          <SheetTitle>Filter Schools</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 overflow-y-auto h-full pb-20">
                          <FilterContent />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Desktop Filters */}
                  <div className="hidden lg:block">
                    <FilterContent />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {filteredAndSortedSchools.length} {filteredAndSortedSchools.length === 1 ? 'School' : 'Schools'}
              </Badge>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRegion('all');
                    setSelectedLevel('all');
                    setSortBy('name');
                  }}
                  className="text-muted-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-600" />
              Verified school workspaces
            </div>
          </div>

          {/* Schools Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedSchools.map((school, index) => {
              const color = colors[index % colors.length];
              const additionalData = getAdditionalSchoolData(school);
              const rating = parseFloat(additionalData.rating);
              
              return (
                <article 
                  key={school.id} 
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Top gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${color}, #16a34a)` }} />
                  
                  <div className="p-5 md:p-6">
                    {/* Header with logo and rating */}
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md transition-transform group-hover:scale-105"
                        style={{ background: color }}
                      >
                        {school.logo || getInitials(school.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-gray-950 md:text-xl">
                            {school.name}
                          </h2>
                          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1 ring-1 ring-yellow-100">
                            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-bold text-foreground">{rating}</span>
                          </div>
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                          <span className="truncate">{school.location || school.city || 'Cameroon'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="rounded-xl bg-gray-50 p-3 text-center ring-1 ring-gray-100">
                        <Users className="h-4 w-4 mx-auto mb-1" style={{ color }} />
                        <p className="text-xs font-semibold text-gray-950">{additionalData.studentCount.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500">Students</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3 text-center ring-1 ring-gray-100">
                        <GraduationCap className="h-4 w-4 mx-auto mb-1" style={{ color }} />
                        <p className="text-xs font-semibold text-gray-950">{additionalData.teacherCount}</p>
                        <p className="text-[10px] text-gray-500">Teachers</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3 text-center ring-1 ring-gray-100">
                        <CalendarDays className="h-4 w-4 mx-auto mb-1" style={{ color }} />
                        <p className="text-xs font-semibold text-gray-950">{additionalData.establishedYear}</p>
                        <p className="text-[10px] text-gray-500">Founded</p>
                      </div>
                    </div>

                    {/* Programs */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {additionalData.programs.map((program) => (
                          <Badge key={program} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-yellow-600" />
                        <span>{additionalData.achievements} achievements</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Megaphone className="h-3.5 w-3.5 text-blue-600" />
                        <span>{additionalData.events} events</span>
                      </div>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-2 mb-5">
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                          <Megaphone className="h-3 w-3" />
                          Latest updates
                        </p>
                        <p className="mt-1 text-xs text-blue-900 dark:text-blue-300 line-clamp-2">
                          School news, announcements, and public updates appear here
                        </p>
                      </div>
                      <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
                          <BookOpen className="h-3 w-3" />
                          School profile
                        </p>
                        <p className="mt-1 text-xs text-green-900 dark:text-green-300">
                          View achievements, contact info, and more
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      asChild 
                      className="h-11 w-full justify-between rounded-xl text-white shadow-md hover:shadow-lg transition-all"
                      style={{ background: `linear-gradient(135deg, ${color}, #16a34a)` }}
                    >
                      <Link to={`/school/${getRouteId(school)}/login`}>
                        View School Profile
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAndSortedSchools.length === 0 && (
            <div className="rounded-2xl bg-card p-12 text-center border border-border shadow-sm">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <School className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No schools found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearch('');
                  setRegion('all');
                  setSelectedLevel('all');
                  setSortBy('name');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default SchoolsDirectoryPage;
