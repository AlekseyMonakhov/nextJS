import classes from './newsletter-registration.module.css';
import { FormEvent, useContext, useRef } from 'react';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
    const userEmail = useRef<HTMLInputElement>(null);
    const { showNotification, hideNotification } = useContext(NotificationContext);

    function registrationHandler(event: FormEvent<HTMLFormElement>) {
        const email = userEmail.current?.value;

        showNotification({
            title: 'Signing up',
            message: 'Registering',
            status: 'pending',
        });

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
            .then((resp) => {
                if(resp.ok) {
                    return resp.json();
                }
                return resp.json().then((data) => {
                    throw new Error(data.message ?? "Something went wrong")
                })
            })
            .then((data) => {
                showNotification({
                    title: 'Success',
                    message: 'Successfully registered',
                    status: 'success',
                });
            })
            .catch((err) => {
                showNotification({
                    title: 'Error',
                    message: err.message ?? 'Something went wrong',
                    status: 'error',
                });
            });
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        ref={userEmail}
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
