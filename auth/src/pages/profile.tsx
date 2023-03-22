import UserProfile from '../components/profile/user-profile';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

function ProfilePage(props: any) {
    
    return <UserProfile />;
}

export const getServerSideProps: GetServerSideProps<{
    session: Session;
}> = async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default ProfilePage;
