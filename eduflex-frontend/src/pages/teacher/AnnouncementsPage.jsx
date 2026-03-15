// pages/teacher/AnnouncementsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Bell, Plus, Pin, Archive, Eye,
  Calendar, Users, GraduationCap, UserCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherAnnouncementsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const announcements = [
    {
      id: 1,
      title: 'Class Test Schedule - Mathematics',
      content: 'Class test for Mathematics will be held on March 25th. Syllabus: Chapters 5-8.',
      audience: 'students',
      date: '2024-03-10',
      priority: 'high',
      pinned: true,
      readCount: 32
    },
    {
      id: 2,
      title: 'Physics Lab Rescheduled',
      content: 'Physics lab for Class 11B is rescheduled to Thursday, March 14th at 2 PM.',
      audience: 'students',
      date: '2024-03-09',
      priority: 'medium',
      pinned: false,
      readCount: 28
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting Reminder',
      content: 'Reminder: Parent-teacher meeting on March 20th. Please confirm your availability.',
      audience: 'parents',
      date: '2024-03-08',
      priority: 'high',
      pinned: true,
      readCount: 45
    },
    {
      id: 4,
      title: 'Department Meeting',
      content: 'Monthly department meeting on March 15th at 3 PM in Conference Room.',
      audience: 'teachers',
      date: '2024-03-07',
      priority: 'medium',
      pinned: false,
      readCount: 12
    }
  ];

  const handleAddAnnouncement = () => {
    setIsAddDialogOpen(false);
    toast.success('Announcement published successfully!');
  };

  const handlePinAnnouncement = (announcement) => {
    toast.success(`Pinned: ${announcement.title}`);
  };

  const handleArchiveAnnouncement = (announcement) => {
    toast.info(`Archived: ${announcement.title}`);
  };

  const handleViewDetails = (announcement) => {
    toast.info(`Viewing: ${announcement.title}`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceIcon = (audience) => {
    switch(audience) {
      case 'students': return <GraduationCap className="h-4 w-4" />;
      case 'parents': return <UserCircle className="h-4 w-4" />;
      case 'teachers': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Announcements - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-muted-foreground mt-2">Create and manage announcements</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement for students, parents, or teachers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter announcement title" />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea placeholder="Enter announcement content" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <Select defaultValue="students">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                        <SelectItem value="all">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAnnouncement}>Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="parents">For Parents</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {announcement.pinned && (
                            <Pin className="h-4 w-4 text-teal-600 fill-teal-600" />
                          )}
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center">
                            {getAudienceIcon(announcement.audience)}
                            <span className="ml-1 capitalize">{announcement.audience}</span>
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {announcement.readCount} views
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handlePinAnnouncement(announcement)}>
                          <Pin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleArchiveAnnouncement(announcement)}>
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(announcement)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pinned">
            <div className="space-y-4">
              {announcements.filter(a => a.pinned).map((announcement) => (
                <Card key={announcement.id} className="border-teal-200 bg-teal-50 dark:bg-teal-950">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Pin className="h-4 w-4 text-teal-600 fill-teal-600" />
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        </div>
                        <CardDescription>
                          {announcement.date} • {announcement.readCount} views
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-4">
              {announcements.filter(a => a.audience === 'students').map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parents">
            <div className="space-y-4">
              {announcements.filter(a => a.audience === 'parents').map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAnnouncementsPage;