// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type DataPost = {
    message: string;
    feedback: Feedback;
};
type DataGet = {
    message: string;
    feedback: Feedback[];
};

export type Feedback = {
    id: string;
    email: string;
    message: string;
};

export function createPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function getData(path: string) {
    const fileData = fs.readFileSync(path, { encoding: 'ascii' });
    const data: Feedback[] = JSON.parse(fileData);
    return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataPost | DataGet>) {
    if (req.method === 'POST') {
        const { email, message } = <{ email: string; message: string }>req.body;

        const feedBack: Feedback = {
            id: new Date().toJSON(),
            email: email,
            message: message,
        };

        const filePath = createPath();
        const data: Feedback[] = getData(filePath);

        data.push(feedBack);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({ message: 'Success', feedback: feedBack });
    } else {
        const filePath = createPath();
        const data: Feedback[] = getData(filePath);

        res.status(200).json({ message: 'Success', feedback: data });
    }
}
