import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"


function LogoutBtn() {

    // Using the dispatch to call the reducers function or store actions and update the state values
    const dispatch = useDispatch();

    // Function that will be called on button Click
    const logoutHandler = () => {

        // This will call the Logout Function from the Appwrite and execute it
        authService.logout()
            .then(
                // If we got success response, then we will call the dispatch function and update the state values
                () => {
                    dispatch(logout())
                }
            )
            .catch((error) => {
                // If we got any error, then displaying that error in the console log
                console.log("Logout :: Error :: ", error);
            })
    }

    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
