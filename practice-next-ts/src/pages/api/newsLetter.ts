import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, insertDocument } from '@/helpers/db-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = <{ email: string }>req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'invalid email' });
            return;
        }
        let client;

        try {
            client = await connectDatabase();
        } catch (err) {
            return res.status(500).json({ message: 'Connecting to database failed' });
        }

        try {
            await insertDocument(client, 'newsletter', 'emails', { email: email });
            client.close();
        } catch (err) {
            return res.status(500).json({ message: 'Inserting data failed' });
        }

        res.status(201).json({ message: 'Signed up' });
    }
}
