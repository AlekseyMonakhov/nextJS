import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/layout';
import { SessionProvider } from 'next-auth/react';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    console.log(session);
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
