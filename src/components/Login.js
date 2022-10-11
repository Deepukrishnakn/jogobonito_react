import React,{useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import AuthContext from '../context/authContext';
import { useNavigate,Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const {userLogin,message,setMessage,error }=useContext(AuthContext)

   
  const [emailErr, setEmailErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})


// api call for user login
  const loginHandler=(e)=>{
    e.preventDefault()
    const isValid = formValidation()
    if(isValid){
    // console.log(email)
    // console.log(password)
    userLogin(email,password)
  }}

  // login form  validation------------
  
  const formValidation=()=>{ 
    
    const emailErr={}
    const passwordErr={}
    let isValid = true

  if (!email){
    toast.error ('*email is a required field')
    isValid = false
  }

  if(!password ){
    toast.error ('*password is a required field!')
    isValid = false
  }
  
  setEmailErr(emailErr)
  setPasswordErr(passwordErr)
console.log(error)
  return isValid
}


  return (
    <div className='m-5'>
<ToastContainer />

<div>
<Form className='login_form' onSubmit={loginHandler}>
      <Form.Group className=" ms-5 me-5" controlId="formBasicEmail">
      {  error?( <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error} — check it out!</Alert>
        </Stack>):''}
        <Form.Label>Email address</Form.Label>
        <Form.Control className='' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        {Object.keys(emailErr).map((key)=>{
                return <div style={{color:'red'}} >{emailErr[key]}</div>
              })}
      </Form.Group>

      <Form.Group className="mb-3 ms-5 me-5 " controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        {Object.keys(passwordErr).map((key)=>{
                return <div style={{color:'red'}} >{passwordErr[key]}</div>
              })}
      </Form.Group>
     
      {/* <Form.Group className="ms-5 mb-3 login_form" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button className='ms-5 me-5' variant="primary" type="submit">
        Submit
      </Button>
      <Link className='ms-5 mb-3 mt-3' to='/Register'> SignUp</Link>
      <Link className='ms-5 mb-3' to='/VendorLogin'> Vendor Login</Link>
      <Link className='mb-3 ms-5 me-5' to='/ForgotPassword'> ForgotPassword</Link> 
    </Form>
    </div>
    </div>
  )
}

export default Login