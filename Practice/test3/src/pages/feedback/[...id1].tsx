import { useRouter } from 'next/router';

const PageId1 = () => {
    const {query:{id1}} = useRouter();
    console.log(id1, 'dsfadf');
    return (
        <div>
            hello
        </div>
    )
}

export default PageId1;