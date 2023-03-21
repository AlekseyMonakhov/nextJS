import classes from './contact-form.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Notification from '@/components/ui/notification';

type Inputs = {
    email: string;
    name: string;
    message: string;
};

enum Statuses {
    PENDING = 'PENDING',

    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED',
}

const ContactForm = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const [status, setStatus] = useState<Statuses | null>(null);


    const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
        event?.preventDefault();
        setStatus(Statuses.PENDING);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const resJson = await res.json();
            console.log(resJson);
            setStatus(Statuses.FULFILLED);
        } catch (err) {
            console.log(err);
            setStatus(Statuses.REJECTED);
        }
    };

    let notification: {
        status: Statuses;
        title: string;
        message: string;
    };

    if (status === Statuses.PENDING) {
        notification = {
            status: Statuses.PENDING,
            title: 'sending',
            message: 'on way',
        };
    }
    if (status === Statuses.FULFILLED) {
        notification = {
            status: Statuses.FULFILLED,
            title: 'success',
            message: 'success',
        };
    }
    if (status === Statuses.REJECTED) {
        notification = {
            status: Statuses.REJECTED,
            title: 'rejected',
            message: 'rejected',
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you ?</h1>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor={'email'}>Your Email</label>
                        <input
                            type={'email'}
                            id={'email'}
                            {...register('email', { required: true })}
                        />
                    </div>{' '}
                    <div className={classes.control}>
                        <label htmlFor={'name'}>Your Name</label>
                        <input
                            type={'text'}
                            id={'name'}
                            {...register('name', { required: true })}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor={'message'}>Your message</label>
                        <textarea
                            id={'message'}
                            rows={5}
                            {...register('message', { required: true })}
                        ></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button>Send message</button>
                    </div>
                </div>
            </form>
            {notification! && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )}
        </section>
    );
};

export default ContactForm;
