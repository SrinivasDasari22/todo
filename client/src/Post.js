import { useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Post({
  title,
  description,
  _id,
  dateCreated,
  author,
  completed,
  dateCompleted,
}) {
  // let id = _id;
  console.log("ID:", _id);
  const date = new Date();
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [deletedPost, deletePost] = useResource((_id) => ({
    url: `/post/${_id}`,
    method: "delete",
    headers: { Authorization: `${state?.user?.access_token}` },
    data: _id,
  }));

  const [updatedPost, updatePost] = useResource(
    (_id, completed, dateCompleted) => ({
      url: `/post/${_id}`,
      method: "put",
      headers: { Authorization: `${state?.user?.access_token}` },
      data: { _id, completed, dateCompleted },
    })
  );

  function handleCheck() {
    const updateData1 = {
      dateCompleted: completed
        ? ""
        : date.toDateString() + "  " + date.toLocaleTimeString(),
      completed: !completed,
    };
    // const { dateCompleted } = updateData1;
    updatePost(_id, updateData1.completed, updateData1.dateCompleted);

    dispatch({
      type: "TOGGLE_POST",
      _id,
      dateCompleted: updateData1.dateCompleted,
    });
    // dispatch({ type: "TOGGLE_POST", _id, dateCompleted });
  }

  function handleDelete() {
    deletePost(_id);
    // dispatch({ type: "DELETE_POST", id });
  }
  useEffect(() => {
    if (deletedPost.isLoading === false && deletedPost.data) {
      dispatch({ type: "DELETE_POST", _id });
    }
  }, [deletedPost]);

  // useEffect(() => {
  //   if (updatedPost.isLoading === false && updatedPost.data) {
  //     dispatch({ type: "TOGGLE_POST", _id, dateCompleted: "done" });
  //   }
  // }, [updatedPost]);

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
        <b>{user.userName}</b>
        <br />
        <button type="button" name="deleteButton" onClick={handleDelete}>
          Delete Task
        </button>
      </i>
    </div>
  );
}
