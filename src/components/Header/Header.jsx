import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Container, LogoutBtn } from "../index"
import { Menu, X } from 'lucide-react'
import { logout } from "../../store/authSlice"
import authServiceObject from '../../appwrite/auth'

function Header() {

    // This will give whether the user is logged in or not
    const authStatus = useSelector((state) => state.auth.status)
    // console.log(authStatus);

    // Used to Navigate through different Pages
    const navigate = useNavigate()

    const dispatch = useDispatch();

    // Variable that contains all the navigation items
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: authStatus,
        },
        // {
        //     name: 'Login',
        //     slug: "/login",
        //     active: !authStatus,
        // },
        // {
        //     name: 'Sign Up',
        //     slug: "/signup",
        //     active: !authStatus,
        // },
        {
            name: 'All Posts',
            slug: "/all-articles",
            active: authStatus,
        },
        {
            name: 'Add Posts',
            slug: "/add-article",
            active: authStatus,
        },
    ]

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className="relative w-full bg-[#002233]">
                <div className="mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8">
                    <Link className="inline-flex items-center space-x-2">
                        <Logo size={30} color='white' />
                        <span className="font-bold text-xl text-white">Coder's Blog</span>
                    </Link>
                    <div className="hidden grow items-start lg:flex">
                        <ul className="ml-12 inline-flex space-x-8">
                            {
                                navItems.map((item) => {
                                    return item.active ? (
                                        <li key={item.name}>
                                            <button className='px-6 py-2 duration-200 hover:bg-blue-100 rounded-full inline-flex items-center text-base font-semibold text-white hover:text-gray-900' onClick={() => navigate(item.slug)}>
                                                {item.name}
                                            </button>
                                        </li>
                                    ) :
                                        null
                                })
                            }

                        </ul>
                    </div>
                    {
                        !authStatus && <div className="hidden space-x-3 lg:block">
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="rounded-md bg-transparent px-3 py-1 text-base font-semibold text-white hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Sign Up
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="rounded-md px-3 py-1 text-base font-semibold text-white hover:bg-black hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Log In
                            </button>
                        </div>
                    }
                    {
                        authStatus && <div className="hidden space-x-3 lg:block">
                            <button
                                type="button"
                                onClick={() => {
                                    authServiceObject.logout();
                                    dispatch(logout())
                                }}
                                className="rounded-md bg-transparent px-3 py-1 text-base font-semibold text-white hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Logout
                            </button>
                        </div>
                    }
                    <div className="lg:hidden">
                        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                    </div>
                    {isMenuOpen && (
                        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="px-5 pb-6 pt-5">
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center space-x-2">
                                            <span>
                                                <Logo size={30} color='black' />
                                            </span>
                                            <span className="font-bold">Coder's Blog</span>
                                        </div>
                                        <div className="-mr-2">
                                            <button
                                                type="button"
                                                onClick={toggleMenu}
                                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <X className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <nav className="grid gap-y-4">
                                            {navItems.map((item) => (
                                                item.active ?
                                                    <button
                                                        key={item.name}
                                                        href={item.href}
                                                        className="-m-3 flex items-center rounded-md p-3 text-base font-semibold hover:bg-gray-50"
                                                    >
                                                        <span className="ml-3 text-base font-medium text-gray-900">
                                                            {item.name}
                                                        </span>
                                                    </button> : null
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        <button
                                            type="button"
                                            className="w-full rounded-md border border-black px-3 py-2 text-base font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            onClick={() => navigate("/signup")}
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full rounded-md bg-black px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            onClick={() => navigate("/login")}
                                        >
                                            Log In
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header
