import { Inter } from 'next/font/google';
import classes from '../styles/Home.module.css';
import { FormEvent, useRef, useState } from 'react';
import { Feedback } from '@/pages/api/feedback';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
    const [feedback, setFeedback] = useState<Feedback[]>();
    const email = useRef<HTMLInputElement>(null);
    const text = useRef<HTMLTextAreaElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredEmail = email.current?.value;
        const enteredText = text.current?.value;
        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                message: enteredText,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadFeedBack = () => {
        fetch('/api/feedback')
            .then((resp) => resp.json())
            .then((data) => {
                setFeedback(data.feedback);
            });
    };
    console.log(feedback);

    return (
        <div className={classes.main}>
            <h1>Home page</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor={'email'}>Your Email</label>
                    <input ref={email} type={'email'} id={'email'} />
                </div>
                <div>
                    <label htmlFor={'feedback'}>Your Feedback</label>
                    <textarea ref={text} id={'feedback'} rows={5}></textarea>
                    <button>Submit</button>
                </div>
            </form>
            <hr />
            <button onClick={loadFeedBack}>Load Feedback</button>
            <ul>
                {feedback?.map((el) => (
                    <li key={el.id}>{el.message}</li>
                ))}
            </ul>
        </div>
    );
}
