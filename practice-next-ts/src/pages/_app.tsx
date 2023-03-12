import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Head>
                <title>Next Events</title>
                <meta name={'description'} content={'NextJS Events'} />
                <meta name={'viewport'} content={'initial-scale=1.0, width=device-width'} />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
