import React from 'react'
import serviceObj from "../../appwrite/config"
import { Link } from 'react-router-dom'
import { Button } from "../index"
import parse from 'html-react-parser';

const titleCase = (text) => {
    let splittedText = text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1))
    return splittedText.join(" ")
}

const calcContentLength = (elementParseList) => {
    let totalCharcters = 0;
    // console.log("Checking :", typeof elementParseList === "object");
    // console.log("Checking :", elementParseList.length);
    if (elementParseList.length > 0) {
        // console.log("Checking : ", elementParseList);
        elementParseList.map((element) => {
            if (typeof element === "object") {
                // console.log("Checking : ", element);
                totalCharcters += element.props ? element.props.children.length : 0
                // console.log(totalCharcters);
            }
        })
    }
    else {
        totalCharcters = elementParseList.props ? elementParseList.props.children.length : 0
    }

    return totalCharcters;
}

function ArticleCard(articleData) {
    console.log("Card");
    console.log("Card Data : ", articleData);
    let { $id, title, featuredImageID, $updatedAt, content } = articleData

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date($updatedAt);
    let monthName = month[d.getMonth()];
    let date = d.getDate();

    console.log("Content : ", content);
    let data = parse(content)
    console.log("Content in HTML : ", data);

    let charactersInArticle = calcContentLength(data);
    console.log(charactersInArticle);

    let timeToRead = Math.ceil(charactersInArticle / 180) === 0 ? 1 : Math.ceil(charactersInArticle / 180)

    let imageURL = serviceObj.getFilePreview(featuredImageID);
    return (
        <div className="w-full h-[400px] bg-[#1c1f26] border-[0.1px] border-white/10 rounded-xl p-4 hover:border-white/40 shadow-2" style={{ boxShadow: "var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)" }}>
            <h2 className='text-2xl mt-3 mb-2 text-white font-bold'>{titleCase(title)}</h2>
            <div className='text-gray-400 mb-2'>
                {monthName} {date} • {timeToRead} min read time
            </div>
            <div className="w-full justify-center mb-4">
                <img src={imageURL} alt={`${title}'s blog Image`} className='rounded-md h-56 w-full' />
            </div>
            <Link to={`/article/${$id}`} className='text-center'>
                <Button
                    bgColor='bg-gray-100'
                    textColor='black'
                    type='button'
                    className='font-bold'
                >
                    <div className="flex">
                        <span>Read post</span>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 pointer-events-none !h-6 !w-6 text-base -mr-2 ml-1"><path d="M7.801 6.6c.66 0 1.196.535 1.196 1.196 0 .55-.376 1.02-.912 1.154l-.137.026-.145.009H6.89l-.118.003-.315.02c-.506.06-.92.434-1.028.917l-.022.134-.007.138V17.4c0 .57.399 1.052.927 1.17l.135.023.138.007h7.197c.57 0 1.052-.399 1.17-.917l.022-.131.008-1.352a1.2 1.2 0 012.392-.14l.008.14v1.2a3.602 3.602 0 01-3.18 3.575l-.21.019-.21.006H6.6a3.602 3.602 0 01-3.575-3.18l-.019-.21L3 17.4v-7.203a3.597 3.597 0 013.386-3.59l.211-.007h1.204zM19.797 3a1.2 1.2 0 011.192 1.06l.008.14v8.4a1.2 1.2 0 01-2.392.14l-.008-.14V7.094l-6.012 6.016a1.2 1.2 0 01-1.463.183l-.121-.084-.113-.1a1.2 1.2 0 01-.1-1.583l.1-.113L16.9 5.399l-5.503.001a1.2 1.2 0 01-1.168-.925l-.024-.135-.008-.14a1.2 1.2 0 011.06-1.192l.14-.008h8.4z" fill="currentcolor" fillRule="evenodd"></path></svg>
                    </div>
                </Button>
            </Link>
        </div>
    )
}

export default ArticleCard
