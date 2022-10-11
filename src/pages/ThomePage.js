import React from 'react'
import Category from '../components/Category'
import Header from '../components/Header'
import Navebar from '../components/Navebar'
import Thome from '../components/Thome'
import '../components/home.css'
import Newturf from '../components/Newturf'
import { Col,Row } from 'react-bootstrap';
import Footer from '../components/Footer'

function ThomePage() {
  return (
    <div>
<Navebar/>  
<Thome/>
<Header/>

<div className='homeContainer'>
<Row>
    <Col lg={12}>
    <Category/>
    </Col>
  </Row>
 
</div>


<div className='newturfontainer'>
  <Row>
    <Col lg={12}>
    <h1 className='title mb-5'>Find Your Turf</h1>
    <Newturf/>
    </Col>
  </Row>
 
</div>
<div className='FooterContainer'>
  <Footer/>
</div>


    </div>
  )
}

export default ThomePage