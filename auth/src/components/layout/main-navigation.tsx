import Link from 'next/link';

import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/react';

function MainNavigation() {
    const { status, data } = useSession();

    function logoutHandler() {
        signOut();
    }


    return (
        <header className={classes.header}>
            <Link href="/">
                <div className={classes.logo}>Next Auth</div>
            </Link>
            <nav>
                <ul>
                    {!data && (
                        <li>
                            <Link href="/auth">Login</Link>
                        </li>
                    )}
                    {data && (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                    )}
                    {data && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;