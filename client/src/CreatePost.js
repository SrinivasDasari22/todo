import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function CreatePost() {
  const [post, createPost] = useResource(
    ({
      title,
      description,
      dateCreated,
      author,
      completed,
      id,
      dateCompleted,
    }) => ({
      url: "/posts",
      method: "post",
      data: {
        title,
        description,
        dateCreated,
        author,
        completed,
        id,
        dateCompleted,
      },
    })
  );

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const date = new Date();
  const [dateCreated, setDateCreated] = useState(
    date.toDateString() + "  " + date.toLocaleTimeString()
  );

  const [completed, setCompleted] = useState(false);
  const [dateCompleted, setDateCompleted] = useState("-");

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleAddPostCreate() {
    const newPost = {
      title: title,
      description: description,
      dateCreated: date.toDateString() + "  " + date.toLocaleTimeString(),
      author: user,
      completed: completed,
      dateCompleted: dateCompleted,
      id: uuid(),
    };
    createPost(newPost);

    dispatch({ type: "CREATE_POST", ...newPost });

    // handleAddPost(newPost);
  }

  return (
    <div>
      <h2>Create ToDo's: </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPostCreate();
          setTitle("");
          setDescription("");
        }}
      >
        <div style={{ padding: "10px" }}>
          <div>
            Author:
            <input
              type="text"
              name="author"
              id="author"
              value={user}
              disabled
              style={{ marginLeft: "50px" }}
            />
          </div>
          <br />
          <div>
            <label htmlFor="create-title">Title: </label>
            <input
              type="text"
              name="create-title"
              id="create-title"
              value={title}
              onChange={handleTitle}
              style={{ marginLeft: "60px" }}
            />
          </div>
          <br />
          <div>
            <label htmlFor="description">Description: </label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={handleDescription}
              style={{ marginLeft: "16px" }}
            />
          </div>
          <br />
          <div>
            <label htmlFor="dateCreated">Date Created:</label>

            <input
              type="text"
              name="dateCreated"
              id="dateCreated"
              value={dateCreated}
              disabled
              style={{ marginLeft: "7px", width: "14%" }}
            />
          </div>
          <br />

          <input
            type="submit"
            value="Create Post"
            disabled={title.length === 0}
          />
        </div>
      </form>
    </div>
  );
}
