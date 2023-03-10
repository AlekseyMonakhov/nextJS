import { getAllEvents } from '../../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import getEvents from '@/API/getAllEvents';
import { PostEvent } from '../../../types';
import { FC } from 'react';

const AllEventsPage:FC<{events: PostEvent[]}> = ({events}) => {
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

export const getStaticProps: GetStaticProps<{events: PostEvent[]}> = async () => {
    const events = await getEvents();

    if(!events) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            events
        }
    }
}