import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Bell, Calendar, Eye, Pin, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { schoolAPI } from '@/services/api';
import { toast } from 'sonner';

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

const SchoolAnnouncementsPage = ({ title = 'Announcements' }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await schoolAPI.getMyAnnouncements();
        setAnnouncements(response.data.data || response.data || []);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <DashboardLayout>
      <Helmet><title>{title} - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-muted-foreground mt-2">Latest updates published by your school administration.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-teal-600" />School Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading announcements...
              </div>
            ) : announcements.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">No announcements have been published yet.</p>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <article key={announcement.id} className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-gray-900">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {announcement.is_pinned && <Pin className="h-4 w-4 text-teal-600" />}
                          <h2 className="text-lg font-bold text-gray-950 dark:text-white">{announcement.title}</h2>
                          <Badge className={getPriorityClass(announcement.priority)}>{announcement.priority}</Badge>
                          <Badge variant="outline" className="capitalize">{announcement.audience}</Badge>
                        </div>
                        <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{announcement.content}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{announcement.published_at ? new Date(announcement.published_at).toLocaleDateString() : 'Draft date'}</span>
                      <span>By {announcement.author?.name || 'School Admin'}</span>
                      <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />{announcement.views || 0} views</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolAnnouncementsPage;
