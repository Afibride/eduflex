// pages/admin/StudentsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Edit, Trash2, Mail, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentsPage = () => {
  const students = [
    { id: 1, name: 'John Smith', email: 'john.s@student.com', class: '10A', rollNumber: '2024-10A-001', parent: 'Robert Smith' },
    { id: 2, name: 'Emma Wilson', email: 'emma.w@student.com', class: '11B', rollNumber: '2024-11B-015', parent: 'Sarah Wilson' },
    { id: 3, name: 'James Brown', email: 'james.b@student.com', class: '9A', rollNumber: '2024-9A-008', parent: 'Michael Brown' },
  ];

  const handleAction = (action, student) => {
    toast.info(`🚧 ${action} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Manage Students - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
            <p className="text-muted-foreground mt-2">Manage student records and enrollments</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => handleAction('Bulk Import')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button onClick={() => handleAction('Add Student')} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Students</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search students..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.parent}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction('Edit', student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Delete', student)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Email', student)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
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

export default StudentsPage;