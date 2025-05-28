import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, use } from 'react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,DialogDescription } from '@/components/ui/dialog';

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
import { Auth, User, PaginatedData } from '@/types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'


import { Plus, Pencil, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { array } from 'zod';


interface UserData {
    id: number;
    name: string;
    email: string;
    photo?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    enterprise_id: number;
    role: string | null;
    [key: string]: unknown; // This allows for additional properties...

}


interface Props {
    auth: Auth;
    users: UserData[];
    flash?: {
        success?: string;
        error?: string;
    };
    filters: {
        search: string;
        filter: string;
    };
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/settings/Users',
    },
];
export default function Index({ users, roles, auth, organization }: any) {
    //export default function Index() {
    const { flash, filters }: any = usePage().props;
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

    const { data, setData, post, put, processing, errors, reset, delete: destroy } = useForm({
        id: 0,
        name: '',
        email: '',
        role: roles[0],
        enterprise_id: organization,
        photo: '',
        enterprise: 0,
        //  rule: 
        //created_at: '',
        //updated_at: '',
        //deleted_at: ''
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingUsers) {
            // alert(editingUsers.id);
            put(route('Users.update', editingUsers.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingUsers(null);
                    //reset();
                },
            });
        } else {
            // alert('hola');
            post(route('Users.store'), {
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
            email: users.email,
            role: users.role,
            enterprise_id: organization,
            photo: '',
            enterprise: users.enterprise.id,
            //created_at: '',
            //updated_at: '',
            //deleted_at: ''
        });
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        //alert(id);
        destroy(route('Users.destroy', id));
    };
    const handlePageChange = (page: number) => {
        router.get(route('Users.index'), {
            page,
            // search: searchTerm,
            // filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20">

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
                        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                        <p className="text-muted-foreground mt-1">Manage your Users and stay organized</p>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger  >
                                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New User
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingUsers ? 'Edit List' : 'Create Form List'}
                                        <DialogDescription>Fixed the warning</DialogDescription>

                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <div className="space-y-2">
                                        <Label htmlFor="title">Name</Label>
                                        <Input id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="Email">Email</Label>
                                        <Input id="email"
                                            type="text"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">role</Label>
                                        <Select name="role" value={data.role} onValueChange={(val) => setData("role", val)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role: string) => (
                                                    <SelectItem key={role} value={role}>
                                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>


                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="photo">Photo</Label>
                                        <Input id="photo"
                                            type="text"
                                            value={data.photo}
                                            onChange={(e) => setData('photo', e.target.value)}
                                        />
                                        <Input id="id"
                                            type="hidden"
                                            value={data.id}
                                        // onChange={(e) => setData('enterprise_id', e.target.value)}
                                        />
                                        <Input id="enterprise_id"
                                            type="hidden"
                                            value={organization}
                                        // onChange={(e) => setData('enterprise_id', e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {editingUsers ? 'Update' : 'Create'}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Photo </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {users.data.map((form: any) => (
                                        <tr key={form.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle max-w-[200px] truncate">{form.name}</td>

                                            <td className="p-4 align-middle font-medium">{form.email}</td>
                                            <td className="p-4 align-middle font-medium">{form.role}</td>
                                            <td className="p-4 align-middle font-medium">{form.photo}</td>
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
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                                No Users foreground
                                            </td>
                                        </tr>
                                    )}


                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-between px-2">
                        <div className="text-sm text-muted-foreground">
                            Showing {users.meta.from} to {users.meta.to} of {users.meta.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(users.meta.current_page - 1)}
                                disabled={users.meta.current_page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: users.meta.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button key={page}
                                        variant={page === users.meta.current_page ? "default" : "outline"}
                                        size="icon"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>))}
                            </div>
                            <Button variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(users.meta.current_page + 1)}
                                disabled={users.meta.current_page === users.meta.last_page}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </SettingsLayout>

        </AppLayout>
    );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */


//export default Index;
