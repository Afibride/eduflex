import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Search, Users, GraduationCap, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { schoolAPI } from '@/services/api';
import { toast } from 'sonner';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchools = async () => {
      setLoading(true);
      try {
        const response = await schoolAPI.getAdminSchools();
        setSchools(response.data.data || response.data || []);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load your school');
      } finally {
        setLoading(false);
      }
    };
    loadSchools();
  }, []);

  const filteredSchools = useMemo(() => schools.filter((school) => {
    const text = `${school.name} ${school.code} ${school.principal_name || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [schools, searchTerm]);

  const totalStats = {
    schools: schools.length,
    activeSchools: schools.filter(s => s.status === 'active').length,
    totalStudents: schools.reduce((acc, s) => acc + (s.students_count || 0), 0),
    totalTeachers: schools.reduce((acc, s) => acc + (s.teachers_count || 0), 0),
  };

  return (
    <DashboardLayout>
      <Helmet><title>My School - Admin - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My School</h1>
          <p className="text-muted-foreground mt-2">School admins only see and manage the school they administer.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Schools Visible</CardTitle><Building2 className="h-5 w-5 text-teal-600" /></CardHeader><CardContent><div className="text-3xl font-bold">{totalStats.schools}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active</CardTitle><Building2 className="h-5 w-5 text-green-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">{totalStats.activeSchools}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Students</CardTitle><GraduationCap className="h-5 w-5 text-blue-600" /></CardHeader><CardContent><div className="text-3xl font-bold">{totalStats.totalStudents}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Teachers</CardTitle><Users className="h-5 w-5 text-orange-600" /></CardHeader><CardContent><div className="text-3xl font-bold">{totalStats.totalTeachers}</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div><CardTitle>School Profile</CardTitle><CardDescription>Your admin scope is restricted to this school.</CardDescription></div>
              <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading school...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>School</TableHead><TableHead>Code</TableHead><TableHead>Principal</TableHead><TableHead>Students</TableHead><TableHead>Teachers</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>{filteredSchools.map(school => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{school.name}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{school.city || school.region || 'Cameroon'}</span>
                          <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{school.email}</span>
                          <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{school.phone || '-'}</span>
                          {school.website && <span className="inline-flex items-center gap-1"><Globe className="h-3 w-3" />{school.website}</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{school.code}</TableCell>
                    <TableCell>{school.principal_name || '-'}</TableCell>
                    <TableCell>{school.students_count || 0}</TableCell>
                    <TableCell>{school.teachers_count || 0}</TableCell>
                    <TableCell><Badge className={school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{school.status}</Badge></TableCell>
                  </TableRow>
                ))}</TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolsPage;
