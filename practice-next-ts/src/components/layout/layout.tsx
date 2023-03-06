import { FC, PropsWithChildren } from 'react'
import MainHeader from './main-header'

const Layout:FC<PropsWithChildren> = ({children}) => {
    return <>
        <MainHeader/>
        <main>
            {children}
        </main>
    </>;
};

export default Layout;