import PostHeader from '@/components/posts/post-detail/post-header';
import { Post } from '@/types';
import classes from './post-content.module.css';
import ReactMarkdown from 'react-markdown';

const DUMMY_POST: Post = {
    slug: 'getting-started-next-js',
    title: 'getting started with next js',
    image: 'getting-started-nextjs.png',
    excerpt: 'NextJs is React framework',
    date: '2022-02-10',
    content: '# This is a first post',
};

const PostContent = () => {
    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

    if (!DUMMY_POST.content) {
        return <h1>No content</h1>;
    }

    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;
