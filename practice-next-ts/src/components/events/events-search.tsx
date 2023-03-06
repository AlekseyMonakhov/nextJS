import Button from '../ui/button'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

import classes from './event-search.module.css';
import { FC, FormEvent, useRef } from 'react'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error

const EventsSearch:FC<{onSearch(year: string, month: string): void}> = ({onSearch}) => {
    const yearRef = useRef<HTMLSelectElement>(null);
    const monthRef = useRef<HTMLSelectElement>(null);

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedYear = yearRef.current?.value;
        const selectedMonth = monthRef.current?.value;

        if(selectedMonth && selectedYear) {
            onSearch(selectedYear, selectedMonth);
        }


    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor={'year'}>Year</label>
                    <select ref={yearRef} id={'year'}>
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                    </select>
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor={'month'}>Month</label>
                <select id={'month'} ref={monthRef}>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <Button>Find Events</Button>
        </form>
    );
};

export default EventsSearch;