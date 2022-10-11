import React from 'react'
import Login from '../components/Login'
import { Col,Row } from 'react-bootstrap';

function LoginPage() {
  return (
    <div className=''>
<Row>
   <Col lg={4}>

   </Col>
   
    <Col className='loginbody mt-5 loginbg' lg={4} >
    <h1 className='login_h1 mt-5'>Sign In Here</h1>
    <Login />
    </Col>
    <Col lg={4}>
        
    </Col>
</Row>
    
    </div>
  )
}

export default LoginPage