import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, dispatchUser }) {
  if (user) {
    return (
      <div>
        <h2>Logout Form: </h2>
        <div style={{ padding: "10px" }}>
          <Logout user={user} dispatchUser={dispatchUser} />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "10px" }}>
        <h2>Login/Registartion Form: </h2>
        <div style={{ display: "flex", padding: "10px" }}>
          <div>
            <Login dispatchUser={dispatchUser} />
          </div>
          <br />
          <div style={{ marginLeft: "30px" }}>
            <Register dispatchUser={dispatchUser} />
          </div>
        </div>
      </div>
    );
  }
}
