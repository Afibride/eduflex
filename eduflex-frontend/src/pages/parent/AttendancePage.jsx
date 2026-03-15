// pages/parent/AttendancePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Calendar, CheckCircle, XCircle, Clock,
  TrendingUp, Download, User, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentAttendancePage = () => {
  const [selectedChild, setSelectedChild] = useState('emma');
  const [selectedMonth, setSelectedMonth] = useState('march');

  const children = [
    { 
      id: 'emma', 
      name: 'Emma Johnson', 
      class: '10A',
      attendance: {
        overall: 94,
        present: 169,
        absent: 11,
        late: 5,
        total: 180,
        monthly: [
          { month: 'January', present: 22, absent: 1, late: 0, total: 23, percentage: 95.7 },
          { month: 'February', present: 21, absent: 1, late: 1, total: 22, percentage: 95.5 },
          { month: 'March', present: 18, absent: 2, late: 2, total: 20, percentage: 90.0 },
        ],
        subjects: [
          { name: 'Mathematics', present: 58, absent: 2, late: 0, total: 60, percentage: 96.7 },
          { name: 'Physics', present: 56, absent: 3, late: 1, total: 60, percentage: 93.3 },
          { name: 'Chemistry', present: 55, absent: 4, late: 1, total: 60, percentage: 91.7 },
          { name: 'English', present: 59, absent: 1, late: 0, total: 60, percentage: 98.3 },
          { name: 'History', present: 57, absent: 2, late: 1, total: 60, percentage: 95.0 },
          { name: 'Computer Science', present: 60, absent: 0, late: 0, total: 60, percentage: 100 }
        ]
      }
    },
    { 
      id: 'david', 
      name: 'David Johnson', 
      class: '8B',
      attendance: {
        overall: 89,
        present: 160,
        absent: 16,
        late: 8,
        total: 180,
        monthly: [
          { month: 'January', present: 21, absent: 2, late: 0, total: 23, percentage: 91.3 },
          { month: 'February', present: 19, absent: 2, late: 1, total: 22, percentage: 86.4 },
          { month: 'March', present: 17, absent: 2, late: 1, total: 20, percentage: 85.0 },
        ],
        subjects: [
          { name: 'Mathematics', present: 55, absent: 4, late: 1, total: 60, percentage: 91.7 },
          { name: 'Science', present: 53, absent: 5, late: 2, total: 60, percentage: 88.3 },
          { name: 'Social Studies', present: 54, absent: 4, late: 2, total: 60, percentage: 90.0 },
          { name: 'English', present: 56, absent: 3, late: 1, total: 60, percentage: 93.3 },
          { name: 'Hindi', present: 52, absent: 6, late: 2, total: 60, percentage: 86.7 },
          { name: 'Art', present: 58, absent: 2, late: 0, total: 60, percentage: 96.7 }
        ]
      }
    }
  ];

  const months = [
    { value: 'january', label: 'January 2024' },
    { value: 'february', label: 'February 2024' },
    { value: 'march', label: 'March 2024' }
  ];

  const currentChild = children.find(c => c.id === selectedChild);

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-600';
    if (percentage >= 80) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const handleDownloadReport = () => {
    toast.info(`Downloading attendance report for ${currentChild?.name}`);
  };

  const handleViewDetails = (subject) => {
    toast.info(`Viewing detailed attendance for ${subject}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Attendance - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance Tracking</h1>
            <p className="text-muted-foreground mt-2">Monitor your children's attendance records</p>
          </div>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Child Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-teal-600" />
              Select Child
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={selectedChild === child.id ? 'default' : 'outline'}
                  className={selectedChild === child.id ? 'bg-teal-600' : ''}
                  onClick={() => setSelectedChild(child.id)}
                >
                  {child.name} - Class {child.class}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentChild?.attendance.overall}%
              </div>
              <Progress value={currentChild?.attendance.overall} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {currentChild?.attendance.present}
              </div>
              <p className="text-xs text-muted-foreground mt-2">out of {currentChild?.attendance.total} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <XCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {currentChild?.attendance.absent}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {currentChild?.attendance.late}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
              <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance - {currentChild?.name}</CardTitle>
                <CardDescription>Academic Year 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentChild?.attendance.monthly.map((month, index) => (
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
                <CardTitle>Subject-wise Attendance - {currentChild?.name}</CardTitle>
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
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentChild?.attendance.subjects.map((subject, index) => (
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
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(subject.name)}>
                            <Eye className="h-4 w-4" />
                          </Button>
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
                <CardTitle>Attendance Calendar - {currentChild?.name}</CardTitle>
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
                    if (day === 5 || day === 12) status = 'absent';
                    if (day === 8 || day === 19) status = 'late';
                    if (day === 16 || day === 17 || day === 23 || day === 24) status = 'weekend';
                    
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
                        {status !== 'weekend' && (
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
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-sm">Absent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <span className="text-sm">Late</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Comparison</CardTitle>
            <CardDescription>Compare attendance between children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{child.name}</span>
                    <span className={`font-bold ${getAttendanceColor(child.attendance.overall)}`}>
                      {child.attendance.overall}%
                    </span>
                  </div>
                  <Progress 
                    value={child.attendance.overall} 
                    className="h-3"
                    indicatorClassName={getProgressColor(child.attendance.overall)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentAttendancePage;