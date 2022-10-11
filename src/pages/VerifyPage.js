import React from 'react'
import { Col,Row } from 'react-bootstrap';
import Verify from '../components/Verify';

function VerifyPage() {
  return (
    <div>
<Row>
    <Col lg={4}></Col>
    <Col className='loginbody mt-5 otpbg' lg={4}>
    <h2 className='login_h1 mt-5'>Verify</h2>
    <Verify/>
    </Col>
    <Col lg={4}></Col>
</Row>

    </div>
  )
}

export default VerifyPage