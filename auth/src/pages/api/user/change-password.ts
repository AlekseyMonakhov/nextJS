import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../../lib/db';
import { hashPassword, verifyPassword } from '../../../../lib/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        return;
    }
    const session = await getSession({ req: req });

    if (!session) {
        return res.status(401).json({ message: 'Auth is miss' });
    }
    const email = session.user?.email;
    const oldPassword = req.body?.oldPassword;
    const newPassword = req.body?.newPassword;

    const client = await connectToDatabase();
    const usersCollection = await client.db('auth').collection('users');
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
        client.close();
        return res.status(404).json({ message: 'User not found' });
    }

    const currentPassword = user.hashedPassword;
    const isEqual = await verifyPassword(oldPassword, currentPassword);

    if (!isEqual) {
        client.close();
        return res.status(403).json({ message: 'password do not match' });
    }

    const newHashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
        { email: user.email },
        {
            $set: {
                hashedPassword: newHashedPassword,
            },
        }
    );

    client.close();
    res.status(200).json({ message: 'Password updated' });
}
