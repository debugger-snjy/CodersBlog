// This file will contain the authentication using Appwrite
// We are going to design the Authentication system such that if the Authentication system is removed then it should not harm or crash our application

// Refer Doc : 

// Code from the AppWrite Docs : 
// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// Importing the Appwrite Configurations
import config from "../envconfig/envconfig"

import { Client, Account, ID } from "appwrite"

// Class to handle the Authentication Services
export class AuthService {
    // We have to set the endpoints and other things as seen above in the code from appwrite but for the best code practices, we have to set EndPoint, ProjectID
    // But, that we have to set when we create the object, so adding this in the constructor
    client = new Client();
    account;

    // Now, adding the endpoint and project id in the constructor
    constructor() {
        this.client.setEndpoint(config.appWriteURL).setProject(config.appWriteProjectId);

        // now we can create the Account
        this.account = new Account(this.client)
    }

    // Method to Create the Account
    async createAccount({ email, password, name }) {

        // Now, there are chances that the function fails to create the account
        try {

            // Creating the new Account in the Appwrite
            // Syntax :  account.create('[USER_ID]', '<email>', '<password>',<name>);
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            // Checking whether the user Account is Created or not
            if (userAccount) {
                // return userAccount
                // Here, we are not returning the userAccount, we are directly login in to the system
                // Call login function and login the user directly into the website
                console.log("Sign in completed :", userAccount)
                this.login(email, password)
            }
            else {
                // If the account creation is failed
                // also we can send the error message
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Method to Login into the System
    async login({ email, password }) {
        try {
            // we will return the result that we get from it
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    // Method to check whether the user is logged in or not
    async getCurrentUser() {
        try {
            console.log("Account : ", this.account)
            // Got to know about this after logging this.account
            if (this.account && (this.account.client.config.session || this.account.client.config.jwt)) {
                // this Get the currently logged in user.
                return await this.account.get();
            }
            else {
                return false;
            }
        } catch (error) {
            console.log("Error : ", error);
        }

        // we are doing this if the user is not logged in
        return null;
    }

    // Method to logout the user
    async logout() {
        try {
            // This function will delete all the sessions from all the browsers
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error ",error);
        }
    }
}

// Creating the Object for the AuthService as it will be easier to access things instead creating object and using methods and functions everywhere
const authServiceObject = new AuthService();

export default authServiceObject;