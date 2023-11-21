import { useContext, useState, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Register() {
  const { dispatch } = useContext(StateContext);

  const [status, setStatus] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [user, register] = useResource((username, password) => ({
    url: "auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  // useEffect(() => {
  //   if (user && user.data) {
  //     dispatch({ type: "REGISTER", username: user.data.user.email });
  //   }
  // }, [user, dispatch]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  function handleRepeatedPassword(evt) {
    setRepeatPass(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(userName, password);
        // dispatch({ type: "REGISTER", userName });
      }}
    >
      <label htmlFor="register-username" style={{ marginRight: "74px" }}>
        Username:
      </label>
      <input
        type="text"
        name="register-username"
        id="register-username"
        value={userName}
        onChange={handleUserName}
        style={{ marginRight: "30px", marginBottom: "10px" }}
      />
      <br />
      <label htmlFor="register-password" style={{ marginRight: "77px" }}>
        Password:
      </label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={handlePassword}
        style={{ marginRight: "30px", marginBottom: "10px" }}
      />
      <br />
      <label htmlFor="register-password-repeat" style={{ marginRight: "30px" }}>
        Repeat password:
      </label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={repeatPass}
        onChange={handleRepeatedPassword}
      />
      <br />
      <input
        type="submit"
        value="Register"
        disabled={
          userName.length === 0 || password.length !== repeatPass.length
        }
      />
      <p>{status}</p>
    </form>
  );
}
