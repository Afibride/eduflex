import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Trash2, KeyRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { classAPI, studentAPI } from '@/services/api';
import { toast } from 'sonner';

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: '',
  gender: 'male',
  parent_phone: '',
  parent_email: '',
  class_id: '',
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsResponse, classesResponse] = await Promise.all([studentAPI.getAll(), classAPI.getAll()]);
      setStudents(studentsResponse.data.data || studentsResponse.data || []);
      setClasses(classesResponse.data.data || classesResponse.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filteredStudents = useMemo(() => students.filter((student) => {
    const text = `${student.full_name || ''} ${student.user?.email || ''} ${student.student_number || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [students, searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await studentAPI.create(form);
      setActivationCode(response.data.activation_code || response.data.user_id);
      toast.success('Student created. Share the activation code with the student.');
      setForm(emptyForm);
      await loadData();
    } catch (error) {
      const errors = error.response?.data?.errors;
      toast.error(errors ? Object.values(errors).flat()[0] : 'Failed to create student');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student) => {
    try {
      await studentAPI.delete(student.id);
      toast.success('Student deleted');
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete student');
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Manage Students - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
            <p className="text-muted-foreground mt-2">Manage student records and account activation codes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setActivationCode(''); }}>
            <DialogTrigger asChild><Button className="bg-teal-600 hover:bg-teal-700"><Plus className="h-4 w-4 mr-2" />Add Student</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[640px]">
              <DialogHeader><DialogTitle>Add Student</DialogTitle><DialogDescription>Create an inactive student account and generate an activation code.</DialogDescription></DialogHeader>
              {activationCode ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
                  <div className="flex items-center gap-2 font-semibold"><KeyRound className="h-5 w-5" />Activation code generated</div>
                  <p className="mt-2 text-2xl font-bold tracking-wide">{activationCode}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>First name</Label><Input value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Last name</Label><Input value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Student email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Date of birth</Label><Input type="date" value={form.date_of_birth} onChange={e => setForm({ ...form, date_of_birth: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select value={form.gender} onValueChange={gender => setForm({ ...form, gender })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select value={String(form.class_id)} onValueChange={class_id => setForm({ ...form, class_id })}>
                        <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                        <SelectContent>{classes.map(cls => <SelectItem key={cls.id} value={String(cls.id)}>{cls.full_name || cls.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Parent phone</Label><Input value={form.parent_phone} onChange={e => setForm({ ...form, parent_phone: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Parent email</Label><Input type="email" value={form.parent_email} onChange={e => setForm({ ...form, parent_email: e.target.value })} required /></div>
                  </div>
                  <DialogFooter><Button type="submit" disabled={saving || !form.class_id}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Student</Button></DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><div className="flex items-center justify-between"><CardTitle>All Students</CardTitle><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search students..." className="pl-10 w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div></div></CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading students...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>Activation Code</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Class</TableHead><TableHead>Parent Contact</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>{filteredStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-xs">{student.user?.user_id || student.student_number}</TableCell>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.user?.email}</TableCell>
                    <TableCell>{student.student_class?.full_name || student.studentClass?.full_name || '-'}</TableCell>
                    <TableCell>{student.parent_phone || student.parent_email}</TableCell>
                    <TableCell><Button variant="outline" size="sm" onClick={() => handleDelete(student)}><Trash2 className="h-4 w-4 text-red-500" /></Button></TableCell>
                  </TableRow>
                ))}</TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
