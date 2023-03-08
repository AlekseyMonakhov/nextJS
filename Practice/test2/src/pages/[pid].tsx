import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { dummyDate } from '@/pages/index';
import classes from '../styles/Home.module.css';

type props = { loadedProduct: dummyDate };

const ProductDetailPage: FC<props> = ({ loadedProduct }) => {
    if (!loadedProduct) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={classes.main}>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </div>
    );
};

export const getStaticProps: GetStaticProps<{
    loadedProduct: dummyDate;
}> = async (context) => {
    const { params } = context;
    const productId = params?.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath, { encoding: 'ascii' });
    const { products }: { products: dummyDate[] } = JSON.parse(jsonData);

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { pid: 'p1' },
            },
        ],
        fallback: true,
    };
};

export default ProductDetailPage;
