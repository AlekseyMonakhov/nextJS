import { FC } from 'react';
import PostItem from '@/components/posts/post-item';
import classes from './posts-grid.module.css';
import { Post } from '@/types';

type Props = {
    posts: Post[];
};

const PostsGrid: FC<Props> = ({ posts }) => {
    return (
        <ul className={classes.grid}>
            {posts.map((post) => (
                <PostItem key={post.slug} post={post}/>
            ))}
        </ul>
    );
};

export default PostsGrid;