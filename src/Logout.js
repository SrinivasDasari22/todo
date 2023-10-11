export default function Logout({user, setUser}) {
    return (
        <form onSubmit={e => {e.preventDefault();setUser("")}}>
            Logged in as: &nbsp;  <b>{user}</b><br/>
            <input type="submit" value="Logout" style={{marginTop:'10px'}}/>
        </form>
    )
}