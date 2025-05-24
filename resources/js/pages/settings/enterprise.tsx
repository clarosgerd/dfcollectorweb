import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, SetStateAction } from 'react';
import { useState, useEffect } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { SharedData } from '@/types';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/enterprise',
    },
];


//const Enterprise = () => {
// const { user ,auth} = usePage<{
//     user:  PaginatedData<User>,
//     auth: <SharedData>
// }>().props;
export default function Enterprise() {
    const { auth } = usePage<SharedData>
        ().props;
 //   const [isOpen, setIsOpen] = useState(false);
 //   const [editingForms, setEditingForms] = useState<SharedData | null>(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        id: auth.user.enterprise.id,
        name: auth.user.enterprise.name,
        created_by: '',
        created_at: '',
        updated_at: ''
    });
    
    //alert(data.name);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('enterprice.update'), {
            preserveScroll: true,
        });
    };


    // alert (data.id);
    // rows={data}
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="enterprise settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Enterprise Information" description="Update your name enterprise" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name Enterprise</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.created_at} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">User Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={auth.user.name}
                                onChange={(e) => setData('created_by', e.target.value)}
                                required
                                autoComplete="created_by"
                                placeholder="Full created_by"
                                disabled
                            />

                            <InputError className="mt-2" message={errors.created_at} />
                        </div>
                        



                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>


            </SettingsLayout>
        </AppLayout>
    );
}
//export default Enterprise;