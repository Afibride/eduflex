import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { parentAPI } from '@/services/api';
import { toast } from 'sonner';

const ParentAttendancePage = () => {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const response = await parentAPI.getDashboard();
        const loadedChildren = response.data.children || [];
        setChildren(loadedChildren);
        setSelectedChildId(loadedChildren[0]?.id || null);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load attendance');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const currentChild = children.find(child => child.id === selectedChildId);
  const records = currentChild?.recent_attendance || [];
  const summary = useMemo(() => {
    const present = records.filter(record => record.status === 'present').length;
    const absent = records.filter(record => record.status === 'absent').length;
    const late = records.filter(record => record.status === 'late').length;
    const total = records.length;
    const percentage = total ? Math.round((present / total) * 100) : 0;
    return { present, absent, late, total, percentage };
  }, [records]);

  return (
    <DashboardLayout>
      <Helmet><title>Children Attendance - Parent Dashboard - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-muted-foreground mt-2">Recent attendance records for your linked children.</p>
        </div>

        {loading ? <p className="py-10 text-center text-muted-foreground">Loading attendance...</p> : children.length === 0 ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">No children are linked to this parent account yet.</CardContent></Card>
        ) : (
          <>
            <Card>
              <CardHeader><CardTitle>Select Child</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {children.map(child => <Button key={child.id} variant={selectedChildId === child.id ? 'default' : 'outline'} className={selectedChildId === child.id ? 'bg-teal-600' : ''} onClick={() => setSelectedChildId(child.id)}>{child.name} - {child.class || 'Class'}</Button>)}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-4">
              <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Recent Rate</CardTitle><CalendarCheck className="h-5 w-5 text-teal-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-teal-600">{summary.percentage}%</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium">Present</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">{summary.present}</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium">Absent</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-red-600">{summary.absent}</div></CardContent></Card>
              <Card><CardHeader><CardTitle className="text-sm font-medium">Late</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-yellow-600">{summary.late}</div></CardContent></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Recent Records - {currentChild?.name}</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Remarks</TableHead></TableRow></TableHeader>
                  <TableBody>{records.map(record => <TableRow key={record.id}><TableCell>{record.date}</TableCell><TableCell><Badge className="capitalize">{record.status}</Badge></TableCell><TableCell>{record.remarks || '-'}</TableCell></TableRow>)}</TableBody>
                </Table>
                {records.length === 0 && <p className="py-8 text-center text-muted-foreground">No recent attendance has been recorded for this child.</p>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ParentAttendancePage;
