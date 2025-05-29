import { useState } from 'react';

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {children[0]({ open, setOpen })}
            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {children[1]({ open, setOpen })}
                </div>
            )}
        </div>
    );
};

Dropdown.Trigger = ({ children, open, setOpen }) => (
    <div onClick={() => setOpen(!open)}>
        {typeof children === 'function' ? children({ open, setOpen }) : children}
    </div>
);

Dropdown.Content = ({ children }) => (
    <div className="py-1">
        {typeof children === 'function' ? children({}) : children}
    </div>
);

Dropdown.Link = ({ href, method = 'get', as = 'a', children, ...props }) => {
    return (
        <a
            href={href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            {...props}
        >
            {children}
        </a>
    );
};

export default Dropdown;