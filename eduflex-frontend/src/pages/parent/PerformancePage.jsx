import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Award, BookOpen, Download, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { parentAPI } from '@/services/api';
import { toast } from 'sonner';

const getClassName = (child) => child?.student_class?.full_name || child?.studentClass?.full_name || 'Class not assigned';

const getSubjectName = (grade) => grade?.subject?.name || grade?.subject_name || `Subject ${grade?.subject_id || ''}`.trim();

const ParentPerformancePage = () => {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await parentAPI.getProfile();
        const linkedChildren = response.data.profile?.students || [];
        setChildren(linkedChildren);
        setSelectedChildId(linkedChildren[0]?.id || null);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load child performance');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const currentChild = children.find(child => child.id === selectedChildId);
  const grades = currentChild?.grades || [];
  const subjectCount = useMemo(() => {
    const subjects = grades.map(grade => grade.subject_id || getSubjectName(grade)).filter(Boolean);
    return new Set(subjects).size;
  }, [grades]);

  const average = useMemo(() => {
    if (!grades.length) return 0;
    return grades.reduce((sum, grade) => sum + Number(grade.percentage || 0), 0) / grades.length;
  }, [grades]);

  return (
    <DashboardLayout>
      <Helmet><title>Performance - Parent Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Tracking</h1>
            <p className="text-muted-foreground mt-2">Monitor your children’s academic performance from school records.</p>
          </div>
          <Button variant="outline" onClick={() => toast.info('Performance report download coming soon.')}>
            <Download className="h-4 w-4 mr-2" />Download Report
          </Button>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading performance...</p> : children.length === 0 ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">No children are linked to this parent account yet.</CardContent></Card>
        ) : (
          <>
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Users className="h-5 w-5 mr-2 text-teal-600" />Select Child</CardTitle></CardHeader>
              <CardContent><div className="flex flex-wrap gap-3">{children.map(child => <Button key={child.id} variant={selectedChildId === child.id ? 'default' : 'outline'} className={selectedChildId === child.id ? 'bg-teal-600' : ''} onClick={() => setSelectedChildId(child.id)}>{child.full_name} - {getClassName(child)}</Button>)}</div></CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-4">
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Average</CardTitle><TrendingUp className="h-5 w-5 text-green-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">{average.toFixed(1)}%</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Grade Entries</CardTitle><Award className="h-5 w-5 text-teal-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-teal-600">{grades.length}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Subjects</CardTitle><BookOpen className="h-5 w-5 text-orange-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-orange-600">{subjectCount}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Target</CardTitle><Target className="h-5 w-5 text-blue-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-blue-600">85%</div></CardContent></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Subject Performance - {currentChild?.full_name}</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Term</TableHead><TableHead>Subject</TableHead><TableHead>Marks</TableHead><TableHead>Grade</TableHead><TableHead>Progress</TableHead></TableRow></TableHeader>
                  <TableBody>{grades.map(grade => <TableRow key={grade.id}><TableCell>{grade.term}</TableCell><TableCell className="font-medium">{getSubjectName(grade)}</TableCell><TableCell>{grade.score}/{grade.max_score}</TableCell><TableCell><Badge>{grade.grade || '-'}</Badge></TableCell><TableCell><div className="flex items-center gap-2"><Progress value={Number(grade.percentage)} className="w-32" /><span className="text-sm text-muted-foreground">{Number(grade.percentage || 0).toFixed(1)}%</span></div></TableCell></TableRow>)}</TableBody>
                </Table>
                {grades.length === 0 && <p className="py-8 text-center text-muted-foreground">No grades are available for this child yet.</p>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ParentPerformancePage;
