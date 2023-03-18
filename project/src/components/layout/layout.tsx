import MainNavigation from '@/components/layout/main-navigation';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <MainNavigation />
            <main>{children}</main>
        </>
    );
};
export default Layout;
