import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import classes from './button.module.css'

const Button: FC<PropsWithChildren<{ link: string }>> = ({
    link,
    children,
}) => {
    return (
        <Link className={classes.btn} href={link}>
            {children}
        </Link>
    )
}

export default Button