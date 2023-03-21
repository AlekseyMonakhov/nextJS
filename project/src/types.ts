export interface Post {
    title: string,
    image: string,
    excerpt?: string,
    content?: string,
    date: string,
    slug: string
}

export interface FeaturePost extends Post {
    isFeatured: boolean
}
