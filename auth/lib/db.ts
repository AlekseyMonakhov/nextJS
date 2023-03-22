import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://nextjscourse:nextjscourse@cluster0.xobvpxp.mongodb.net/?retryWrites=true&w=majority'
    );
    return client;
}