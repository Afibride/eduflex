// pages/parent/FeesPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { DollarSign, CreditCard, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentFeesPage = () => {
  const fees = {
    total: 5000,
    paid: 3200,
    pending: 1800,
    dueDate: '2024-04-15',
    children: [
      {
        name: 'Emma Johnson',
        class: '10A',
        fees: [
          { id: 1, item: 'Tuition Fee', amount: 2000, paid: 1500, dueDate: '2024-04-15', status: 'partial' },
          { id: 2, item: 'Library Fee', amount: 300, paid: 300, dueDate: '2024-03-01', status: 'paid' },
          { id: 3, item: 'Lab Fee', amount: 400, paid: 200, dueDate: '2024-04-15', status: 'partial' },
          { id: 4, item: 'Sports Fee', amount: 300, paid: 0, dueDate: '2024-04-15', status: 'pending' }
        ]
      },
      {
        name: 'David Johnson',
        class: '8B',
        fees: [
          { id: 5, item: 'Tuition Fee', amount: 1500, paid: 1000, dueDate: '2024-04-15', status: 'partial' },
          { id: 6, item: 'Library Fee', amount: 200, paid: 200, dueDate: '2024-03-01', status: 'paid' },
          { id: 7, item: 'Activity Fee', amount: 300, paid: 0, dueDate: '2024-04-15', status: 'pending' }
        ]
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  const handlePayNow = (fee) => {
    toast.info(`Proceeding to pay for ${fee.item}...`);
  };

  const handlePayAll = () => {
    toast.info('Redirecting to payment gateway...');
  };

  const handleDownloadReceipt = (fee) => {
    toast.info(`Downloading receipt for ${fee.item}...`);
  };

  const totalPending = fees.children.reduce((acc, child) => 
    acc + child.fees.reduce((sum, fee) => sum + (fee.amount - fee.paid), 0), 0
  );

  const totalPaid = fees.children.reduce((acc, child) => 
    acc + child.fees.reduce((sum, fee) => sum + fee.paid, 0), 0
  );

  return (
    <DashboardLayout>
      <Helmet>
        <title>Fees Management - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fees Management</h1>
            <p className="text-muted-foreground mt-2">View and manage fees for your children</p>
          </div>
          <Button onClick={handlePayAll} className="bg-orange-600 hover:bg-orange-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay All Pending
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">${fees.total}</div>
              <p className="text-sm text-muted-foreground mt-2">Academic Year 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${totalPaid}</div>
              <Progress value={(totalPaid / fees.total) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">${totalPending}</div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">Due by {fees.dueDate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert for pending fees */}
        {totalPending > 0 && (
          <Alert className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-900 dark:text-orange-100">Pending Fees Alert</AlertTitle>
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              You have ${totalPending} pending fees. Please pay before {fees.dueDate} to avoid late fees.
            </AlertDescription>
          </Alert>
        )}

        {/* Fees by Child */}
        {fees.children.map((child, index) => (
          <Card key={index}>
            <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
              <CardTitle className="text-gray-900 dark:text-white">{child.name}</CardTitle>
              <CardDescription>Class: {child.class}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Item</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {child.fees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.item}</TableCell>
                      <TableCell>${fee.amount}</TableCell>
                      <TableCell className="text-green-600">${fee.paid}</TableCell>
                      <TableCell className="text-red-600">${fee.amount - fee.paid}</TableCell>
                      <TableCell>{fee.dueDate}</TableCell>
                      <TableCell>
                        <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                          {getStatusIcon(fee.status)}
                          <span className="capitalize">{fee.status}</span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {fee.status !== 'paid' && (
                            <Button size="sm" onClick={() => handlePayNow(fee)}>
                              Pay Now
                            </Button>
                          )}
                          {fee.paid > 0 && (
                            <Button variant="outline" size="sm" onClick={() => handleDownloadReceipt(fee)}>
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ParentFeesPage;