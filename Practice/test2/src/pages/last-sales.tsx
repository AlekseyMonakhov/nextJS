import { FC } from 'react';
import useSWR, { Fetcher } from 'swr';
import { GetStaticProps } from 'next';

type Order = {
    id: string;
    username: string;
    volume: string;
};

const getSalesData: Fetcher<Order[], string> = (url: string) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data: { [key: string]: { username: string; volume: string } }) => {
            const transformedData: Order[] = [];

            for (const key in data) {
                transformedData.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            return transformedData;
        });
};

const LastSalesPage: FC<{ sales: Order[] }> = ({ sales }) => {
    // const [sales, setSales] = useState<Order[]>();

    const {
        data: orders,
        error,
        isLoading,
    } = useSWR('https://next-js-56c6a-default-rtdb.firebaseio.com/sales.json', getSalesData);
    // useEffect(() => { fetch('https://next-js-56c6a-default-rtdb.firebaseio.com/sales.json')
    //         .then((resp) => resp.json())
    //         .then((data: { [key: string]: { username: string; volume: string } }) => {
    //             const transformedData: Order[] = [];
    //
    //             for (const key in data) {
    //                 transformedData.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //
    //             setSales(transformedData);
    //         });
    // }, []);

    if (error) {
        return <h1>Error</h1>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!orders) {
        return (
            <ul>
                {sales.map((el) => (
                    <li key={el.id}>
                        {el.username}volume{el.volume}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul>
            {orders.map((el) => (
                <li key={el.id}>
                    {el.username} volume {el.volume}
                </li>
            ))}
        </ul>
    );
};

export const getStaticProps: GetStaticProps<{ sales: Order[] }> = async (context) => {
    const salesData = await getSalesData(
        'https://next-js-56c6a-default-rtdb.firebaseio.com/sales.json'
    );

    return {
        props: {
            sales: salesData,
        },
        revalidate: 100,
    };
};

export default LastSalesPage;
