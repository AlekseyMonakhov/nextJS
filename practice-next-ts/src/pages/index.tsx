import EventList from '../components/events/event-list';
import { GetStaticProps } from 'next';
import { PostEvent } from '../../types';
import { FC } from 'react';
import { getFeaturedEvents } from '../API/getAllEvents';
import Head from 'next/head';

const HomePage: FC<{ events: PostEvent[] }> = ({ events }) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content={"Find a lot of events there"}/>
            </Head>
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
