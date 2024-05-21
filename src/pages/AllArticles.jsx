import React, { useState, useEffect } from 'react'
import { Container, ArticleCard } from "../components/index"
import serviceObj from '../appwrite/config'

function AllArticles() {

    const [allArticles, setAllArticles] = useState([])

    useEffect(() => { }, []);

    serviceObj.getAllArticles([]).then((articles) => {
        if (articles) {
            setAllArticles(articles.documents)
        }
    })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        allArticles.map((article) => {
                            <div key={article.$id} className='p-2 w-1/4'>
                                <ArticleCard {...article} />
                            </div>
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllArticles
