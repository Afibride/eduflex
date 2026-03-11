
import React from 'react';
import { Helmet } from 'react-helmet';
import { Award, Calendar, FileText, Download, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const grades = [
    { subject: 'Mathematics', grade: 'A', marks: '92/100', color: 'text-green-600 dark:text-green-400' },
    { subject: 'Physics', grade: 'B+', marks: '85/100', color: 'text-blue-600 dark:text-blue-400' },
    { subject: 'Chemistry', grade: 'A-', marks: '88/100', color: 'text-green-600 dark:text-green-400' },
    { subject: 'English', grade: 'A', marks: '94/100', color: 'text-green-600 dark:text-green-400' },
    { subject: 'History', grade: 'B', marks: '82/100', color: 'text-blue-600 dark:text-blue-400' },
    { subject: 'Computer Science', grade: 'A+', marks: '98/100', color: 'text-green-600 dark:text-green-400' }
  ];

  const assignments = [
    { id: 1, title: 'Math Assignment 1', subject: 'Mathematics', dueDate: '2024-03-15', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { id: 2, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-03-12', status: 'Submitted', statusColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { id: 3, title: 'Chemistry Project', subject: 'Chemistry', dueDate: '2024-03-20', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { id: 4, title: 'English Essay', subject: 'English', dueDate: '2024-03-18', status: 'Graded', statusColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' }
  ];

  const attendance = {
    percentage: 92,
    present: 165,
    total: 180,
    absent: 15
  };

  const handleDownload = (assignmentId) => {
    toast.info('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀');
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
          <p className="text-muted-foreground mt-2">Track your academic progress and assignments</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Grade</CardTitle>
              <Award className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">A</div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Excellent performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
              <Calendar className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{attendance.percentage}%</div>
              <Progress value={attendance.percentage} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {attendance.present} of {attendance.total} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Assignments</CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {assignments.filter(a => a.status === 'Pending').length}
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                Complete them soon!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Your Grades</CardTitle>
            <CardDescription>Current semester performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">Subject</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Grade</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Marks</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">{grade.subject}</TableCell>
                    <TableCell>
                      <span className={`text-lg font-bold ${grade.color}`}>{grade.grade}</span>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{grade.marks}</TableCell>
                    <TableCell>
                      <Progress value={parseInt(grade.marks.split('/')[0])} className="w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Assignments</CardTitle>
            <CardDescription>Your current and upcoming assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">Title</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Subject</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Due Date</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">{assignment.title}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{assignment.subject}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{assignment.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${assignment.statusColor}`}>
                        {assignment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(assignment.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
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

export default StudentDashboard;
