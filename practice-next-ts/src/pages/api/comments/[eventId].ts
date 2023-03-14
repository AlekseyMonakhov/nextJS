import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId } = <{ eventId: string }>req.query;
    if (req.method === 'POST') {
        const { email, message, name } = <{ name: string; email: string; message: string }>req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'failed validation' });
            return;
        }
        const comment = {
            id: new Date().toISOString(),
            name,
            email,
            message,
        };
        res.status(201).json({ message: 'created', comment });
        return;
    }
    if (req.method === 'GET') {
        const list = [
            { id: 'id', name: 'alex', message: 'some message' },
            { id: 'id1', name: 'alex', message: 'some message' },
            { id: 'id2', name: 'alex', message: 'some message' },
        ];
        res.status(200).json({ comments: list });
    }
}
