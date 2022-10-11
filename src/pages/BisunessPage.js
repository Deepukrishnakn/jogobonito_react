import React from 'react'
import BusinessRegistretion from '../components/BusinessRegistretion'
import { Col,Row } from 'react-bootstrap';

function BisunessPage() {
  return (
    <div>
        <Row>
    <Col lg={4}>

    </Col>
    <Col className='loginbody mt-5 signupbg' lg={4}>
    <h1 className='login_h1 mt-5'>Vendor Sign Up Here</h1>
    <BusinessRegistretion/>
    </Col>
    <Col lg={4}>

    </Col>
</Row>

  
    </div>
  )
}

export default BisunessPage