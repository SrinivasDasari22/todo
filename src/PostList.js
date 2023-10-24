import Post from "./Post";
import { v4 as uuid } from "uuid";

export default function PostList({ posts, dispatchPosts }) {
  if (posts.length > 0) {
    return (
      <>
        <h2>ToDo List : </h2>
        {posts.map((p, i) => (
          <Post {...p} key={uuid()} dispatchPosts={dispatchPosts} />
        ))}
      </>
    );
  } else {
    return (
      <>
        <p>
          <strong>No To-Do list items to show!!!</strong>
        </p>
      </>
    );
  }
}
