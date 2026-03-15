// pages/teacher/SubjectsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  BookOpen, Users, Calendar, TrendingUp, 
  Award, Clock, BarChart, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherSubjectsPage = () => {
  const subjects = [
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH101',
      classes: ['10A', '10B', '11A'],
      students: 75,
      schedule: 'Mon/Wed/Fri 9:00 AM',
      progress: 65,
      topics: [
        'Quadratic Equations',
        'Linear Algebra',
        'Calculus Basics',
        'Probability'
      ]
    },
    {
      id: 2,
      name: 'Physics',
      code: 'PHY201',
      classes: ['11A', '11B'],
      students: 48,
      schedule: 'Tue/Thu 10:30 AM',
      progress: 42,
      topics: [
        'Newton\'s Laws',
        'Thermodynamics',
        'Wave Motion',
        'Electricity'
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      code: 'CHEM101',
      classes: ['10A', '12A'],
      students: 52,
      schedule: 'Mon/Wed 2:00 PM',
      progress: 38,
      topics: [
        'Periodic Table',
        'Chemical Bonding',
        'Organic Chemistry',
        'Acids and Bases'
      ]
    }
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', class: '10A', topic: 'Quadratic Equations', time: 'Today 9:00 AM', room: '101' },
    { subject: 'Physics', class: '11A', topic: 'Newton\'s Laws', time: 'Today 11:00 AM', room: '203' },
    { subject: 'Chemistry', class: '12A', topic: 'Organic Chemistry', time: 'Tomorrow 2:00 PM', room: '105' }
  ];

  const recentTopics = [
    { subject: 'Mathematics', topic: 'Linear Equations', completed: 'Mar 10', performance: '92%' },
    { subject: 'Physics', topic: 'Motion Basics', completed: 'Mar 8', performance: '85%' },
    { subject: 'Chemistry', topic: 'Atomic Structure', completed: 'Mar 5', performance: '78%' }
  ];

  const handleViewDetails = (subject) => {
    toast.info(`Viewing details for ${subject.name}`);
  };

  const handleDownloadSyllabus = (subject) => {
    toast.info(`Downloading syllabus for ${subject.name}`);
  };

  const handleTakeAttendance = (subject) => {
    toast.info(`Taking attendance for ${subject.name}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Subjects - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Subjects</h1>
          <p className="text-muted-foreground mt-2">Manage your teaching subjects and classes</p>
        </div>

        {/* Subject Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">{subject.name}</CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </div>
                  <div className="p-2 bg-teal-600 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{subject.students} Students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{subject.classes.length} Classes</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Classes:</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.classes.map((cls) => (
                      <span key={cls} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                        Class {cls}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Schedule:</p>
                  <p className="text-sm text-muted-foreground">{subject.schedule}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(subject)}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadSyllabus(subject)}>
                    <Download className="h-4 w-4 mr-1" />
                    Syllabus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Overview</CardTitle>
                <CardDescription>Summary of your teaching activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <BookOpen className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                    <p className="text-2xl font-bold">{subjects.length}</p>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold">175</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Hours/Week</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Award className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Avg. Performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your next scheduled classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingClasses.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.subject}</TableCell>
                        <TableCell>{item.class}</TableCell>
                        <TableCell>{item.topic}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>Room {item.room}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={handleTakeAttendance}>
                            Attendance
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics">
            <Card>
              <CardHeader>
                <CardTitle>Recent Topics Covered</CardTitle>
                <CardDescription>Topics you've recently taught</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Class Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTopics.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.subject}</TableCell>
                        <TableCell>{item.topic}</TableCell>
                        <TableCell>{item.completed}</TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">{item.performance}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average performance by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-teal-600 font-bold">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{subject.students} students</span>
                        <span>{subject.classes.length} classes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherSubjectsPage;