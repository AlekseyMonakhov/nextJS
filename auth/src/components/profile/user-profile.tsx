import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
    // const { status, data } = useSession();
    // const { push } = useRouter();
    //
    // useEffect(() => {
    //     if (!data) {
    //         push('/auth');
    //     }
    // }, []);
    //
    // if (status === 'loading') {
    //     return <p className={classes.profile}>Loading</p>;
    // }
    async function changePassword(passwordData: {
        oldPassword: string;
        newPassword: string;
    }) {
        const result = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await result.json();
        console.log(data);
    }

    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm changePassword={changePassword} />
        </section>
    );
}

export default UserProfile;
