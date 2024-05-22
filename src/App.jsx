import { useDispatch } from 'react-redux';
import './App.css'
import { useState, useEffect } from 'react';

// Importing the Auth Services
import authServiceObject from "./appwrite/auth"

// Getting the actions from the authStore
import { login, logout } from "./store/authSlice"
import { Outlet } from 'react-router-dom';

// Getting the Components from the index.js
import { Header, Footer } from "./components/index"

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
            {/* Removing the Heading as not needed here !! */}
            {/* <h1>Coders blog app with appwrite</h1> */}
            {
                loading ?
                    // TODO : Add the Loading Spinner Here
                    // <div>Loading . . . </div>
                    // Adding the Spinner HTML Code
                    <div class="spinner center">
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                        <div class="spinner-blade"></div>
                    </div>
                    :
                    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
                        <div className="w-full block">
                            <Header />

                            {/* Added the Outlet */}
                            <main>
                                <Outlet />
                            </main>

                            <Footer />
                        </div>
                    </div>
            }
        </>
    )
}

export default App
