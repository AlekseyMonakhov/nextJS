import type { NextApiRequest, NextApiResponse } from 'next';
import { createPath, Feedback, getData } from '@/pages/api/feedback';

export default function handler(req: NextApiRequest, res: NextApiResponse<{ feedback: Feedback } | string>) {
    const { feedId } = <{ feedId: string }>req.query;
    const path = createPath();
    const data = getData(path);

    const selectedItem = data.find((el) => el.id === feedId);
    if (selectedItem) {
        res.status(200).json({ feedback: selectedItem });
    } else {
        res.status(404).json('not found');
    }
}
