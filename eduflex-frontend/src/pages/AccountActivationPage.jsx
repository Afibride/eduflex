
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext.jsx';

const activationSchema = z.object({
  userId: z.string().min(1, 'School ID is required'),
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const AccountActivationPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { schools, activateAccount } = useAuth();

  const school = schools.find(s => s.id === schoolId);

  useEffect(() => {
    if (!school) {
      navigate('/');
    }
  }, [school, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(activationSchema),
    defaultValues: {
      userId: `${schoolId}-`
    }
  });

  const onSubmit = async (data) => {
    const result = activateAccount(data.userId, data.email, data.newPassword);

    if (result.success) {
      toast.success('Account activated successfully! You can now login.');
      navigate(`/school/${schoolId}/login-form`);
    } else {
      toast.error(result.error || 'Activation failed. Please check your details.');
    }
  };

  if (!school) return null;

  return (
    <>
      <Helmet>
        <title>Activate Account - {school.name}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="p-4">
          <Button variant="ghost" onClick={() => navigate(`/school/${schoolId}/login`)} className="text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl border-t-4 border-t-orange-500">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <KeyRound className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Activate Account</CardTitle>
              <CardDescription>
                Set up your password using your provided School ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-gray-900 dark:text-gray-100">School ID</Label>
                  <Input
                    id="userId"
                    placeholder="e.g. SCH001-STUDENT-001"
                    className="text-gray-900 dark:text-gray-100 uppercase"
                    {...register('userId')}
                  />
                  {errors.userId && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.userId.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Format: {schoolId}-ROLE-NUMBER</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Registered Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="text-gray-900 dark:text-gray-100"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="newPassword" className="text-gray-900 dark:text-gray-100">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Min. 8 characters"
                    className="text-gray-900 dark:text-gray-100"
                    {...register('newPassword')}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.newPassword.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-gray-100">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    className="text-gray-900 dark:text-gray-100"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Activating...' : 'Activate Account'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                  Already activated?{' '}
                  <Link to={`/school/${schoolId}/login-form`} className="text-orange-600 hover:text-orange-700 font-medium">
                    Login here
                  </Link>
                </p>
              </div>
              
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-center text-muted-foreground">
                Demo Activation: Use ID <strong>SCH001-STUDENT-002</strong> and Email <strong>new@springfield.edu</strong>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountActivationPage;
