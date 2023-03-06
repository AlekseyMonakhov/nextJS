import { FC } from 'react'
import { PostEvent } from '../../../types'
import classes from './event-item.module.css'
import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'

const EventItem: FC<PostEvent> = ({
                                      title,
                                      id,
                                      image,
                                      date,
                                      location,
                                      description,
                                  }) => {
    const updatedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const formatAddress = location.replace(', ', "\n'")

    const exploreLink = `/events/${id}`

    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{updatedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formatAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem
