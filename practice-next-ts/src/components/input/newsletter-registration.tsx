import classes from './newsletter-registration.module.css';
import { FormEvent, useRef } from 'react';

function NewsletterRegistration() {
    const userEmail = useRef<HTMLInputElement>(null);

    function registrationHandler(event: FormEvent<HTMLFormElement>) {
        const email = userEmail.current?.value;
        event.preventDefault();
        fetch('/api/newsLetter', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
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
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input ref={userEmail} type="email" id="email" placeholder="Your email"
                           aria-label="Your email" />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;