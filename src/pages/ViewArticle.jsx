import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serviceObj from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

// This is used to parse the Content in HTML Format
import parse from "html-react-parser";

const titleCase = (text) => {
    let splittedText = text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1))
    return splittedText.join(" ")
}

export default function ViewArticle() {
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    // We get the slug from the paramater of the URL
    const { slug } = useParams();

    // Getting the userdata from the store using the selector and state
    const userData = useSelector((state) => state.auth.userData);

    // Checking whether the user that has open the article is author of that article or not
    // If he/she is the author, then he/she will be given the right to edit or delete this article
    const isAuthor = article && userData ? article.userID === userData.$id : false;

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
                serviceObj.deleteFile(article.featuredImageID);
                navigate("/");
            }
        });
    };

    return article ? (
        <div className="py-8 lg:mx-[300px]">
            <div className="w-full mb-6">
                <h1 className="text-5xl text-center text-white font-bold">{titleCase(article.title)}</h1>
            </div>
            {/* <hr className='h-1 opacity-100 bg-white' /> */}

            <div className="w-9/12 mx-auto">
                <div className="w-full flex justify-center items-center relative mb-4 rounded-xl p-2">
                    <img
                        src={serviceObj.getFilePreview(article.featuredImageID)}
                        alt={article.title}
                        className="rounded-xl"
                    />
                </div>

            </div>
            <div className="w-full mx-auto">

                <div className="browser-css text-white">
                    {/* Here we are parsing the HTML Content that we have got from the tinymce editor in the form of string */}
                    {parse(article.content)}
                </div>
            </div>

            {/* TODO : Add More Data like likes, comments and favourites */}
            {/* Moved the Edit and Delete Button to End of the Article */}
            <div className="grid grid-cols-2 gap-4 mt-20">
                <Link to={`/edit-article/${article.$id}`} className=" mr-2 inline">
                    <Button bgColor="bg-green-500" className="w-full">
                        Edit this Article
                    </Button>
                </Link>
                <Button bgColor="bg-red-500" className="ml-2 inline" onClick={deleteArticle}>
                    Delete this Article
                </Button>
            </div>
        </div>
    ) : null;
}