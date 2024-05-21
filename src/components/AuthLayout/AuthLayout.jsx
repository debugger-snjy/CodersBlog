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
        // Update the If Condition
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        console.log("Data : \nauthStatus : " + authStatus + "\nauthentication : " + authentication);
        console.log("Check 1 : ", (authentication && authStatus !== authentication));
        console.log("Check 2 : ", (!authentication && authStatus !== authentication));

        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected

// Login:
// authentication = false
// authStatus = false

// authentication && authStatus !== authentication =====> false && (false !== false) ===> false && false ===> false

// -----------------------------------------------------------------------------------------------------------------------
// AllPosts:
// authentication = true
// authStatus = true

// authentication && authStatus !== authentication =====> true && (true !== true) ===> true && true ===> true