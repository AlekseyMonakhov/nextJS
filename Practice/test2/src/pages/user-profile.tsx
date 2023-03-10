import { FC } from 'react';
import { GetServerSideProps } from 'next';
import classes from '../styles/Home.module.css';


const UserProfile: FC<UserProfilePops> = ({ username }) => {
    return (
        <div className={classes.main}>
            <h1>{username}</h1>
        </div>
    );
};

export default UserProfile;

type UserProfilePops = {
    username: string;
};

export const getServerSideProps: GetServerSideProps<UserProfilePops> = async (context) => {

    console.log("hello");
    return {
        props: {
            username: 'Alex',
        },
    };
};