import classes from './profile-form.module.css';
import { FormEvent, useState } from 'react';

interface Props {
    changePassword(passwordData: {
        oldPassword: string;
        newPassword: string;
    }): void;
}

function ProfileForm({ changePassword }: Props) {
    const [passWordData, setPassWordData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        changePassword({
            newPassword: passWordData.newPassword,
            oldPassword: passWordData.oldPassword,
        });
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    value={passWordData.newPassword}
                    onChange={(e) =>
                        setPassWordData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                        }))
                    }
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="old-password">Old Password</label>
                <input
                    type="password"
                    id="old-password"
                    value={passWordData.oldPassword}
                    onChange={(e) =>
                        setPassWordData((prev) => ({
                            ...prev,
                            oldPassword: e.target.value,
                        }))
                    }
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
