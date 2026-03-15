// pages/student/TimetablePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Calendar, Clock, MapPin, BookOpen,
  ChevronLeft, ChevronRight, Bell,
  Download, Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const StudentTimetablePage = () => {
  const [currentWeek, setCurrentWeek] = useState('Mar 11 - Mar 17, 2024');
  const [selectedDay, setSelectedDay] = useState('monday');

  const timetable = {
    monday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Physics', teacher: 'Ms. Davis', room: '203', type: 'lab' },
      { time: '11:30 - 12:30', subject: 'English', teacher: 'Mrs. Brown', room: '302', type: 'lecture' },
      { time: '12:30 - 13:30', subject: 'Lunch Break', room: 'Cafeteria', type: 'break' },
      { time: '13:30 - 14:30', subject: 'Chemistry', teacher: 'Dr. Wilson', room: '105', type: 'lecture' },
      { time: '14:45 - 15:45', subject: 'Computer Science', teacher: 'Mr. Smith', room: '401', type: 'lab' },
    ],
    tuesday: [
      { time: '09:00 - 10:00', subject: 'Physics', teacher: 'Ms. Davis', room: '203', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101', type: 'lecture' },
      { time: '11:30 - 12:30', subject: 'History', teacher: 'Mr. Williams', room: '205', type: 'lecture' },
      { time: '12:30 - 13:30', subject: 'Lunch Break', room: 'Cafeteria', type: 'break' },
      { time: '13:30 - 14:30', subject: 'Physical Education', teacher: 'Coach Taylor', room: 'Gym', type: 'sports' },
      { time: '14:45 - 15:45', subject: 'Art', teacher: 'Ms. Anderson', room: 'Art Studio', type: 'practical' },
    ],
    wednesday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Chemistry', teacher: 'Dr. Wilson', room: '105', type: 'lab' },
      { time: '11:30 - 12:30', subject: 'English', teacher: 'Mrs. Brown', room: '302', type: 'lecture' },
      { time: '12:30 - 13:30', subject: 'Lunch Break', room: 'Cafeteria', type: 'break' },
      { time: '13:30 - 14:30', subject: 'Computer Science', teacher: 'Mr. Smith', room: '401', type: 'lecture' },
      { time: '14:45 - 15:45', subject: 'Study Hall', room: 'Library', type: 'study' },
    ],
    thursday: [
      { time: '09:00 - 10:00', subject: 'Physics', teacher: 'Ms. Davis', room: '203', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101', type: 'tutorial' },
      { time: '11:30 - 12:30', subject: 'History', teacher: 'Mr. Williams', room: '205', type: 'lecture' },
      { time: '12:30 - 13:30', subject: 'Lunch Break', room: 'Cafeteria', type: 'break' },
      { time: '13:30 - 14:30', subject: 'Chemistry', teacher: 'Dr. Wilson', room: '105', type: 'lab' },
      { time: '14:45 - 15:45', subject: 'Club Activities', room: 'Various', type: 'activity' },
    ],
    friday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Johnson', room: '101', type: 'lecture' },
      { time: '10:15 - 11:15', subject: 'English', teacher: 'Mrs. Brown', room: '302', type: 'lecture' },
      { time: '11:30 - 12:30', subject: 'Computer Science', teacher: 'Mr. Smith', room: '401', type: 'lab' },
      { time: '12:30 - 13:30', subject: 'Lunch Break', room: 'Cafeteria', type: 'break' },
      { time: '13:30 - 14:30', subject: 'Physical Education', teacher: 'Coach Taylor', room: 'Gym', type: 'sports' },
      { time: '14:45 - 15:45', subject: 'Assembly', room: 'Auditorium', type: 'assembly' },
    ],
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200';
      case 'lab': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200';
      case 'tutorial': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200';
      case 'break': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200';
      case 'sports': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200';
      case 'practical': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-200';
      case 'study': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 border-teal-200';
      case 'activity': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border-indigo-200';
      case 'assembly': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreviousWeek = () => {
    toast.info('Loading previous week...');
  };

  const handleNextWeek = () => {
    toast.info('Loading next week...');
  };

  const handleDownloadTimetable = () => {
    toast.info('Downloading timetable...');
  };

  const handleSetReminder = (subject, time) => {
    toast.success(`Reminder set for ${subject} at ${time}`);
  };

  const days = [
    { key: 'monday', label: 'Monday', date: '11' },
    { key: 'tuesday', label: 'Tuesday', date: '12' },
    { key: 'wednesday', label: 'Wednesday', date: '13' },
    { key: 'thursday', label: 'Thursday', date: '14' },
    { key: 'friday', label: 'Friday', date: '15' },
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Timetable - Student Dashboard - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Timetable</h1>
            <p className="text-muted-foreground mt-2">View your weekly class schedule</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleDownloadTimetable}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span className="font-medium text-lg">{currentWeek}</span>
              </div>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Day Selector for Mobile */}
        <div className="md:hidden">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {days.map(day => (
                <SelectItem key={day.key} value={day.key}>
                  {day.label} (Mar {day.date})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Weekly View */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {days.map((day) => (
            <Card key={day.key} className="col-span-1">
              <CardHeader className="pb-2 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
                <CardTitle className="text-lg">{day.label}</CardTitle>
                <CardDescription>Mar {day.date}, 2024</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {timetable[day.key]?.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${item.type !== 'break' ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${getTypeColor(item.type)}`}
                    onClick={() => item.type !== 'break' && toast.info(`${item.subject} with ${item.teacher}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-white dark:bg-gray-800">
                        {item.type}
                      </Badge>
                      {item.type !== 'break' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetReminder(item.subject, item.time);
                          }}
                        >
                          <Bell className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="font-semibold text-sm">{item.subject}</p>
                    {item.teacher && item.teacher !== 'Lunch Break' && (
                      <p className="text-xs text-muted-foreground mt-1">{item.teacher}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>{item.room}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Daily View */}
        <div className="md:hidden">
          <Card>
            <CardHeader>
              <CardTitle>
                {days.find(d => d.key === selectedDay)?.label}, Mar {days.find(d => d.key === selectedDay)?.date} 2024
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timetable[selectedDay]?.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${item.type !== 'break' ? 'cursor-pointer' : ''} ${getTypeColor(item.type)}`}
                  onClick={() => item.type !== 'break' && toast.info(`${item.subject} with ${item.teacher}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-white dark:bg-gray-800">
                      {item.type}
                    </Badge>
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                  <p className="font-semibold">{item.subject}</p>
                  {item.teacher && item.teacher !== 'Lunch Break' && (
                    <p className="text-sm text-muted-foreground mt-1">{item.teacher}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{item.room}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Monday, March 11, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timetable.monday.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{item.subject}</p>
                      <p className="text-sm text-muted-foreground">{item.time} • Room {item.room}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Next</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-teal-600">35</p>
              <p className="text-sm text-muted-foreground">Classes/Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-muted-foreground">Labs/Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-orange-600">2</p>
              <p className="text-sm text-muted-foreground">Free Periods</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentTimetablePage;