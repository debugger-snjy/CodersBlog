import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from "../index"

function Footer() {
    return (
        // <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
        //     <div className="relative z-10 mx-auto max-w-7xl px-4">
        //         <div className="-m-6 flex flex-wrap">
        //             <div className="w-full p-6 md:w-1/2 lg:w-5/12">
        //                 <div className="flex h-full flex-col justify-between">
        //                     <div className="mb-4 inline-flex items-center">
        //                         <Logo width="100px" />
        //                     </div>
        //                     <div>
        //                         <p className="text-sm text-gray-600">
        //                             &copy; Copyright 2023. All Rights Reserved by DevUI.
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="w-full p-6 md:w-1/2 lg:w-2/12">
        //                 <div className="h-full">
        //                     <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
        //                         Company
        //                     </h3>
        //                     <ul>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Features
        //                             </Link>
        //                         </li>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Pricing
        //                             </Link>
        //                         </li>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Affiliate Program
        //                             </Link>
        //                         </li>
        //                         <li>
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Press Kit
        //                             </Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="w-full p-6 md:w-1/2 lg:w-2/12">
        //                 <div className="h-full">
        //                     <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
        //                         Support
        //                     </h3>
        //                     <ul>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Account
        //                             </Link>
        //                         </li>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Help
        //                             </Link>
        //                         </li>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Contact Us
        //                             </Link>
        //                         </li>
        //                         <li>
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Customer Support
        //                             </Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="w-full p-6 md:w-1/2 lg:w-3/12">
        //                 <div className="h-full">
        //                     <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
        //                         Legals
        //                     </h3>
        //                     <ul>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Terms &amp; Conditions
        //                             </Link>
        //                         </li>
        //                         <li className="mb-4">
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Privacy Policy
        //                             </Link>
        //                         </li>
        //                         <li>
        //                             <Link
        //                                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
        //                                 to="/"
        //                             >
        //                                 Licensing
        //                             </Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        // <div className='bg-[#0066ff] left-0 bottom-0 w-full' style={{ position: "absolute" }}>
        <div className='bg-[#0e1217] left-0 bottom-0 w-full' style={{ position: "relative" }}>
            <div className="mx-auto items-center justify-center py-4 px-4 md:flex bottom-0">
                {/* <Link className="inline-flex items-center space-x-2">
                    <Logo size={30} />
                    <span className="font-bold">Coder's Blog</span>
                </Link> */}
                <div className="my-4 md:my-0">
                    <p className="text-sm font-medium text-white">
                        © 2024 Coder's Blog <span className="mx-4">|</span> All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
