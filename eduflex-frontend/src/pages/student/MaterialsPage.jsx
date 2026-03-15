// pages/student/MaterialsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  FileText, Download, Eye, Search,
  FolderOpen, Filter, BookOpen,
  Video, FileArchive, FileImage
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentMaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const materials = [
    {
      id: 1,
      title: 'Quadratic Equations - Chapter 5',
      subject: 'Mathematics',
      type: 'PDF',
      size: '2.5 MB',
      uploadedBy: 'Mr. Johnson',
      date: '2024-03-10',
      downloads: 45,
      icon: FileText
    },
    {
      id: 2,
      title: 'Newton\'s Laws - Lecture Slides',
      subject: 'Physics',
      type: 'PPT',
      size: '3.8 MB',
      uploadedBy: 'Ms. Davis',
      date: '2024-03-08',
      downloads: 32,
      icon: FileText
    },
    {
      id: 3,
      title: 'Periodic Table - Reference Sheet',
      subject: 'Chemistry',
      type: 'PDF',
      size: '1.2 MB',
      uploadedBy: 'Dr. Wilson',
      date: '2024-03-05',
      downloads: 67,
      icon: FileText
    },
    {
      id: 4,
      title: 'Essay Writing Guide',
      subject: 'English',
      type: 'PDF',
      size: '2.1 MB',
      uploadedBy: 'Mrs. Brown',
      date: '2024-03-12',
      downloads: 28,
      icon: FileText
    },
    {
      id: 5,
      title: 'JavaScript Tutorial Videos',
      subject: 'Computer Science',
      type: 'Video',
      size: '45 MB',
      uploadedBy: 'Mr. Smith',
      date: '2024-03-07',
      downloads: 56,
      icon: Video
    },
    {
      id: 6,
      title: 'Lab Manual - Physics Experiments',
      subject: 'Physics',
      type: 'PDF',
      size: '4.2 MB',
      uploadedBy: 'Ms. Davis',
      date: '2024-03-01',
      downloads: 41,
      icon: FileText
    },
    {
      id: 7,
      title: 'Chemical Bonding - Practice Problems',
      subject: 'Chemistry',
      type: 'PDF',
      size: '1.8 MB',
      uploadedBy: 'Dr. Wilson',
      date: '2024-03-09',
      downloads: 34,
      icon: FileText
    },
    {
      id: 8,
      title: 'Code Examples - JavaScript',
      subject: 'Computer Science',
      type: 'ZIP',
      size: '5.2 MB',
      uploadedBy: 'Mr. Smith',
      date: '2024-03-11',
      downloads: 23,
      icon: FileArchive
    }
  ];

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || 
                          material.subject.toLowerCase() === selectedSubject.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText className="h-8 w-8 text-red-500" />;
      case 'PPT': return <FileText className="h-8 w-8 text-orange-500" />;
      case 'Video': return <Video className="h-8 w-8 text-blue-500" />;
      case 'ZIP': return <FileArchive className="h-8 w-8 text-green-500" />;
      case 'Image': return <FileImage className="h-8 w-8 text-purple-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleDownload = (material) => {
    toast.info(`Downloading: ${material.title}`);
  };

  const handleView = (material) => {
    toast.info(`Opening: ${material.title}`);
  };

  const recentMaterials = materials.slice(0, 4);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Study Materials - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
          <p className="text-muted-foreground mt-2">Access course materials and resources</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search materials..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.slice(1).map(subject => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="popular">Most Downloaded</TabsTrigger>
            <TabsTrigger value="by-subject">By Subject</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => {
                const Icon = material.icon;
                return (
                  <Card key={material.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getTypeIcon(material.type)}
                        </div>
                        <Badge variant="outline">{material.type}</Badge>
                      </div>
                      <CardTitle className="text-base mt-2">{material.title}</CardTitle>
                      <CardDescription>
                        {material.subject} • {material.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Uploaded by {material.uploadedBy}</span>
                          <span className="text-muted-foreground">{material.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{material.downloads} downloads</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleView(material)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={() => handleDownload(material)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6).map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {getTypeIcon(material.type)}
                      </div>
                      <Badge variant="outline">{material.type}</Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{material.title}</CardTitle>
                    <CardDescription>
                      {material.subject} • {material.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Added {material.date}</span>
                      </div>
                      <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => handleDownload(material)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.sort((a, b) => b.downloads - a.downloads).slice(0, 6).map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {getTypeIcon(material.type)}
                      </div>
                      <Badge variant="outline">{material.type}</Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{material.title}</CardTitle>
                    <CardDescription>
                      {material.subject} • {material.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-teal-600 font-medium">{material.downloads} downloads</span>
                      </div>
                      <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => handleDownload(material)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-subject">
            <Tabs defaultValue="mathematics" className="space-y-4">
              <TabsList className="flex flex-wrap">
                {subjects.slice(1).map(subject => (
                  <TabsTrigger key={subject} value={subject.toLowerCase()}>{subject}</TabsTrigger>
                ))}
              </TabsList>

              {subjects.slice(1).map(subject => (
                <TabsContent key={subject} value={subject.toLowerCase()}>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {materials.filter(m => m.subject === subject).map((material) => (
                      <Card key={material.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              {getTypeIcon(material.type)}
                            </div>
                            <Badge variant="outline">{material.type}</Badge>
                          </div>
                          <CardTitle className="text-base mt-2">{material.title}</CardTitle>
                          <CardDescription>{material.size}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="text-sm">
                              <span>Uploaded by {material.uploadedBy}</span>
                            </div>
                            <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => handleDownload(material)}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-teal-600">{materials.length}</p>
              <p className="text-sm text-muted-foreground">Total Files</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-muted-foreground">PDF Documents</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-green-600">45.2 MB</p>
              <p className="text-sm text-muted-foreground">Total Size</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-orange-600">326</p>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMaterialsPage;