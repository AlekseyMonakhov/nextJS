import { getAllEvents } from '../../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = () => {
    const events = getAllEvents();
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