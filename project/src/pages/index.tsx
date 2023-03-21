import Hero from '@/components/home-page/hero';
import { FeaturePost } from '@/types';
import { GetStaticProps } from 'next';
import { getFeaturedPosts } from '../../lib/posts-util';
import FeaturedPosts from '@/components/home-page/featured-posts';
import Head from 'next/head';

type Props = {
    featuredPostsArr: FeaturePost[];
};

export default function Home({ featuredPostsArr }: Props) {
    return (
        <>
            <Head>
                <title>Welcome to my blog</title>
                <meta name={'description'} content={'i post about programming'} />
            </Head>
            <Hero />
            <FeaturedPosts posts={featuredPostsArr} />
        </>
    );
}

export const getStaticProps: GetStaticProps<{ featuredPostsArr: FeaturePost[] }> = async (
    context
) => {
    const featuredPostsArr = getFeaturedPosts();
    return {
        props: {
            featuredPostsArr,
        },
        revalidate: 1000,
    };
};
