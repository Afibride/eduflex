
import React from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, Upload, FileText, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherDashboard = () => {
  const subjects = [
    { id: 1, name: 'Mathematics', classes: ['10A', '10B', '11A'], students: 75, color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' },
    { id: 2, name: 'Physics', classes: ['11A', '11B'], students: 48, color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' },
    { id: 3, name: 'Chemistry', classes: ['10A', '12A'], students: 52, color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' }
  ];

  const recentMarks = [
    { class: '10A', subject: 'Mathematics', date: '2024-03-08', status: 'Uploaded' },
    { class: '11A', subject: 'Physics', date: '2024-03-07', status: 'Pending Verification' },
    { class: '10B', subject: 'Mathematics', date: '2024-03-06', status: 'Verified' }
  ];

  const quickActions = [
    { title: 'Upload Marks', icon: Upload, description: 'Submit student marks for verification', action: 'upload' },
    { title: 'Create Assignment', icon: FileText, description: 'Create new assignments for students', action: 'assignment' },
    { title: 'View Class List', icon: Users, description: 'View students in your classes', action: 'classlist' }
  ];

  const handleAction = (action) => {
    toast.info('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀');
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
          <p className="text-muted-foreground mt-2">Manage your classes and student activities</p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.action} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction(action.action)}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900">
                      <Icon className="h-6 w-6 text-teal-600 dark:text-teal-300" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{action.title}</CardTitle>
                  </div>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleAction(action.action)}>
                    {action.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Assigned Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Your Subjects</CardTitle>
            <CardDescription>Classes and subjects you're teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {subject.classes.map((cls) => (
                          <span key={cls} className={`px-2 py-1 rounded-full text-xs font-medium ${subject.color}`}>
                            Class {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{subject.students}</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Marks Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Marks Activity</CardTitle>
            <CardDescription>Your latest marks submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">Class</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Subject</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Date</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMarks.map((mark, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">{mark.class}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{mark.subject}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{mark.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mark.status === 'Verified' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : mark.status === 'Uploaded'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {mark.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleAction('view')}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
