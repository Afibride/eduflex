import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, Download, Search, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { classAPI } from '@/services/api';
import { toast } from 'sonner';

const TeacherClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      setLoading(true);
      try {
        const response = await classAPI.getAll();
        const data = response.data.data || response.data || [];
        setClasses(data);
        setSelectedClass(data[0] || null);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load classes');
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedClass) return;
      try {
        const response = await classAPI.getStudents(selectedClass.id);
        setStudents(response.data.data || response.data || []);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load students');
      }
    };
    loadStudents();
  }, [selectedClass]);

  const filteredStudents = useMemo(() => students.filter(student => {
    const text = `${student.full_name || ''} ${student.student_number || ''} ${student.user?.email || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [students, searchTerm]);

  return (
    <DashboardLayout>
      <Helmet><title>My Classes - Teacher Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
            <p className="text-muted-foreground mt-2">View configured classes and student lists from the school database.</p>
          </div>
          <Button variant="outline" onClick={() => toast.info('Export will be available soon.')}>
            <Download className="h-4 w-4 mr-2" />Export Data
          </Button>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading classes...</p> : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {classes.map(cls => (
                <Card key={cls.id} className={`cursor-pointer hover:border-teal-500 ${selectedClass?.id === cls.id ? 'border-teal-500 bg-teal-50 dark:bg-teal-950' : ''}`} onClick={() => setSelectedClass(cls)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{cls.full_name || cls.name}</CardTitle>
                    <CardDescription>{cls.academic_year}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm"><Users className="mr-2 h-4 w-4" />{cls.students_count || 0} Students</span>
                    <Badge variant="outline">{cls.stream || 'General'}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedClass?.full_name || selectedClass?.name || 'Class'} - Students</CardTitle>
                    <CardDescription>{selectedClass?.education_level || 'School class'} | Capacity {selectedClass?.capacity || 0}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => toast.info('Opening attendance page...')}>
                    <Calendar className="h-4 w-4 mr-2" />Take Attendance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4 w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search students..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Table>
                  <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Number</TableHead><TableHead>Email</TableHead><TableHead>Parent Contact</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.full_name}</TableCell>
                        <TableCell className="font-mono text-sm">{student.student_number}</TableCell>
                        <TableCell>{student.user?.email}</TableCell>
                        <TableCell>{student.parent_phone || student.parent_email || '-'}</TableCell>
                        <TableCell><Badge>{student.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherClassesPage;
