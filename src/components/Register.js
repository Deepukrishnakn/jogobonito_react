import React,{useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/authContext';
import axios from "../constants/constants"
import {useNavigate,Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Register() {
  const {setPhone_number,phone_number} =useContext(AuthContext)
  const navigate = useNavigate()
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  // const [phone_number, setPhone_number] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [detail,setDetail]= useState('')
  const [err,setErr]= useState('')
  const notify = () => toast.success("Successfuly registerd!");
  const [first_nameErr, setFirst_nameErr] = useState({})
  const [last_nameErr, setLast_nameErr] = useState({})
  const [emailErr, setEmailErr] = useState({})
  const [phone_numberErr, setPhone_numberErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})
  const [confirm_passwordErr, setConfirm_passwordErr] = useState({})

  // api call for user registaretion

  const registerHandler = async(e)=>{
    e.preventDefault()
    const isValid = formValidation()
    if (isValid){
    await axios.post('account/registeruser/',{
      first_name:first_name,
      last_name:last_name,
      email:email,
      phone_number:phone_number,
      password:password,
      confirm_password:confirm_password

    }).then((response)=>{
      console.log(response.data)
      if (response.data.phone_number){
        notify()
        navigate('/verify')
      }else{
       console.log("ok")
      }
    }).catch((err)=>{
      console.log(err.response.data.detail)
      setDetail(null)
      setErr(err.response.data.detail)
    })
  }}


    // formValidation.......

    const formValidation=()=>{ 
    
      const first_nameErr={}
      const last_nameErr ={}
      const emailErr={}
      const phone_numberErr={}
      const passwordErr={}
      const confirm_passwordErr={}
      let isValid = true

      if (!first_name){
        toast.error ('*first name is a required field')
        isValid = false
      }else if(first_name.trim().length <3){
        toast.error('*first name is too short')
        isValid = false
      }

      if (!last_name){
        toast.error('*last name is a required field')
      isValid = false
    }else if(last_name.trim().length <1){
      toast.error ('*last name is too short')
      isValid = false
    }

    if (!email){
      toast.error ('*email is a required field')
      isValid = false
    }

    if (!phone_number){
      toast.error( '*mobile no. is a required field')
      isValid = false
    }else if(phone_number.trim().length != 10){
      toast.error('*enter a valid mobile no!.')
      isValid = false
    }else if( /^[a-zA-Z()]+$/.test(phone_number)){
      toast.error('*enter a valid mobile no!.')
      isValid = false
    }

    if(!password ){
      toast.error( '*password is a required field!')
      isValid = false
    }else if(password.length <8  ) {
      toast.error( '*minimum 8 characters are required for password')
      isValid = false
    }
     if(!confirm_password){
      toast.error('* confirm password required field!')
      isValid = false
    }
     else if(password!=confirm_password){
      toast.error('*passwords does not match')
      isValid = false
    }

    setFirst_nameErr(first_nameErr)
    setLast_nameErr(last_nameErr)
    setEmailErr(emailErr)
    setPhone_numberErr(phone_numberErr)
    setPasswordErr(passwordErr)
    setConfirm_passwordErr(confirm_passwordErr)

    return isValid
  }



  return (
    <div>
  <ToastContainer />
<Form className=' m-5' onSubmit={registerHandler}>
{  err?( <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{err} — check it out!</Alert>
        </Stack>):''}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter First Name</Form.Label>
        <Form.Control name='first_name' type="text" placeholder="Enter First Name" onChange={(e)=>setFirst_name(e.target.value)} value={first_name} />
        {Object.keys(first_nameErr).map((key)=>{
                return <div style={{color:'red'}} >{first_nameErr[key]}</div>
              })}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Last Name</Form.Label>
        <Form.Control name='last_namme' type="text" placeholder="Enter Last Name" onChange={(e)=>setLast_name(e.target.value)} value={last_name} />
        {Object.keys(last_nameErr).map((key)=>{
                return <div style={{color:'red'}} >{last_nameErr[key]}</div>
              })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        {Object.keys(emailErr).map((key)=>{
                return <div style={{color:'red'}} >{emailErr[key]}</div>
              })}
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control name='mobile' type="text" placeholder="Enter Phone Number" onChange={(e)=>setPhone_number(e.target.value)} value={phone_number} />
        {Object.keys(phone_numberErr).map((key)=>{
                return <div style={{color:'red'}} >{phone_numberErr[key]}</div>
              })}
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        {Object.keys(passwordErr).map((key)=>{
                return <div style={{color:'red'}} >{passwordErr[key]}</div>
              })}
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control name='confirm_password' type="password" placeholder="Enter Confirm Password" onChange={(e)=>setConfirm_password(e.target.value)} value={confirm_password} />
        {Object.keys(confirm_passwordErr).map((key)=>{
                return <div style={{color:'red'}} >{confirm_passwordErr[key]}</div>
              })}
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link className='ms-5 mb-3 mt-3' to='/Login'> SignIn</Link>
    </Form>


    </div>
  )
}

export default Register