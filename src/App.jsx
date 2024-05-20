import { useDispatch } from 'react-redux';
import './App.css'
import { useState, useEffect } from 'react';

// Importing the Auth Services
import authServiceObject from "./appwrite/auth"

// Getting the actions from the authStore
import { login, logout } from "./store/authSlice"
import { Outlet } from 'react-router-dom';

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {

    // Using the Loading effect untill the data is fetched
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // To Access the Environment Variables in the frontend, we can use them using process.env.<env_variable_name>
    // console.log(process.env.REACT_APP_APPWRITE_URL);

    // To use the vite environment variable, we will use the import.meta.env.<VITE_ENV_VARIABLE>
    // console.log(import.meta.env.VITE_REACT_APP_APPWRITE_URL);

    useEffect(() => {

        // Getting the current User Data using the auth service
        authServiceObject.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                }
                else {
                    dispatch(logout())
                }
            })
            .catch((error) => console.log("JSX :: App :: Error :: ", error))
            // Using the finally to stop the loading
            .finally(() => setLoading(false))

    }, []);

    return (
        <>
            <h1>Coders blog app with appwrite</h1>
            {
                !loading ?
                    <div>Loading . . . </div>
                    :
                    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
                        <div className="w-full block">
                            <Header />

                            {/* TODO :  We have to add the Router Provider and then we can use it  */}
                            <main>
                                {/* <Outlet />*/}
                                This is Demo
                            </main>

                            <Footer />
                        </div>
                    </div>
            }
        </>
    )
}

export default App
