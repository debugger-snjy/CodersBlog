import React from 'react'

function Container({ children }) {
    // return (
    //     <div className='w-full max-w-7xl mx-auto px-4'>
    //         {children}
    //     </div>
    // )

    // We use return without the parenthesis
    return <div className='w-full  mx-auto px-4'>{children}</div>;
}

export default Container
