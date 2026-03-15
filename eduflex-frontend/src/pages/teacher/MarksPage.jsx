// pages/teacher/MarksPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Upload, Save, Download, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherMarksPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [marks, setMarks] = useState([]);

  const classes = ['10A', '10B', '11A', '11B', '12A'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const exams = ['Mid Term Exam', 'Final Exam', 'Unit Test 1', 'Unit Test 2'];

  const students = [
    { id: 1, rollNo: '2024-10A-001', name: 'John Smith', marks: 85, maxMarks: 100 },
    { id: 2, rollNo: '2024-10A-002', name: 'Emma Wilson', marks: 92, maxMarks: 100 },
    { id: 3, rollNo: '2024-10A-003', name: 'Michael Brown', marks: 78, maxMarks: 100 },
    { id: 4, rollNo: '2024-10A-004', name: 'Sarah Davis', marks: 88, maxMarks: 100 },
    { id: 5, rollNo: '2024-10A-005', name: 'James Johnson', marks: 95, maxMarks: 100 }
  ];

  const recentUploads = [
    { class: '10A', subject: 'Mathematics', exam: 'Mid Term Exam', date: '2024-03-10', status: 'verified' },
    { class: '11B', subject: 'Physics', exam: 'Unit Test 2', date: '2024-03-08', status: 'pending' },
    { class: '12A', subject: 'Chemistry', exam: 'Final Exam', date: '2024-03-05', status: 'verified' }
  ];

  const handleSaveMarks = () => {
    toast.success('Marks saved successfully!');
  };

  const handleUploadMarks = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      toast.error('Please select class, subject, and exam type');
      return;
    }
    toast.success('Marks uploaded for verification!');
  };

  const handleDownloadTemplate = () => {
    toast.info('Downloading marks entry template...');
  };

  const handleMarksChange = (studentId, value) => {
    // Handle marks change
    toast.info(`Updating marks for student ${studentId}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Upload Marks - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Marks</h1>
            <p className="text-muted-foreground mt-2">Enter and upload student marks for verification</p>
          </div>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>

        <Tabs defaultValue="entry" className="space-y-6">
          <TabsList>
            <TabsTrigger value="entry">Marks Entry</TabsTrigger>
            <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Exam Details</CardTitle>
                <CardDescription>Choose the class, subject, and exam type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Select Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(cls => (
                          <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {exams.map(exam => (
                          <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedClass && selectedSubject && selectedExam && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Marks Entry - {selectedClass} - {selectedSubject}</CardTitle>
                    <CardDescription>Maximum Marks: 100 | Passing Marks: 35</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleSaveMarks}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button onClick={handleUploadMarks} className="bg-teal-600 hover:bg-teal-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload for Verification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Marks Obtained</TableHead>
                        <TableHead>Max Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              defaultValue={student.marks}
                              className="w-24"
                              min="0"
                              max={student.maxMarks}
                              onChange={(e) => handleMarksChange(student.id, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>{student.maxMarks}</TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {((student.marks / student.maxMarks) * 100).toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            {student.marks >= 35 ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" /> Pass
                              </span>
                            ) : (
                              <span className="text-red-600">Fail</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Marks Uploads</CardTitle>
                <CardDescription>History of your marks submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUploads.map((upload, index) => (
                      <TableRow key={index}>
                        <TableCell>{upload.class}</TableCell>
                        <TableCell>{upload.subject}</TableCell>
                        <TableCell>{upload.exam}</TableCell>
                        <TableCell>{upload.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            upload.status === 'verified' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {upload.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Marks Analytics</CardTitle>
                <CardDescription>Performance insights and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Analytics dashboard coming soon! Track class performance trends here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherMarksPage;