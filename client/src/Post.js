import { useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Post({
  title,
  description,
  dateCreated,
  author,
  completed,
  id,
  dateCompleted,
}) {
  const date = new Date();
  const { dispatch } = useContext(StateContext);

  const [updatedPost, updatePost] = useResource((post) => ({
    url: `/posts/${post.id}`,
    method: "put",
    data: post,
  }));

  const [deletedPost, deletePost] = useResource((post) => ({
    url: `/posts/${post.id}`,
    method: "delete",
    data: post,
  }));

  function handleCheck() {
    const updatedData = {
      id: id,
      title: title,
      description: description,
      dateCreated: dateCreated,
      author: author,
      dateCompleted: date.toDateString() + "  " + date.toLocaleTimeString(),
      completed: !completed,
    };
    const { dateCompleted } = updatedData;
    updatePost(updatedData);
    dispatch({ type: "TOGGLE_POST", id, dateCompleted });
  }

  function handleDelete() {
    const updatedData1 = {
      id: id,
      title: title,
      description: description,
      dateCreated: dateCreated,
      author: author,
      dateCompleted: dateCompleted,
      completed: completed,
    };

    deletePost(updatedData1);
    dispatch({ type: "DELETE_POST", id });
  }

  function renderDateCompleted() {
    if (completed) {
      return (
        <>
          <br />
          <i>
            Completed Date:&nbsp; &nbsp;
            <b>{dateCompleted}</b>
          </i>
        </>
      );
    }
  }

  return (
    <div style={{ padding: "10px" }}>
      <h2>{title}</h2>

      <i>{description}</i>
      <br />
      <i>
        Created Date: &nbsp; &nbsp; &nbsp; <b>{dateCreated}</b>
      </i>
      <br />
      <i>
        <label htmlFor="dateCompleted">Task Completed?: </label>
        <input
          type="checkbox"
          name="dateCompleted"
          id="dateCompleted"
          checked={completed}
          onChange={handleCheck}
        />
      </i>
      {renderDateCompleted()}
      <br />
      <i>
        Written by:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <b>{author}</b>
        <br />
        <button type="button" name="deleteButton" onClick={handleDelete}>
          Delete Task
        </button>
      </i>
    </div>
  );
}
