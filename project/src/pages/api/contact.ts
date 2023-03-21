import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

type Message = {
    name: string;
    email: string;
    message: string;
    _id: ObjectId;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, message, name } = req.body as Partial<Message>;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            return res.status(422).json({ message: 'Invalid input' });
        }

        const newMessage: Partial<Message> = {
            name,
            email,
            message,
        };
        let client;

        try {
            client = await MongoClient.connect(process.env.mongoUrlDev!);
        } catch (err) {
            return res.status(500).json({ message: 'failed to connect to database' });
        }
        const db = await client.db('my-site');

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage._id = result.insertedId;
        } catch (err) {
            client.close();
            return res.status(500).json({ message: 'failed to add to db' });
        }

        client.close();
        res.status(201).json({ message: 'Success', newMessage });
    }
}
