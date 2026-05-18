import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import { classAPI } from '@/services/api';
import { toast } from 'sonner';

const streamOptions = ['General', 'Science', 'Arts', 'Commercial', 'Technical', 'Industrial'];
const sectionOptions = ['A', 'B', 'C', 'D', 'E'];

const levelLabels = {
  primary: 'Primary School',
  secondary: 'Secondary School',
  high_school: 'High School Only',
};

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [options, setOptions] = useState({ primary: [], secondary: [], high_school: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    education_level: 'secondary',
    start_class: 'Form 1',
    end_class: 'Form 5',
    sections: ['A'],
    streams: ['General'],
    academic_year: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    capacity: 50,
  });

  const levels = options[form.education_level] || [];

  const loadData = async () => {
    setLoading(true);
    try {
      const [classesResponse, optionsResponse] = await Promise.all([classAPI.getAll(), classAPI.getOptions()]);
      setClasses(classesResponse.data.data || classesResponse.data || []);
      setOptions(optionsResponse.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    const currentLevels = options[form.education_level] || [];
    if (currentLevels.length && (!currentLevels.includes(form.start_class) || !currentLevels.includes(form.end_class))) {
      setForm(prev => ({ ...prev, start_class: currentLevels[0], end_class: currentLevels[currentLevels.length - 1] }));
    }
  }, [form.education_level, options]);

  const filteredClasses = useMemo(() => classes.filter((cls) => {
    const text = `${cls.full_name || ''} ${cls.education_level || ''} ${cls.stream || ''} ${cls.academic_year || ''}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }), [classes, searchTerm]);

  const toggleValue = (field, value) => {
    setForm(prev => {
      const exists = prev[field].includes(value);
      const next = exists ? prev[field].filter(item => item !== value) : [...prev[field], value];
      return { ...prev, [field]: next.length ? next : [value] };
    });
  };

  const handleSetup = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await classAPI.setup(form);
      toast.success('Classes configured successfully');
      await loadData();
    } catch (error) {
      toast.error(error.response?.data?.error || Object.values(error.response?.data?.errors || {}).flat()[0] || 'Failed to configure classes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cls) => {
    try {
      await classAPI.delete(cls.id);
      toast.success('Class deleted');
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete class');
    }
  };

  return (
    <DashboardLayout>
      <Helmet><title>Class Setup - Admin - EduFlex</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Class Setup</h1>
          <p className="text-muted-foreground mt-2">Configure classes for Cameroon primary and secondary school structures.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-teal-600" />Generate Classes</CardTitle>
            <CardDescription>Example: Form 1 to Form 5, sections A-E, with General, Science, Arts, or Commercial streams.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>School type</Label>
                  <Select value={form.education_level} onValueChange={education_level => setForm({ ...form, education_level })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(levelLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start class</Label>
                  <Select value={form.start_class} onValueChange={start_class => setForm({ ...form, start_class })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{levels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>End class</Label>
                  <Select value={form.end_class} onValueChange={end_class => setForm({ ...form, end_class })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{levels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input type="number" min="1" value={form.capacity} onChange={e => setForm({ ...form, capacity: Number(e.target.value) })} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_1fr_220px]">
                <div className="space-y-2">
                  <Label>Sections</Label>
                  <div className="flex flex-wrap gap-2">
                    {sectionOptions.map(section => (
                      <Button key={section} type="button" variant={form.sections.includes(section) ? 'default' : 'outline'} size="sm" onClick={() => toggleValue('sections', section)}>
                        {section}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Streams</Label>
                  <div className="flex flex-wrap gap-2">
                    {streamOptions.map(stream => (
                      <Button key={stream} type="button" variant={form.streams.includes(stream) ? 'default' : 'outline'} size="sm" onClick={() => toggleValue('streams', stream)}>
                        {stream}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Academic year</Label>
                  <Input value={form.academic_year} onChange={e => setForm({ ...form, academic_year: e.target.value })} required />
                </div>
              </div>

              <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Generate Class Structure
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Configured Classes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search classes..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <p className="py-8 text-center text-muted-foreground">Loading classes...</p> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Stream</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.section || '-'}</TableCell>
                      <TableCell><Badge variant="outline">{cls.stream || 'General'}</Badge></TableCell>
                      <TableCell className="capitalize">{(cls.education_level || 'secondary').replace('_', ' ')}</TableCell>
                      <TableCell>{cls.academic_year}</TableCell>
                      <TableCell>{cls.students_count || 0}</TableCell>
                      <TableCell>{cls.capacity}</TableCell>
                      <TableCell><Button variant="outline" size="sm" onClick={() => handleDelete(cls)}><Trash2 className="h-4 w-4 text-red-500" /></Button></TableCell>
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

export default ClassesPage;
