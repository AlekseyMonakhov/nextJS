import { FC, PropsWithChildren, useContext } from 'react';
import MainHeader from './main-header';
import Notification from '@/components/ui/notification';
import notificationContext from '@/store/notification-context';

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { notification, hideNotification, showNotification } = useContext(notificationContext);

    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {notification && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )}
        </>
    );
};

export default Layout;