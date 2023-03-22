import AuthForm from '../components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AuthPage() {
    const { status, data } = useSession();
    const { replace } = useRouter();
    useEffect(() => {
        if (data) {
            replace('/');
        }
    }, [data?.user]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return <AuthForm />;
}

export default AuthPage;