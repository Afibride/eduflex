import React from 'react';
import { Helmet } from 'react-helmet';
import { Video, CalendarClock, MonitorPlay } from 'lucide-react';
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
        <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg">
              <Video className="h-7 w-7" />
            </div>
            <h2 className="text-4xl font-black text-slate-950 dark:text-white">Coming soon</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">
              EduFlex video classes will let schools host live lessons, share class links, manage schedules, and keep online learning inside the school workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button disabled className="bg-teal-600"><CalendarClock className="mr-2 h-4 w-4" />Schedule class</Button>
              <Button disabled variant="outline"><MonitorPlay className="mr-2 h-4 w-4" />Join live class</Button>
            </div>
          </div>
          <div className="rounded-3xl border bg-white/80 p-6 shadow-xl dark:bg-gray-800/80">
            <div className="aspect-video rounded-2xl bg-slate-950 p-4 text-white">
              <div className="flex h-full items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-blue-600/40 to-green-600/30">
                <Video className="h-16 w-16" />
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
