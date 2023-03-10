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


export default function () {
    return fetch('https://next-js-56c6a-default-rtdb.firebaseio.com/events.json')
        .then((res) => res.json())
        .then((data: Re) => {
            const formatDate: PostEvent[] = [];

            for (const key in data) {
                formatDate.push({
                    id: key,
                    isFeatured: data[key].isFeatured,
                    date: data[key].date,
                    description: data[key].description,
                    image: data[key].image,
                    location: data[key].location,
                    title: data[key].title,
                });
            }
            return formatDate;
        })
        .catch((err) => {
            throw err;
        });
}
