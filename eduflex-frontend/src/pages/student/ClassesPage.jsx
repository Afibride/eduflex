import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { authAPI, classAPI } from '@/services/api';
import { toast } from 'sonner';

const getClassName = (cls) => cls?.full_name || cls?.name || 'Assigned Class';

const StudentClassesPage = () => {
  const [student, setStudent] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [classmates, setClassmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClass = async () => {
      setLoading(true);
      try {
        const me = await authAPI.getMe();
        const profile = me.data.profile;
        setStudent(profile);
        const assignedClass = profile?.student_class || profile?.studentClass;
        if (assignedClass?.id) {
          const [detailsResponse, studentsResponse] = await Promise.all([
            classAPI.getById(assignedClass.id),
            classAPI.getStudents(assignedClass.id),
          ]);
          setClassDetails(detailsResponse.data);
          setClassmates(studentsResponse.data.data || studentsResponse.data || []);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load class details');
      } finally {
        setLoading(false);
      }
    };
    loadClass();
  }, []);

  const assignedClass = classDetails || student?.student_class || student?.studentClass;

  return (
    <DashboardLayout>
      <Helmet><title>My Class - Student Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Class</h1>
          <p className="text-muted-foreground mt-2">Your assigned class and classmates from the school database.</p>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading class...</p> : !assignedClass ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">You have not been assigned to a class yet.</CardContent></Card>
        ) : (
          <>
            <Card className="bg-gradient-to-br from-teal-500 to-blue-600 text-white">
              <CardContent className="grid gap-6 p-6 md:grid-cols-4">
                <div><p className="text-teal-100 text-sm">Class</p><p className="text-3xl font-bold">{getClassName(assignedClass)}</p></div>
                <div><p className="text-teal-100 text-sm">Level</p><p className="text-xl font-semibold">{assignedClass.education_level || '-'}</p></div>
                <div><p className="text-teal-100 text-sm">Stream</p><p className="text-xl font-semibold">{assignedClass.stream || 'General'}</p></div>
                <div><p className="text-teal-100 text-sm">Students</p><p className="text-3xl font-bold">{classmates.length}</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-teal-600" />Classmates</CardTitle></CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {classmates.map(classmate => (
                  <div key={classmate.id} className="rounded-lg border p-4">
                    <p className="font-semibold">{classmate.full_name}</p>
                    <p className="text-sm text-muted-foreground">{classmate.student_number}</p>
                    <Badge variant="outline" className="mt-2 capitalize">{classmate.status}</Badge>
                  </div>
                ))}
                {classmates.length === 0 && <p className="py-8 text-center text-muted-foreground">No classmates found.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center"><BookOpen className="mr-2 h-5 w-5 text-teal-600" />Class Information</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div><p className="text-sm text-muted-foreground">Academic Year</p><p className="font-semibold">{assignedClass.academic_year || '-'}</p></div>
                <div><p className="text-sm text-muted-foreground">Capacity</p><p className="font-semibold">{assignedClass.capacity || '-'}</p></div>
                <div><p className="text-sm text-muted-foreground">Section</p><p className="font-semibold">{assignedClass.section || '-'}</p></div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentClassesPage;
