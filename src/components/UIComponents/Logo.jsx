import React from 'react'

// This is a Function that will show the Logo Images of custom width
function Logo({ width = '100px' }) {
    return (
        <div className={`w-[${width}]`}>Logo</div>
    )
}

export default Logo
