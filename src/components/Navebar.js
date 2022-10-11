import React,{useContext} from 'react'
import './navebar.css'
import logo from "../img/logo.png";
import { useNavigate,Link } from 'react-router-dom';
import AuthProvider from '../context/authContext';
import AuthContext from '../context/authContext';

function Navebar() {
  let {userLogout} = useContext(AuthProvider)
  let {authTokens} = useContext(AuthContext)
  return (
    <div className='navebar'>
<dive className='navContainer'>
    <span className='logo'><img alt='' className='logo' src={logo} /></span>
    <dive className="naveItem">
        {authTokens ? <button className='naveButton' onClick={userLogout}>Logout</button>:
        <Link to='/Login'><button className='naveButton'>Login</button></Link>}
      
    </dive>
</dive>

    </div>
  )
}

export default Navebar