import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../../store/authSlice"
import { Button, Input, Logo, FieldErrorAlert } from "../index"
import { useDispatch } from 'react-redux'
import authServiceObject from '../../appwrite/auth'

// Using the React Hook Form
import { useForm } from 'react-hook-form'

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get the formState Errors for the field Errors Data
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("");

    // NOTE : Create the Form Function anything other than handleSubmit as we get this from the React Hook Form
    const loginForm = async (data) => {
        setError("");
        try {

            // We are here calling the Login Function from the appwrite and that function will return the session
            const session = await authServiceObject.login(data)
            if (session) {
                console.log("Login :: session :: ", session);

                // This is a Function that will return the data of the current user
                const userData = await authServiceObject.getCurrentUser()

                if (userData) {
                    console.log("Login :: userData :: ", userData);
                    // we have got the userdata, then we update the data in the state variable of the store
                    // we are using the login function of the store bu we have here renamed as authLogin
                    dispatch(authLogin({ userData: userData }))
                    navigate("/")
                }
            }

        } catch (error) {
            setError(error.message)
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

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* Here, we are using the React Hook Form
                    Here, in onSubmit we call the handleSubmit (this function will call the function that we will give it) 
                    Actually, handleSubmit is like an Event and by this when we use register, all the states of input will 
                    be managed by them and onSubmitting the form, handleSubmit will take the latest value of the form input
                    and provide to the loginForm Function 
                */}
                <form onSubmit={handleSubmit(loginForm)} className='mt-8'>

                    <div className='space-y-5'>
                        {/* Email Field */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"

                            // Added the class to make the input field red in color
                            className={errors.email ? 'border-[2px] border-red-500' : ""}

                            // Here, we have to spread the register function everytime, other wise the values gets override
                            // register will have 2 parameter: name (it should be unique and will be used to fetch the data)
                            // 2nd one is the options, there are many validation options (refer docs : https://react-hook-form.com/get-started#Applyvalidation)
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
                                    //         || "Email Address must be Valid hete",
                                    // }
                                }
                            )}
                        />

                        {/* To show the validation message for email */}
                        {errors.email && errors.email.message && <FieldErrorAlert errorMsg={errors.email.message} />}

                        {/* Password Field */}
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"

                            // Added the class to make the input field red in color
                            className={errors.password ? 'border-[2px] border-red-500' : ""}

                            {...register(
                                "password",
                                {
                                    required: true
                                }
                            )}
                        />


                        {/* Sign In Button */}
                        <Button type='submit' className='w-full'> Sign In </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
