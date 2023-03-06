import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import classes from './button.module.css';

const Button: FC<PropsWithChildren<{ link?: string; onClick?(): void }>> = ({
    link,
    children,
    onClick,
}) => {
    if (link) {
        return (
            <Link className={classes.btn} href={link}>
                {children}
            </Link>
        );
    }
    return (
        <button className={classes.btn} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button