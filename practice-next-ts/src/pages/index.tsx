import EventList from '../components/events/event-list';
import { GetStaticProps } from 'next';
import { PostEvent } from '../../types';
import { FC } from 'react';
import getAllEvents from '../API/getAllEvents';

const HomePage: FC<{ events: PostEvent[] }> = ({ events }) => {
    return (
        <div>
            <EventList items={events} />
        </div>
    );
};

export const getStaticProps: GetStaticProps<{ events: PostEvent[] }> = async () => {
    const events = await getAllEvents();

    if (!events) {
        return {
            notFound: true,
        };
    }
    const filteredEvents = events.filter((ev) => ev.isFeatured);

    return {
        props: {
            events: filteredEvents,
        },
        revalidate: 100,
    };
};

export default HomePage;
