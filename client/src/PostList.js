import { useContext } from "react";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import { StateContext } from "./contexts";

export default function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;

  if (posts.length > 0) {
    return (
      <>
        <h2>ToDo List : </h2>
        {posts.map((p, i) => (
          <Post {...p} key={p._id || p.id} />
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
