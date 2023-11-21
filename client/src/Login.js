import { useState, useContext, useEffect } from "react";

import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Login() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(StateContext);
  const [userName, setUserName] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));

  // function effct() {
  //   login(userName, password);
  //   dispatch({ type: "LOGIN", username: user.data. });
  // }

  // function effct() {
  //   if (user) {
  //     if (user?.data?.user) {
  //       dispatch({ type: "LOGIN", userName });
  //       setLoginFailed(false);
  //     } else {
  //       setLoginFailed(true);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (user) {
  //     if (user?.data?.user) {
  //       dispatch({ type: "LOGIN", userName: user.data.user.email });
  //     } else {
  //     }
  //   }
  // }, [user, dispatch]);

  // useEffect(() => {
  //   if (user?.error) {
  //     setLoginFailed(true);
  //   } else {
  //     setLoginFailed(false);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatch({
          type: "LOGIN",
          userName: user.data.username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // effct();
        login(userName, password);

        // dispatch({ type: "LOGIN", userName });
      }}
      style={{ marginRight: "30px" }}
    >
      {loginFailed && (
        <span style={{ color: "red" }}> INVALID USERNAME OR PASSWORD</span>
      )}
      <br />
      <label htmlFor="login-username">Username: </label>
      <input
        type="text"
        name="login-username"
        id="login-username"
        value={userName}
        onChange={handleUserName}
        style={{ marginRight: "30px", marginBottom: "10px" }}
      />
      <br />
      <label htmlFor="login-password"> Password: </label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="login-password"
        id="login-password"
      />
      <br />
      <input
        type="submit"
        value="Login"
        disabled={userName.length === 0}
        style={{ marginBottom: "20px" }}
      />
    </form>
  );
}
