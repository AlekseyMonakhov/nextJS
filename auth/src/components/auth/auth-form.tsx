import { FormEvent, useState } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

type UserData = {
    email: string;
    password: string;
};

async function createUser(email: string, password: string) {
    const responce = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await responce.json();
    if (!responce.ok) {
        throw new Error(data.message ?? 'Something went wrong');
    }
    return data;
}

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: '',
    });
    const { replace } = useRouter();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: userData.email,
                password: userData.password,
            });

            if (result!.error) {
                replace('/profile');
            }
        } else {
            try {
                const res = await createUser(userData.email, userData.password);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        value={userData.email}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        required
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        required
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
