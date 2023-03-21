import PostContent from '@/components/posts/post-detail/post-content';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostData, getPostsFiles } from '../../../lib/posts-util';
import { FeaturePost } from '@/types';
import Head from 'next/head';

export default function PostsPage(props: { post: FeaturePost }) {
    return (
        <>
            <Head>
                <title>{props.post.title}</title>
            </Head>
            <PostContent post={props.post} />
        </>
    );
}

export const getStaticProps: GetStaticProps<{ post: FeaturePost }> = (context) => {
    const { slug } = context.params as { slug: string };
    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
};

export const getStaticPaths: GetStaticPaths = (context) => {
    const postFiles = getPostsFiles();
    const slugs = postFiles.map((file) => file.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
};
