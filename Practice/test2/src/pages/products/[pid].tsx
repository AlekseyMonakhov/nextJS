import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { dummyDate } from '@/pages';
import classes from '../../styles/Home.module.css';

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

const getData = async (): Promise<dummyDate[]> => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath, { encoding: 'ascii' });
    const { products }: { products: dummyDate[] } = JSON.parse(jsonData);
    return products;
};

export const getStaticProps: GetStaticProps<{
    loadedProduct: dummyDate;
}> = async (context) => {
    const { params } = context;
    const productId = params?.pid;

    const products = await getData();
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
        revalidate: 100
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getData();
    const idsArr = products.map((product) => product.id);

    const pathsWithParams = idsArr.map((el) => ({ params: { pid: el } }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
};

export default ProductDetailPage;
