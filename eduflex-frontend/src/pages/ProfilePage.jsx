
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { User, Mail, Phone, Building2, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';

const profileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional()
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm
  } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const onProfileSubmit = async (data) => {
    const result = updateProfile(data);
    if (result.success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.currentPassword !== user?.password) {
      toast.error('Current password is incorrect');
      return;
    }

    const result = updateProfile({ password: data.newPassword });
    if (result.success) {
      toast.success('Password changed successfully!');
      resetPasswordForm();
    } else {
      toast.error('Failed to change password');
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        updateProfile({ profilePicture: reader.result });
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      teacher: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      student: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      parent: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Profile - EduFlex</title>
        <meta name="description" content="Manage your profile information, update your details, and change your password." />
      </Helmet>

      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                    <User className="w-12 h-12 text-teal-600 dark:text-teal-300" />
                  </div>
                )}
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 p-2 bg-teal-600 rounded-full cursor-pointer hover:bg-teal-700 transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getRoleBadgeColor(user?.role)}`}>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerProfile('name')}
                />
                {profileErrors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">{profileErrors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerProfile('email')}
                />
                {profileErrors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{profileErrors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 dark:text-gray-100">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerProfile('phone')}
                />
                {profileErrors.phone && (
                  <p className="text-sm text-red-600 dark:text-red-400">{profileErrors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-gray-100">
                  <Building2 className="inline h-4 w-4 mr-2" />
                  Role
                </Label>
                <Input
                  value={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                disabled={isProfileSubmitting}
              >
                {isProfileSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-900 dark:text-gray-100">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerPassword('currentPassword')}
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-900 dark:text-gray-100">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password (min. 8 characters)"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerPassword('newPassword')}
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-gray-100">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="text-gray-900 dark:text-gray-100"
                  {...registerPassword('confirmPassword')}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isPasswordSubmitting}
              >
                {isPasswordSubmitting ? 'Changing Password...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
