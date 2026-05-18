import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { classAPI, gradeAPI, subjectAPI } from '@/services/api';
import { toast } from 'sonner';

const currentYear = new Date().getFullYear().toString();

const TeacherMarksPage = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [term, setTerm] = useState('First Term');
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSetup = async () => {
      try {
        const [classResponse, subjectResponse] = await Promise.all([classAPI.getAll(), subjectAPI.getAll()]);
        const loadedClasses = classResponse.data.data || classResponse.data || [];
        const loadedSubjects = subjectResponse.data.data || subjectResponse.data || [];
        setClasses(loadedClasses);
        setSubjects(loadedSubjects);
        setSelectedClassId(String(loadedClasses[0]?.id || ''));
        setSelectedSubjectId(String(loadedSubjects[0]?.id || ''));
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load marks setup');
      }
    };
    loadSetup();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedClassId) return;
      try {
        const response = await classAPI.getStudents(selectedClassId);
        setStudents(response.data.data || response.data || []);
        setScores({});
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load class students');
      }
    };
    loadStudents();
  }, [selectedClassId]);

  const selectedClass = useMemo(() => classes.find(cls => String(cls.id) === selectedClassId), [classes, selectedClassId]);

  const saveMarks = async () => {
    if (!selectedClassId || !selectedSubjectId) {
      toast.error('Select a class and subject first');
      return;
    }

    const entries = Object.entries(scores).filter(([, score]) => score !== '' && score !== undefined);
    if (entries.length === 0) {
      toast.error('Enter at least one score');
      return;
    }

    setSaving(true);
    try {
      await Promise.all(entries.map(([studentId, score]) => gradeAPI.create({
        student_id: Number(studentId),
        subject_id: Number(selectedSubjectId),
        class_id: Number(selectedClassId),
        term,
        academic_year: currentYear,
        score: Number(score),
        max_score: 100,
      })));
      toast.success('Marks submitted for admin verification');
      setScores({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save marks');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Upload Marks - Teacher Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Marks</h1>
          <p className="text-muted-foreground mt-2">Enter student marks directly into the school database.</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Marks Setup</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>{classes.map(cls => <SelectItem key={cls.id} value={String(cls.id)}>{cls.full_name || cls.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{subjects.map(subject => <SelectItem key={subject.id} value={String(subject.id)}>{subject.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Term</Label>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={saveMarks} disabled={saving || students.length === 0} className="w-full bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />{saving ? 'Saving...' : 'Save Marks'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{selectedClass?.full_name || selectedClass?.name || 'Class'} Students</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Number</TableHead><TableHead className="w-40">Score / 100</TableHead></TableRow></TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.student_number}</TableCell>
                    <TableCell>
                      <Input type="number" min="0" max="100" value={scores[student.id] || ''} onChange={event => setScores(prev => ({ ...prev, [student.id]: event.target.value }))} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {students.length === 0 && <p className="py-8 text-center text-muted-foreground">No students found for this class.</p>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherMarksPage;
