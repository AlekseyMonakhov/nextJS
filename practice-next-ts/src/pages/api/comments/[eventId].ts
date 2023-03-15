import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getAllDocuments, insertDocument, MyComment } from '@/helpers/db-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId } = <{ eventId: string }>req.query;

    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({ message: 'Failed to connect Server' });
        return;
    }

    const db = client.db('events');

    if (req.method === 'POST') {
        const { email, message, name } = <{ name: string; email: string; message: string }>req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'failed validation' });
            client.close();
            return;
        }
        const comment: MyComment = {
            name,
            email,
            message,
            eventId,
        };

        try {
            const result = await insertDocument(client, 'events', 'comments', comment);
            comment._id = result.insertedId;

            res.status(201).json({ message: 'created', comment });
        } catch (err) {
            res.status(500).json({ message: 'Failed to insert Doc' });
        }
    }
    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'events', 'comments', { _id: -1 });

            res.status(200).json({ comments: documents });
        } catch (err) {
            res.status(500).json({ message: 'Failed to get docs' });
        }
    }

    client.close();
}
