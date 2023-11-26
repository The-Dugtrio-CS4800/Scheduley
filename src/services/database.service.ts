// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { meetings?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const meetingsCollection: mongoDB.Collection = db.collection(process.env.MEETINGS_COLLECTION_NAME);
 
  collections.meetings = meetingsCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${meetingsCollection.collectionName}`);
 }