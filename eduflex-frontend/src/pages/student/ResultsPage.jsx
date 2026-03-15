// pages/student/ResultsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Award, Download, TrendingUp, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentResultsPage = () => {
  const [selectedSemester, setSelectedSemester] = React.useState('semester1');

  const results = {
    name: 'John Smith',
    class: '10A',
    rollNumber: '2024-10A-001',
    semester: 'Semester 1, 2024',
    overallGrade: 'A',
    percentage: 89.5,
    subjects: [
      { name: 'Mathematics', marks: 92, total: 100, grade: 'A', status: 'excellent' },
      { name: 'Physics', marks: 85, total: 100, grade: 'B+', status: 'good' },
      { name: 'Chemistry', marks: 88, total: 100, grade: 'A-', status: 'good' },
      { name: 'English', marks: 94, total: 100, grade: 'A', status: 'excellent' },
      { name: 'History', marks: 82, total: 100, grade: 'B', status: 'average' },
      { name: 'Computer Science', marks: 98, total: 100, grade: 'A+', status: 'excellent' }
    ]
  };

  const previousResults = [
    { semester: 'Semester 2, 2023', percentage: 87.2, grade: 'A-' },
    { semester: 'Semester 1, 2023', percentage: 85.5, grade: 'B+' },
    { semester: 'Final Exam, 2022', percentage: 82.0, grade: 'B+' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'text-green-600 dark:text-green-400';
      case 'good': return 'text-blue-600 dark:text-blue-400';
      case 'average': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600';
    }
  };

  const handleDownloadResult = () => {
    toast.info('📄 Downloading result sheet...');
  };

  const handleViewDetails = (subject) => {
    toast.info(`Viewing detailed marks for ${subject}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Results - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Results</h1>
            <p className="text-muted-foreground mt-2">View your academic performance and progress</p>
          </div>
          <div className="flex space-x-3">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester1">Semester 1, 2024</SelectItem>
                <SelectItem value="semester2">Semester 2, 2023</SelectItem>
                <SelectItem value="semester3">Semester 1, 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleDownloadResult} className="bg-teal-600 hover:bg-teal-700">
              <Download className="h-4 w-4 mr-2" />
              Download Result
            </Button>
          </div>
        </div>

        {/* Overall Performance Card */}
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-teal-100 text-sm">Student Name</p>
                <p className="text-xl font-bold">{results.name}</p>
                <p className="text-teal-100 text-sm mt-2">Class: {results.class} | Roll: {results.rollNumber}</p>
              </div>
              <div>
                <p className="text-teal-100 text-sm">Overall Grade</p>
                <p className="text-4xl font-bold">{results.overallGrade}</p>
              </div>
              <div>
                <p className="text-teal-100 text-sm">Percentage</p>
                <p className="text-4xl font-bold">{results.percentage}%</p>
              </div>
              <div>
                <p className="text-teal-100 text-sm">Semester</p>
                <p className="text-xl font-bold">{results.semester}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Subject-wise Performance</CardTitle>
            <CardDescription>Detailed marks for each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks Obtained</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>{subject.marks}</TableCell>
                    <TableCell>{subject.total}</TableCell>
                    <TableCell>
                      <span className={`text-lg font-bold ${getStatusColor(subject.status)}`}>
                        {subject.grade}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={(subject.marks / subject.total) * 100} className="w-24" />
                        <span className="text-sm text-muted-foreground">
                          {((subject.marks / subject.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(subject.name)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
              Performance History
            </CardTitle>
            <CardDescription>Your academic progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{result.semester}</p>
                      <p className="text-sm text-muted-foreground">Grade: {result.grade}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-teal-600">{result.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentResultsPage;