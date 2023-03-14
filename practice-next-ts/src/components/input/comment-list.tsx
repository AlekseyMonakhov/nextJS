import classes from './comment-list.module.css';
import { MyComment } from '@/components/input/comments';

function CommentList({items}: {items:MyComment[] | undefined}) {
    return (
        <ul className={classes.comments}>
            {items?.map((el) => (
                <li key={el.id}>
                    <p>{el.message}</p>
                    <div>
                        By <address>{el.name}</address>
                    </div>
                </li>
            ))}

        </ul>
    );
}

export default CommentList;