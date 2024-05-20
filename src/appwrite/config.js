// This File will contain the code for the database and storage functions

// Importing the env variables from the file
import envconfig from "../envconfig/envconfig";

// Importing the objects needed from the appwrite
import { Client, Databases, ID, Storage, Query } from "appwrite";


// Returning the Service Class that will return the class that have all the database methods
export class Service {
    client = new Client();
    databases;
    storage; // it the bucket

    // Now, adding the endpoint and project id in the constructor as we want them when the object is created
    constructor() {
        this.client.setEndpoint(envconfig.appWriteURL).setProject(envconfig.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Method to Create the Article
    async createArticle({ title, slug, content, featuredImage, status, userId }) {
        try {

            // Syntax For createDocument : 
            // const result = await databases.createDocument(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     '<DOCUMENT_ID>', // documentId
            //     {}, // data
            //     ["read("any")"] // permissions (optional)
            // );


            // We are Creating the Document and using slug as the document id
            return await this.databases.createDocument(
                envconfig.appWriteDatabaseId,
                envconfig.appWriteArticleCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createArticle :: Error : ", error);
        }
    }

    // Method to Update the Article
    async updateArticle(slug, { title, content, featuredImage, status }) {
        try {

            // Syntax For updateDocument : 
            // const result = await databases.updateDocument(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     '<DOCUMENT_ID>', // documentId
            //     {}, // data (optional)
            //     ["read("any")"] // permissions (optional)
            // );

            // We are Updating the Document and using slug as the document id
            return await this.databases.updateDocument(
                envconfig.appWriteDatabaseId,
                envconfig.appWriteArticleCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updateArticle :: Error : ", error);
        }
    }

    // Method to Delete the Article
    async deleteArticle(slug) {
        try {

            // Syntax For deleteDocument : 
            // const result = await databases.deleteDocument(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     '<DOCUMENT_ID>' // documentId
            // );            

            // We are Updating the Document and using slug as the document id
            await this.databases.deleteDocument(
                envconfig.appWriteDatabaseId,
                envconfig.appWriteArticleCollectionId,
                slug
            )

            return true; // Means that the document is deleted successfully
        }
        catch (error) {
            console.log("Appwrite Service :: deleteArticle :: Error : ", error);
            return false; // Means that the document is NOT deleted
        }
    }

    // Method to Get Only one Article
    async getArticle(slug) {

        try {

            // Syntax for Getting only one Document : 
            // const result = await databases.getDocument(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     '<DOCUMENT_ID>', // documentId
            //     [] // queries (optional)
            // );

            return await this.databases.getDocument(
                envconfig.appWriteDatabaseId,
                envconfig.appWriteArticleCollectionId,
                slug,
            );
        } catch (error) {
            console.log("Appwrite Service :: getArticle :: Error : ", error);
            return false;
        }
    }

    // Method to List All Articles
    async getAllArticles(queries = [Query.equal("status", "active")]) {
        try {

            // Syntax For listDocument : 
            // const result = await databases.listDocuments(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     [] // queries (optional)
            // );

            // We are listing all the documents
            return await this.databases.listDocuments(
                envconfig.appWriteDatabaseId,
                envconfig.appWriteArticleCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: listArticle :: Error : ", error);
            return false;
        }
    }

    // Method to upload the file in the AppWrite Bucket
    async uploadFile(file) {
        try {

            // Syntax to Create the File in Appwrite Bucket
            // const promise = storage.createFile(
            //     '[BUCKET_ID]',
            //     ID.unique(),
            //     document.getElementById('uploader').files[0]
            // );

            return await this.storage.createFile(
                envconfig.appWriteBlogImgBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: Error : ", error);
            return false;
        }
    }

    // Method to delete the file in the AppWrite Bucket
    async deleteFile(fileId) {
        try {

            // Syntax to Delete the File in Appwrite Bucket
            // const promise = storage.deleteFile(
            //     '[BUCKET_ID]',
            //     ID.unique()
            // );

            await this.storage.deleteFile(
                envconfig.appWriteBlogImgBucketId,
                fileId
            )
            return true;

        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: Error : ", error);
            return false;
        }
    }

    // Method to Get the File Preview
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            envconfig.appWriteBlogImgBucketId,
            fileId,
            // other attributes to set the preview
        )
    }

}

// Creating the Object for the Service and exporting it
const serviceObj = new Service();

export default serviceObj;