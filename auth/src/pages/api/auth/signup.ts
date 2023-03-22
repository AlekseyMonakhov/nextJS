import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/db';
import { hashPassword } from '../../../../lib/auth';

type Data = {
    [key: string]: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { email, password } = <{ email: string; password: string }>(
            req.body
        );

        if (
            !email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 7
        ) {
            return res.status(422).json({ message: 'Invalid input' });
        }

        const client = await connectToDatabase();

        const db = client.db('auth');

        const existingUser = await db
            .collection('users')
            .findOne({ email: email });

        if (existingUser) {
            client.close();
            return res.status(422).json({ message: 'User exists already' });
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            email,
            hashedPassword,
        });

        client.close();
        res.status(201).json({ message: 'created user' });
    }
}

export default handler;
