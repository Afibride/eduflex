import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Search, Trash2, Mail, Phone, KeyRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { parentAPI } from '@/services/api';
import { toast } from 'sonner';

const emptyForm = { first_name: '', last_name: '', phone: '', email: '', address: '', occupation: '' };

const ParentsPage = () => {
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const loadParents = async () => {
    setLoading(true);
    try {
      const response = await parentAPI.getAll();
      setParents(response.data.data || response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load parents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadParents(); }, []);

  const filteredParents = useMemo(() => parents.filter((parent) => {
    const text = `${parent.full_name || ''} ${parent.email || ''} ${parent.parent_number || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [parents, searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await parentAPI.create(form);
      setActivationCode(response.data.activation_code || response.data.user_id);
      toast.success('Parent created. Share the activation code with the parent.');
      setForm(emptyForm);
      await loadParents();
    } catch (error) {
      const errors = error.response?.data?.errors;
      toast.error(errors ? Object.values(errors).flat()[0] : 'Failed to create parent');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (parent) => {
    try {
      await parentAPI.delete(parent.id);
      toast.success('Parent deleted');
      loadParents();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete parent');
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Manage Parents - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Parents</h1>
            <p className="text-muted-foreground mt-2">Manage parent accounts and activation codes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setActivationCode(''); }}>
            <DialogTrigger asChild><Button className="bg-teal-600 hover:bg-teal-700"><Plus className="h-4 w-4 mr-2" />Add Parent</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Parent</DialogTitle><DialogDescription>Create an inactive parent account and generate an activation code.</DialogDescription></DialogHeader>
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
                    <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Occupation</Label><Input value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Address</Label><Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
                  </div>
                  <DialogFooter><Button type="submit" disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Parent</Button></DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><div className="flex items-center justify-between"><CardTitle>All Parents</CardTitle><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search parents..." className="pl-10 w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div></div></CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading parents...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>Activation Code</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Children</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>{filteredParents.map(parent => (
                  <TableRow key={parent.id}>
                    <TableCell className="font-mono text-xs">{parent.user?.user_id || parent.parent_number}</TableCell>
                    <TableCell className="font-medium">{parent.full_name}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>{parent.students?.map(student => student.full_name).join(', ') || '-'}</TableCell>
                    <TableCell><div className="flex gap-2"><Button variant="outline" size="sm"><Mail className="h-4 w-4" /></Button><Button variant="outline" size="sm"><Phone className="h-4 w-4" /></Button><Button variant="outline" size="sm" onClick={() => handleDelete(parent)}><Trash2 className="h-4 w-4 text-red-500" /></Button></div></TableCell>
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

export default ParentsPage;
