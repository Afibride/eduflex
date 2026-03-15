// pages/admin/ReportsPage.jsx (Fixed imports)
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  BarChart, Download, Calendar, Filter, FileText,
  TrendingUp, Users, GraduationCap, DollarSign,
  PieChart, LineChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge'; // Added missing import
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const AdminReportsPage = () => {
  const [reportType, setReportType] = useState('academic');
  const [dateRange, setDateRange] = useState('this-month');
  const [format, setFormat] = useState('pdf');

  const handleGenerateReport = () => {
    toast.success(`Generating ${reportType} report...`);
  };

  const handleDownloadReport = () => {
    toast.info(`Downloading report in ${format.toUpperCase()} format...`);
  };

  const reportTemplates = [
    { id: 'academic', name: 'Academic Performance Report', icon: TrendingUp },
    { id: 'attendance', name: 'Attendance Summary', icon: Users },
    { id: 'enrollment', name: 'Student Enrollment Report', icon: GraduationCap },
    { id: 'financial', name: 'Financial Summary', icon: DollarSign },
    { id: 'staff', name: 'Staff Performance Report', icon: Users },
    { id: 'custom', name: 'Custom Report Builder', icon: FileText }
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>Reports & Analytics - Admin - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">Generate and download comprehensive reports</p>
          </div>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card 
                key={template.id} 
                className={`cursor-pointer hover:border-teal-500 transition-colors ${reportType === template.id ? 'border-teal-500 bg-teal-50 dark:bg-teal-950' : ''}`}
                onClick={() => setReportType(template.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${reportType === template.id ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Customize your report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>School</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    <SelectItem value="ses">Springfield Elementary</SelectItem>
                    <SelectItem value="rhs">Riverside High</SelectItem>
                    <SelectItem value="wms">Westside Middle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Grade Level</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                    <SelectItem value="middle">Middle (6-8)</SelectItem>
                    <SelectItem value="high">High (9-12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup value={format} onValueChange={setFormat} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel">Excel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv">CSV</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleGenerateReport} className="bg-teal-600 hover:bg-teal-700 w-full md:w-auto">
              <BarChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preview">Report Preview</TabsTrigger>
            <TabsTrigger value="saved">Saved Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>Sample preview of your report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-muted-foreground">Report preview will appear here after generation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="font-medium">Academic Report - Q1 2024</p>
                        <p className="text-sm text-muted-foreground">Generated on Mar 15, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="font-medium">Attendance Summary - Feb 2024</p>
                        <p className="text-sm text-muted-foreground">Generated on Mar 1, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automatically generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Performance Report</p>
                      <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Attendance Summary</p>
                      <p className="text-sm text-muted-foreground">1st of every month</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminReportsPage;