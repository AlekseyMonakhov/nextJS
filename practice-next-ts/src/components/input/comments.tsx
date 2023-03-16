import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

type Props = {
    eventId: string;
};

export interface MyComment {
    name: string;
    email?: string;
    id?: string;
    message: string;
    _id?: string;
}

function Comments({ eventId }: Props) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<MyComment[]>();
    const { hideNotification, showNotification, notification } = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!showComments) {
            setLoading(true);
            fetch('/api/comments/' + eventId)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setComments(res.comments);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData: MyComment) {
        setLoading(true);
        showNotification({
            title: 'Adding',
            message: 'Adding comment',
            status: 'pending',
        });
        fetch('/api/comments/' + eventId, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return resp.json().then((data) => {
                    throw new Error(data.message ?? 'Some error');
                });
            })
            .then((data) => {
                showNotification({
                    title: 'success',
                    message: 'Registering',
                    status: 'success',
                });
                setLoading(false);
            })
            .catch((err) => {
                showNotification({
                    title: 'error',
                    message: err.message ?? 'some error',
                    status: 'error',
                });
                setLoading(false);
            });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !loading && <CommentList items={comments} />}
            {showComments && loading && <p>Loading...</p>}
        </section>
    );
}

export default Comments;
