import { FC } from 'react';
import { GetServerSideProps } from 'next';
import classes from '../styles/Home.module.css';

type UserIdProps = {
    id: string;
};

const UserIdPage: FC<UserIdProps> = ({ id }) => {
    return (
        <div className={classes.main}>
            <h1>{id}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<UserIdProps> = async (context) => {
    const { params } = context;
    const userId = params?.uid;

    return {
        props: {
            id: 'user-id-' + userId,
        },
    };
};

export default UserIdPage;
