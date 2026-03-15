// pages/parent/ResultsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Award, Download, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentResultsPage = () => {
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      class: '10A',
      rollNumber: '2024-10A-015',
      results: {
        overallGrade: 'A',
        percentage: 91.5,
        subjects: [
          { name: 'Mathematics', marks: 95, total: 100, grade: 'A+' },
          { name: 'Physics', marks: 88, total: 100, grade: 'A-' },
          { name: 'Chemistry', marks: 90, total: 100, grade: 'A' },
          { name: 'English', marks: 92, total: 100, grade: 'A' },
          { name: 'History', marks: 85, total: 100, grade: 'B+' },
          { name: 'Computer Science', marks: 98, total: 100, grade: 'A+' }
        ]
      }
    },
    {
      id: 2,
      name: 'David Johnson',
      class: '8B',
      rollNumber: '2024-8B-032',
      results: {
        overallGrade: 'B+',
        percentage: 86.2,
        subjects: [
          { name: 'Mathematics', marks: 88, total: 100, grade: 'A-' },
          { name: 'Science', marks: 82, total: 100, grade: 'B+' },
          { name: 'Social Studies', marks: 85, total: 100, grade: 'B+' },
          { name: 'English', marks: 90, total: 100, grade: 'A' },
          { name: 'Hindi', marks: 80, total: 100, grade: 'B' },
          { name: 'Art', marks: 92, total: 100, grade: 'A' }
        ]
      }
    }
  ];

  const [selectedChild, setSelectedChild] = React.useState(children[0]);

  const handleDownloadReport = () => {
    toast.info(`Downloading report for ${selectedChild.name}...`);
  };

  const handleViewDetails = (subject) => {
    toast.info(`Viewing detailed marks for ${subject}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Children's Results - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Children's Results</h1>
            <p className="text-muted-foreground mt-2">Monitor your children's academic performance</p>
          </div>
          <Button onClick={handleDownloadReport} className="bg-teal-600 hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
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
                  variant={selectedChild.id === child.id ? 'default' : 'outline'}
                  className={selectedChild.id === child.id ? 'bg-teal-600' : ''}
                  onClick={() => setSelectedChild(child)}
                >
                  {child.name} - Class {child.class}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results for Selected Child */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              {selectedChild.name}'s Academic Results
            </CardTitle>
            <CardDescription>
              Class: {selectedChild.class} | Roll Number: {selectedChild.rollNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-4xl font-bold text-teal-600">{selectedChild.results.overallGrade}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-muted-foreground">Overall Percentage</p>
                <p className="text-4xl font-bold text-teal-600">{selectedChild.results.percentage}%</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedChild.results.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>{subject.marks}</TableCell>
                    <TableCell>{subject.total}</TableCell>
                    <TableCell>
                      <span className="text-lg font-bold text-green-600">{subject.grade}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={(subject.marks / subject.total) * 100} className="w-20" />
                        <span>{((subject.marks / subject.total) * 100).toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(subject.name)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
              Performance Comparison
            </CardTitle>
            <CardDescription>Compare performance across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedChild.results.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-teal-600 font-bold">{((subject.marks / subject.total) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(subject.marks / subject.total) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentResultsPage;