import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// File Name and Function Name be different
function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        // TODO: Check for more simpler version
        if (authentication) {
            if (authStatus === true) {
                navigate("/")
            }
            else {
                navigate("/login")
            }
        }
        else {
            navigate("/login")
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected
