// pages/admin/AnnouncementsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Bell, Plus, Edit, Trash2, Send, Calendar,
  Users, GraduationCap, UserCircle, Megaphone,
  Pin, Clock, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const AdminAnnouncementsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'School Holiday Announcement',
      content: 'School will remain closed on March 25th due to maintenance.',
      audience: 'all',
      date: '2024-03-10',
      author: 'Admin',
      priority: 'high',
      status: 'active',
      views: 245
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting scheduled for March 30th from 2 PM to 5 PM.',
      audience: 'parents',
      date: '2024-03-09',
      author: 'Principal',
      priority: 'medium',
      status: 'active',
      views: 189
    },
    {
      id: 3,
      title: 'Exam Schedule Update',
      content: 'Final exam schedule has been updated. Please check the portal.',
      audience: 'students',
      date: '2024-03-08',
      author: 'Academic Office',
      priority: 'high',
      status: 'active',
      views: 567
    },
    {
      id: 4,
      title: 'Staff Meeting Reminder',
      content: 'Monthly staff meeting on March 15th at 3 PM in the conference room.',
      audience: 'teachers',
      date: '2024-03-07',
      author: 'HR',
      priority: 'medium',
      status: 'archived',
      views: 45
    }
  ];

  const handleAddAnnouncement = () => {
    setIsAddDialogOpen(false);
    toast.success('Announcement published successfully!');
  };

  const handleEditAnnouncement = (announcement) => {
    toast.info(`Editing: ${announcement.title}`);
  };

  const handleDeleteAnnouncement = (announcement) => {
    toast.error(`Delete "${announcement.title}"?`, {
      action: {
        label: 'Confirm',
        onClick: () => console.log('Deleted')
      }
    });
  };

  const handleSendNow = (announcement) => {
    toast.success(`Sending "${announcement.title}" to all recipients`);
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
      case 'all': return <Users className="h-4 w-4" />;
      case 'students': return <GraduationCap className="h-4 w-4" />;
      case 'teachers': return <Users className="h-4 w-4" />;
      case 'parents': return <UserCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Announcements - Admin - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-muted-foreground mt-2">Manage and publish announcements across the system</p>
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
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new announcement.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter announcement title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Enter announcement content" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Everyone</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                        <SelectItem value="teachers">Teachers Only</SelectItem>
                        <SelectItem value="parents">Parents Only</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Schedule (Optional)</Label>
                    <Input type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Save as Draft
                </Button>
                <Button onClick={handleAddAnnouncement} className="bg-teal-600 hover:bg-teal-700">
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Announcements</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Pin className="h-4 w-4 mr-2" />
                      Pin to Top
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.filter(a => a.status === 'active').map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{announcement.title}</h3>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority}
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              {getAudienceIcon(announcement.audience)}
                              <span className="ml-1 capitalize">{announcement.audience}</span>
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{announcement.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {announcement.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Posted by {announcement.author}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {announcement.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditAnnouncement(announcement)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteAnnouncement(announcement)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleSendNow(announcement)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Announcements</CardTitle>
                <CardDescription>Announcements scheduled for future delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Scheduled For</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Final Exam Reminder</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>2024-03-20 09:00 AM</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">Medium</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived">
            <Card>
              <CardHeader>
                <CardTitle>Archived Announcements</CardTitle>
                <CardDescription>Past announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.filter(a => a.status === 'archived').map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.title}</TableCell>
                        <TableCell>{a.date}</TableCell>
                        <TableCell className="capitalize">{a.audience}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Restore</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts">
            <Card>
              <CardHeader>
                <CardTitle>Draft Announcements</CardTitle>
                <CardDescription>Saved drafts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">No draft announcements</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Announcement Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Megaphone className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Eye className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Read Rate</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnnouncementsPage;