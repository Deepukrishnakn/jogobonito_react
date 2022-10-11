import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import React,{useState,useContext} from 'react'
import AuthContext from '../context/authContext';
import axios from "../constants/constants"
import { useNavigate,Link} from 'react-router-dom'

function ForgotPassword() {
    const [email,setEmail]= useState('')
    const {authTokens} = useContext(AuthContext)
    const [detail,setDetail]= useState('')
    const [err,setErr]= useState('')
    const navigate = useNavigate()

    const [emailErr, setEmailErr] = useState({})

    const ForgotpasswordHandler=(e)=>{
        e.preventDefault()
        const isValid=formValidation()
        if(isValid){
        axios.post('account/forgotpassword/',{
            email:email
          },{ headers:{Authorization: `Bearer ${authTokens?.token}`}}
          ).then((response)=>{
            console.log(response.data.detail)
            setErr(null)
            setDetail(response.data.detail)
          }).catch((err)=>{
            console.log(err.response.data.detail)
            setDetail(null)
            setErr(err.response.data.detail)
          })
      }}

  // login form  validation------------
  
  const formValidation=()=>{ 
    
    const emailErr={}
    let isValid = true

  if (!email){
    emailErr.short_email= '*email is a required field'
    isValid = false
  }

  setEmailErr(emailErr)
  return isValid
}
  return (
    <div>

<Form className='login_form' onSubmit={ForgotpasswordHandler}>
      <Form.Group className=" ms-5 me-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className='' type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        {  err &&(<> <h6 style={{color:'red'}}>{err}</h6>  <br/></>) }
        {Object.keys(emailErr).map((key)=>{
                return <div style={{color:'red'}} >{emailErr[key]}</div>
              })}
      </Form.Group>

      <Button className='ms-5 me-5 mt-3' variant="primary" type="submit">
        Submit
      </Button>
      <Link className='ms-5 mt-3 mb-5' to='/Login'> SignIn</Link>
      
    </Form>
    
    {  detail &&(<> <h6 style={{color:'green'}}>Password reset link has been sent to your email</h6>  <br/>
            <Button onClick={()=>navigate('/Login')} 
            style={{border:'solid green',color:'green'}} 
            variant="" className='sub-button' type="" > 
            Login
            </Button></>) }
    </div>
  )
}

export default ForgotPassword