import React from 'react'
import { useNavigate,Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
        <div className='fLists'>
            <ul className='fList'>
            <li style={{textDecoration:'none',color:'white'}} className='fListItem'><Link  style={{textDecoration:'none',color:'white'}} className='fListItem' to='/'>Home</Link></li>
                <li  className='fListItem'><Link  style={{textDecoration:'none',color:'white'}} className='fListItem' to='/turf'>Turf</Link></li>
                <li className='fListItem'><Link style={{textDecoration:'none',color:'white'}} className='fListItem' to='/Bisuness'>Bisuness</Link></li>
                <li className='fListItem'><a style={{textDecoration:'none',color:'white'}} href='https://www.bootit.tk/'>Shop Now</a></li>
                <li className='fListItem'><Link  style={{textDecoration:'none',color:'white'}} className='fListItem' to='/Register'>Sign Up</Link></li>
            </ul>
        </div>
        <div className='mb-5'>Copyright © 2022 JoGoboNiTo/Developed by <a style={{textDecoration:'none',color:'white'}} href='https://github.com/Deepukrishnakn/'>Deepukrishna kn</a></div>
    </div>
  )
}

export default Footer