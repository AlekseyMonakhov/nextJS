import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

type Props = {
    eventId: string;
};

export interface MyComment {
    name: string;
    email?: string;
    id?: string;
    message: string;
}

function Comments({ eventId }: Props) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<MyComment[]>();

    useEffect(() => {
        if (!showComments) {
            fetch('/api/comments/' + eventId)
                .then((res) => res.json())
                .then((res) => {
                    setComments(res.comments)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData: MyComment) {
        fetch('/api/comments/' + eventId, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
    }


    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList items={comments} />}
        </section>
    );
}

export default Comments;
