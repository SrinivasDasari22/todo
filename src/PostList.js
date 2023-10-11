import Post from './Post'
import { v4 as uuid } from 'uuid'


export default function PostList ({posts, functionCheck}) {

    

    return (
        <>
            {posts.map((p, i) => (
                <Post { ...p}  key={uuid()} functionCheck={functionCheck}/>
            ))}
        </>
    )
}