// pages/student/ClassesPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  BookOpen, Users, Calendar, Clock,
  MapPin, Download, Eye, FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH101',
      teacher: 'Mr. Johnson',
      schedule: 'Mon/Wed/Fri 9:00 AM',
      room: '101',
      progress: 65,
      totalTopics: 12,
      completedTopics: 8,
      nextClass: 'Quadratic Equations',
      materials: [
        { id: 1, title: 'Chapter 5: Quadratic Equations', type: 'PDF', size: '2.5 MB' },
        { id: 2, title: 'Practice Problems Set 1', type: 'PDF', size: '1.2 MB' },
        { id: 3, title: 'Formula Sheet', type: 'PDF', size: '0.8 MB' }
      ],
      upcoming: [
        { date: 'Mar 18', topic: 'Quadratic Equations - Part 2' },
        { date: 'Mar 20', topic: 'Quadratic Equations - Part 3' },
        { date: 'Mar 22', topic: 'Revision' }
      ]
    },
    {
      id: 2,
      name: 'Physics',
      code: 'PHY201',
      teacher: 'Ms. Davis',
      schedule: 'Tue/Thu 10:30 AM',
      room: '203',
      progress: 42,
      totalTopics: 14,
      completedTopics: 6,
      nextClass: 'Newton\'s Laws',
      materials: [
        { id: 4, title: 'Chapter 3: Newton\'s Laws', type: 'PDF', size: '3.1 MB' },
        { id: 5, title: 'Lab Manual', type: 'PDF', size: '4.2 MB' },
        { id: 6, title: 'Experiment Videos', type: 'Video', size: '15 MB' }
      ],
      upcoming: [
        { date: 'Mar 19', topic: 'Newton\'s Laws - Applications' },
        { date: 'Mar 21', topic: 'Lab Experiment' }
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      code: 'CHEM101',
      teacher: 'Dr. Wilson',
      schedule: 'Mon/Wed 2:00 PM',
      room: '105',
      progress: 38,
      totalTopics: 10,
      completedTopics: 4,
      nextClass: 'Periodic Table',
      materials: [
        { id: 7, title: 'Chapter 2: Periodic Table', type: 'PDF', size: '2.8 MB' },
        { id: 8, title: 'Element Cards', type: 'PDF', size: '1.5 MB' }
      ],
      upcoming: [
        { date: 'Mar 18', topic: 'Periodic Trends' },
        { date: 'Mar 20', topic: 'Chemical Bonding Intro' }
      ]
    },
    {
      id: 4,
      name: 'English',
      code: 'ENG101',
      teacher: 'Mrs. Brown',
      schedule: 'Tue/Fri 11:30 AM',
      room: '302',
      progress: 71,
      totalTopics: 8,
      completedTopics: 6,
      nextClass: 'Essay Writing',
      materials: [
        { id: 9, title: 'Essay Writing Guide', type: 'PDF', size: '1.8 MB' },
        { id: 10, title: 'Sample Essays', type: 'PDF', size: '2.1 MB' }
      ],
      upcoming: [
        { date: 'Mar 19', topic: 'Essay Writing Workshop' },
        { date: 'Mar 22', topic: 'Literary Analysis' }
      ]
    },
    {
      id: 5,
      name: 'Computer Science',
      code: 'CS101',
      teacher: 'Mr. Smith',
      schedule: 'Wed/Fri 1:00 PM',
      room: 'Lab 401',
      progress: 55,
      totalTopics: 12,
      completedTopics: 7,
      nextClass: 'JavaScript Basics',
      materials: [
        { id: 11, title: 'JavaScript Tutorial', type: 'PDF', size: '3.5 MB' },
        { id: 12, title: 'Code Examples', type: 'ZIP', size: '5.2 MB' }
      ],
      upcoming: [
        { date: 'Mar 20', topic: 'Variables and Data Types' },
        { date: 'Mar 22', topic: 'Functions' }
      ]
    }
  ];

  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    toast.info(`Viewing details for ${cls.name}`);
  };

  const handleDownloadMaterial = (material) => {
    toast.info(`Downloading: ${material.title}`);
  };

  const handleViewMaterial = (material) => {
    toast.info(`Opening: ${material.title}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Classes - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
          <p className="text-muted-foreground mt-2">View your enrolled classes and course materials</p>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => (
                <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white">{cls.name}</CardTitle>
                        <CardDescription>{cls.code}</CardDescription>
                      </div>
                      <div className="p-2 bg-teal-600 rounded-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{cls.teacher}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{cls.schedule}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Room {cls.room}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Course Progress</span>
                        <span className="font-medium">{cls.progress}%</span>
                      </div>
                      <Progress value={cls.progress} className="h-2" />
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Next Class:</span>
                      <p className="font-medium mt-1">{cls.nextClass}</p>
                    </div>

                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={() => handleViewClass(cls)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>All Classes</CardTitle>
                <CardDescription>List view of your enrolled classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{cls.name}</p>
                            <p className="text-xs text-muted-foreground">{cls.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>{cls.teacher}</TableCell>
                        <TableCell>{cls.schedule}</TableCell>
                        <TableCell>{cls.room}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={cls.progress} className="w-16 h-2" />
                            <span className="text-sm">{cls.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewClass(cls)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Your completion status by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {classes.map((cls) => (
                    <div key={cls.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{cls.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({cls.code})</span>
                        </div>
                        <span className="text-teal-600 font-bold">{cls.progress}%</span>
                      </div>
                      <Progress value={cls.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{cls.completedTopics} of {cls.totalTopics} topics completed</span>
                        <span>Next: {cls.nextClass}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Class Details Dialog */}
        {selectedClass && (
          <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>{selectedClass.name}</DialogTitle>
                <DialogDescription>
                  {selectedClass.code} • {selectedClass.teacher} • Room {selectedClass.room}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground">Schedule</p>
                      <p className="font-medium">{selectedClass.schedule}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={selectedClass.progress} className="flex-1 h-2" />
                        <span className="font-medium">{selectedClass.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Topics Covered</p>
                    <p className="text-sm">
                      {selectedClass.completedTopics} out of {selectedClass.totalTopics} topics completed
                    </p>
                  </div>
                  <div className="p-3 bg-teal-50 dark:bg-teal-950 rounded-lg">
                    <p className="text-sm text-teal-800 dark:text-teal-200 mb-1">Next Class</p>
                    <p className="font-medium text-teal-900 dark:text-teal-100">{selectedClass.nextClass}</p>
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4 mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedClass.materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">{material.title}</TableCell>
                          <TableCell>{material.type}</TableCell>
                          <TableCell>{material.size}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewMaterial(material)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDownloadMaterial(material)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Upcoming Classes</h4>
                    {selectedClass.upcoming.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-teal-600" />
                          <div>
                            <p className="font-medium">{item.topic}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentClassesPage;