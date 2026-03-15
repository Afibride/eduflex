// pages/parent/PerformancePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  TrendingUp, Award, BookOpen, Users,
  Calendar, Download, Eye, Star,
  BarChart, PieChart, Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentPerformancePage = () => {
  const [selectedChild, setSelectedChild] = useState('emma');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const children = [
    { 
      id: 'emma', 
      name: 'Emma Johnson', 
      class: '10A',
      overallGrade: 'A',
      percentage: 91.5,
      rank: 5,
      totalStudents: 120,
      subjects: [
        { name: 'Mathematics', marks: 95, total: 100, grade: 'A+', trend: 'up', teacher: 'Mr. Johnson' },
        { name: 'Physics', marks: 88, total: 100, grade: 'A-', trend: 'up', teacher: 'Ms. Davis' },
        { name: 'Chemistry', marks: 90, total: 100, grade: 'A', trend: 'stable', teacher: 'Dr. Wilson' },
        { name: 'English', marks: 92, total: 100, grade: 'A', trend: 'up', teacher: 'Mrs. Brown' },
        { name: 'History', marks: 85, total: 100, grade: 'B+', trend: 'down', teacher: 'Mr. Williams' },
        { name: 'Computer Science', marks: 98, total: 100, grade: 'A+', trend: 'up', teacher: 'Mr. Smith' }
      ],
      monthlyProgress: [
        { month: 'Jan', percentage: 88 },
        { month: 'Feb', percentage: 90 },
        { month: 'Mar', percentage: 92 },
        { month: 'Apr', percentage: 91 },
        { month: 'May', percentage: 93 },
        { month: 'Jun', percentage: 95 }
      ],
      strengths: ['Mathematics', 'Computer Science', 'English'],
      improvements: ['History', 'Physics - needs more practice']
    },
    { 
      id: 'david', 
      name: 'David Johnson', 
      class: '8B',
      overallGrade: 'B+',
      percentage: 86.2,
      rank: 15,
      totalStudents: 110,
      subjects: [
        { name: 'Mathematics', marks: 88, total: 100, grade: 'A-', trend: 'up', teacher: 'Mrs. Parker' },
        { name: 'Science', marks: 82, total: 100, grade: 'B+', trend: 'stable', teacher: 'Mr. Roberts' },
        { name: 'Social Studies', marks: 85, total: 100, grade: 'B+', trend: 'up', teacher: 'Ms. Thompson' },
        { name: 'English', marks: 90, total: 100, grade: 'A', trend: 'up', teacher: 'Ms. Thompson' },
        { name: 'Hindi', marks: 80, total: 100, grade: 'B', trend: 'down', teacher: 'Mrs. Sharma' },
        { name: 'Art', marks: 92, total: 100, grade: 'A', trend: 'stable', teacher: 'Mr. Kumar' }
      ],
      monthlyProgress: [
        { month: 'Jan', percentage: 82 },
        { month: 'Feb', percentage: 84 },
        { month: 'Mar', percentage: 85 },
        { month: 'Apr', percentage: 86 },
        { month: 'May', percentage: 87 },
        { month: 'Jun', percentage: 88 }
      ],
      strengths: ['English', 'Art', 'Mathematics'],
      improvements: ['Hindi', 'Science - concepts need reinforcement']
    }
  ];

  const currentChild = children.find(c => c.id === selectedChild);

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const handleDownloadReport = () => {
    toast.info(`Downloading performance report for ${currentChild?.name}`);
  };

  const handleViewDetails = (subject) => {
    toast.info(`Viewing detailed performance for ${subject}`);
  };

  const handleScheduleMeeting = (teacher) => {
    toast.info(`Scheduling meeting with ${teacher}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Performance - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Tracking</h1>
            <p className="text-muted-foreground mt-2">Monitor your children's academic performance</p>
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
                  className={selectedChild === child.id ? 'bg-teal-600' : ''}
                  onClick={() => setSelectedChild(child.id)}
                >
                  {child.name} - Class {child.class}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
              <Award className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">{currentChild?.overallGrade}</div>
              <p className="text-xs text-muted-foreground mt-2">Semester 1, 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Percentage</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{currentChild?.percentage}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <Target className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{currentChild?.rank}</div>
              <p className="text-xs text-muted-foreground mt-2">out of {currentChild?.totalStudents}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpen className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{currentChild?.subjects.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subjects" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
              <TabsTrigger value="progress">Progress Trend</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {currentChild?.subjects.map(s => (
                  <SelectItem key={s.name} value={s.name.toLowerCase()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance - {currentChild?.name}</CardTitle>
                <CardDescription>Detailed breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentChild?.subjects
                      .filter(s => selectedSubject === 'all' || s.name.toLowerCase() === selectedSubject)
                      .map((subject, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>{subject.teacher}</TableCell>
                          <TableCell>
                            <span className="font-bold">{subject.marks}</span>/{subject.total}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                              subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {subject.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`text-lg font-bold ${getTrendColor(subject.trend)}`}>
                              {getTrendIcon(subject.trend)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewDetails(subject.name)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleScheduleMeeting(subject.teacher)}>
                                Contact
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Trend - {currentChild?.name}</CardTitle>
                <CardDescription>Monthly performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentChild?.monthlyProgress.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{month.month}</span>
                        <span className="font-bold text-teal-600">{month.percentage}%</span>
                      </div>
                      <Progress value={month.percentage} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Improvement</span>
                    <span className="text-lg font-bold text-green-600">+7%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consistent improvement over the last 6 months
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentChild?.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentChild?.improvements.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium mb-2">Academic Recommendations</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Focus on History - additional practice recommended</li>
                        <li>• Join the Mathematics club to enhance problem-solving skills</li>
                        <li>• Consider extra help sessions for Physics concepts</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-medium mb-2">Teacher Comments</h4>
                      <p className="text-sm">
                        {currentChild?.name} is a dedicated student who participates actively in class. 
                        Shows particular strength in analytical subjects. Continue encouraging reading habits.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Compare performance across children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{child.name}</span>
                    <span className="font-bold text-teal-600">{child.percentage}%</span>
                  </div>
                  <Progress value={child.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentPerformancePage;