import React, { useState, useEffect } from 'react'
import { Container, ArticleCard } from "../components/index"
import serviceObj from '../appwrite/config'

function Home() {

    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        serviceObj.getAllArticles().then((articles) => {
            if (articles) {
                setAllArticles(articles.documents)
            }
        })
    }, [])

    if (allArticles.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Articles
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {allArticles.map((article) => (
                        <div key={article.$id} className='p-2 w-1/4'>
                            <ArticleCard {...article} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
