import React from 'react'
import { useNavigate,Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
        <div className='fLists'>
            <ul className='fList'>
            <li className='fListItem'><Link className='fListItem' to='/'>Home</Link></li>
                <li className='fListItem'><Link className='fListItem' to='/turf'>Turf</Link></li>
                <li className='fListItem'><Link className='fListItem' to='/Bisuness'>Bisuness</Link></li>
                <li className='fListItem'><Link className='fListItem' to='/Bisuness'>Sign Up</Link></li>
            </ul>
        </div>
        <div className='mb-5'>Copyright © 2022 JoGoboNiTo</div>
    </div>
  )
}

export default Footer