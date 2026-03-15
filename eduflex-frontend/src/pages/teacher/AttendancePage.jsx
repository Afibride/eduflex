// pages/teacher/AttendancePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Calendar, CheckCircle, XCircle, Users,
  Download, Save, Filter, Clock, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherAttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});

  const classes = ['10A', '10B', '11A', '11B', '12A'];
  
  const students = {
    '10A': [
      { id: 1, rollNo: '2024-10A-001', name: 'John Smith', status: 'present', lastAttendance: '95%' },
      { id: 2, rollNo: '2024-10A-002', name: 'Emma Wilson', status: 'present', lastAttendance: '88%' },
      { id: 3, rollNo: '2024-10A-003', name: 'Michael Brown', status: 'absent', lastAttendance: '72%' },
      { id: 4, rollNo: '2024-10A-004', name: 'Sarah Davis', status: 'late', lastAttendance: '85%' },
      { id: 5, rollNo: '2024-10A-005', name: 'James Johnson', status: 'present', lastAttendance: '92%' },
      { id: 6, rollNo: '2024-10A-006', name: 'Emily White', status: 'present', lastAttendance: '96%' },
      { id: 7, rollNo: '2024-10A-007', name: 'Daniel Lee', status: 'absent', lastAttendance: '68%' },
    ]
  };

  const attendanceStats = {
    total: 35,
    present: 28,
    absent: 5,
    late: 2,
    percentage: 85.7
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
    toast.success(`Updated status for student`);
  };

  const handleMarkAll = (status) => {
    students[selectedClass]?.forEach(student => {
      handleStatusChange(student.id, status);
    });
    toast.success(`Marked all students as ${status}`);
  };

  const handleSaveAttendance = () => {
    toast.success(`Attendance saved for Class ${selectedClass} on ${selectedDate}`);
  };

  const handleDownloadReport = () => {
    toast.info(`Downloading attendance report for Class ${selectedClass}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Attendance - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
            <p className="text-muted-foreground mt-2">Mark and manage student attendance</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={handleSaveAttendance} className="bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Controls</CardTitle>
            <CardDescription>Select class and date to mark attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Select Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Quick Actions</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleMarkAll('present')}>
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    All Present
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleMarkAll('absent')}>
                    <XCircle className="h-4 w-4 mr-1 text-red-600" />
                    All Absent
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{attendanceStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{attendanceStats.present}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <XCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{attendanceStats.absent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{attendanceStats.late}</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Sheet */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Class {selectedClass} - Attendance Sheet</CardTitle>
                <CardDescription>{selectedDate}</CardDescription>
              </div>
              <Badge className="bg-teal-100 text-teal-800">
                {attendanceStats.percentage}% Present
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Overall Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students[selectedClass]?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={parseInt(student.lastAttendance)} className="w-16 h-2" />
                        <span className={parseInt(student.lastAttendance) >= 75 ? 'text-green-600' : 'text-yellow-600'}>
                          {student.lastAttendance}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={student.status}
                        onValueChange={(value) => handleStatusChange(student.id, value)}
                      >
                        <SelectTrigger className={`w-32 ${getStatusColor(attendanceData[student.id] || student.status)}`}>
                          <SelectValue>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(attendanceData[student.id] || student.status)}
                              <span className="capitalize">{attendanceData[student.id] || student.status}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Present</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="absent">
                            <div className="flex items-center space-x-1">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span>Absent</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="late">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span>Late</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(student.id, 'present')}>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(student.id, 'absent')}>
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(student.id, 'late')}>
                          <Clock className="h-4 w-4 text-yellow-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Summary</CardTitle>
            <CardDescription>Class {selectedClass} - March 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">Week 1 (Mar 1-7)</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">42 Present</span>
                  <span className="text-red-600">3 Absent</span>
                  <Badge>94%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">Week 2 (Mar 8-14)</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">40 Present</span>
                  <span className="text-red-600">4 Absent</span>
                  <span className="text-yellow-600">1 Late</span>
                  <Badge>89%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">Week 3 (Mar 15-21)</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">43 Present</span>
                  <span className="text-red-600">2 Absent</span>
                  <Badge>96%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Attendance Alert */}
        {attendanceStats.percentage < 85 && (
          <Alert className="bg-orange-50 dark:bg-orange-950 border-orange-200">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertTitle>Attendance Alert</AlertTitle>
            <AlertDescription>
              Class attendance is below 85%. Please encourage regular attendance.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherAttendancePage;