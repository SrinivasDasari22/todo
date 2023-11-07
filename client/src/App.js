import { useReducer, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import UserBar from "./UserBar";
import appReducer from "./Reducer";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

  const { user } = state;

  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
    }
  }, [posts]);

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((result) => result.json())
  //     .then((posts) => dispatch({ type: "FETCH_POSTS", posts }));
  // }, []);

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

  // const handleAddPost = (newPost) => {
  //   dispatch({ type: "CREATE_POST", ...newPost });
  // };

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div style={{ padding: "10px" }}>
        <UserBar />
        <div>{user && <CreatePost />}</div>
        <PostList />
      </div>
    </StateContext.Provider>
  );
}

export default App;
