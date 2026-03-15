// pages/teacher/ClassesPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Users, GraduationCap, BookOpen, Calendar,
  Download, Eye, Mail, MessageSquare,
  TrendingUp, Filter, Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    {
      id: 1,
      name: '10A',
      subject: 'Mathematics',
      students: 35,
      schedule: 'Mon/Wed/Fri 9:00 AM',
      room: '101',
      averageGrade: 'B+',
      performance: 85
    },
    {
      id: 2,
      name: '10B',
      subject: 'Mathematics',
      students: 32,
      schedule: 'Tue/Thu 10:30 AM',
      room: '102',
      averageGrade: 'B',
      performance: 78
    },
    {
      id: 3,
      name: '11A',
      subject: 'Physics',
      students: 28,
      schedule: 'Mon/Wed 11:00 AM',
      room: '203',
      averageGrade: 'A-',
      performance: 92
    },
    {
      id: 4,
      name: '11B',
      subject: 'Physics',
      students: 30,
      schedule: 'Tue/Thu 1:00 PM',
      room: '204',
      averageGrade: 'B+',
      performance: 88
    }
  ];

  const students = {
    '10A': [
      { id: 1, name: 'John Smith', rollNo: '2024-10A-001', attendance: 92, grade: 'A', parent: 'Robert Smith', parentPhone: '+1 234-567-8901' },
      { id: 2, name: 'Emma Wilson', rollNo: '2024-10A-002', attendance: 88, grade: 'B+', parent: 'Sarah Wilson', parentPhone: '+1 234-567-8902' },
      { id: 3, name: 'Michael Brown', rollNo: '2024-10A-003', attendance: 95, grade: 'A', parent: 'David Brown', parentPhone: '+1 234-567-8903' },
      { id: 4, name: 'Sarah Davis', rollNo: '2024-10A-004', attendance: 76, grade: 'C+', parent: 'Jennifer Davis', parentPhone: '+1 234-567-8904' },
      { id: 5, name: 'James Johnson', rollNo: '2024-10A-005', attendance: 89, grade: 'B', parent: 'Robert Johnson', parentPhone: '+1 234-567-8905' },
    ]
  };

  const filteredStudents = students[selectedClass]?.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStudent = (student) => {
    toast.info(`Viewing details for ${student.name}`);
  };

  const handleContactParent = (student) => {
    toast.info(`Contacting parent of ${student.name}`);
  };

  const handleSendMessage = (student) => {
    toast.info(`Sending message to ${student.name}`);
  };

  const handleExportClass = () => {
    toast.info(`Exporting class ${selectedClass} data`);
  };

  const handleTakeAttendance = () => {
    toast.info(`Taking attendance for class ${selectedClass}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Classes - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
            <p className="text-muted-foreground mt-2">Manage your classes and students</p>
          </div>
          <Button variant="outline" onClick={handleExportClass}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Class Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((cls) => (
            <Card 
              key={cls.id} 
              className={`cursor-pointer hover:border-teal-500 transition-colors ${selectedClass === cls.name ? 'border-teal-500 bg-teal-50 dark:bg-teal-950' : ''}`}
              onClick={() => setSelectedClass(cls.name)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Class {cls.name}</CardTitle>
                  <Badge variant="outline">{cls.subject}</Badge>
                </div>
                <CardDescription>{cls.schedule}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{cls.students} Students</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{cls.averageGrade}</p>
                    <p className="text-xs text-muted-foreground">Avg. Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Class Details */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Class {selectedClass} - Students</CardTitle>
                <CardDescription>
                  {classes.find(c => c.name === selectedClass)?.subject} | Room {classes.find(c => c.name === selectedClass)?.room}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleTakeAttendance}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Take Attendance
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="top">Top Performers</SelectItem>
                    <SelectItem value="needs">Needs Attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Current Grade</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-teal-600 text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={student.attendance} className="w-16 h-2" />
                        <span className={student.attendance >= 85 ? 'text-green-600' : 'text-yellow-600'}>
                          {student.attendance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{student.parent}</p>
                        <p className="text-xs text-muted-foreground">{student.parentPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleContactParent(student)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSendMessage(student)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Class Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Class Statistics</CardTitle>
            <CardDescription>Performance metrics for Class {selectedClass}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Total Students</span>
                </div>
                <p className="text-2xl font-bold mt-2">35</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Average Grade</span>
                </div>
                <p className="text-2xl font-bold mt-2">B+</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span className="text-sm text-muted-foreground">Avg. Attendance</span>
                </div>
                <p className="text-2xl font-bold mt-2">88%</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-muted-foreground">Top Performers</span>
                </div>
                <p className="text-2xl font-bold mt-2">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClassesPage;