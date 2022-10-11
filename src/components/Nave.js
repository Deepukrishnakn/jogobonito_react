import React,{useContext} from 'react'
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthProvider from '../context/authContext';
import "./Login.css";
import { useNavigate,Link } from 'react-router-dom';
import jogobonitologo from "../img/jogobonitologo.jpg";
import authContext from '../context/authContext'

function Nave() {
  let {userLogout} = useContext(AuthProvider)
  const {AuthTokens,user} =useContext(authContext)
  console.log(user,'rertetgegegherghehg')
  return (
    <div>
<Navbar bg="black" expand="lg">
      <Container fluid>
        
        <Navbar.Toggle style={{'backgroundColor':'white'}} aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
          <Link to='/home' className='m-2 nave' style={{'textDecoration': 'None', 'color':'white',}}><img alt='' className='logo' src={jogobonitologo} /></Link> 
           <Link to='/home' className='m-2 nave' style={{'textDecoration': 'None', 'color':'white',}}> <h6 className='ms-5'>Home</h6> </Link> 
           <Link to='/home' className='m-2 nave' style={{'textDecoration': 'None', 'color':'white',}}> <h6 className='ms-5 nave'>Business</h6> </Link> 
           {user?   <h6 className='ms-5 nave m-2'  onClick={userLogout}>Logout</h6>:
          <Link to='/Register' className='m-2 nave' style={{'textDecoration': 'None', 'color':'white',}}><h6 className='ms-5'>SignUp</h6> </Link> }
           
            {/* <NavDropdown style={{'textDecoration': 'None', 'backgroundColor':"white",}} title="Link" id="">
              <NavDropdown.Item href="#action3"><Link to='/Register' className='nave' style={{'textDecoration': 'None', 'color':'black',}}> <h6 className='ms-5'>SignUp</h6> </Link>  </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
              <h6 className='ms-5 logoutfont'  onClick={userLogout}>Logout</h6> 
              </NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}

{/* 
              <Dropdown as={ButtonGroup}>
      <h5 variant="success">Split Button</h5>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
      <NavDropdown.Item href="#action3"><Link to='/Register' className='nave' style={{'textDecoration': 'None', 'color':'black',}}> <h6 className='ms-5'>SignUp</h6> </Link>  </NavDropdown.Item>
              <h6 className='ms-5 logoutfont'  onClick={userLogout}>Logout</h6> 
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> 
            
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className='me-5' variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
        
    </div>
  )
}

export default Nave