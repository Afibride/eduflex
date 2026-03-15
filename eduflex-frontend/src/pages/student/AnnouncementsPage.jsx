// pages/student/AnnouncementsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Bell, Pin, Calendar, Users,
  GraduationCap, Megaphone, Eye,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentAnnouncementsPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  const announcements = [
    {
      id: 1,
      title: 'Final Exam Schedule Released',
      content: 'The final examination schedule for Semester 2 has been released. Please check the exam portal for your personalized timetable. Make sure to note the dates and prepare accordingly. If you have any conflicts, report to the academic office by March 20th.',
      audience: 'All Students',
      date: '2024-03-15',
      author: 'Academic Office',
      priority: 'high',
      pinned: true,
      read: false,
      attachments: ['exam_schedule.pdf']
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'The annual parent-teacher meeting will be held on March 25th from 2:00 PM to 5:00 PM. Please inform your parents about this. Meeting schedules will be shared soon.',
      audience: 'All Students',
      date: '2024-03-14',
      author: 'Principal',
      priority: 'high',
      pinned: true,
      read: true,
      attachments: []
    },
    {
      id: 3,
      title: 'Mathematics Club Workshop',
      content: 'The Mathematics Club is organizing a workshop on "Advanced Problem Solving Techniques" on March 18th at 3:30 PM in Room 101. All interested students are welcome to attend.',
      audience: 'Mathematics Students',
      date: '2024-03-13',
      author: 'Mathematics Department',
      priority: 'medium',
      pinned: false,
      read: false,
      attachments: []
    },
    {
      id: 4,
      title: 'Library Hours Update',
      content: 'The school library will remain open until 6:00 PM during exam preparation week (March 20-27). Regular hours will resume after exams.',
      audience: 'All Students',
      date: '2024-03-12',
      author: 'Library',
      priority: 'low',
      pinned: false,
      read: true,
      attachments: []
    },
    {
      id: 5,
      title: 'Science Fair Registration',
      content: 'Registration for the Annual Science Fair is now open. Interested students can register through the student portal until March 30th. The fair will be held on April 15th.',
      audience: 'Science Students',
      date: '2024-03-11',
      author: 'Science Department',
      priority: 'medium',
      pinned: false,
      read: false,
      attachments: ['science_fair_guidelines.pdf']
    },
    {
      id: 6,
      title: 'Holiday Announcement',
      content: 'School will remain closed on March 26th on account of Holi. All classes and activities scheduled for that day will be rescheduled.',
      audience: 'All Students',
      date: '2024-03-10',
      author: 'Administration',
      priority: 'high',
      pinned: false,
      read: true,
      attachments: []
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

  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const recentAnnouncements = announcements.filter(a => !a.pinned);
  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Announcements - Student Dashboard - EduFlex</title>
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
                      <div className="flex items-center space-x-2">
                        <Pin className="h-5 w-5 text-teal-600 fill-teal-600" />
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleExpand(announcement.id)}>
                        {expandedId === announcement.id ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                    <CardDescription className="flex items-center space-x-4 mt-2">
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
                  </CardHeader>
                  {(expandedId === announcement.id || !expandedId) && (
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {announcement.content}
                      </p>
                      {announcement.attachments.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {announcement.attachments.map((file, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAttachment(file)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      {!announcement.read && (
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(announcement.id)}>
                            Mark as Read
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}

              {/* Recent Announcements */}
              {recentAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={!announcement.read ? 'border-l-4 border-l-teal-600' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          {!announcement.read && (
                            <Badge variant="outline" className="bg-teal-100 text-teal-800">New</Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center space-x-4 mt-2">
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
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {announcement.attachments.map((file, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAttachment(file)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      {!announcement.read && (
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(announcement.id)}>
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
              {announcements.filter(a => !a.read).map((announcement) => (
                <Card key={announcement.id} className="border-l-4 border-l-teal-600">
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.date} • {announcement.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                    <Button className="mt-4" size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
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
      </div>
    </DashboardLayout>
  );
};

export default StudentAnnouncementsPage;