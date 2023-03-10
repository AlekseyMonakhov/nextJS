import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import classes from '../styles/Home.module.css';

export type dummyDate = {
    id: string;
    title: string;
    description: string;
};

function Home({ products }: { products: dummyDate[] }) {
    return (
        <>
            <ul className={classes.main}>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link href={'/products/' + product.id}>{product.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export const getStaticProps: GetStaticProps<{ products: dummyDate[] }> = async (
    context
) => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath, { encoding: 'ascii' });
    const { products } = JSON.parse(jsonData);

    return {
        props: {
            products,
        },
        revalidate: 10,
    };
};

export default Home;
