import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Edit3, GraduationCap, Image, Mail, MapPin, Newspaper, Phone, Search, Star, Trash2, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { schoolAPI } from '@/services/api';
import { toast } from 'sonner';

const emptyProfile = {
  name: '',
  code: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  principal_name: '',
  website: '',
  about: '',
  logo: '',
  profile_image_url: '',
  cover_image_url: '',
  color: 'blue',
  curriculum: [],
};

const emptyPost = {
  title: '',
  excerpt: '',
  content: '',
  category: 'news',
  image_url: '',
  status: 'published',
  is_featured: false,
};

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [profile, setProfile] = useState(emptyProfile);
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState(emptyPost);
  const [editingPostId, setEditingPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [schoolsResponse, profileResponse, postsResponse] = await Promise.all([
        schoolAPI.getAdminSchools(),
        schoolAPI.getAdminProfile(),
        schoolAPI.getAdminPosts({ per_page: 20 }),
      ]);
      const visibleSchools = normalizeItems(schoolsResponse.data);
      const profileData = profileResponse.data || visibleSchools[0] || {};
      setSchools(visibleSchools);
      setProfile({ ...emptyProfile, ...profileData, curriculum: profileData.curriculum || [] });
      setPosts(normalizeItems(postsResponse.data));
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to load your school');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const filteredSchools = useMemo(() => schools.filter((school) => {
    const text = `${school.name} ${school.code} ${school.principal_name || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [schools, searchTerm]);

  const totalStats = {
    schools: schools.length,
    activeSchools: schools.filter(s => s.status === 'active').length,
    totalStudents: schools.reduce((acc, s) => acc + (s.students_count || 0), 0),
    totalTeachers: schools.reduce((acc, s) => acc + (s.teachers_count || 0), 0),
  };

  const updateProfileField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updatePostField = (field, value) => {
    setPostForm(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const payload = {
        ...profile,
        curriculum: Array.isArray(profile.curriculum)
          ? profile.curriculum
          : String(profile.curriculum || '').split(',').map(item => item.trim()).filter(Boolean),
      };
      const response = await schoolAPI.updateAdminProfile(payload);
      setProfile({ ...emptyProfile, ...(response.data.school || payload) });
      toast.success('School public profile updated');
      await loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update school profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setSavingPost(true);
    try {
      if (editingPostId) {
        await schoolAPI.updateAdminPost(editingPostId, postForm);
        toast.success('School post updated');
      } else {
        await schoolAPI.createAdminPost(postForm);
        toast.success('School post published');
      }
      setPostForm(emptyPost);
      setEditingPostId(null);
      await loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save school post');
    } finally {
      setSavingPost(false);
    }
  };

  const startEditingPost = (post) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'news',
      image_url: post.image_url || '',
      status: post.status || 'published',
      is_featured: Boolean(post.is_featured),
    });
  };

  const archivePost = async (post) => {
    try {
      await schoolAPI.deleteAdminPost(post.id);
      toast.success('School post archived');
      await loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not archive school post');
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>My School - Admin - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My School</h1>
          <p className="text-muted-foreground mt-2">Update your public school profile and publish school news for visitors.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-6">
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xs font-medium md:text-sm">Visible</CardTitle><Building2 className="h-4 w-4 text-teal-600 md:h-5 md:w-5" /></CardHeader><CardContent><div className="text-2xl font-bold md:text-3xl">{totalStats.schools}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xs font-medium md:text-sm">Active</CardTitle><Star className="h-4 w-4 text-green-600 md:h-5 md:w-5" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600 md:text-3xl">{totalStats.activeSchools}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xs font-medium md:text-sm">Students</CardTitle><GraduationCap className="h-4 w-4 text-blue-600 md:h-5 md:w-5" /></CardHeader><CardContent><div className="text-2xl font-bold md:text-3xl">{totalStats.totalStudents}</div></CardContent></Card>
          <Card className="col-span-3 md:col-span-1"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xs font-medium md:text-sm">Teachers</CardTitle><Users className="h-4 w-4 text-orange-600 md:h-5 md:w-5" /></CardHeader><CardContent><div className="text-2xl font-bold md:text-3xl">{totalStats.totalTeachers}</div></CardContent></Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>These details appear on the school login page and school directory.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input value={profile.name} onChange={e => updateProfileField('name', e.target.value)} placeholder="School name" required />
                  <Input value={profile.code} onChange={e => updateProfileField('code', e.target.value)} placeholder="School code" required />
                  <Input value={profile.email} onChange={e => updateProfileField('email', e.target.value)} placeholder="School email" type="email" required />
                  <Input value={profile.phone || ''} onChange={e => updateProfileField('phone', e.target.value)} placeholder="Phone" />
                  <Input value={profile.principal_name || ''} onChange={e => updateProfileField('principal_name', e.target.value)} placeholder="Principal / administrator" />
                  <Input value={profile.website || ''} onChange={e => updateProfileField('website', e.target.value)} placeholder="Website" />
                  <Input value={profile.city || ''} onChange={e => updateProfileField('city', e.target.value)} placeholder="City" />
                  <Input value={profile.region || ''} onChange={e => updateProfileField('region', e.target.value)} placeholder="Region" />
                </div>
                <Input value={profile.address || ''} onChange={e => updateProfileField('address', e.target.value)} placeholder="Address" />
                <Textarea value={profile.about || ''} onChange={e => updateProfileField('about', e.target.value)} placeholder="Short public profile about the school" rows={4} />
                <div className="grid gap-4 md:grid-cols-3">
                  <Input value={profile.logo || ''} onChange={e => updateProfileField('logo', e.target.value)} placeholder="Logo URL" />
                  <Input value={profile.profile_image_url || ''} onChange={e => updateProfileField('profile_image_url', e.target.value)} placeholder="Profile picture URL" />
                  <Input value={profile.cover_image_url || ''} onChange={e => updateProfileField('cover_image_url', e.target.value)} placeholder="Cover image URL" />
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <Input
                    value={Array.isArray(profile.curriculum) ? profile.curriculum.join(', ') : profile.curriculum || ''}
                    onChange={e => updateProfileField('curriculum', e.target.value)}
                    placeholder="Programs, separated by commas"
                  />
                  <Button type="submit" disabled={savingProfile || loading} className="gap-2">
                    <Image className="h-4 w-4" />
                    {savingProfile ? 'Saving...' : 'Save Profile'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{editingPostId ? 'Edit School Post' : 'Publish School Post'}</CardTitle>
              <CardDescription>Posts appear publicly on the school login page.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <Input value={postForm.title} onChange={e => updatePostField('title', e.target.value)} placeholder="Post title" required />
                <Textarea value={postForm.excerpt} onChange={e => updatePostField('excerpt', e.target.value)} placeholder="Short summary" rows={2} />
                <Textarea value={postForm.content} onChange={e => updatePostField('content', e.target.value)} placeholder="Full post content" rows={5} required />
                <Input value={postForm.image_url} onChange={e => updatePostField('image_url', e.target.value)} placeholder="Image URL" />
                <div className="grid gap-4 md:grid-cols-3">
                  <Select value={postForm.category} onValueChange={value => updatePostField('category', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="admissions">Admissions</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={postForm.status} onValueChange={value => updatePostField('status', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={postForm.is_featured ? 'yes' : 'no'} onValueChange={value => updatePostField('is_featured', value === 'yes')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Featured</SelectItem>
                      <SelectItem value="no">Not featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" disabled={savingPost} className="gap-2">
                    <Newspaper className="h-4 w-4" />
                    {savingPost ? 'Saving...' : editingPostId ? 'Update Post' : 'Publish Post'}
                  </Button>
                  {editingPostId && (
                    <Button type="button" variant="outline" onClick={() => { setEditingPostId(null); setPostForm(emptyPost); }}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div><CardTitle>School Scope</CardTitle><CardDescription>Your admin scope is restricted to this school.</CardDescription></div>
              <div className="relative w-full md:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Search..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading school...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>School</TableHead><TableHead>Code</TableHead><TableHead>Principal</TableHead><TableHead>Students</TableHead><TableHead>Teachers</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>{filteredSchools.map(school => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{school.name}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{school.city || school.region || 'Cameroon'}</span>
                          <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{school.email}</span>
                          <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{school.phone || '-'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{school.code}</TableCell>
                    <TableCell>{school.principal_name || '-'}</TableCell>
                    <TableCell>{school.students_count || 0}</TableCell>
                    <TableCell>{school.teachers_count || 0}</TableCell>
                    <TableCell><Badge className={school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{school.status}</Badge></TableCell>
                  </TableRow>
                ))}</TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published School Posts</CardTitle>
            <CardDescription>Manage the public content shown on your school login page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Post</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Featured</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {posts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <p className="font-medium">{post.title}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{post.excerpt || post.content}</p>
                    </TableCell>
                    <TableCell className="capitalize">{post.category}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{post.status}</Badge></TableCell>
                    <TableCell>{post.is_featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => startEditingPost(post)}><Edit3 className="h-4 w-4" /></Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => archivePost(post)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!posts.length && <p className="py-8 text-center text-muted-foreground">No school posts yet.</p>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolsPage;
