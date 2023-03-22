import NextAuth ,{ User } from 'next-auth';

declare module 'next-auth' {
    interface User {
        email: string;
        id?:string
    }
}