import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Container, LogoutBtn } from "../index"

function Header() {

    // This will give whether the user is logged in or not
    const authStatus = useSelector((state) => state.auth.status)
    // console.log(authStatus);

    // Used to Navigate through different Pages
    const navigate = useNavigate()

    // Variable that contains all the navigation items
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus,
        },
        {
            name: 'Sign Up',
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: 'Add Posts',
            slug: "/add-posts",
            active: authStatus,
        },
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width='70px' />
                        </Link>
                    </div>
                    {/* Here we are going to loop over all the navigation items and check if they are active or not, if active then only render them */}
                    <ul className="flex ml-auto">
                        {/* {console.log(navItems)} */}
                        {
                            navItems.map((item) => {
                                // console.log(item.active);
                                return item.active ? (
                                    <li key={item.name}>
                                        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>
                                            {item.name}
                                        </button>
                                    </li>
                                ) :
                                    null
                            })
                        }

                        {/* If the User is Logged in, then the authStatus will be true and the Logout Button is displayed */}
                        {
                            authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
