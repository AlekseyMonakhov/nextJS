import classes from './event-summary.module.css';

type EventSumProps = {
    title: string;
}

function EventSummary(props: EventSumProps) {
    const { title } = props;

    return (
        <section className={classes.summary}>
            <h1>{title}</h1>
        </section>
    );
}

export default EventSummary;