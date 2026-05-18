import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CalendarCheck, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { authAPI, studentAPI } from '@/services/api';
import { toast } from 'sonner';

const StudentAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState({ present: 0, absent: 0, late: 0, excused: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      setLoading(true);
      try {
        const me = await authAPI.getMe();
        const student = me.data.profile;
        const response = await studentAPI.getAttendance(student.id);
        setAttendance(response.data.attendance || []);
        setSummary(response.data.summary || {});
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load attendance');
      } finally {
        setLoading(false);
      }
    };
    loadAttendance();
  }, []);

  const percentage = useMemo(() => {
    const total = Object.values(summary).reduce((sum, value) => sum + Number(value || 0), 0);
    return total ? Math.round((Number(summary.present || 0) / total) * 100) : 0;
  }, [summary]);

  return (
    <DashboardLayout>
      <Helmet><title>My Attendance - Student Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
          <p className="text-muted-foreground mt-2">Attendance records from your school database for this month.</p>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading attendance...</p> : (
          <>
            <div className="grid gap-6 md:grid-cols-4">
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Attendance</CardTitle><CalendarCheck className="h-5 w-5 text-teal-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-teal-600">{percentage}%</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Present</CardTitle><CalendarCheck className="h-5 w-5 text-green-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">{summary.present || 0}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Absent</CardTitle><XCircle className="h-5 w-5 text-red-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-red-600">{summary.absent || 0}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Late</CardTitle><Clock className="h-5 w-5 text-yellow-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-yellow-600">{summary.late || 0}</div></CardContent></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Attendance Log</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Remarks</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {attendance.map(record => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell><Badge className="capitalize">{record.status}</Badge></TableCell>
                        <TableCell>{record.remarks || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {attendance.length === 0 && <p className="py-8 text-center text-muted-foreground">No attendance records have been entered this month.</p>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendancePage;
