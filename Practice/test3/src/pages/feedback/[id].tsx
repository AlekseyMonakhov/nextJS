import { useRouter } from 'next/router';

const PageId = () => {
    const {query:{id}} = useRouter();
    console.log(id, "page");
    return (
        <div>
            hello
        </div>
    )
}

export default PageId;