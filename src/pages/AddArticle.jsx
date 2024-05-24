import React from 'react'
import { Container, ArticleForm } from "../components/index"

function AddArticle({ btnText }) {
    return (
        <div className='py-8'>
            <Container>
                <ArticleForm btnText={btnText} />
            </Container>
        </div>
    )
}

export default AddArticle
