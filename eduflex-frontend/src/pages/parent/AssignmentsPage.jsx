// pages/parent/AssignmentsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  FileText, Download, Eye, Calendar,
  Clock, CheckCircle, XCircle, AlertCircle,
  User, Filter, ChevronDown, ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentAssignmentsPage = () => {
  const [selectedChild, setSelectedChild] = useState('emma');
  const [expandedId, setExpandedId] = useState(null);

  const children = [
    { id: 'emma', name: 'Emma Johnson', class: '10A' },
    { id: 'david', name: 'David Johnson', class: '8B' }
  ];

  const assignments = {
    emma: [
      {
        id: 1,
        title: 'Quadratic Equations Practice',
        subject: 'Mathematics',
        teacher: 'Mr. Johnson',
        dueDate: '2024-03-20',
        assignedDate: '2024-03-10',
        status: 'pending',
        submissions: 28,
        totalStudents: 35,
        description: 'Solve the quadratic equations from Chapter 5, exercises 1-20.',
        attachments: ['worksheet.pdf']
      },
      {
        id: 2,
        title: 'Newton\'s Laws Lab Report',
        subject: 'Physics',
        teacher: 'Ms. Davis',
        dueDate: '2024-03-22',
        assignedDate: '2024-03-08',
        status: 'submitted',
        submittedDate: '2024-03-15',
        description: 'Write a detailed lab report on the Newton\'s laws experiment.',
        attachments: ['lab_instructions.pdf']
      },
      {
        id: 3,
        title: 'Periodic Table Quiz',
        subject: 'Chemistry',
        teacher: 'Dr. Wilson',
        dueDate: '2024-03-18',
        assignedDate: '2024-03-05',
        status: 'graded',
        obtainedMarks: 27,
        totalMarks: 30,
        feedback: 'Good work! Pay attention to transition elements.',
        description: 'Online quiz on periodic table trends and properties.'
      },
      {
        id: 4,
        title: 'Essay on Shakespeare',
        subject: 'English',
        teacher: 'Mrs. Brown',
        dueDate: '2024-03-15',
        assignedDate: '2024-03-01',
        status: 'late',
        description: 'Write a 1000-word essay on the themes in Shakespeare\'s "Hamlet".',
        attachments: ['rubric.pdf']
      }
    ],
    david: [
      {
        id: 5,
        title: 'Algebra Basics',
        subject: 'Mathematics',
        teacher: 'Mrs. Parker',
        dueDate: '2024-03-19',
        assignedDate: '2024-03-12',
        status: 'pending',
        description: 'Complete exercises 1-15 from Chapter 3.',
        attachments: ['worksheet.pdf']
      },
      {
        id: 6,
        title: 'Science Project',
        subject: 'Science',
        teacher: 'Mr. Roberts',
        dueDate: '2024-03-25',
        assignedDate: '2024-03-10',
        status: 'pending',
        description: 'Create a model of the solar system.',
        attachments: ['project_guidelines.pdf']
      },
      {
        id: 7,
        title: 'Book Report',
        subject: 'English',
        teacher: 'Ms. Thompson',
        dueDate: '2024-03-16',
        assignedDate: '2024-03-01',
        status: 'graded',
        obtainedMarks: 18,
        totalMarks: 20,
        feedback: 'Excellent analysis! Well written.',
        description: 'Write a book report on your favorite novel.'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'graded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'late': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      case 'graded': return <Award className="h-4 w-4" />;
      case 'late': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleViewAssignment = (assignment) => {
    toast.info(`Viewing assignment details`);
  };

  const handleDownloadAttachment = (filename) => {
    toast.info(`Downloading: ${filename}`);
  };

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactTeacher = (teacher) => {
    toast.info(`Contacting ${teacher}`);
  };

  const currentAssignments = assignments[selectedChild] || [];

  const pendingCount = currentAssignments.filter(a => a.status === 'pending' || a.status === 'late').length;
  const completedCount = currentAssignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Assignments - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
          <p className="text-muted-foreground mt-2">Track your children's assignments and progress</p>
        </div>

        {/* Child Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-teal-600" />
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

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{currentAssignments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">85%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignments</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="space-y-4">
          {currentAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <Badge className={getStatusColor(assignment.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1 capitalize">{assignment.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {assignment.subject}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {assignment.teacher}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {assignment.dueDate}
                      </span>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleToggleExpand(assignment.id)}>
                    {expandedId === assignment.id ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>
              
              {expandedId === assignment.id && (
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {assignment.description}
                    </p>

                    {assignment.status === 'graded' && (
                      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Grade</span>
                          <span className="text-lg font-bold text-green-600">
                            {assignment.obtainedMarks}/{assignment.totalMarks}
                          </span>
                        </div>
                        <Progress value={(assignment.obtainedMarks / assignment.totalMarks) * 100} className="h-2" />
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                          Feedback: {assignment.feedback}
                        </p>
                      </div>
                    )}

                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {assignment.attachments.map((file, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadAttachment(file)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              {file}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewAssignment(assignment)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactTeacher(assignment.teacher)}>
                        Contact Teacher
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Progress - {children.find(c => c.id === selectedChild)?.name}</CardTitle>
            <CardDescription>Completion status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm font-medium">{Math.round((completedCount / currentAssignments.length) * 100)}%</span>
                </div>
                <Progress value={(completedCount / currentAssignments.length) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentAssignmentsPage;