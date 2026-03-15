// pages/student/AttendancePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  Calendar, CheckCircle, XCircle, Clock,
  TrendingUp, AlertCircle, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentAttendancePage = () => {
  const attendance = {
    overall: 92,
    present: 165,
    absent: 15,
    late: 8,
    total: 180,
    monthly: [
      { month: 'January', present: 22, absent: 1, late: 0, total: 23, percentage: 95.7 },
      { month: 'February', present: 20, absent: 2, late: 1, total: 22, percentage: 90.9 },
      { month: 'March', present: 18, absent: 2, late: 2, total: 20, percentage: 90.0 },
      { month: 'April', present: 21, absent: 1, late: 1, total: 22, percentage: 95.5 },
      { month: 'May', present: 19, absent: 3, late: 2, total: 22, percentage: 86.4 },
      { month: 'June', present: 20, absent: 2, late: 2, total: 22, percentage: 90.9 }
    ],
    subjects: [
      { name: 'Mathematics', present: 58, absent: 2, late: 0, total: 60, percentage: 96.7 },
      { name: 'Physics', present: 55, absent: 5, late: 2, total: 60, percentage: 91.7 },
      { name: 'Chemistry', present: 52, absent: 8, late: 2, total: 60, percentage: 86.7 },
      { name: 'English', present: 59, absent: 1, late: 0, total: 60, percentage: 98.3 },
      { name: 'History', present: 53, absent: 7, late: 2, total: 60, percentage: 88.3 },
      { name: 'Computer Science', present: 60, absent: 0, late: 0, total: 60, percentage: 100 }
    ],
    weekly: [
      { date: 'Mon, Mar 11', status: 'present' },
      { date: 'Tue, Mar 12', status: 'present' },
      { date: 'Wed, Mar 13', status: 'late' },
      { date: 'Thu, Mar 14', status: 'present' },
      { date: 'Fri, Mar 15', status: 'absent' },
      { date: 'Sat, Mar 16', status: 'holiday' },
      { date: 'Sun, Mar 17', status: 'holiday' }
    ]
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-600';
    if (percentage >= 75) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'absent': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'late': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'holiday': return <Calendar className="h-5 w-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      case 'holiday':
        return <Badge variant="outline">Holiday</Badge>;
      default:
        return null;
    }
  };

  const handleDownloadReport = () => {
    toast.info('Downloading attendance report...');
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Attendance - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
            <p className="text-muted-foreground mt-2">Track your attendance record</p>
          </div>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{attendance.overall}%</div>
              <Progress value={attendance.overall} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{attendance.present}</div>
              <p className="text-xs text-muted-foreground mt-2">out of {attendance.total} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <XCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{attendance.absent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{attendance.late}</div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly View */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Attendance</CardTitle>
            <CardDescription>March 11 - March 17, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {attendance.weekly.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    {day.date.split(',')[0]}
                  </div>
                  <div className="flex justify-center">
                    {getStatusIcon(day.status)}
                  </div>
                  <div className="text-xs mt-1">
                    {day.status !== 'holiday' ? day.status : '-'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
            <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>Academic Year 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendance.monthly.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">
                            <span className="text-green-600">{month.present} P</span>
                            {month.late > 0 && <span className="text-yellow-600 ml-1">({month.late} L)</span>}
                          </span>
                          <span className="text-sm text-red-600">{month.absent} A</span>
                          <span className={`font-bold ${getAttendanceColor(month.percentage)}`}>
                            {month.percentage}%
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={month.percentage} 
                        className="h-2"
                        indicatorClassName={getProgressColor(month.percentage)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Attendance percentage per subject</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Total Classes</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell className="text-green-600">{subject.present}</TableCell>
                        <TableCell className="text-red-600">{subject.absent}</TableCell>
                        <TableCell className="text-yellow-600">{subject.late}</TableCell>
                        <TableCell>{subject.total}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={subject.percentage} className="w-16 h-2" />
                            <span className={`font-bold ${getAttendanceColor(subject.percentage)}`}>
                              {subject.percentage}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
                <CardDescription>March 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 font-semibold text-sm">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    let status = 'present';
                    if (day === 13) status = 'late';
                    if (day === 15) status = 'absent';
                    if (day === 16 || day === 17) status = 'holiday';
                    
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square p-2 border rounded-lg flex flex-col items-center justify-center
                          ${status === 'present' ? 'bg-green-50 border-green-200' : 
                            status === 'absent' ? 'bg-red-50 border-red-200' :
                            status === 'late' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-gray-50 border-gray-200'}`}
                      >
                        <span className="text-sm">{day}</span>
                        {status !== 'holiday' && (
                          <div className="mt-1">
                            {status === 'present' && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                            {status === 'absent' && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                            {status === 'late' && <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Low Attendance Alert */}
        {attendance.overall < 85 && (
          <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200">Attendance Alert</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Your attendance is below 85%. Please ensure regular attendance to avoid academic penalties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendancePage;