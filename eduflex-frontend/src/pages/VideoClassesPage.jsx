import React from 'react';
import { Helmet } from 'react-helmet';
import { Video, CalendarClock, MonitorPlay, Users, BookOpen, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout.jsx';

const VideoClassesPage = () => (
  <DashboardLayout>
    <Helmet><title>Video Classes - EduFlex</title></Helmet>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Video Classes</h1>
        <p className="text-muted-foreground mt-2">Online classes and live lessons on EduFlex.</p>
      </div>

      <Card className="overflow-hidden border-teal-100 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardContent className="grid gap-5 p-4 sm:p-6 md:grid-cols-[1fr_320px] md:items-center md:p-8">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl">
              <Video className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Coming soon</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-200 sm:mt-4 sm:text-lg sm:leading-8">
              EduFlex video classes will let schools host live lessons, share class links, manage schedules, and keep online learning inside the school workspace.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <Button disabled className="bg-teal-600 px-2 text-xs sm:px-4 sm:text-sm"><CalendarClock className="mr-1 h-4 w-4 sm:mr-2" />Schedule</Button>
              <Button disabled variant="outline" className="px-2 text-xs sm:px-4 sm:text-sm"><MonitorPlay className="mr-1 h-4 w-4 sm:mr-2" />Join</Button>
              <Button disabled variant="outline" className="px-2 text-xs sm:px-4 sm:text-sm"><Users className="mr-1 h-4 w-4 sm:mr-2" />Rooms</Button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-lg border bg-white/70 p-3 text-center dark:bg-gray-800/70">
                <CalendarClock className="mx-auto mb-2 h-5 w-5 text-teal-600" />
                <p className="text-xs font-semibold">Scheduling</p>
              </div>
              <div className="rounded-lg border bg-white/70 p-3 text-center dark:bg-gray-800/70">
                <BookOpen className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                <p className="text-xs font-semibold">Lessons</p>
              </div>
              <div className="rounded-lg border bg-white/70 p-3 text-center dark:bg-gray-800/70">
                <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-green-600" />
                <p className="text-xs font-semibold">Secure</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border bg-white/80 p-4 shadow-xl dark:bg-gray-800/80 sm:rounded-3xl sm:p-6">
            <div className="aspect-video rounded-xl bg-slate-950 p-3 text-white sm:rounded-2xl sm:p-4">
              <div className="flex h-full items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-blue-600/40 to-green-600/30">
                <Video className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-medium text-muted-foreground">Live lesson room preview</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default VideoClassesPage;
