// pages/TeacherDashboard.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Upload, FileText, Users, 
  TrendingUp, Calendar, Clock, Award,
  CheckCircle, Bell, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Students', value: 175, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900', link: '/teacher/classes' },
    { title: 'Subjects', value: 3, icon: BookOpen, color: 'text-teal-600', bgColor: 'bg-teal-100 dark:bg-teal-900', link: '/teacher/subjects' },
    { title: 'Pending Tasks', value: 8, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900', link: '/teacher/assignments' },
    { title: 'Avg. Performance', value: '85%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900', link: '/teacher/marks' }
  ];

  const subjects = [
    { id: 1, name: 'Mathematics', classes: ['10A', '10B', '11A'], students: 75, progress: 65, color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' },
    { id: 2, name: 'Physics', classes: ['11A', '11B'], students: 48, progress: 42, color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' },
    { id: 3, name: 'Chemistry', classes: ['10A', '12A'], students: 52, progress: 38, color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' }
  ];

  const recentMarks = [
    { class: '10A', subject: 'Mathematics', date: '2024-03-08', status: 'Uploaded', pending: 0 },
    { class: '11A', subject: 'Physics', date: '2024-03-07', status: 'Pending Verification', pending: 28 },
    { class: '10B', subject: 'Mathematics', date: '2024-03-06', status: 'Verified', pending: 0 }
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', class: '10A', topic: 'Quadratic Equations' },
    { time: '11:00 AM', subject: 'Physics', class: '11A', topic: 'Newton\'s Laws' },
    { time: '02:00 PM', subject: 'Chemistry', class: '12A', topic: 'Organic Chemistry' }
  ];

  const pendingAssignments = [
    { title: 'Quadratic Equations', class: '10A', submissions: 28, total: 35 },
    { title: 'Lab Report', class: '11A', submissions: 15, total: 28 }
  ];

  const handleQuickAction = (link) => {
    navigate(link);
  };

  const handleViewAll = (link) => {
    navigate(link);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Teacher Dashboard - EduFlex</title>
        <meta name="description" content="Manage your classes, upload marks, create assignments, and track student progress from the teacher dashboard." />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Manage your classes and student activities</p>
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

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/marks')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900">
                  <Upload className="h-6 w-6 text-teal-600 dark:text-teal-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Upload Marks</CardTitle>
              </div>
              <CardDescription>Submit student marks for verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/teacher/marks');
              }}>
                Upload Marks
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/assignments')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Create Assignment</CardTitle>
              </div>
              <CardDescription>Create new assignments for students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/teacher/assignments');
              }}>
                Create Assignment
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/classes')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">View Classes</CardTitle>
              </div>
              <CardDescription>View students in your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={(e) => {
                e.stopPropagation();
                navigate('/teacher/classes');
              }}>
                View Classes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/teacher/schedule')}>
                View Full Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Clock className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.subject} - Class {item.class}</p>
                      <p className="text-sm text-muted-foreground">{item.topic}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Subjects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Your Subjects</CardTitle>
                <CardDescription>Classes and subjects you're teaching</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/teacher/subjects')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {subject.classes.map((cls) => (
                            <span key={cls} className={`px-2 py-0.5 rounded-full text-xs font-medium ${subject.color}`}>
                              Class {cls}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{subject.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pending Assignments</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/assignments')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingAssignments.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-sm">Class {item.class}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Progress value={(item.submissions / item.total) * 100} className="w-32 h-2" />
                      <span className="text-sm">{item.submissions}/{item.total} submitted</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Marks Activity */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Marks Activity</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/marks')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMarks.map((mark, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <p className="font-medium">{mark.class} - {mark.subject}</p>
                      <p className="text-xs text-muted-foreground">{mark.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mark.status === 'Verified' 
                          ? 'bg-green-100 text-green-800'
                          : mark.status === 'Uploaded'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mark.status}
                      </span>
                      {mark.pending > 0 && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {mark.pending} pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/teacher/attendance')}>
                <Calendar className="h-6 w-6 mb-2 text-teal-600" />
                <span>Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/teacher/announcements')}>
                <Bell className="h-6 w-6 mb-2 text-blue-600" />
                <span>Announcements</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/teacher/schedule')}>
                <Clock className="h-6 w-6 mb-2 text-purple-600" />
                <span>Schedule</span>
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

export default TeacherDashboard;