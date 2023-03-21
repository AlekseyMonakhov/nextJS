import ContactForm from '@/components/contact/contact-form';
import Head from 'next/head';

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact page</title>
                <meta name={'description'} content={'send me messages'} />
            </Head>
            <ContactForm />
        </>
    );
}
