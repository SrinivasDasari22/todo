
import { useState } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import UserBar from "./UserBar";
function App() {

  const [user,setUser] = useState('');
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


  const [posts, setPosts] = useState([]);

  const handleAddPost = (newPost) => {
    
    setPosts([newPost, ...posts]);
  }

  const functionCheck = (title)=>{
    let copyPosts = [...posts];
    copyPosts.forEach((val)=>{
      if(val.title == title){
        val.completed = !val.completed;
      }
    });
    setPosts(copyPosts);
  };

  


  return (
    <div style={{ padding: '10px' }}>
      
      <UserBar user={user} setUser={setUser}/>
      <div >
        <h2>Create ToDo's: </h2>
        <CreatePost user={user} handleAddPost={handleAddPost}/>
      </div>
      < div>
        <h2>ToDo List : </h2>
        <PostList posts={posts} functionCheck = {functionCheck}/>
      </div>
    </div>
  );
}

export default App;
