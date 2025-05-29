import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DialogModal from '@/components/DialogModal';
import Button from '@/components/Button';

export default function DeleteConfirmation({ 
    itemName='', 
    routeName='', 
    routeParams = {}, 
    children='',
    onSuccess = () => {},
    onCancel = () => {},
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { processing, delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route(routeName, routeParams), {
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
                onSuccess();
            },
        });
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={className}>
                {children}
            </div>

            <DialogModal isOpen={isOpen} onClose={() => {
                setIsOpen(false);
                onCancel();
            }}>
                <DialogModal.Content title={`Eliminar ${itemName}`}>
                    <p className="text-sm text-gray-600">
                        ¿Estás seguro de que deseas eliminar este {itemName}? Esta acción no se puede deshacer.
                    </p>
                </DialogModal.Content>

                <DialogModal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setIsOpen(false);
                        onCancel();
                    }}>
                        Cancelar
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={processing}
                        className="ml-2"
                    >
                        {processing ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogModal.Footer>
            </DialogModal>
        </>
    );
}