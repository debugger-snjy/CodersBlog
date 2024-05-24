import React from 'react'
import serviceObj from "../../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../index"
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

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

// Function to Delete the Article
const deleteArticle = (article) => {
    const navigate = useNavigate();
    serviceObj.deleteArticle(article.$id).then((status) => {
        if (status) {
            serviceObj.deleteFile(article.featuredImageID);
            navigate("/");
        }
    });
};


function ArticleCard(props) {
    const navigate = useNavigate();

    const articleData = props.articleData;

    console.log("Card");
    console.log("Card Data : ", articleData);

    let { $id, title, featuredImageID, $updatedAt, content, status, userID } = articleData

    // Getting the userdata from the store using the selector and state
    const userData = useSelector((state) => state.auth.userData);

    // Checking whether the user that has open the article is author of that article or not
    // If he/she is the author, then he/she will be given the right to edit or delete this article
    const isAuthor = articleData && userData ? userID === userData.$id : false;

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
        <div className="w-full relative bg-[#1c1f26] border-[0.1px] border-white/10 rounded-xl p-4 hover:border-white/40 shadow-2" style={{ boxShadow: "var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)" }}>

            {
                status !== "active" && <Link to={`/publish-article/${$id}`}><div className="ribbon">UnPublished, Ready to Publish</div></Link>
            }

            <div className="flex flex-row justify-between items-center align-middle mt-3">
                <div>
                    <h2 className='text-2xl mb-2 text-white font-bold'>{titleCase(title)}</h2>
                    <div className='text-gray-400 mb-2'>
                        {monthName} {date} • {timeToRead} min read time
                    </div>
                </div>
                {/* Read Post at Top of the Article */}
                <div className="">
                    <Button
                        bgColor='bg-gray-100'
                        textColor='black'
                        type='button'
                        className='font-bold w-full' onClick={() => navigate(`/article/${$id}`)}
                    >
                        <div className="flex items-center justify-center">
                            <span>{status !== "active" ? "Read Draft" : "Read Post"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="ml-1 lucide lucide-external-link"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="w-full justify-center mb-4">
                <img src={imageURL} alt={`${title}'s blog Image`} className='object-cover rounded-md h-56 w-full' />
            </div>

            <div className="flex flex-row gap-2 items-center justify-between mb-4">
                <div className='cardBtn small rounded-lg'>
                    <button className='likeIcon p-2 rounded-lg '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7b2ce" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    </button>
                </div>

                <div className='cardBtn small rounded-lg'>
                    <button className='commentIcon p-2 rounded-lg hover:bg-[#1ddc6f3d]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7b2ce" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></svg>
                    </button>
                </div>

                <div className='cardBtn small rounded-lg'>
                    <button className='bookmarkIcon rounded-lg p-2 hover:bg-[#1ddc6f3d]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7b2ce" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
                    </button>
                </div>

                <div className='cardBtn rounded-lg'>
                    <button className='linkIcon rounded-lg p-2 hover:bg-[#1ddc6f3d]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7b2ce" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                    </button>
                </div>
            </div>

            {/* TODO : Add More Data like likes, comments and favourites */}
            {/* Moved the Edit and Delete Button to End of the Article */}
            <div className="flex flex-row gap-2">
                {
                    props.showEDbtns && isAuthor && <div className="basis-1/2">
                        <Button bgColor="bg-green-500" textColor='text-green-' className="font-bold w-full" onClick={() => navigate(`/edit-article/${$id}`)}>
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="mr-1 lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                <span>Edit</span>
                            </div>
                        </Button>
                    </div>
                }
                {
                    props.showEDbtns && isAuthor && <div className="basis-1/2">
                        <Button bgColor="bg-red-500" textColor='text-black' className="text-center font-bold w-full" onClick={() => deleteArticle(articleData)}>
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="mr-1 lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                <span>Delete</span>
                            </div>
                        </Button>
                    </div>
                }
            </div>

        </div>
    )
}

export default ArticleCard
