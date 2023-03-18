import classes from './all-posts.module.css';
import PostsGrid from '@/components/posts/posts-grid';
import { Post } from '@/types';
import { FC } from 'react';

type Props = {
    posts: Post[];
};

const AllPosts: FC<Props> = ({ posts }) => {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={posts} />
        </section>
    );
};

export default AllPosts;
