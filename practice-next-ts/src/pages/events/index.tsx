import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { getAllEvents } from '@/API/getAllEvents';
import { PostEvent } from '../../../types';
import { FC } from 'react';

const AllEventsPage: FC<{ events: PostEvent[] }> = ({ events }) => {
    const { push } = useRouter();

    const findEventsHandler = (year: string, month: string) => {
        const fullPath = `/events/${year}/${month}`;
        push(fullPath);
    };

    if (!events.length) {
        return <p>No events yet...</p>;
    }

    return (
        <>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    );
};

export default AllEventsPage;

export const getStaticProps: GetStaticProps<{ events: PostEvent[] }> = async () => {
    const events = await getAllEvents();

    if (events.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            events,
        },
        revalidate: 1800
    };
};