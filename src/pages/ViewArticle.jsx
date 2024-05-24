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

    useEffect(() => {
        if (slug) {

            serviceObj.getArticle(slug).then((articleResponse) => {
                if (articleResponse) setArticle(articleResponse);
                else navigate("/");
            });
        }
        else navigate("/");
    }, [slug, navigate]);

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

        </div>
    ) : null;
}