import React,{useState,useEffect,useContext} from 'react'
import axios from '../constants/constants'
import authContext from '../context/authContext'
import Header from './Header'
import Navebar from './Navebar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import './Vendor/Vhome.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate,Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap'
import Footer from './Footer'
function UserProfile() {

  const navigate = useNavigate()
  const [err,setErr]= useState('') 
  const [detail,setDetail]= useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);
const handleShow1 = () => setShow1(true);

const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);

  let {authTokens,} = useContext(authContext)
  const [user,setUser] = useState('')
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const [currentPass,setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const HandleSubmit1 = async(e) => {
    e.preventDefault()
      const PassData = new FormData();
      PassData.append('current_password',currentPass)
      PassData.append('new_password',newPass)
      PassData.append('confirm_password',confirmPass)
   
  await axios.post(`account/userchangepassword/`,PassData,    
  {headers:{Authorization:`Bearer ${authTokens}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
    console.log(response.data)
      handleClose2()
      Getuser()
  })  
  .catch((err)=>{
    console.log(err.response.data.detail)
      setDetail(null)
      setErr(err.response.data.detail)
  }) 
}



  const Getuser=()=>{
    axios.get('account/user',{headers:{Authorization:`Bearer ${authTokens}`}}).then(res=>{
      console.log(res.data)
      setFirst_name(res.data.first_name)
      setLast_name(res.data.last_name)
      setEmail(res.data.email)
      setUser(res.data)
      
     }).catch(e=>console.log(e))
  }

  const HandleSubmit = async(e) => {
    e.preventDefault()
      const UserData = new FormData();
      UserData.append('first_name',first_name)
      UserData.append('last_name',last_name)
      UserData.append('email',email)
   
  await axios.patch(`account/Alluser/${user.id}/`,UserData,    
  {headers:{Authorization:`Bearer ${authTokens}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
    console.log(response.data)
    if (response.status===200){
      handleClose()
      Getuser()
      console.log("success")
    }
  })  
  .catch((err)=>{
    console.log(err.response.data.detail,"erorr")
   console.log(UserData)
  }) 
}


  useEffect(() => {
    Getuser()

  }, [])
  

  return (
    <div>
  <Navebar/>
  <Header/>
<Row>
<h1 className='title m-5'>Profile of {user.username}</h1>
  <Col lg={12}>
    

<div className='ProContainer vendor-profile mb-5'>
{/* {  err?( <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{err} — check it out!</Alert>
        </Stack>):''} */}
        <div className='row'>
            <div className='col-md-4 ms-5 '>
                <img className='proimg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzOqVVbDGiWYvTQbqwGjL4SKT1Sjf6MM2MALjh0txKHPYS8OWaKwGdUXbm978B8G5HAsg&usqp=CAU' alt='' srcSet=''/>
                <h2 className='ms-2 mt-3'>{user.username}</h2>
            </div>

            <div className='col-md-6'>
            <Nav className="justify-content-center mt-5" activeKey="/home">
        <Nav.Item>
        <Button variant="primary" onClick={handleShow} className='me-5'>
        Update<br/>Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form  onSubmit={HandleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter first name</Form.Label>
        <Form.Control type="text" placeholder="Enter First name" onChange={(e)=>setFirst_name(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setLast_name(e.target.value)} value={last_name}>
        <Form.Label>Enter last name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setEmail(e.target.value)} value={email}>
        <Form.Label>Enter Phone number</Form.Label>
        <Form.Control type="text" placeholder="Enter Phome number" />
      </Form.Group> 
      <Button variant="primary" type="submit">
        Submit
      </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



        </Nav.Item>
        <Nav.Item>
                 <Button variant="danger" onClick={handleShow2} className='me-5'>
                 Change<br/>password
      </Button>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Change Your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {  err?( <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{err} — check it out!</Alert>
        </Stack>):''}
          <Form  onSubmit={HandleSubmit1}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Current Password name</Form.Label>
        <Form.Control type="password" placeholder="Enter Current Password name" onChange={(e)=>setCurrentPass(e.target.value)} value={currentPass}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setNewPass(e.target.value)} value={newPass}>
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setConfirmPass(e.target.value)} value={confirmPass}>
        <Form.Label>Enter Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Confirm Password" />
      </Form.Group> 
      <Button variant="primary" type="submit">
        Submit
      </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



        </Nav.Item>
        <Nav.Item>
        <Button variant="info" onClick={handleShow1} className='me-5'>
        Your<br/>Details
      </Button>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>YourDetails </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
           <h3>Full Name: {user.username}</h3><br/>
           <h6>First Name: {user.first_name}</h6><br/>
           <h6>Last Name: {user.last_name}</h6><br/>
           <h6>phone number: {user.phone_number}</h6><br/>
           <h6>Email: {user.email}</h6><br/>
           {/* <h6>Turf address: {user.turf_address}</h6><br/>
           <h6>District: {user.district}</h6><br/> */}
          </div>
        </Modal.Body>
      </Modal>
        </Nav.Item>
        <Nav.Item>
       
        </Nav.Item>
      </Nav>
      <td><Button variant="warning" className="mt-5 m-2" onClick={()=>navigate('/UserBookedSlot/')} >Booked Slot Details</Button></td>
      <p className="text-center mt-4 mb-4"></p>

            </div>
            </div>
            </div>
            </Col>
</Row>
{/* <div className='FooterContainer'>
  <Footer/>
</div> */}
    </div>
  )
}

export default UserProfile