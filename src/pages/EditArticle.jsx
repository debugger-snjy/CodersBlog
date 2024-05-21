import React, { useState, useEffect } from 'react'
import { Container, ArticleForm } from "../components/index"
import serviceObj from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditArticle() {

    const [article, setArticle] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (slug) {
            serviceObj.getArticle(slug).then((article) => {
                if (article) {
                    setArticle(article)
                }
            })
        }
        else {
            navigate("/")
        }

    }, [])

    return article ? (
        <div className='py-8'>
            <Container>
                <ArticleForm articleData={article} />
            </Container>
        </div>
    ) : null;
}

export default EditArticle
