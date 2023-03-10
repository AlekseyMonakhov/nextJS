import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { GetStaticPaths, GetStaticProps } from 'next';
import getAllEvents from '@/API/getAllEvents';
import { PostEvent } from '../../../types';
import { FC } from 'react';

const EventPage: FC<{ loadedEvent: PostEvent }> = ({ loadedEvent }) => {
    if (!loadedEvent) {
        return <p>No event</p>;
    }

    return (
        <>
            <EventSummary title={loadedEvent.title} />
            <EventLogistics
                date={loadedEvent.date}
                address={loadedEvent.location}
                image={loadedEvent.image}
                imageAlt={loadedEvent.title}
            />
            <EventContent>
                <p>{loadedEvent.description}</p>
            </EventContent>
        </>
    );
};

export default EventPage;

export const getStaticProps: GetStaticProps<{ loadedEvent: PostEvent }> = async (context) => {
    const { params } = context;
    const eventId = params!.eventId;

    const events = await getAllEvents();
    if (!events) {
        return {
            notFound: true,
        };
    }
    const event = events.find((ev) => ev.id === eventId);

    if (!event) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            loadedEvent: event,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const events = await getAllEvents();
    const eventsPaths = events.map((ev) => ({ params: { eventId: ev.id } }));

    return {
        paths: eventsPaths,
        fallback: true,
    };
};
