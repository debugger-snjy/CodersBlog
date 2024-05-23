import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RichTextEditor } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Adding the Appwrite Service for Adding Article
import serviceObj from "../../appwrite/config"

// We are making this Form Reusable for Creating Article as well as Editing Article (if editing, then it will provide the data so for that using the props data in this) 
function ArticleForm({ articleData }) {

    const navigate = useNavigate();

    // Here we also need the userData to add the Article
    const userData = useSelector(state => state.auth.userData)
    console.log(userData);

    // Getting the Objects from the useForm
    // Here, watch is used to continuously watch at a field and on anything it will update !
    const { register, handleSubmit, control, getValues, watch, setValue } = useForm(
        {
            defaultValues: {
                // title : '', // This will be invalid as if we are editing, then the title should be the value provided in the props
                title: articleData?.title || "",
                slug: articleData?.$id || "",
                content: articleData?.content || "",
                status: articleData?.status || "active",
            }
        }
    );

    // Function to convert the title to slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            // const slug = value.toLowerCase().replace(/ /g,"-")
            // return slug;

            console.log(value);

            const sluggedValue = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')

            // Returning the Slugged Value from title : 
            return sluggedValue
        }
        return '';
    }, [])

    // Function to handle the Submit Data
    const submitArticlePost = async (data) => {

        // If Article Data is provided, then it means we are editing the article and we need to update the Article
        if (articleData) {

            // Handling the uploaded file
            // we can access the images of the form using data

            // Uploading the Image in the database
            const uploadedFile = data.image[0] ? await serviceObj.uploadFile(data.image[0]) : null;

            // If file is uploaded, then deleting the file
            if (uploadedFile) {
                await serviceObj.deleteFile(articleData.featuredImageID)
            }

            // Updating the Data
            const dbUpdatedArticle = await serviceObj.updateArticle(articleData.$id, {
                // here we need the form data
                ...data,

                // overwriting the image, if new image is uploaded else returning the old image
                featuredImageID: uploadedFile ? uploadedFile.$id : articleData.featuredImageID ? articleData.featuredImageID : undefined
            })

            if (dbUpdatedArticle) {
                // Our Article is Updated
                navigate(`/article/${dbUpdatedArticle.$id}`)
            }

        }
        // else means that we are creating the new Article, 
        else {

            // Uploading the Image in the database
            const uploadedFile = data.image[0] ? await serviceObj.uploadFile(data.image[0]) : null;

            // If the image is uploaded successfully
            if (uploadedFile) {
                const fileId = uploadedFile.$id;
                data.featuredImageID = fileId;

                // Appwrite function to create the Article in the database
                const createdArticle = await serviceObj.createArticle({
                    ...data,
                    userID: userData.$id
                })

                if (createdArticle) {
                    // If the Article is created, then we will navigate the user to that article
                    navigate(`/article/${createdArticle.$id}`)
                }
            }

        }
    }

    // Using the UseEffect without importing and from react
    React.useEffect(() => {

        // It is more preferred to store the watch in the variable named "subscription"
        const subscription = watch((value, { name }) => {
            // Value is object that contain whole data
            // name is the name of the variable that we want to check
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => {
            // we will return the function that will unsubscribe the watch function
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submitArticlePost)} className="flex flex-wrap">

            {/* Left Side of the Form */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    labelColor="white"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    labelColor="white"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RichTextEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Side of the Form */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    labelColor="white"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !articleData })}
                />
                {articleData && (
                    <div className="w-full mb-4">
                        <img
                            src={serviceObj.getFilePreview(articleData.featuredImageID)}
                            alt={articleData.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={articleData ? "bg-green-500" : undefined} className="w-full">
                    {articleData ? "Update Article" : "Submit Article"}
                </Button>
            </div>
        </form>
    )
}

export default ArticleForm
