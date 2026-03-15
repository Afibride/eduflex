// pages/admin/ParentsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Edit, Trash2, Mail, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentsPage = () => {
  const parents = [
    { id: 1, name: 'Robert Smith', email: 'robert.s@email.com', phone: '+1 234-567-8901', children: ['John Smith'], students: 1 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah.w@email.com', phone: '+1 234-567-8902', children: ['Emma Wilson', 'David Wilson'], students: 2 },
    { id: 3, name: 'Michael Brown', email: 'michael.b@email.com', phone: '+1 234-567-8903', children: ['James Brown'], students: 1 },
  ];

  const handleAction = (action, parent) => {
    toast.info(`🚧 ${action} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Manage Parents - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Parents</h1>
            <p className="text-muted-foreground mt-2">Manage parent accounts and communications</p>
          </div>
          <Button onClick={() => handleAction('Add Parent')} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Parent
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Parents</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search parents..." className="pl-10 w-64" />
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
                  <TableHead>Children</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parents.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell className="font-medium">{parent.name}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>{parent.children.join(', ')}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {parent.students} Student{parent.students > 1 ? 's' : ''}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleAction('Edit', parent)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Message', parent)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Call', parent)}>
                          <Phone className="h-4 w-4" />
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

export default ParentsPage;