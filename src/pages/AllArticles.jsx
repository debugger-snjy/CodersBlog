import React, { useState, useEffect } from 'react'
import { Container, ArticleCard } from "../components/index"
import serviceObj from '../appwrite/config'

function AllArticles() {

    const [allArticles, setAllArticles] = useState([])
    const [loading, setLoading] = useState(true)

    // serviceObj.getAllArticles([]).then((articles) => {
    //     if (articles) {
    //         setAllArticles(articles.documents)
    //     }
    // })

    useEffect(() => {
        console.log("Fetching the Data From API");
        serviceObj.getAllArticles([]).then((articles) => {
            if (articles) {
                setAllArticles(articles.documents)
                console.log(allArticles);
            }
        })
        setLoading(false)
    }, []);

    if (loading) {
        return (
            <div className="spinner center">
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        allArticles && allArticles.map((article) => {
                            if (article.status === "active") {
                                return (
                                    <div key={article.$id} className='p-2 w-1/4'>
                                        <ArticleCard articleData={article} showEDbtns={false} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllArticles
