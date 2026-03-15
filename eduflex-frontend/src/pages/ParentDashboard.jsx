// pages/ParentDashboard.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  User, Award, DollarSign, Download, 
  TrendingUp, AlertCircle, Calendar,
  FileText, Bell, Users, BookOpen,
  CheckCircle, Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('emma');

  const children = [
    { id: 'emma', name: 'Emma Johnson', class: '10A', rollNumber: '2024-10A-015' },
    { id: 'david', name: 'David Johnson', class: '8B', rollNumber: '2024-8B-032' }
  ];

  const childData = {
    emma: {
      name: 'Emma Johnson',
      class: '10A',
      overallGrade: 'A',
      attendance: 94,
      pendingFees: 800,
      recentGrades: [
        { subject: 'Mathematics', grade: 'A', marks: '92/100', trend: 'up' },
        { subject: 'Physics', grade: 'B+', marks: '85/100', trend: 'up' },
        { subject: 'Chemistry', grade: 'A-', marks: '88/100', trend: 'stable' }
      ],
      upcomingAssignments: [
        { title: 'Math Assignment', dueDate: '2024-03-15', status: 'pending' },
        { title: 'Chemistry Project', dueDate: '2024-03-20', status: 'pending' }
      ],
      attendanceDetails: {
        present: 165,
        absent: 11,
        total: 180,
        percentage: 94
      }
    },
    david: {
      name: 'David Johnson',
      class: '8B',
      overallGrade: 'B+',
      attendance: 89,
      pendingFees: 600,
      recentGrades: [
        { subject: 'Mathematics', grade: 'A-', marks: '88/100', trend: 'up' },
        { subject: 'Science', grade: 'B+', marks: '82/100', trend: 'stable' },
        { subject: 'English', grade: 'A', marks: '90/100', trend: 'up' }
      ],
      upcomingAssignments: [
        { title: 'Science Project', dueDate: '2024-03-18', status: 'pending' },
        { title: 'Book Report', dueDate: '2024-03-22', status: 'pending' }
      ],
      attendanceDetails: {
        present: 160,
        absent: 16,
        total: 180,
        percentage: 89
      }
    }
  };

  const currentChild = childData[selectedChild];

  const fees = {
    total: 5000,
    paid: 3200,
    pending: 1800,
    dueDate: '2024-04-15'
  };

  const announcements = [
    { title: 'Parent-Teacher Meeting', date: '2024-03-25', priority: 'high' },
    { title: 'Fee Payment Deadline', date: '2024-04-15', priority: 'medium' }
  ];

  const handleViewAll = (link) => {
    navigate(link);
  };

  const handleQuickAction = (link) => {
    navigate(link);
  };

  const handlePayFees = () => {
    navigate('/parent/fees');
  };

  const handleContactTeacher = () => {
    toast.info('Contacting teacher...');
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Parent Dashboard - EduFlex</title>
        <meta name="description" content="Monitor your child's academic progress, attendance, fees, and performance from the parent dashboard." />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Monitor your children's academic journey</p>
        </div>

        {/* Child Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-teal-600" />
              Select Child
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={selectedChild === child.id ? 'default' : 'outline'}
                  className={selectedChild === child.id ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  onClick={() => setSelectedChild(child.id)}
                >
                  {child.name} - Class {child.class}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Child Info Card */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600 text-white text-2xl font-bold">
                {currentChild.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentChild.name}</h3>
                <p className="text-muted-foreground">Class: {currentChild.class} | Roll No: {children.find(c => c.id === selectedChild)?.rollNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/parent/results')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Grade</CardTitle>
              <Award className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentChild.overallGrade}</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/parent/attendance')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
              <User className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{currentChild.attendance}%</div>
              <Progress value={currentChild.attendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/parent/fees')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Fees</CardTitle>
              <DollarSign className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">${currentChild.pendingFees}</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/parent/assignments')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
              <FileText className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{currentChild.upcomingAssignments.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/parent/results')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900">
                  <Award className="h-6 w-6 text-teal-600 dark:text-teal-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">View Results</CardTitle>
              </div>
              <CardDescription>Check your child's academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/parent/results');
              }}>
                View Results
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/parent/attendance')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Attendance</CardTitle>
              </div>
              <CardDescription>Track attendance record</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/parent/attendance');
              }}>
                View Attendance
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/parent/fees')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                  <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Fees</CardTitle>
              </div>
              <CardDescription>Manage fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/parent/fees');
              }}>
                Pay Fees
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Fees Alert */}
        {currentChild.pendingFees > 0 && (
          <Alert className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 cursor-pointer" onClick={() => navigate('/parent/fees')}>
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-900 dark:text-orange-100">Pending Payment</AlertTitle>
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              You have ${currentChild.pendingFees} pending fees for {currentChild.name}. Due date: {fees.dueDate}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="grades" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grades">Recent Grades</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Grades - {currentChild.name}</CardTitle>
                    <CardDescription>Latest assessment results</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/parent/results')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentChild.recentGrades.map((grade, index) => (
                      <TableRow key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => navigate('/parent/results')}>
                        <TableCell className="font-medium">{grade.subject}</TableCell>
                        <TableCell>
                          <span className="text-lg font-bold text-green-600">{grade.grade}</span>
                        </TableCell>
                        <TableCell>{grade.marks}</TableCell>
                        <TableCell>
                          <span className={`text-lg font-bold ${
                            grade.trend === 'up' ? 'text-green-600' : 
                            grade.trend === 'down' ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {getTrendIcon(grade.trend)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Assignments - {currentChild.name}</CardTitle>
                    <CardDescription>Tasks that need attention</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/parent/assignments')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentChild.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Attendance Overview - {currentChild.name}</CardTitle>
                    <CardDescription>Current semester attendance</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/parent/attendance')}>
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentChild.attendanceDetails.percentage}%
                    </span>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className="text-green-600">{currentChild.attendanceDetails.present} Present</span>
                      </p>
                      <p className="text-sm text-red-600">{currentChild.attendanceDetails.absent} Absent</p>
                    </div>
                  </div>
                  <Progress value={currentChild.attendanceDetails.percentage} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>School updates and notices</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/parent/announcements')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 border-b last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => navigate('/parent/announcements')}>
                  <Bell className="h-4 w-4 text-teal-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  {item.priority === 'high' && (
                    <Badge className="bg-red-100 text-red-800">Important</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/parent/reports')}>
                <Download className="h-6 w-6 mb-2 text-teal-600" />
                <span>Reports</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/parent/performance')}>
                <TrendingUp className="h-6 w-6 mb-2 text-blue-600" />
                <span>Performance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/parent/assignments')}>
                <FileText className="h-6 w-6 mb-2 text-purple-600" />
                <span>Assignments</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/profile')}>
                <User className="h-6 w-6 mb-2 text-green-600" />
                <span>Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;