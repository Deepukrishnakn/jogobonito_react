import React,{useState,useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../img/logo.png";
import { useNavigate,Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthProvider from '../../context/authContext';
import AuthContext from '../../context/authContext';

 
function Mnavebars() {

    let {adminLogout} = useContext(AuthProvider)
  let {adminauthTokens} = useContext(AuthContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

  return (
    <div>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href=""> <span className='logo me-5' onClick={()=>navigate('/mhome')}><img alt='' className='logo me-5' src={logo} /></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#allvendormanage"  onClick={()=>navigate('/allvendormanage')}>Vendors</Nav.Link>
            <Nav.Link href="#allusers" onClick={()=>navigate('/allusers')}>Users</Nav.Link>
            <NavDropdown title="MY Account" id="collasible-nav-dropdown">
            {adminauthTokens ?   <NavDropdown.Item href="" lassName='me-5 vnave' onClick={adminLogout}>
                Log out
              </NavDropdown.Item>:<NavDropdown.Item href="" className='vnave'> <Link to='/Login'>Login</Link></NavDropdown.Item>
             }
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"><Button variant="light" onClick={handleShow}>
       Payment Details
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> <span className='logo me-5' onClick={()=>navigate('/mhome')}><img alt='' className='logo me-5' src={logo} /></span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <Button  variant=''  className='me-5 ' href="" onClick={()=>navigate('/vendororder/')}>Vendor Paid Details</Button><br/><br/>
        <Button  variant=''  className='me-5 ' href="" onClick={()=>navigate('/userorders/')}>Users Booked Details</Button><br/><br/>
        </Offcanvas.Body>
      </Offcanvas></Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default Mnavebars