import React from 'react'

// Here, `children` are the text or HTML That we write between the Component OPening and Closing Tag
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    // Here props are the other variables like disabled, id, name and other
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
