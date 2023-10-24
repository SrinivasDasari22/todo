import { useState } from "react";

export default function Register({ dispatchUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

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
        dispatchUser({ type: "REGISTER", userName });
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
    </form>
  );
}
