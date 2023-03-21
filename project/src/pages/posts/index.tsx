import AllPosts from '@/components/posts/all-posts';
import { FeaturePost } from '@/types';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../../../lib/posts-util';
import Head from 'next/head';

type Props = {
    posts: FeaturePost[];
};


export default function AllPostsPage({ posts }: Props) {
    return (
        <>
            <Head>
                <meta name={'description'} content={'all posts page'}/>
                <title>All posts</title>
            </Head>
            <AllPosts posts={posts} />
        </>
    );
}

export const getStaticProps: GetStaticProps<{ posts: FeaturePost[] }> = () => {
    const posts = getAllPosts();

    return {
        props: {
            posts,
        },
    };
};
