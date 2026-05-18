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
import { attendanceAPI, classAPI } from '@/services/api';
import { toast } from 'sonner';

const today = new Date().toISOString().slice(0, 10);

const TeacherAttendancePage = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await classAPI.getAll();
        const data = response.data.data || response.data || [];
        setClasses(data);
        setSelectedClassId(String(data[0]?.id || ''));
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load classes');
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    const loadClassAttendance = async () => {
      if (!selectedClassId) return;
      try {
        const [studentsResponse, attendanceResponse] = await Promise.all([
          classAPI.getStudents(selectedClassId),
          attendanceAPI.getClassAttendance(selectedClassId, date),
        ]);
        const loadedStudents = studentsResponse.data.data || studentsResponse.data || [];
        const savedAttendance = attendanceResponse.data || [];
        const statuses = Object.fromEntries(loadedStudents.map(student => [student.id, 'present']));
        savedAttendance.forEach(record => {
          statuses[record.student_id] = record.status;
        });
        setStudents(loadedStudents);
        setAttendance(statuses);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load attendance');
      }
    };
    loadClassAttendance();
  }, [selectedClassId, date]);

  const stats = useMemo(() => {
    const values = Object.values(attendance);
    const present = values.filter(status => status === 'present').length;
    const absent = values.filter(status => status === 'absent').length;
    const late = values.filter(status => status === 'late').length;
    const excused = values.filter(status => status === 'excused').length;
    return { present, absent, late, excused, total: values.length };
  }, [attendance]);

  const saveAttendance = async () => {
    if (!selectedClassId) {
      toast.error('Select a class first');
      return;
    }

    setSaving(true);
    try {
      await attendanceAPI.create({
        records: students.map(student => ({
          student_id: student.id,
          class_id: Number(selectedClassId),
          date,
          status: attendance[student.id] || 'present',
        })),
      });
      toast.success('Attendance saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Attendance - Teacher Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mark Attendance</h1>
          <p className="text-muted-foreground mt-2">Record attendance for your class and sync it to the backend.</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Attendance Setup</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>{classes.map(cls => <SelectItem key={cls.id} value={String(cls.id)}>{cls.full_name || cls.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={event => setDate(event.target.value)} />
            </div>
            <div className="rounded-md border p-3 text-sm">
              <p className="font-semibold">Present: {stats.present}/{stats.total}</p>
              <p className="text-muted-foreground">Absent {stats.absent}, Late {stats.late}, Excused {stats.excused}</p>
            </div>
            <div className="flex items-end">
              <Button onClick={saveAttendance} disabled={saving || students.length === 0} className="w-full bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />{saving ? 'Saving...' : 'Save Attendance'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Class Register</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Number</TableHead><TableHead className="w-48">Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.student_number}</TableCell>
                    <TableCell>
                      <Select value={attendance[student.id] || 'present'} onValueChange={value => setAttendance(prev => ({ ...prev, [student.id]: value }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="excused">Excused</SelectItem>
                        </SelectContent>
                      </Select>
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

export default TeacherAttendancePage;
