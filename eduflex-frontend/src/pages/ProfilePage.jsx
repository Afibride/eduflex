// pages/ProfilePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, 
  GraduationCap, Users, Award, Settings, Camera, 
  Save, Lock, Bell, Shield, Moon, Sun
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext.jsx';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Education St, New York, NY 10001',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    ...(user?.role === 'teacher' && {
      employeeId: 'TCH-2024-001',
      department: 'Science',
      subjects: ['Mathematics', 'Physics'],
      qualification: 'M.Sc. Mathematics',
      experience: '8 years',
      joiningDate: '2020-08-15'
    }),
    ...(user?.role === 'student' && {
      rollNumber: '2024-10A-001',
      class: '10A',
      section: 'A',
      admissionDate: '2023-06-10',
      parentName: 'Robert Smith',
      parentPhone: '+1 234 567 8901'
    }),
    ...(user?.role === 'parent' && {
      occupation: 'Software Engineer',
      children: ['Emma Johnson (10A)', 'David Johnson (8B)'],
      emergencyContact: '+1 234 567 8902'
    }),
    ...(user?.role === 'admin' && {
      employeeId: 'ADM-2024-001',
      department: 'Administration',
      role: 'System Administrator',
      joiningDate: '2019-03-20'
    })
  });

  const getRoleIcon = () => {
    switch(user?.role) {
      case 'admin': return <Shield className="h-5 w-5" />;
      case 'teacher': return <GraduationCap className="h-5 w-5" />;
      case 'student': return <Award className="h-5 w-5" />;
      case 'parent': return <Users className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = () => {
    switch(user?.role) {
      case 'admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'teacher': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'student': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'parent': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    toast.info('Password change feature coming soon!');
  };

  const handleUploadPhoto = () => {
    toast.info('Photo upload feature coming soon!');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Profile - EduFlex</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your personal information and preferences</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            className={isEditing ? "bg-teal-600 hover:bg-teal-700" : ""}
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-teal-100 dark:border-teal-900">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="text-2xl bg-teal-600 text-white">
                        {getInitials(profileData.name)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800"
                        onClick={handleUploadPhoto}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleColor()}`}>
                        {user?.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{profileData.email}</p>
                    <div className="flex items-center mt-3 space-x-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileData.address}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        {profileData.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-teal-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    {isEditing ? (
                      <Input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    {isEditing ? (
                      <Input 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    {isEditing ? (
                      <Input 
                        type="date" 
                        value={profileData.dateOfBirth} 
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.dateOfBirth}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    {isEditing ? (
                      <Input 
                        value={profileData.gender} 
                        onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.gender}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    {isEditing ? (
                      <Input 
                        value={profileData.address} 
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role-specific Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getRoleIcon()}
                  <span className="ml-2 capitalize">{user?.role}-Specific Information</span>
                </CardTitle>
                <CardDescription>Details related to your role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {user?.role === 'teacher' && (
                    <>
                      <div className="space-y-2">
                        <Label>Employee ID</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.employeeId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.department}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Subjects</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.subjects.join(', ')}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Qualification</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.qualification}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Experience</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.experience}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Joining Date</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.joiningDate}</p>
                      </div>
                    </>
                  )}

                  {user?.role === 'student' && (
                    <>
                      <div className="space-y-2">
                        <Label>Roll Number</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.rollNumber}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Class</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.class}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Section</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.section}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Admission Date</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.admissionDate}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Parent Name</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.parentName}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Parent Phone</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.parentPhone}</p>
                      </div>
                    </>
                  )}

                  {user?.role === 'parent' && (
                    <>
                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.occupation}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Contact</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.emergencyContact}</p>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Children</Label>
                        <ul className="list-disc list-inside text-gray-900 dark:text-white">
                          {profileData.children.map((child, index) => (
                            <li key={index}>{child}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {user?.role === 'admin' && (
                    <>
                      <div className="space-y-2">
                        <Label>Employee ID</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.employeeId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.department}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.role}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Joining Date</Label>
                        <p className="text-gray-900 dark:text-white">{profileData.joiningDate}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-teal-600" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  <Button onClick={handleChangePassword} className="bg-teal-600 hover:bg-teal-700">
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-muted-foreground">New York, US • Last active 2 minutes ago</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Current</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">New York, US • Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-teal-600" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">Important updates via SMS</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </div>
                    <Switch />
                    <div className="flex items-center space-x-2">
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language & Region</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isEditing && (
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} className="bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;