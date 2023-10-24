import { useState } from "react";

export default function Login({ dispatchUser }) {
  const [userName, setUserName] = useState("");

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGIN", userName });
      }}
      style={{ marginRight: "30px" }}
    >
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
      <input type="password" name="login-password" id="login-password" />
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
