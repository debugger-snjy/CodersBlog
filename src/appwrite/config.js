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
        this.client.setEndpoint(config.appWriteURL).setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

}

// Creating the Object for the Service and exporting it
const serviceObj = new Service();

export default serviceObj;