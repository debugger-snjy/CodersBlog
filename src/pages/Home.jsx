import React, { useState, useEffect } from 'react'
import { Container, ArticleCard } from "../components/index"
import serviceObj from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function Home() {

    const [allArticles, setAllArticles] = useState([]);

    const stateData = useSelector((state) => state.auth)

    console.log("Data in the State : ", useSelector((state) => state.auth));

    useEffect(() => {
        if (stateData.status) {
            serviceObj.getAllArticles([Query.equal("userID", stateData.userData.$id)]).then((articles) => {
                if (articles) {
                    setAllArticles(articles.documents)
                }
            })
        }
    }, [])

    // if (!authStatus && allArticles.length === 0) {
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <section className="py-12">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-4xl text-white font-bold mb-6">Welcome to Coders Blog</h2>
                                <p className="text-white/85 mb-6">Your go-to platform for reading and creating insightful blogs about coding, development, and technology.</p>
                            </div>
                        </section>
                    </div>
                </div>
                <hr className='h-1 opacity-100 bg-white' />
                <div className="text-3xl text-white font-semibold mx-3 my-5">Your Blogs</div>

                <div className='w-full flex flex-wrap'>
                    {
                        allArticles && allArticles.map((article) => {
                            return (
                                <div key={article.$id} className='p-2 w-1/3'>
                                    <ArticleCard {...article} />
                                </div>
                            )
                        })
                    }
                </div>

            </Container>
        </div>
    )
    // }

    // else if (authStatus && allArticles.length === 0) {

    // }
    // else if (authStatus && allArticles.length !== 0) {
    //     return (
    //         <div className='w-full py-8'>
    //             <Container>
    //                 <div className='flex flex-wrap'>
    //                     {allArticles.map((article) => (
    //                         <div key={article.$id} className='p-2 w-1/4'>
    //                             <ArticleCard {...article} />
    //                         </div>
    //                     ))}
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
}

export default Home
