import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Post({
  title,
  description,
  dateCreated,
  author,
  completed,
  id,
}) {
  const { dispatch } = useContext(StateContext);

  const date = new Date();

  function handleCheck() {
    dispatch({ type: "TOGGLE_POST", id });
  }

  function handleDelete() {
    dispatch({ type: "DELETE_POST", id });
  }

  function renderDateCompleted() {
    if (completed) {
      return (
        <>
          <br />
          <i>
            Completed Date:&nbsp; &nbsp;
            <b>{date.toDateString() + "  " + date.toLocaleTimeString()}</b>
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
