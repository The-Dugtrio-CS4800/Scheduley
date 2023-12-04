// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { meetings?: mongoDB.Collection, users?: mongoDB.Collection, polls?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const meetingsCollection: mongoDB.Collection = db.collection(process.env.MEETINGS_COLLECTION_NAME);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME);

    const pollsCollection: mongoDB.Collection = db.collection(process.env.POLLS_COLLECTION_NAME)
 
  collections.meetings = meetingsCollection;
  collections.users = usersCollection;
  collections.polls = pollsCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${meetingsCollection.collectionName}`);
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${pollsCollection.collectionName}`)
 }