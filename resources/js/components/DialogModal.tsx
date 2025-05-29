import { useEffect, useState } from 'react';

export const DialogModal = ({ children, isOpen = false, maxWidth = '2xl', onClose = () => {} }) => {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const close = () => {
        setShow(false);
        onClose();
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <div
            className={`fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50 ${
                show ? 'block' : 'hidden'
            }`}
        >
            <div className="fixed inset-0 transform transition-all" onClick={close}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}">
                {children}
            </div>
        </div>
    );
};

DialogModal.Content = ({ title, children }) => (
    <div className="px-6 py-4">
        {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
        <div className="mt-4">{children}</div>
    </div>
);

DialogModal.Footer = ({ children }) => (
    <div className="px-6 py-4 bg-gray-100 text-right space-x-3">
        {children}
    </div>
);

export default DialogModal;