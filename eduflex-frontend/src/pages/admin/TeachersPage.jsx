// pages/admin/TeachersPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeachersPage = () => {
  const teachers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@school.com', phone: '+1 234-567-8901', subjects: ['Mathematics', 'Physics'], classes: ['10A', '11B'] },
    { id: 2, name: 'Michael Brown', email: 'michael.b@school.com', phone: '+1 234-567-8902', subjects: ['English', 'History'], classes: ['9A', '10B'] },
    { id: 3, name: 'Emily Davis', email: 'emily.d@school.com', phone: '+1 234-567-8903', subjects: ['Chemistry', 'Biology'], classes: ['11A', '12A'] },
  ];

  const handleAction = (action, teacher) => {
    toast.info(`🚧 ${action} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Manage Teachers - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
            <p className="text-muted-foreground mt-2">Manage teacher accounts and assignments</p>
          </div>
          <Button onClick={() => handleAction('Add Teacher')} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Teachers</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search teachers..." className="pl-10 w-64" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.subjects.join(', ')}</TableCell>
                    <TableCell>{teacher.classes.join(', ')}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction('Edit', teacher)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Delete', teacher)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Email', teacher)}>
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

export default TeachersPage;