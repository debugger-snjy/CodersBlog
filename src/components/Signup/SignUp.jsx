import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'


// We will use Login to login the user after signning up
import { login } from "../../store/authSlice"

// This will create the Account in the Appwrite Database
import authServiceObject from "../../appwrite/auth"

// To update the state in the store
import { useDispatch } from 'react-redux'
import { Button, Input, Logo, FieldErrorAlert } from '../index'

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get the formState Errors for the field Errors Data
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("");


    // Function to handle the signup form data
    const signUpForm = async (data) => {
        setError("")
        showFieldErrors();
        console.log("Function Clicked !!");
        console.log("Data : ", data);

        try {
            // The createAccount Function will call login the function after successfull signup function and thus return the session id
            const session = await authServiceObject.createAccount(data)

            if (session) {

                // This will provide the current user data that is logged in
                const userData = await authServiceObject.getCurrentUser();

                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                    console.log("Signup Successful");
                }
                else {
                    console.log("Signup Failed");
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    // Function to show the Field Errors
    const showFieldErrors = useCallback(
        () => {
            if (errors) {
                console.log("Got Error");
                let fields = Object.keys(errors)
                fields.map((field) => {
                    errors[field].ref.style.backgroundColor = "red";
                })
            }
            console.log("Function Ends");
        },
        [errors],
    )

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="50" />
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

                {/* Signup Form Starts Here */}

                <form onSubmit={handleSubmit(signUpForm)} className='mt-8'>
                    <div className='space-y-5'>

                        {/* Email Input Field */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="text"

                            // Added the class to make the input field red in color
                            className={errors.email ? 'border-[2px] border-red-500' : ""}

                            {...register(
                                "email",
                                {
                                    required: true,
                                    // Field to match the Email Address Expression
                                    pattern: {
                                        value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                                        message: "Invalid Email Address"
                                    },
                                    // validate: {
                                    //     matchPattern: (value) => /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value)
                                    //         || "Email Address must be Valid",
                                    // }
                                }
                            )}
                        />

                        {/* To Show the Validation Message for email */}
                        {errors.email && errors.email.message && <FieldErrorAlert errorMsg={errors.email.message} />}


                        {/* Name Input Field */}
                        <Input
                            label="Name: "
                            placeholder="Enter your Name"
                            type="text"

                            // Added the class to make the input field red in color
                            className={errors.name ? 'border-[2px] border-red-500' : ""}

                            {...register(
                                "name",
                                {
                                    required: true,
                                    // Field to match the Name Expression
                                    pattern: {
                                        value: /^(([A-Za-z]+))$/,
                                        message: "Invalid Name"
                                    },
                                    // validate: {
                                    //     matchPattern: (value) => /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value)
                                    //         || "Name is Invalid",
                                    // }
                                }
                            )}
                        />

                        {/* To Show the Validation Message for name */}
                        {errors.name && errors.name.message && <FieldErrorAlert errorMsg={errors.name.message} />}


                        {/* Password Input Field */}
                        <Input
                            label="Password: "
                            placeholder="Enter your Password"
                            type="password"

                            // Added the class to make the input field red in color
                            className={errors.password ? 'border-[2px] border-red-500' : ""}

                            {...register(
                                "password",
                                {
                                    required: true,
                                    // Field to match the Password Expression
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                        message: "Password should have minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                                    },
                                    // validate: {
                                    //     matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)
                                    //         || "Password should have minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                                    // }
                                }
                            )}
                        />

                        {/* To Show the Validation Message for password */}
                        {errors.password && errors.password.message && <FieldErrorAlert errorMsg={errors.password.message} />}

                        {/* Sign Up Button */}
                        <Button type='submit' className='w-full'> Sign Up </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
