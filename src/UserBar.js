import { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./contexts";

export default function UserBar() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  if (user) {
    return (
      <div>
        <h2>Logout Form: </h2>
        <div style={{ padding: "10px" }}>
          <Logout />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "10px" }}>
        <h2>Login/Registartion Form: </h2>
        <div style={{ display: "flex", padding: "10px" }}>
          <div>
            <Login/>
          </div>
          <br />
          <div style={{ marginLeft: "30px" }}>
            <Register/>
          </div>
        </div>
      </div>
    );
  }
}
