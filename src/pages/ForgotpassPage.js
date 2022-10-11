import React from 'react'
import { Col,Row } from 'react-bootstrap';
import ForgotPassword from '../components/ForgotPassword';

function ForgotpassPage() {
  return (

        <div>
<Row>
   <Col lg={4}>

   </Col>
   
    <Col className='loginbody mt-5 loginbg' lg={4} >
    <h1 className='login_h1 mt-3'>Send Email Here</h1>
    <ForgotPassword />
    </Col>
    <Col lg={4}>
        
    </Col>
</Row>

    </div>
  )
}

export default ForgotpassPage