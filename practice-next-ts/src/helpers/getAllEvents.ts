import { PostEvent } from '../../types';

type Re = {
    [id: string]: {
        isFeatured: boolean;
        date: string;
        description: string;
        image: string;
        location: string;
        title: string;
    };
};

export async function getAllEvents() {
    const eventsJson = await fetch('https://next-js-56c6a-default-rtdb.firebaseio.com/events.json');
    const events: Re = await eventsJson.json();

    const formatDate: PostEvent[] = [];

    for (const key in events) {
        formatDate.push({
            id: key,
            ...events[key],
        });
    }
    return formatDate;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((ev) => ev.isFeatured);
}

export async function getEventById(id: string) {
    const allEvents = await getAllEvents();
    return allEvents.find((ev) => ev.id === id);
}

export async function getFilteredEvents({ year, month }: { year: number; month: number }) {
    const allEvents = await getAllEvents();
    const filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}
