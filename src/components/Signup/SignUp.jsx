import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'


// We will use Login to login the user after signning up
import { login } from "../../store/authSlice"

// This will create the Account in the Appwrite Database
import authServiceObject from "../../appwrite/auth"

// To update the state in the store
import store from "../../store/store"
import { useDispatch } from 'react-redux'
import Input from '../UIComponents/Input'

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");


    // MARK: Function to handle the signup form data
    const signUpForm = async (data) => {

        // The createAccount Function will call login the function after successfull signup function and thus return the session id
        const session = await authServiceObject.createAccount(data)

        if (session) {

            // This will provide the current user data that is logged in
            const userData = await authServiceObject.getCurrentUser();

            if (userData) {
                dispatch(login(userData));
                navigate("/");
            }
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already Have an Account,&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* MARK: Signup Form Starts Here 
                */}
                <form onSubmit={handleSubmit(signUpForm)} className='mt-8'>
                    <div className='space-y-5'>

                        {/*
                        MARK: Email Input Field 
                        */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"

                            {...register(
                                "email",
                                {
                                    required: true,
                                    // Field to match the Email Address Expression
                                    pattern: {
                                        value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                                        message: "Invalid Email Address"
                                    },
                                    validate: {
                                        matchPatern: (value) => /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value)
                                            || "Email Address must be Valid",
                                    }
                                }
                            )}
                        />

                        {/* MARK: Name Input Field 
                        */}
                        <Input
                            label="Name: "
                            placeholder="Enter your Name"
                            type="text"

                            {...register(
                                "name",
                                {
                                    required: true,
                                    // Field to match the Name Expression
                                    pattern: {
                                        value: /^(([A-Za-z]+))$/,
                                        message: "Invalid Name"
                                    },
                                    validate: {
                                        matchPatern: (value) => /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value)
                                            || "Name is Invalid",
                                    }
                                }
                            )}
                        />

                        {/* MARK: Password Input Field 
                        */}
                        <Input
                            label="Password: "
                            placeholder="Enter your Password"
                            type="password"

                            {...register(
                                "password",
                                {
                                    required: true,
                                    // Field to match the Password Expression
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                        message: "Password should have minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                                    },
                                    validate: {
                                        matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)
                                            || "Password should have minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                                    }
                                }
                            )}
                        />

                        {/* MARK: Sign Up Button 
                        */}
                        <Button type='submit' className='w-full'> Sign Up </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
