import React,{useContext,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from 'react-router-dom';
import axios from "../constants/constants"
import AuthContext from '../context/authContext';



function Header() {
  let {authTokens,user} = useContext(AuthContext)

  const [key, setKey] = useState("");
  const navigate = useNavigate()


  const HandleSearch=(e)=>{
    setKey(key)
    if (key!=''){
      console.log(key,'rrrrrrrrrrrrrrrrrrrrrrrrr')
      // window.location.href='/Search/'+key
      navigate(`/Search/${key}`)
    }
  }

  // useEffect (()=>{

  // },[key])

  return (
    <div className='header'>
          <div className='headerContainer'>
            <div className='headerList'>

               <div className='headerlistItem active'>
               <FontAwesomeIcon icon={faFutbol} />
               <Link style={{textDecoration:'none',color:'white'}} to='/Business'><span className='turfbtn'>Business</span></Link>
               </div>
          
               <div className='headerlistItem active'>
               <FontAwesomeIcon icon={faFutbol} />
               <Link style={{textDecoration:'none',color:'white'}} to='/'><span className='turfbtn'>Home</span></Link>
               </div>
          
               <div className='headerlistItem active'>
               <FontAwesomeIcon icon={faFutbol} />
               <Link style={{textDecoration:'none',color:'white'}} to='/turf'><span className='turfbtn'>Turf</span></Link>
               </div> 

               <div className='headerlistItem active'>
               <FontAwesomeIcon icon={faFutbol} />
               <a style={{textDecoration:'none',color:'white'}} href='https://www.bootit.tk/'>Shop Now</a>
               </div>
          </div>

          <h1 className='headerTitle'> I learned all about life with a ball at my feet</h1>
          <p className='hederDesc'>
          I once cried because I had no shoes to play soccer, but one day, I met a man who had no feet.
          </p>
         
          {authTokens ?  <Link to='/userprofile'><button className='headerBtn ms-3'>My Account</button></Link>:
           <Link to='/Register'><button className='headerBtn'>Sign In / Sign Up</button></Link>}
          <Form className="d-flex mt-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label='Search'
              onChange={(e)=>setKey(e.target.value)} value={key}
            />
            <Button type='submit' className='me-5' variant="outline-warning" onClick={HandleSearch}>Search</Button>
          </Form>
          </div>
          </div>

        

    
  )
}

export default Header
