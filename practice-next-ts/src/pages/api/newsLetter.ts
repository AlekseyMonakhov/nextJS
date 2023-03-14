import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = <{ email: string }>req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'invalid email' });
            return;
        }

        const client = await MongoClient.connect(
            'mongodb+srv://nextjscourse:nextjscourse@cluster0.xobvpxp.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db('newsletter');
        await db.collection('emails').insertOne({ email: email });

        client.close();

        res.status(201).json({ message: 'Signed up' });
    }
}