// pages/student/AssignmentsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  FileText, Download, Upload, Clock,
  CheckCircle, XCircle, AlertCircle,
  Calendar, Eye, Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentAssignmentsPage = () => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      dueDate: '2024-03-20',
      assignedDate: '2024-03-10',
      totalMarks: 50,
      status: 'pending',
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
      totalMarks: 100,
      status: 'submitted',
      submittedDate: '2024-03-15',
      description: 'Write a detailed lab report on the Newton\'s laws experiment.',
      attachments: ['lab_instructions.pdf', 'template.docx']
    },
    {
      id: 3,
      title: 'Periodic Table Quiz',
      subject: 'Chemistry',
      teacher: 'Dr. Wilson',
      dueDate: '2024-03-18',
      assignedDate: '2024-03-05',
      totalMarks: 30,
      status: 'graded',
      obtainedMarks: 27,
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
      totalMarks: 50,
      status: 'late',
      description: 'Write a 1000-word essay on the themes in Shakespeare\'s "Hamlet".',
      attachments: ['rubric.pdf']
    },
    {
      id: 5,
      title: 'Computer Science Project',
      subject: 'Computer Science',
      teacher: 'Mr. Smith',
      dueDate: '2024-03-25',
      assignedDate: '2024-03-12',
      totalMarks: 100,
      status: 'pending',
      description: 'Create a simple web application using HTML, CSS, and JavaScript.',
      attachments: ['project_requirements.pdf', 'sample_code.zip']
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

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
      case 'submitted': return <Upload className="h-4 w-4" />;
      case 'graded': return <CheckCircle className="h-4 w-4" />;
      case 'late': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    toast.info(`Viewing: ${assignment.title}`);
  };

  const handleDownloadAttachment = (filename) => {
    toast.info(`Downloading: ${filename}`);
  };

  const handleSubmitAssignment = () => {
    setIsSubmitDialogOpen(false);
    toast.success('Assignment submitted successfully!');
  };

  const handleOpenSubmitDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitDialogOpen(true);
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Assignments - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Assignments</h1>
            <p className="text-muted-foreground mt-2">View and submit your assignments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
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
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assignments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {assignments.filter(a => a.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <Upload className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {assignments.filter(a => a.status === 'submitted').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">85%</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Current semester assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => {
                  const daysRemaining = getDaysRemaining(assignment.dueDate);
                  return (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-xs text-muted-foreground">Assigned: {assignment.assignedDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.teacher}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{assignment.dueDate}</span>
                          {assignment.status === 'pending' && daysRemaining <= 2 && (
                            <Badge variant="outline" className="ml-2 bg-red-100 text-red-800">
                              {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1 capitalize">{assignment.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assignment.status === 'graded' ? (
                          <div>
                            <span className="font-bold text-green-600">{assignment.obtainedMarks}</span>
                            <span className="text-muted-foreground">/{assignment.totalMarks}</span>
                          </div>
                        ) : (
                          <span>/{assignment.totalMarks}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewAssignment(assignment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {assignment.attachments && (
                            <Button variant="outline" size="sm" onClick={() => handleDownloadAttachment(assignment.attachments[0])}>
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {(assignment.status === 'pending' || assignment.status === 'late') && (
                            <Button size="sm" onClick={() => handleOpenSubmitDialog(assignment)} className="bg-teal-600 hover:bg-teal-700">
                              <Upload className="h-4 w-4 mr-1" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Submit Assignment Dialog */}
        <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>
                {selectedAssignment?.title} - {selectedAssignment?.subject}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Comments (Optional)</Label>
                <Textarea placeholder="Add any comments for your teacher..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Upload File</Label>
                <Input type="file" className="cursor-pointer" />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, DOC, DOCX, ZIP (Max size: 10MB)
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Due date: {selectedAssignment?.dueDate}. Late submissions may incur penalties.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitAssignment} className="bg-teal-600 hover:bg-teal-700">
                <Upload className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assignment Details Dialog */}
        {selectedAssignment && (
          <Dialog open={!!selectedAssignment && !isSubmitDialogOpen} onOpenChange={() => setSelectedAssignment(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedAssignment.title}</DialogTitle>
                <DialogDescription>
                  {selectedAssignment.subject} • {selectedAssignment.teacher}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Date</p>
                    <p className="font-medium">{selectedAssignment.assignedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{selectedAssignment.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                    <p className="font-medium">{selectedAssignment.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={getStatusColor(selectedAssignment.status)}>
                      {selectedAssignment.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.attachments && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Attachments</p>
                    <div className="space-y-2">
                      {selectedAssignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{file}</span>
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadAttachment(file)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAssignment.status === 'graded' && (
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Feedback</h4>
                    <p className="text-sm mb-2">Marks: {selectedAssignment.obtainedMarks}/{selectedAssignment.totalMarks}</p>
                    <p className="text-sm">{selectedAssignment.feedback}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignmentsPage;