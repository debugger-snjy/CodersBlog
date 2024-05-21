import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serviceObj from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

// This is used to parse the Content in HTML Format
import parse from "html-react-parser";

export default function ViewArticle() {
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    // We get the slug from the paramater of the URL
    const { slug } = useParams();

    // Getting the userdata from the store using the selector and state
    const userData = useSelector((state) => state.auth.userData);

    // Checking whether the user that has open the article is author of that article or not
    // If he/she is the author, then he/she will be given the right to edit or delete this article
    const isAuthor = article && userData ? article.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {

            serviceObj.getArticle(slug).then((articleResponse) => {
                if (articleResponse) setArticle(articleResponse);
                else navigate("/");
            });
        }
        else navigate("/");
    }, [slug, navigate]);

    // Function to Delete the Article
    const deleteArticle = () => {
        serviceObj.deleteArticle(article.$id).then((status) => {
            if (status) {
                serviceObj.deleteFile(article.featuredImage);
                navigate("/");
            }
        });
    };

    return article ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={serviceObj.getFilePreview(article.featuredImage)}
                        alt={article.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${article.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deleteArticle}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{article.title}</h1>
                </div>
                <div className="browser-css">
                    {/* Here we are parsing the HTML Content that we have got from the tinymce editor in the form of string */}
                    {parse(article.content)}
                </div>
            </Container>
        </div>
    ) : null;
}