import AllPosts from '@/components/posts/all-posts';
import { Post } from '@/types';

const DUMMY_POSTS: Post[] = [
    {
        slug: 'getting-started-next-js',
        title: 'getting started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJs is React framework',
        date: '2022-02-10',
    },
    {
        slug: 'getting-started-next-js2',
        title: 'getting started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJs is React framework',
        date: '2022-02-10',
    },
    {
        slug: 'getting-started-next-js3',
        title: 'getting started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJs is React framework',
        date: '2022-02-10',
    },
    {
        slug: 'getting-started-next-js4',
        title: 'getting started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJs is React framework',
        date: '2022-02-10',
    },
];

type Props = {
    posts: Post[];
};

export default function AllPostsPage({ posts }: Props) {
    return <AllPosts posts={DUMMY_POSTS} />;
}
