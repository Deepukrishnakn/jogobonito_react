

import React from 'react'
import { Col,Row } from 'react-bootstrap';
import VendorLogin from '../components/VendorLogin';
import '../components/Login.css'

function VendorLoginPage() {
  return (
    <div>
<Row>
   <Col lg={4}>

   </Col>
   
    <Col className='loginbody mt-5 VendorLogin' lg={4} >
    <h1 className='login_h1 mt-5'>Vendor Sign In Here</h1>
    <VendorLogin />
    </Col>
    <Col lg={4}>
        
    </Col>
</Row>
    
    </div>
  )
}

export default VendorLoginPage