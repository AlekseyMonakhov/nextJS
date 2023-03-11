import EventList from '../components/events/event-list';
import { GetStaticProps } from 'next';
import { PostEvent } from '../../types';
import { FC } from 'react';
import { getFeaturedEvents } from '../API/getAllEvents';

const HomePage: FC<{ events: PostEvent[] }> = ({ events }) => {
    return (
        <div>
            <EventList items={events} />
        </div>
    );
};

export const getStaticProps: GetStaticProps<{ events: PostEvent[] }> = async () => {
    const filteredEvents = await getFeaturedEvents();

    return {
        props: {
            events: filteredEvents,
        },
        revalidate: 1800,
    };
};

export default HomePage;
