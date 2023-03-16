import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

type notificationData = {
    title: string;
    message: string;
    status: string;
};

interface Context {
    notification: notificationData | null;

    showNotification(data: notificationData): void;

    hideNotification(): void;
}

const NotificationContext = createContext<Context>({
    notification: null,
    showNotification(notificationData: notificationData) {},
    hideNotification() {},
});

export const NotificationContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [activeNotification, setActiveNotification] = useState<notificationData | null>(null);

    useEffect(() => {
        if (
            activeNotification &&
            (activeNotification.status === 'success' || activeNotification.status === 'error')
        ) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    function showNotificationHandler(notificationData: notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context: Context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
