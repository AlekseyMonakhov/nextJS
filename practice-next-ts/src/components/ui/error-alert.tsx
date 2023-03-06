import classes from './error-alert.module.css';
import { PropsWithChildren } from 'react';

function ErrorAlert({ children }: PropsWithChildren) {
    return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
