import React from 'react'
import { Col,Row } from 'react-bootstrap';
import Register from '../components/Register';

function RegisterPage() {
  return (
    <div>
<Row>
    <Col lg={4}>

    </Col>
    <Col className='loginbody mt-5 signupbg' lg={4}>
    <h1 className='login_h1 mt-5'>Sign Up Here</h1>
    <Register/>
    </Col>
    <Col lg={4}>

    </Col>
</Row>


    </div>
  )
}

export default RegisterPage