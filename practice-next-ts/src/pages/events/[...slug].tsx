import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';

const FilteredEventsPage = () => {
    const {
        query: { slug },
    } = useRouter();

    if (!slug) {
        return <p className={'center'}>Loading...</p>;
    }

    const [year, month] = slug;

    if (
        +isNaN(+year) ||
        isNaN(+month) ||
        slug.length > 2 ||
        +year > 2030 ||
        +month > 12
    ) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = getFilteredEvents({ year: +year, month: +month });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No such events</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(+year, +month - 1);

    return (
        <>
                <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
};

export default FilteredEventsPage;
