export default function Logout({ user, dispatchUser }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" });
      }}
    >
      Logged in as: &nbsp; <b>{user}</b>
      <br />
      <input type="submit" value="Logout" style={{ marginTop: "10px" }} />
    </form>
  );
}
