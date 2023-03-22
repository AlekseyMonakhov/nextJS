import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/db';
import { verifyPassword } from '../../../../lib/auth';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const client = await connectToDatabase();

                const usersCollection = await client
                    .db('auth')
                    .collection('users');

                const user = await usersCollection.findOne({
                    email: email,
                });

                if (!user) {
                    client.close();
                    throw new Error('no user found');
                }

                const isValid = await verifyPassword(
                    password,
                    user.hashedPassword
                );

                if (!isValid) {
                    client.close();
                    throw new Error('not correct password');
                }

                client.close();

                return {
                    email: user.email,
                };
            },
        }),
    ],
});
