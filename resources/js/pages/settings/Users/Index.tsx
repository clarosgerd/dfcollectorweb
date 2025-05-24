import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, SetStateAction } from 'react';
import { useState, useEffect } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { SharedData } from '@/types';
import { Trash2 } from 'lucide-react';
import { User, PaginatedData } from '@/types';

import { Plus, Pencil, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';


interface UserData {
    id: number;
    name: string;
    email: string;
    photo?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    enterprise_id: number;
    role: number;
    // [key: string]: unknown; // This allows for additional properties...

}


interface Props {
    users: UserData[];
    flash?: {
        success?: string;
        error?: string;
    };
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/settings/Users',
    },
];
export default function Index({ users }: any) {
    //export default function Index() {
    const { flash }: any = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [editingUsers, setEditingUsers] = useState<User | null>(null);
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
        name: '',
        email: '',
        role: '',
        entreprise_id: '',
        photo: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingUsers) {
            put(route('User.update', editingUsers.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingUsers(null);
                },
            });
        } else {
            post(route('User.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };
    const handleEdit = (users: User) => {
        setEditingUsers(users);
        setData({
            //   ...prevData,
            id: users.id,
            name: users.name,
            email: '',
            role: '',
            entreprise_id: '',
            photo: '',
            created_at: '',
            updated_at: '',
            deleted_at: ''
        });
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        alert(id);
        destroy(route('User.destroy', id));
    };
    const handlePageChange = (page: number) => {
        router.get(route('User.index'), {
            page
        });
    };
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Contacts</h1>
            <div className="flex items-center justify-between mb-6">

                <Link
                    className="btn-indigo focus:outline-none"
                    href={route('User.create')}
                >
                    <span>Create</span>
                    <span className="hidden md:inline"> Contact</span>
                </Link>
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
                    {users.data.map((form: any) => (
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
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                No tasks foreground                                        </td>
                        </tr>
                    )}


                </tbody>
            </table>

        </div>
    );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */


//export default Index;
