// pages/teacher/SchedulePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Calendar, Clock, MapPin, BookOpen,
  ChevronLeft, ChevronRight, Bell
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const TeacherSchedulePage = () => {
  const [currentWeek, setCurrentWeek] = useState('Mar 11 - Mar 17, 2024');

  const schedule = {
    monday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', class: '10A', room: '101', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Physics', class: '11B', room: '203', type: 'lab' },
      { time: '11:30 - 12:30', subject: 'Mathematics', class: '10B', room: '102', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'Free Period', class: '-', room: 'Staff Room', type: 'free' },
      { time: '14:45 - 15:45', subject: 'Mathematics', class: '11A', room: '105', type: 'lecture' },
    ],
    tuesday: [
      { time: '09:00 - 10:00', subject: 'Physics', class: '11A', room: '203', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Mathematics', class: '10A', room: '101', type: 'lecture' },
      { time: '11:30 - 12:30', subject: 'Physics', class: '11B', room: '204', type: 'lab' },
      { time: '13:30 - 14:30', subject: 'Department Meeting', class: '-', room: 'Conference Room', type: 'meeting' },
      { time: '14:45 - 15:45', subject: 'Free Period', class: '-', room: 'Staff Room', type: 'free' },
    ],
    wednesday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', class: '11A', room: '105', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Physics', class: '10B', room: '202', type: 'lecture' },
      { time: '11:30 - 12:30', subject: 'Mathematics', class: '10B', room: '102', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'Mathematics', class: '10A', room: '101', type: 'tutorial' },
      { time: '14:45 - 15:45', subject: 'Free Period', class: '-', room: 'Staff Room', type: 'free' },
    ],
    thursday: [
      { time: '09:00 - 10:00', subject: 'Physics', class: '11B', room: '203', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Mathematics', class: '10A', room: '101', type: 'lecture' },
      { time: '11:30 - 12:30', subject: 'Physics', class: '11A', room: '204', type: 'lab' },
      { time: '13:30 - 14:30', subject: 'Parent-Teacher Meeting', class: '-', room: 'Room 105', type: 'meeting' },
      { time: '14:45 - 15:45', subject: 'Free Period', class: '-', room: 'Staff Room', type: 'free' },
    ],
    friday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', class: '10B', room: '102', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Physics', class: '10A', room: '202', type: 'lab' },
      { time: '11:30 - 12:30', subject: 'Mathematics', class: '11A', room: '105', type: 'lecture' },
      { time: '13:30 - 14:30', subject: 'Staff Meeting', class: '-', room: 'Conference Room', type: 'meeting' },
      { time: '14:45 - 15:45', subject: 'Free Period', class: '-', room: 'Staff Room', type: 'free' },
    ],
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'lab': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tutorial': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'meeting': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'free': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreviousWeek = () => {
    toast.info('Loading previous week...');
  };

  const handleNextWeek = () => {
    toast.info('Loading next week...');
  };

  const handleClassClick = (item) => {
    if (item.subject !== 'Free Period') {
      toast.info(`Opening ${item.subject} - Class ${item.class}`);
    }
  };

  const handleSetReminder = (item) => {
    toast.success(`Reminder set for ${item.subject} at ${item.time}`);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Schedule - Teacher Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
            <p className="text-muted-foreground mt-2">View and manage your weekly class schedule</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-4 py-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
              <span className="font-medium text-teal-700 dark:text-teal-300">{currentWeek}</span>
            </div>
            <Button variant="outline" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="grid grid-cols-5 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => {
                const dayKey = day.toLowerCase();
                return (
                  <Card key={day} className="col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{day}</CardTitle>
                      <CardDescription>March {11 + index}, 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {schedule[dayKey]?.map((item, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${item.subject === 'Free Period' ? 'bg-gray-50 dark:bg-gray-800' : 'hover:border-teal-500'}`}
                          onClick={() => handleClassClick(item)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => {
                              e.stopPropagation();
                              handleSetReminder(item);
                            }}>
                              <Bell className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-sm">{item.subject}</p>
                          {item.class !== '-' && (
                            <p className="text-xs text-muted-foreground">Class {item.class}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>Room {item.room}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule - Monday, March 11, 2024</CardTitle>
                <CardDescription>Your classes and activities for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.monday.map((item, index) => (
                    <div key={index} className="flex items-start p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="w-24 font-medium">{item.time}</div>
                      <div className="flex-1 ml-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{item.subject}</h3>
                          <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                        </div>
                        {item.class !== '-' && (
                          <p className="text-sm text-muted-foreground">Class {item.class}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            Room {item.room}
                          </span>
                        </div>
                      </div>
                      {item.subject !== 'Free Period' && (
                        <Button variant="outline" size="sm" onClick={() => handleClassClick(item)}>
                          View Details
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Calendar</CardTitle>
                <CardDescription>March 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 font-semibold text-sm">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const hasClass = [11, 12, 13, 14, 15, 18, 19, 20, 21, 22].includes(day);
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square p-2 border rounded-lg ${hasClass ? 'bg-teal-50 dark:bg-teal-950 border-teal-200' : ''}`}
                        onClick={() => hasClass && toast.info(`Viewing schedule for March ${day}`)}
                      >
                        <span className="text-sm">{day}</span>
                        {hasClass && (
                          <div className="mt-1">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mx-auto"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium">Parent-Teacher Meeting</p>
                    <p className="text-sm text-muted-foreground">March 20, 2024 at 2:00 PM</p>
                  </div>
                </div>
                <Badge>Required</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Department Meeting</p>
                    <p className="text-sm text-muted-foreground">March 22, 2024 at 3:30 PM</p>
                  </div>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherSchedulePage;