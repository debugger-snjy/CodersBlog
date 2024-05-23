import React, { useId } from 'react'

// Here also, we want to add Forward Ref, But this time we are using the simpler syntax,
// The syntax that we have used in the Input was also correct but was complex
// Here, we are using the another syntax
// We are not defining the React.ForwardRef in the begining, we will define at the time of exporting

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {
                label &&
                <label htmlFor={id} className='font-semibold text-white'>{label}</label>
            }

            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>

                {
                    // This will check whether options have any item or not, if options have some items then only it will map items
                    options?.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))
                }

            </select>
        </div>
    )
}

// We have Added the Forward Reference in the Select Component also
export default React.forwardRef(Select)
