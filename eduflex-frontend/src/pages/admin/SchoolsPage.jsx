// pages/admin/SchoolsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Building2, Plus, Search, Edit, Trash2, Users, 
  GraduationCap, UserCircle, MapPin, Phone, Mail,
  Globe, Calendar, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const SchoolsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const schools = [
    {
      id: 1,
      name: 'Springfield Elementary School',
      code: 'SES001',
      address: '123 Education Lane, Springfield, IL 62701',
      phone: '+1 (217) 555-0123',
      email: 'info@springfield.edu',
      website: 'www.springfield.edu',
      principal: 'Dr. Sarah Johnson',
      established: '1985',
      students: 450,
      teachers: 28,
      staff: 15,
      status: 'active',
      type: 'Elementary'
    },
    {
      id: 2,
      name: 'Riverside High School',
      code: 'RHS002',
      address: '456 River Road, Springfield, IL 62702',
      phone: '+1 (217) 555-0124',
      email: 'admin@riverside.edu',
      website: 'www.riverside.edu',
      principal: 'Mr. Michael Chen',
      established: '1972',
      students: 850,
      teachers: 52,
      staff: 28,
      status: 'active',
      type: 'High School'
    },
    {
      id: 3,
      name: 'Westside Middle School',
      code: 'WMS003',
      address: '789 West Avenue, Springfield, IL 62703',
      phone: '+1 (217) 555-0125',
      email: 'office@westside.edu',
      website: 'www.westside.edu',
      principal: 'Ms. Emily Rodriguez',
      established: '1995',
      students: 620,
      teachers: 38,
      staff: 20,
      status: 'active',
      type: 'Middle School'
    },
    {
      id: 4,
      name: 'Lincoln Academy',
      code: 'LA004',
      address: '321 Lincoln Blvd, Springfield, IL 62704',
      phone: '+1 (217) 555-0126',
      email: 'contact@lincolnacademy.edu',
      website: 'www.lincolnacademy.edu',
      principal: 'Dr. Robert Williams',
      established: '2005',
      students: 320,
      teachers: 22,
      staff: 12,
      status: 'inactive',
      type: 'K-12'
    }
  ];

  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSchool = () => {
    setIsAddDialogOpen(false);
    toast.success('School added successfully!');
  };

  const handleEditSchool = (school) => {
    toast.info(`Editing ${school.name}`);
  };

  const handleDeleteSchool = (school) => {
    toast.error(`Are you sure you want to delete ${school.name}?`, {
      action: {
        label: 'Confirm',
        onClick: () => console.log('Delete confirmed')
      }
    });
  };

  const handleViewDetails = (school) => {
    toast.info(`Viewing details for ${school.name}`);
  };

  const handleExportData = () => {
    toast.info('Exporting schools data...');
  };

  const totalStats = {
    schools: schools.length,
    activeSchools: schools.filter(s => s.status === 'active').length,
    totalStudents: schools.reduce((acc, s) => acc + s.students, 0),
    totalTeachers: schools.reduce((acc, s) => acc + s.teachers, 0)
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Manage Schools - Admin - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schools Management</h1>
            <p className="text-muted-foreground mt-2">Manage all schools in the system</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New School</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new school. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">School Name</Label>
                      <Input id="name" placeholder="Enter school name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">School Code</Label>
                      <Input id="code" placeholder="Enter school code" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter full address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="principal">Principal Name</Label>
                      <Input id="principal" placeholder="Enter principal name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input id="established" placeholder="YYYY" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">School Type</Label>
                      <select id="type" className="w-full p-2 border rounded-md">
                        <option>Elementary</option>
                        <option>Middle School</option>
                        <option>High School</option>
                        <option>K-12</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="www.example.com" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSchool} className="bg-teal-600 hover:bg-teal-700">
                    Add School
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              <Building2 className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.schools}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
              <Building2 className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalStats.activeSchools}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.totalStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <Users className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.totalTeachers}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">School List</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Schools</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search schools..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>School Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Teachers</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchools.map((school) => (
                      <TableRow key={school.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{school.name}</p>
                            <p className="text-xs text-muted-foreground">{school.established}</p>
                          </div>
                        </TableCell>
                        <TableCell>{school.code}</TableCell>
                        <TableCell>{school.principal}</TableCell>
                        <TableCell>{school.students}</TableCell>
                        <TableCell>{school.teachers}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{school.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {school.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(school)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditSchool(school)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteSchool(school)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
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

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>School Locations</CardTitle>
                <CardDescription>Geographic distribution of schools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map view coming soon! Integration with mapping services.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>School Analytics</CardTitle>
                <CardDescription>Insights and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-medium mb-2">School Distribution by Type</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Elementary</span>
                          <span className="font-bold">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Middle School</span>
                          <span className="font-bold">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>High School</span>
                          <span className="font-bold">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>K-12</span>
                          <span className="font-bold">1</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-medium mb-2">Student-Teacher Ratio</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Average Ratio</span>
                          <span className="font-bold">16.5:1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Highest</span>
                          <span className="font-bold">18.3:1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lowest</span>
                          <span className="font-bold">14.5:1</span>
                        </div>
                      </div>
                    </div>
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

export default SchoolsPage;