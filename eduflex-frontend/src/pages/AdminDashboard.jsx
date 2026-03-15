// pages/AdminDashboard.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Users, GraduationCap, UserCircle, 
  TrendingUp, Calendar, School, Shield, Bell,
  BarChart, CheckCircle, Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Schools', value: 5, icon: Building2, color: 'text-teal-600', bgColor: 'bg-teal-100 dark:bg-teal-900', link: '/admin/schools' },
    { title: 'Total Teachers', value: 23, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900', link: '/admin/teachers' },
    { title: 'Total Students', value: 127, icon: GraduationCap, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900', link: '/admin/students' },
    { title: 'Total Parents', value: 64, icon: UserCircle, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900', link: '/admin/parents' }
  ];

  const quickActions = [
    { title: 'Manage Teachers', description: 'Add, edit, or remove teacher accounts', icon: Users, action: 'teachers', link: '/admin/teachers', color: 'bg-blue-100 dark:bg-blue-900' },
    { title: 'Manage Students', description: 'View and manage student records', icon: GraduationCap, action: 'students', link: '/admin/students', color: 'bg-orange-100 dark:bg-orange-900' },
    { title: 'Manage Parents', description: 'Handle parent accounts and access', icon: UserCircle, action: 'parents', link: '/admin/parents', color: 'bg-purple-100 dark:bg-purple-900' },
    { title: 'Marks Verification', description: 'Review and approve submitted marks', icon: CheckCircle, action: 'marks', link: '/admin/marks', color: 'bg-green-100 dark:bg-green-900' },
    { title: 'School Settings', description: 'Configure school preferences', icon: Settings, action: 'settings', link: '/admin/settings', color: 'bg-gray-100 dark:bg-gray-900' },
    { title: 'Generate Reports', description: 'Create comprehensive reports', icon: BarChart, action: 'reports', link: '/admin/reports', color: 'bg-teal-100 dark:bg-teal-900' }
  ];

  const recentActivities = [
    { action: 'New teacher registered', user: 'Sarah Johnson', time: '2 hours ago', type: 'teacher' },
    { action: 'Marks uploaded for Class 10A', user: 'Michael Brown', time: '5 hours ago', type: 'marks' },
    { action: 'New student enrolled', user: 'Emma Wilson', time: '1 day ago', type: 'student' },
    { action: 'Parent account created', user: 'Robert Davis', time: '2 days ago', type: 'parent' }
  ];

  const pendingVerifications = [
    { class: '10A', subject: 'Mathematics', teacher: 'Sarah Johnson', submissions: 35 },
    { class: '11B', subject: 'Physics', teacher: 'Michael Brown', submissions: 28 }
  ];

  const handleViewAll = (link) => {
    navigate(link);
  };

  const handleQuickAction = (link) => {
    navigate(link);
  };

  const handleViewActivity = (type) => {
    switch(type) {
      case 'teacher':
        navigate('/admin/teachers');
        break;
      case 'student':
        navigate('/admin/students');
        break;
      case 'parent':
        navigate('/admin/parents');
        break;
      case 'marks':
        navigate('/admin/marks');
        break;
      default:
        toast.info('Viewing details');
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Admin Dashboard - EduFlex</title>
        <meta name="description" content="Manage your school's teachers, students, parents, and academic activities from the admin dashboard." />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your school system.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(stat.link)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12% from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription>Manage your school operations efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card 
                    key={action.action} 
                    className="border-2 hover:border-teal-500 transition-colors cursor-pointer"
                    onClick={() => handleQuickAction(action.link)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <Icon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                        </div>
                        <CardTitle className="text-base text-gray-900 dark:text-white">{action.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAction(action.link);
                      }}>
                        Open
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Pending Verifications</CardTitle>
            <CardDescription>Marks waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div>
                    <p className="font-medium">{item.class} - {item.subject}</p>
                    <p className="text-sm text-muted-foreground">Teacher: {item.teacher}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {item.submissions} submissions
                    </span>
                    <Button size="sm" onClick={() => navigate('/admin/marks')}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Activities</CardTitle>
            <CardDescription>Latest updates from your school system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 pb-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg"
                  onClick={() => handleViewActivity(activity.type)}
                >
                  <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900">
                    {activity.type === 'teacher' && <Users className="h-4 w-4 text-teal-600 dark:text-teal-300" />}
                    {activity.type === 'student' && <GraduationCap className="h-4 w-4 text-teal-600 dark:text-teal-300" />}
                    {activity.type === 'parent' && <UserCircle className="h-4 w-4 text-teal-600 dark:text-teal-300" />}
                    {activity.type === 'marks' && <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-300" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Quick access to key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/admin/announcements')}>
                <Bell className="h-6 w-6 mb-2 text-teal-600" />
                <span>Announcements</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/admin/reports')}>
                <BarChart className="h-6 w-6 mb-2 text-blue-600" />
                <span>Reports</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/admin/schools')}>
                <School className="h-6 w-6 mb-2 text-purple-600" />
                <span>Schools</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigate('/admin/settings')}>
                <Settings className="h-6 w-6 mb-2 text-gray-600" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;