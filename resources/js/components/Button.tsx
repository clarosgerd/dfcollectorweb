export default function Button({
    type = 'button',
    className = '',
    variant = 'primary',
    disabled = false,
    children,
    ...props
}) {
    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
        secondary: 'bg-white border border-gray-300 hover:bg-gray-50 focus:ring-gray-200 text-gray-700',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    }[variant];

    return (
        <button
            type={type}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                disabled ? 'opacity-25' : ''
            } ${variantClasses} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}