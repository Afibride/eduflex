// pages/admin/MarksVerificationPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const MarksVerificationPage = () => {
  const [filter, setFilter] = useState('all');

  const pendingMarks = [
    { id: 1, class: '10A', subject: 'Mathematics', teacher: 'Sarah Johnson', date: '2024-03-10', status: 'pending', students: 35 },
    { id: 2, class: '11B', subject: 'Physics', teacher: 'Michael Brown', date: '2024-03-09', status: 'pending', students: 28 },
    { id: 3, class: '9A', subject: 'English', teacher: 'Emily Davis', date: '2024-03-08', status: 'verified', students: 32 },
    { id: 4, class: '12A', subject: 'Chemistry', teacher: 'Robert Wilson', date: '2024-03-07', status: 'rejected', students: 24 },
  ];

  const filteredMarks = filter === 'all' 
    ? pendingMarks 
    : pendingMarks.filter(m => m.status === filter);

  const handleVerify = (id) => {
    toast.success('Marks verified successfully!');
  };

  const handleReject = (id) => {
    toast.error('Marks rejected. Teacher will be notified.');
  };

  const handleView = (id) => {
    toast.info('Viewing marks details...');
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Marks Verification - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Marks Verification</h1>
            <p className="text-muted-foreground mt-2">Review and verify submitted marks</p>
          </div>
          <Button variant="outline" onClick={() => toast.info('Export feature coming soon!')}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Verifications</CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarks.map((mark) => (
                  <TableRow key={mark.id}>
                    <TableCell className="font-medium">{mark.class}</TableCell>
                    <TableCell>{mark.subject}</TableCell>
                    <TableCell>{mark.teacher}</TableCell>
                    <TableCell>{mark.date}</TableCell>
                    <TableCell>{mark.students}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mark.status === 'verified' 
                          ? 'bg-green-100 text-green-800'
                          : mark.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mark.status.charAt(0).toUpperCase() + mark.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(mark.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {mark.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleVerify(mark.id)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReject(mark.id)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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

export default MarksVerificationPage;