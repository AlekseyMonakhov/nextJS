import { getFilteredEvents } from '../../../src/API/getAllEvents';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { PostEvent } from '../../../types';
import Head from 'next/head';

type FilteredPageProps = {
    hasError?: boolean;
    events?: PostEvent[];
    yearMonth?: [number, number];
};

const FilteredEventsPage: FC<FilteredPageProps> = ({ hasError, events, yearMonth }) => {
    if (!events || events.length === 0 || !yearMonth || !yearMonth.length) {
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
    const [year, month] = yearMonth;

    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`ALl events for ${year}/${month}`} />
        </Head>
    );

    if (hasError) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter</p>
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
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={events} />
        </>
    );
};

export default FilteredEventsPage;

export const getServerSideProps: GetServerSideProps<FilteredPageProps, { slug: [string, string] }> = async (
    context
) => {
    const [year, month] = context.params!.slug;
    const [numYear, numMonth] = [+year, +month];

    if (isNaN(numYear) || isNaN(numMonth) || context.params!.slug.length > 2 || numMonth > 2030 || numMonth > 12) {
        return {
            props: {
                hasError: true,
            },
            //notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });
    return {
        props: {
            events: filteredEvents,
            yearMonth: [numYear, numMonth],
        },
    };
};
