import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Head, router, usePage, Link } from "@inertiajs/react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';


interface FormData {
    id: number;
    title: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;

}
interface Props {
    forms: FormData[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'forms',
        href: '/forms',
    },

];
export default function FormsIndex({ forms }: any) {

    const { flash }: any = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [editingForms, setEditingForms] = useState<FormData | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    //const [searchTerm, setSearchTerm] = useState('');
    // const [completionFilter, setCompletionFilter] = useState('');
    //export default function Show({ tournaments,filters,flash }:any) {


    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        id: 0,
        title: '',
        description: '',
        user_id: '',
        created_at: '',
        updated_at: ''

    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingForms) {
            put(route('form.update', editingForms.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingForms(null);
                },
            });
        } else {
            post(route('form.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };
    const handleEdit = (form: FormData) => {
        setEditingForms(form);
        setData({
            //   ...prevData,
            id: form.id,
            title: form.title,
            description: form.description,
            user_id: '', // Valor por defecto
            created_at: '', // Valor por defecto
            updated_at: '', // Valor por defecto

        });
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        alert(id);
        destroy(route('form.destroy', id));
    };
    const handlePageChange = (page: number) => {
        router.get(route('form.index'), {
            page
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {
                showToast && (
                    <div className={`fixed top-2 right-2 z-50 flex items-center gap-2 rounded-lg p-2 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white animate-in fade-in slide-in-from-top-5`}>
                        {toastType === 'success' ? (
                            <CheckCircle2 className="h-5 w-5" />
                        ) : (
                            <XCircle className="h-5 w-5" />
                        )}
                        <span>{toastMessage}</span>
                    </div>
                )
            }

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lists</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger  >
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                            <Plus className="h-4 w-4 mr-2" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingForms ? 'Edit List' : 'Create Form List'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="title">title</Label>
                                <Input id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="created_at">created_at</Label>
                                <Input id="created_at"
                                    type="text"
                                    value={data.created_at}
                                    onChange={(e) => setData('created_at', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="updated_at">updated_at</Label>
                                <Input id="updated_at"
                                    type="text"
                                    value={data.created_at}
                                    onChange={(e) => setData('updated_at', e.target.value)}
                                />
                            </div>
                            <Button type="submit" disabled={processing}>
                                {editingForms ? 'Update' : 'Create'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">title</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">description</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">user_id </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">created_at </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">updated_at </th>
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {forms.data.map((form: any) => (
                        <tr key={form.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{form.title}</td>
                            <td className="p-4 align-middle max-w-[200px] truncate">
                                {form.description || 'No description'}
                            </td>
                            <td className="p-4 align-middle">
                                {form.user_id || 'No description'}
                            </td>
                            <td className="p-4 align-middle">
                                {form.created_at ? (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        {new Date(form.created_at).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground">No due date</span>)}
                            </td>

                            <td className="p-4 align-middle">
                                {form.updated_at ? (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        {new Date(form.updated_at).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground">No due date</span>)}
                            </td>
                            <td className="p-4 align-middle text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost"
                                        size="icon"
                                        onClick={() => handleEdit(form)}
                                        className="hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(form.id)}
                                        className="hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>                                            </div>
                            </td>
                        </tr>
                    ))}
                    {forms.data.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                No tasks foreground                                        </td>
                        </tr>
                    )}


                </tbody>
            </table>


        </AppLayout>


    );
}
//export default FormsIndex;