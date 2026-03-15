// pages/StudentDashboard.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Calendar, FileText, Download, 
  TrendingUp, BookOpen, Clock, Bell,
  CheckCircle, AlertCircle, Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Overall Grade', value: 'A', icon: Award, color: 'text-teal-600', bgColor: 'bg-teal-100 dark:bg-teal-900', link: '/student/results' },
    { title: 'Attendance', value: '92%', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900', link: '/student/attendance' },
    { title: 'Assignments', value: '3 Pending', icon: FileText, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900', link: '/student/assignments' },
    { title: 'Classes', value: '6', icon: BookOpen, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900', link: '/student/classes' }
  ];

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', marks: '92/100', date: '2024-03-10' },
    { subject: 'Physics', grade: 'B+', marks: '85/100', date: '2024-03-08' },
    { subject: 'Chemistry', grade: 'A-', marks: '88/100', date: '2024-03-05' }
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Math Assignment 1', subject: 'Mathematics', dueDate: '2024-03-15', status: 'pending', daysLeft: 2 },
    { id: 2, title: 'Chemistry Project', subject: 'Chemistry', dueDate: '2024-03-20', status: 'pending', daysLeft: 7 },
    { id: 3, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-03-12', status: 'submitted', daysLeft: 0 }
  ];

  const todayClasses = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101' },
    { time: '10:15 AM', subject: 'Physics', teacher: 'Ms. Davis', room: '203' },
    { time: '11:30 AM', subject: 'English', teacher: 'Mrs. Brown', room: '302' },
    { time: '01:30 PM', subject: 'Chemistry', teacher: 'Dr. Wilson', room: '105' }
  ];

  const attendance = {
    percentage: 92,
    present: 165,
    total: 180,
    absent: 15
  };

  const announcements = [
    { title: 'Final Exam Schedule', date: '2024-03-15', priority: 'high' },
    { title: 'Parent-Teacher Meeting', date: '2024-03-25', priority: 'medium' }
  ];

  const handleViewAll = (link) => {
    navigate(link);
  };

  const handleQuickAction = (link) => {
    navigate(link);
  };

  const handleDownload = (assignmentId) => {
    toast.info('Downloading assignment...');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Student Dashboard - EduFlex</title>
        <meta name="description" content="View your grades, assignments, attendance, and academic performance from the student dashboard." />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Track your academic progress and assignments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(stat.link)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Today's Classes</CardTitle>
                <CardDescription>Your schedule for today</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/student/timetable')}>
                View Timetable
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Clock className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-sm text-muted-foreground">{cls.teacher} • Room {cls.room}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{cls.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/student/results')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900">
                  <Award className="h-6 w-6 text-teal-600 dark:text-teal-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">View Results</CardTitle>
              </div>
              <CardDescription>Check your latest grades and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/student/results');
              }}>
                View Results
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/student/assignments')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Assignments</CardTitle>
              </div>
              <CardDescription>View and submit your assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/student/assignments');
              }}>
                View Assignments
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/student/materials')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Download className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Study Materials</CardTitle>
              </div>
              <CardDescription>Access course materials and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/student/materials');
              }}>
                Browse Materials
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance record this semester</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/student/attendance')}>
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{attendance.percentage}%</p>
                <p className="text-sm text-muted-foreground">{attendance.present} present out of {attendance.total} days</p>
              </div>
              <div className="w-32 h-32">
                <Progress value={attendance.percentage} className="h-32 w-32 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{attendance.present}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{attendance.absent}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Your latest assessment results</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/results')}>
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
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGrades.map((grade, index) => (
                  <TableRow key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => navigate('/student/results')}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>
                      <span className="text-lg font-bold text-green-600">{grade.grade}</span>
                    </TableCell>
                    <TableCell>{grade.marks}</TableCell>
                    <TableCell>{grade.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/assignments')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAssignments.filter(a => a.status === 'pending').map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.subject} • Due: {assignment.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {assignment.daysLeft <= 2 && (
                      <Badge className="bg-red-100 text-red-800">
                        {assignment.daysLeft} day{assignment.daysLeft > 1 ? 's' : ''} left
                      </Badge>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDownload(assignment.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/announcements')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 border-b last:border-0">
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
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/student/classes')}>
                <BookOpen className="h-6 w-6 mb-2 text-teal-600" />
                <span>My Classes</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/student/timetable')}>
                <Calendar className="h-6 w-6 mb-2 text-blue-600" />
                <span>Timetable</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/student/materials')}>
                <Download className="h-6 w-6 mb-2 text-purple-600" />
                <span>Materials</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/profile')}>
                <Users className="h-6 w-6 mb-2 text-green-600" />
                <span>Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;