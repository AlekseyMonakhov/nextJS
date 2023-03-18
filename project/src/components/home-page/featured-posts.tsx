import classes from './featured-posts.module.css';
import PostsGrid from '@/components/posts/posts-grid';
import { Post } from '@/types';
import { FC } from 'react';

type Props = {
    posts: Post[];
};

const FeaturedPosts: FC<Props> = ({ posts }) => {
    return (
        <section className={classes.latest}>
            <h2>Feature Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    );
};

export default FeaturedPosts;
