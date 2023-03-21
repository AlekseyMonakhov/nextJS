import { Fragment, PropsWithChildren } from 'react'

import MainNavigation from './main-navigation'

function Layout(props: PropsWithChildren) {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;