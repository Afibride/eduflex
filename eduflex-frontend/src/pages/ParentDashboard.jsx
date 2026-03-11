
import React from 'react';
import { Helmet } from 'react-helmet';
import { User, Award, DollarSign, Download, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentDashboard = () => {
  const childInfo = {
    name: 'Emma Johnson',
    class: '10A',
    rollNumber: '2024-10A-015',
    profilePicture: null
  };

  const grades = [
    { subject: 'Mathematics', grade: 'A', marks: '92/100', trend: 'up' },
    { subject: 'Physics', grade: 'B+', marks: '85/100', trend: 'up' },
    { subject: 'Chemistry', grade: 'A-', marks: '88/100', trend: 'stable' },
    { subject: 'English', grade: 'A', marks: '94/100', trend: 'up' },
    { subject: 'History', grade: 'B', marks: '82/100', trend: 'down' }
  ];

  const fees = {
    total: 5000,
    paid: 3000,
    pending: 2000,
    dueDate: '2024-04-01',
    breakdown: [
      { item: 'Tuition Fee', amount: 3500, paid: 2000 },
      { item: 'Library Fee', amount: 500, paid: 500 },
      { item: 'Lab Fee', amount: 600, paid: 300 },
      { item: 'Sports Fee', amount: 400, paid: 200 }
    ]
  };

  const performance = {
    attendance: 92,
    behavior: 'Excellent',
    overallGrade: 'A',
    teacherComments: 'Emma is a dedicated student who consistently performs well in all subjects.'
  };

  const handleDownloadReport = () => {
    toast.info('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀');
  };

  const handlePayFees = () => {
    toast.info('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀');
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
          <p className="text-muted-foreground mt-2">Monitor your child's academic journey</p>
        </div>

        {/* Child Info Card */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-600 text-white text-2xl font-bold">
                {childInfo.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{childInfo.name}</h3>
                <p className="text-muted-foreground">Class: {childInfo.class} | Roll No: {childInfo.rollNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Grade</CardTitle>
              <Award className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{performance.overallGrade}</div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Excellent performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
              <User className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{performance.attendance}%</div>
              <Progress value={performance.attendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Behavior</CardTitle>
              <AlertCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{performance.behavior}</div>
              <p className="text-sm text-muted-foreground mt-2">Well-behaved student</p>
            </CardContent>
          </Card>
        </div>

        {/* Academic Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Academic Results</CardTitle>
            <CardDescription>Current semester performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">Subject</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Grade</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Marks</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">{grade.subject}</TableCell>
                    <TableCell>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">{grade.grade}</span>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">{grade.marks}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        grade.trend === 'up' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : grade.trend === 'down'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {grade.trend === 'up' ? '↑ Improving' : grade.trend === 'down' ? '↓ Needs attention' : '→ Stable'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fees Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
              Fees Status
            </CardTitle>
            <CardDescription>Payment details and breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fees.pending > 0 && (
              <Alert className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-900 dark:text-orange-100">Pending Payment</AlertTitle>
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  You have ${fees.pending} pending. Due date: {fees.dueDate}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${fees.total}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${fees.paid}</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">${fees.pending}</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900 dark:text-white">Fee Item</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Amount</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Paid</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.breakdown.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">{item.item}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">${item.amount}</TableCell>
                    <TableCell className="text-gray-900 dark:text-white">${item.paid}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.paid >= item.amount
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {item.paid >= item.amount ? 'Paid' : 'Partial'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" onClick={handlePayFees}>
              Pay Pending Fees
            </Button>
          </CardContent>
        </Card>

        {/* Teacher Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Performance Report</CardTitle>
            <CardDescription>Teacher's feedback and comments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-900 dark:text-white">{performance.teacherComments}</p>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
