import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { useState } from 'react'


export default function UserBar({user,setUser}) {
    // const [user,setUser] = useState('');
    // const user = ''
    if (user) { 
        return(
            <div>
                <h2>Logout Form: </h2>
                <div style={{ padding: '10px' }}>
                <Logout user={user} setUser={setUser} /> 
                </div>
            </div>
            )
    }
    else {
        return (
            <div  style={{ padding: '10px' }}><h2>Login/Registartion Form: </h2>
            <div style={{ display: 'flex' , padding:'10px'}}  >
                
                <div>
                <Login setUser={setUser} /></div>
                <br/>
                <div style={{ marginLeft: '30px' }}>
                <Register setUser={setUser} />
                </div>
            </div>
            </div>
        )
    }
}
