import classes from './post-header.module.css';
import { FC } from 'react';
import Image from 'next/image';

type Props = {
    title: string;
    image: string;
};

const PostHeader: FC<Props> = ({ image, title }) => {
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            <Image src={image} alt={title} width={200} height={150} />
        </header>
    );
};

export default PostHeader;
