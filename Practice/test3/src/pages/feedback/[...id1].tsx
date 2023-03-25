import { useRouter } from 'next/router';
import Link from 'next/link';

const PageId1 = () => {
    const {query:{id1}} = useRouter();
    console.log(id1, 'dsfadf');
    return (
        <div>
            hello
            <Link href={{search: '?name=16&age=22', pathname: '/'}}>helel</Link>
        </div>
    )
}

export default PageId1;