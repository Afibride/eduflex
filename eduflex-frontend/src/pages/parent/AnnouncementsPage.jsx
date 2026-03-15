// pages/parent/AnnouncementsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Bell, Pin, Calendar, Users,
  GraduationCap, Megaphone, Eye,
  ChevronDown, ChevronUp, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ParentAnnouncementsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting Schedule',
      content: 'The annual parent-teacher meeting will be held on March 25th from 2:00 PM to 5:00 PM. Please find your scheduled time slot below. If you cannot make it, please contact the school office to reschedule.',
      audience: 'All Parents',
      date: '2024-03-15',
      author: 'Principal',
      priority: 'high',
      pinned: true,
      read: false,
      attachments: ['meeting_schedule.pdf']
    },
    {
      id: 2,
      title: 'School Holiday - Holi',
      content: 'School will remain closed on March 26th on account of Holi. All classes and activities scheduled for that day will be rescheduled. School will reopen on March 27th.',
      audience: 'All Parents',
      date: '2024-03-14',
      author: 'Administration',
      priority: 'high',
      pinned: true,
      read: true,
      attachments: []
    },
    {
      id: 3,
      title: 'Fee Payment Deadline',
      content: 'This is a reminder that the second installment of tuition fees is due by April 15th. Please make the payment through the parent portal to avoid late fees.',
      audience: 'All Parents',
      date: '2024-03-13',
      author: 'Accounts Department',
      priority: 'medium',
      pinned: false,
      read: false,
      attachments: ['fee_structure.pdf']
    },
    {
      id: 4,
      title: 'Class 10A - Science Exhibition',
      content: 'Parents of Class 10A students are invited to the Science Exhibition on March 28th at 11:00 AM in the school auditorium. Your child will be presenting their project.',
      audience: 'Class 10A Parents',
      date: '2024-03-12',
      author: 'Science Department',
      priority: 'medium',
      pinned: false,
      read: true,
      attachments: []
    },
    {
      id: 5,
      title: 'Summer Camp Registration',
      content: 'Registration for the annual summer camp is now open. Activities include sports, arts, music, and academic workshops. Early bird discount available until March 30th.',
      audience: 'All Parents',
      date: '2024-03-11',
      author: 'Activities Coordinator',
      priority: 'low',
      pinned: false,
      read: false,
      attachments: ['summer_camp_brochure.pdf']
    },
    {
      id: 6,
      title: 'Class 8B - Field Trip',
      content: 'Class 8B will be going on a field trip to the Science Museum on March 29th. Permission slips must be submitted by March 22nd.',
      audience: 'Class 8B Parents',
      date: '2024-03-10',
      author: 'Class Teacher',
      priority: 'medium',
      pinned: false,
      read: true,
      attachments: ['permission_slip.pdf', 'itinerary.pdf']
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMarkAsRead = (id) => {
    toast.success('Marked as read');
  };

  const handleDownloadAttachment = (filename) => {
    toast.info(`Downloading: ${filename}`);
  };

  const filteredAnnouncements = selectedAudience === 'all' 
    ? announcements 
    : announcements.filter(a => a.audience.includes(selectedAudience));

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);
  const unreadCount = filteredAnnouncements.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Announcements - Parent Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-muted-foreground mt-2">Stay updated with school announcements</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-teal-600 text-white px-3 py-1">
              {unreadCount} New
            </Badge>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Announcements</SelectItem>
                    <SelectItem value="All Parents">All Parents</SelectItem>
                    <SelectItem value="Class 10A Parents">Class 10A Parents</SelectItem>
                    <SelectItem value="Class 8B Parents">Class 8B Parents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {/* Pinned Announcements */}
              {pinnedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-teal-200 bg-teal-50 dark:bg-teal-950">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Pin className="h-5 w-5 text-teal-600 fill-teal-600" />
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {announcement.audience}
                          </span>
                          <span className="flex items-center">
                            <Megaphone className="h-4 w-4 mr-1" />
                            {announcement.author}
                          </span>
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleExpand(announcement.id)}>
                        {expandedId === announcement.id ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedId === announcement.id && (
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {announcement.content}
                      </p>
                      {announcement.attachments.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {announcement.attachments.map((file, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAttachment(file)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
                          Mark as Read
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}

              {/* Regular Announcements */}
              {regularAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={!announcement.read ? 'border-l-4 border-l-teal-600' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          {!announcement.read && (
                            <Badge variant="outline" className="bg-teal-100 text-teal-800">New</Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {announcement.audience}
                          </span>
                          <span className="flex items-center">
                            <Megaphone className="h-4 w-4 mr-1" />
                            {announcement.author}
                          </span>
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleExpand(announcement.id)}>
                        {expandedId === announcement.id ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedId === announcement.id && (
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {announcement.content}
                      </p>
                      {announcement.attachments.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {announcement.attachments.map((file, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAttachment(file)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      {!announcement.read && (
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
                            Mark as Read
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pinned">
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-teal-200 bg-teal-50 dark:bg-teal-950">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Pin className="h-5 w-5 text-teal-600 fill-teal-600" />
                      <CardTitle>{announcement.title}</CardTitle>
                    </div>
                    <CardDescription>{announcement.date} • {announcement.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-4">
              {filteredAnnouncements.filter(a => !a.read).map((announcement) => (
                <Card key={announcement.id} className="border-l-4 border-l-teal-600">
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.date} • {announcement.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{announcement.content}</p>
                    <Button size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
                      Mark as Read
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archive">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No archived announcements</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-teal-600">{announcements.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-muted-foreground">Attachments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentAnnouncementsPage;