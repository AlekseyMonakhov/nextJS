import { GetStaticProps } from 'next';
import { FC, useState } from 'react';
import { createPath, Feedback, getData } from '@/pages/api/feedback';

const FeedbackPage: FC<{ items: Feedback[] }> = ({ items }) => {
    const [feedback, setFeedback] = useState<Feedback>();

    const loadFeedbackHandler = (id: string) => {
        fetch(`/api/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFeedback(data.feedback);
            });
    };

    return (
        <>
            {feedback?.id && <p>{feedback.email}</p>}
            <ul>
                {items?.map((el) => (
                    <li key={el.id}>
                        {el.email}
                        <button onClick={() => loadFeedbackHandler(el.id)}>Details</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const getStaticProps: GetStaticProps<{ items: Feedback[] }> = async () => {
    const path = createPath();
    const data = getData(path);

    return {
        props: { items: data },
    };
};

export default FeedbackPage;
