import { useReducer } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import UserBar from "./UserBar";
import appReducer from "./Reducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

  const { user, posts } = state;

  // const todos = [
  //   {
  //     title: 'Task 1',
  //     description: 'Description for Task 1',
  //     dateCreated : '12-02-2222',
  //     author: 'user1',
  //   },
  //   {
  //     title: 'Task 2',
  //     description: 'Description for Task 1',
  //     dateCreated : '12-02-2222',
  //     author: 'user2',

  //   },
  //   {
  //     title: 'Task 3',
  //     description: 'Description for Task 3',
  //     dateCreated : '12-02-2222',
  //     author: 'user1',
  //   },
  // ];

  // const [posts, setPosts] = useState([]);

  const handleAddPost = (newPost) => {
    dispatch({ type: "CREATE_POST", ...newPost });
  };

  return (
    <div style={{ padding: "10px" }}>
      <UserBar user={user} dispatchUser={dispatch} />
      <div>
        {user && <CreatePost user={user} handleAddPost={handleAddPost} />}
      </div>
      <PostList posts={posts} dispatchPosts={dispatch} />
    </div>
  );
}

export default App;
