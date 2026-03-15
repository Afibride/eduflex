// pages/parent/ReportsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Download, FileText, Calendar, User,
  Award, TrendingUp, Eye, Filter,
  BarChart, PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentReportsPage = () => {
  const [selectedChild, setSelectedChild] = useState('emma');
  const [reportType, setReportType] = useState('academic');
  const [dateRange, setDateRange] = useState('semester');

  const children = [
    { id: 'emma', name: 'Emma Johnson', class: '10A', rollNo: '2024-10A-015' },
    { id: 'david', name: 'David Johnson', class: '8B', rollNo: '2024-8B-032' }
  ];

  const reports = [
    {
      id: 1,
      title: 'Academic Progress Report - Semester 1',
      child: 'Emma Johnson',
      type: 'academic',
      date: '2024-02-15',
      format: 'PDF',
      size: '2.4 MB',
      downloaded: true
    },
    {
      id: 2,
      title: 'Attendance Report - January 2024',
      child: 'Emma Johnson',
      type: 'attendance',
      date: '2024-02-01',
      format: 'PDF',
      size: '1.2 MB',
      downloaded: false
    },
    {
      id: 3,
      title: 'Fee Statement - Q1 2024',
      child: 'Emma Johnson',
      type: 'financial',
      date: '2024-01-15',
      format: 'PDF',
      size: '1.8 MB',
      downloaded: true
    },
    {
      id: 4,
      title: 'Academic Progress Report - Semester 1',
      child: 'David Johnson',
      type: 'academic',
      date: '2024-02-15',
      format: 'PDF',
      size: '2.1 MB',
      downloaded: false
    },
    {
      id: 5,
      title: 'Attendance Report - January 2024',
      child: 'David Johnson',
      type: 'attendance',
      date: '2024-02-01',
      format: 'PDF',
      size: '1.1 MB',
      downloaded: true
    }
  ];

  const availableReports = [
    { value: 'academic', label: 'Academic Progress Report', icon: Award },
    { value: 'attendance', label: 'Attendance Summary', icon: TrendingUp },
    { value: 'financial', label: 'Fee Statement', icon: FileText },
    { value: 'behavior', label: 'Behavior & Conduct Report', icon: User },
    { value: 'comprehensive', label: 'Comprehensive Report', icon: BarChart }
  ];

  const handleDownloadReport = (report) => {
    toast.info(`Downloading ${report.title}...`);
  };

  const handleViewReport = (report) => {
    toast.info(`Viewing ${report.title}`);
  };

  const handleGenerateReport = () => {
    toast.success(`Generating ${reportType} report for ${children.find(c => c.id === selectedChild)?.name}`);
  };

  const handleShareReport = (report) => {
    toast.info(`Sharing options for ${report.title}`);
  };

  const filteredReports = reports.filter(report => 
    (selectedChild === 'all' || report.child.toLowerCase().includes(children.find(c => c.id === selectedChild)?.name.toLowerCase() || ''))
  );

  return (
    <DashboardLayout>
      <Helmet>
        <title>Reports - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-muted-foreground mt-2">Generate and download reports for your children</p>
        </div>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-teal-600" />
              Generate New Report
            </CardTitle>
            <CardDescription>Create custom reports for your children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Child</label>
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map(child => (
                      <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableReports.map(report => (
                      <SelectItem key={report.value} value={report.value}>{report.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester">Current Semester</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Academic Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleGenerateReport} className="w-full bg-teal-600 hover:bg-teal-700">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map(child => (
                    <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Child</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.child}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewReport(report)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Reports</CardTitle>
                <CardDescription>Progress reports and grade sheets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Child</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.filter(r => r.type === 'academic').map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.child}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Monthly attendance summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Child</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.filter(r => r.type === 'attendance').map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.child}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Fee statements and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Child</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.filter(r => r.type === 'financial').map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.child}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Categories */}
        <div className="grid gap-6 md:grid-cols-3">
          {availableReports.slice(0, 3).map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.value} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setReportType(report.value)}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                      <Icon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                    </div>
                    <CardTitle className="text-base">{report.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Generate detailed {report.label.toLowerCase()} for your child
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Report Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Report Statistics</CardTitle>
            <CardDescription>Overview of generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Award className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Academic Reports</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Attendance Reports</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Download className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ParentReportsPage;