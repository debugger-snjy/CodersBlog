// NOTE : here we are using the Forwardref()
// In React, ForwardRef is a utility function that allows you to pass a ref through a component to one of its child components.
// This can be particularly useful when you want a parent component to directly access a child component's DOM node or a specific 
// instance method.

// In other words, ForwardRef is a way to allow a parent component to directly access and interact with a specific element inside
// a child component.

// It is Like, we have created Input Component and used it at 5 different places, so when we want the data from that input field and
// we have used it in that state, so to get the data we will give the reference to it

import React, { useId } from 'react'

// function Input() {
//     return (
//         <div>

//         </div>
//     )
// }

// We are changing the syntax here
const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        className = "",
        ...props
    }, ref) {

        const id = useId();

        return (
            <div className='w-full'>
                {/* Adding the Label Message if label is Provided */}
                {
                    label &&
                    <label className='inline-block mb-1 pl-1' htmlFor={id}>
                        {label}
                    </label>
                }

                {/* Input Box */}
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200
                     border border-gray-200 w-full ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    }
)

export default Input
