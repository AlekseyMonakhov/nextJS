import PostHeader from '@/components/posts/post-detail/post-header';
import { FeaturePost } from '@/types';
import classes from './post-content.module.css';
import ReactMarkdown from 'react-markdown';
import { FC } from 'react';
import Image from 'next/image';
import { Prism  } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const PostContent: FC<{ post: FeaturePost }> = ({ post }) => {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    if (!post.content) {
        return <h1>No content</h1>;
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;
