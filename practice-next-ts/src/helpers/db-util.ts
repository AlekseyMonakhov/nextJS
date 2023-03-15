import { MongoClient, ObjectId } from 'mongodb';

export interface MyComment {
    name: string;
    email: string;
    message: string;
    eventId: string;
    _id?: ObjectId;
}

export async function connectDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://nextjscourse:nextjscourse@cluster0.xobvpxp.mongodb.net/?retryWrites=true&w=majority'
    );
    return client;
}

export async function insertDocument(
    client: MongoClient,
    dbname: string,
    collection: string,
    document: { email: string } | MyComment
) {
    const db = client.db(dbname);
    return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client: MongoClient, dbName: string, collection: string, sort: any) {
    const db = client.db(dbName);
    return await db.collection(collection).find().sort(sort).toArray();
}
