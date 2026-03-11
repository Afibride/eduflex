
import React from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Users, GraduationCap, UserCircle, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Schools', value: 5, icon: Building2, color: 'text-teal-600', bgColor: 'bg-teal-100 dark:bg-teal-900' },
    { title: 'Total Teachers', value: 23, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900' },
    { title: 'Total Students', value: 127, icon: GraduationCap, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' },
    { title: 'Total Parents', value: 64, icon: UserCircle, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900' }
  ];

  const quickActions = [
    { title: 'Manage Teachers', description: 'Add, edit, or remove teacher accounts', action: 'teachers' },
    { title: 'Manage Students', description: 'View and manage student records', action: 'students' },
    { title: 'Manage Parents', description: 'Handle parent accounts and access', action: 'parents' },
    { title: 'Marks Verification', description: 'Review and approve submitted marks', action: 'marks' },
    { title: 'School Settings', description: 'Configure school preferences', action: 'settings' },
    { title: 'Generate Reports', description: 'Create comprehensive reports', action: 'reports' }
  ];

  const recentActivities = [
    { action: 'New teacher registered', user: 'Sarah Johnson', time: '2 hours ago' },
    { action: 'Marks uploaded for Class 10A', user: 'Michael Brown', time: '5 hours ago' },
    { action: 'New student enrolled', user: 'Emma Wilson', time: '1 day ago' },
    { action: 'Parent account created', user: 'Robert Davis', time: '2 days ago' }
  ];

  const handleQuickAction = (action) => {
    toast.info('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀');
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
              <Card key={stat.title}>
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
              {quickActions.map((action) => (
                <Card key={action.action} className="border-2 hover:border-teal-500 transition-colors cursor-pointer" onClick={() => handleQuickAction(action.action)}>
                  <CardHeader>
                    <CardTitle className="text-base text-gray-900 dark:text-white">{action.title}</CardTitle>
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => handleQuickAction(action.action)}>
                      Open
                    </Button>
                  </CardContent>
                </Card>
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
                <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                  <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900">
                    <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-300" />
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
