import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Trash2, Mail, KeyRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { classAPI, teacherAPI } from '@/services/api';
import { toast } from 'sonner';

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  gender: 'male',
  subjects: '',
  class_ids: [],
};

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const [teachersResponse, classesResponse] = await Promise.all([
        teacherAPI.getAll(),
        classAPI.getAll({ per_page: 100 }),
      ]);
      setTeachers(teachersResponse.data.data || teachersResponse.data || []);
      setClasses(classesResponse.data.data || classesResponse.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => teachers.filter((teacher) => {
    const text = `${teacher.full_name || ''} ${teacher.user?.email || ''} ${teacher.teacher_number || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [teachers, searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        subjects: form.subjects.split(',').map(item => item.trim()).filter(Boolean),
      };
      const response = await teacherAPI.create(payload);
      setActivationCode(response.data.activation_code || response.data.user_id);
      toast.success('Teacher created. Share the activation code with the teacher.');
      setForm(emptyForm);
      await loadTeachers();
    } catch (error) {
      const errors = error.response?.data?.errors;
      toast.error(errors ? Object.values(errors).flat()[0] : 'Failed to create teacher');
    } finally {
      setSaving(false);
    }
  };

  const toggleClass = (classId) => {
    setForm((current) => {
      const exists = current.class_ids.includes(classId);
      return {
        ...current,
        class_ids: exists
          ? current.class_ids.filter(id => id !== classId)
          : [...current.class_ids, classId],
      };
    });
  };

  const getTeacherClasses = (teacher) => teacher.teaching_classes || teacher.teachingClasses || [];

  const handleDelete = async (teacher) => {
    try {
      await teacherAPI.delete(teacher.id);
      toast.success('Teacher deleted');
      loadTeachers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete teacher');
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Manage Teachers - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
            <p className="text-muted-foreground mt-2">Manage teacher accounts and activation codes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setActivationCode(''); }}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700"><Plus className="h-4 w-4 mr-2" />Add Teacher</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[620px]">
              <DialogHeader>
                <DialogTitle>Add Teacher</DialogTitle>
                <DialogDescription>Create a teacher account. The teacher activates it with the generated code.</DialogDescription>
              </DialogHeader>
              {activationCode ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
                  <div className="flex items-center gap-2 font-semibold"><KeyRound className="h-5 w-5" />Activation code generated</div>
                  <p className="mt-2 text-2xl font-bold tracking-wide">{activationCode}</p>
                  <p className="mt-1 text-sm">Share this code with the teacher together with their email address.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>First name</Label><Input value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Last name</Label><Input value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select value={form.gender} onValueChange={gender => setForm({ ...form, gender })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Subjects</Label><Input placeholder="Mathematics, Physics" value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Classes to Teach</Label>
                    <div className="max-h-44 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3">
                      {classes.length ? (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {classes.map((schoolClass) => (
                            <label key={schoolClass.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm text-gray-800 hover:bg-blue-50">
                              <input
                                type="checkbox"
                                checked={form.class_ids.includes(schoolClass.id)}
                                onChange={() => toggleClass(schoolClass.id)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span>{schoolClass.full_name || `${schoolClass.name}${schoolClass.section ? ` ${schoolClass.section}` : ''}`}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No classes found. Create classes first, then assign them here.</p>
                      )}
                    </div>
                  </div>
                  <DialogFooter><Button type="submit" disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Teacher</Button></DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Teachers</CardTitle>
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search teachers..." className="pl-10 w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading teachers...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>Activation Code</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Subjects</TableHead><TableHead>Classes</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filteredTeachers.map(teacher => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-mono text-xs">{teacher.user?.user_id || teacher.teacher_number}</TableCell>
                      <TableCell className="font-medium">{teacher.full_name}</TableCell>
                      <TableCell>{teacher.user?.email}</TableCell>
                      <TableCell>{teacher.user?.phone || '-'}</TableCell>
                      <TableCell>{Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : '-'}</TableCell>
                      <TableCell>
                        {getTeacherClasses(teacher).length
                          ? getTeacherClasses(teacher).map(item => item.full_name || item.name).join(', ')
                          : '-'}
                      </TableCell>
                      <TableCell><div className="flex gap-2"><Button variant="outline" size="sm"><Mail className="h-4 w-4" /></Button><Button variant="outline" size="sm" onClick={() => handleDelete(teacher)}><Trash2 className="h-4 w-4 text-red-500" /></Button></div></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeachersPage;
