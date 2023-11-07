import { useContext } from "react";
import { StateContext } from "./contexts";
export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      Logged in as: &nbsp; <b>{user}</b>
      <br />
      <input type="submit" value="Logout" style={{ marginTop: "10px" }} />
    </form>
  );
}
