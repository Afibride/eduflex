import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Download, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { authAPI, studentAPI } from '@/services/api';
import { toast } from 'sonner';

const StudentResultsPage = () => {
  const [profile, setProfile] = useState(null);
  const [grades, setGrades] = useState([]);
  const [averages, setAverages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const me = await authAPI.getMe();
        const student = me.data.profile;
        setProfile(student);
        if (student?.id) {
          const response = await studentAPI.getGrades(student.id);
          setGrades(Object.entries(response.data.grades || {}).flatMap(([term, items]) => items.map(item => ({ ...item, term }))));
          setAverages(response.data.averages || {});
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, []);

  const overall = useMemo(() => {
    const values = Object.values(averages).map(Number).filter(Boolean);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }, [averages]);

  return (
    <DashboardLayout>
      <Helmet><title>My Results - Student Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Results</h1>
            <p className="text-muted-foreground mt-2">Academic results from your school database.</p>
          </div>
          <Button onClick={() => toast.info('Result download coming soon.')} className="bg-teal-600 hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />Download Result
          </Button>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading results...</p> : (
          <>
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div><p className="text-teal-100 text-sm">Student Name</p><p className="text-xl font-bold">{profile?.full_name}</p><p className="text-teal-100 text-sm mt-2">Class: {profile?.student_class?.full_name || profile?.studentClass?.full_name || '-'}</p></div>
                  <div><p className="text-teal-100 text-sm">Student No.</p><p className="text-2xl font-bold">{profile?.student_number}</p></div>
                  <div><p className="text-teal-100 text-sm">Average</p><p className="text-4xl font-bold">{overall.toFixed(1)}%</p></div>
                  <div><p className="text-teal-100 text-sm">Entries</p><p className="text-4xl font-bold">{grades.length}</p></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Subject-wise Performance</CardTitle><CardDescription>Detailed marks for each subject</CardDescription></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Term</TableHead><TableHead>Subject</TableHead><TableHead>Marks</TableHead><TableHead>Total</TableHead><TableHead>Grade</TableHead><TableHead>Performance</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {grades.map(grade => (
                      <TableRow key={grade.id}>
                        <TableCell>{grade.term}</TableCell>
                        <TableCell className="font-medium">{grade.subject?.name}</TableCell>
                        <TableCell>{grade.score}</TableCell>
                        <TableCell>{grade.max_score}</TableCell>
                        <TableCell className="font-bold text-teal-600">{grade.grade || '-'}</TableCell>
                        <TableCell><div className="flex items-center gap-2"><Progress value={Number(grade.percentage)} className="w-24" /><span className="text-sm text-muted-foreground">{Number(grade.percentage || 0).toFixed(1)}%</span></div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {grades.length === 0 && <p className="py-8 text-center text-muted-foreground">No results have been published yet.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center"><TrendingUp className="h-5 w-5 mr-2 text-teal-600" />Term Averages</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(averages).map(([term, average]) => (
                  <div key={term} className="space-y-2"><div className="flex justify-between"><span className="font-medium">{term}</span><span className="font-bold text-teal-600">{Number(average).toFixed(1)}%</span></div><Progress value={Number(average)} /></div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentResultsPage;
