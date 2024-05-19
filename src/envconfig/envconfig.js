// Creating the Variables and getting the Data From the Environment Variables
const VITE_REACT_APP_APPWRITE_URL = import.meta.env.VITE_REACT_APP_APPWRITE_URL;
const VITE_REACT_APP_PROJECT_ID = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const VITE_REACT_APP_DATABASE_ID = import.meta.env.VITE_REACT_APP_DATABASE_ID;
const VITE_REACT_APP_ARTICLE_COLLECTION_ID = import.meta.env.VITE_REACT_APP_ARTICLE_COLLECTION_ID;
const VITE_REACT_APP_BLOGIMG_BUCKET_ID = import.meta.env.VITE_REACT_APP_BLOGIMG_BUCKET_ID;

// Creating the Object that contains all the Environment Variables
const config = {
    appWriteURL: String(VITE_REACT_APP_APPWRITE_URL),
    appWriteProjectId: String(VITE_REACT_APP_PROJECT_ID),
    appWriteDatabaseId: String(VITE_REACT_APP_DATABASE_ID),
    appWriteArticleCollectionId: String(VITE_REACT_APP_ARTICLE_COLLECTION_ID),
    appWriteBlogImgBucketId: String(VITE_REACT_APP_BLOGIMG_BUCKET_ID)
}

export default config;