import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import classes from '../styles/Home.module.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={classes.main}>
            <Component {...pageProps} />
        </div>
    );
}
