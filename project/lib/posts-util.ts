import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FeaturePost } from '@/types';

const postDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
    return fs.readdirSync(postDirectory, {encoding: "ascii"});
}

export function getPostData(fileName: string) {
    const postSlug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postData: FeaturePost = {
        slug: postSlug,
        date: '',
        image: '',
        excerpt: '',
        title: '',
        isFeatured: false,
        ...data,
        content,
    };
    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();

    const allPosts = postFiles.map((file) => {
        return getPostData(file);
    });
    const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
    return sortedPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);
    return featuredPosts;
}
