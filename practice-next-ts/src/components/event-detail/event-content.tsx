import classes from './event-content.module.css';
import { PropsWithChildren } from 'react';

function EventContent(props: PropsWithChildren) {
    return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
