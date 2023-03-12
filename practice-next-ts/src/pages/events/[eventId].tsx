import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getEventById, getFeaturedEvents } from '@/API/getAllEvents';
import { PostEvent } from '../../../types';
import { FC } from 'react';
import Head from 'next/head';

const EventPage: FC<{ loadedEvent: PostEvent }> = ({ loadedEvent }) => {
    if (!loadedEvent) {
        return (
            <div className={'center'}>
                <p>No event</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{loadedEvent.title}</title>
                <meta name="description" content={"Find a lot of events there"}/>
            </Head>
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
    const eventId = params?.eventId;

    const event = await getEventById(eventId as string);

    if (!event) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            loadedEvent: event,
        },
        revalidate: 30,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const events = await getFeaturedEvents();
    const eventsPaths = events.map((ev) => ({ params: { eventId: ev.id } }));

    return {
        paths: eventsPaths,
        fallback: true,
    };
};
