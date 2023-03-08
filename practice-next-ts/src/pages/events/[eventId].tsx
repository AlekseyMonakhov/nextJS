import { useRouter } from 'next/router';
import { getEventById } from '../../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventPage = () => {
    const {
        query: { eventId },
    } = useRouter();

    const ev = getEventById(eventId as string);

    if (!ev) {
        return <p>No event</p>;
    }

    return (
        <>
            <EventSummary title={ev.title} />
            <EventLogistics date={ev.date} address={ev.location} image={ev.image}
                            imageAlt={ev.title} />
            <EventContent>
                <p>{ev.description}</p>
            </EventContent>
        </>
    );
};

export default EventPage;
