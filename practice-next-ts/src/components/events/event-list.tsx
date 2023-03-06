import { FC } from 'react'
import { PostEvent } from '../../../types'
import EventItem from './event-item'
import classes from './event-list.module.css';

const EventList: FC<{items: PostEvent[]}> = ({items}) => {
    return (
        <ul className={classes.list}>
            {items.map((e) => (
                <EventItem key={e.id} {...e} />
            ))}
        </ul>
    )
}

export default EventList
