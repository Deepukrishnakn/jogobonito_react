import React from 'react'
import Category from '../components/Category'
import Header from '../components/Header'
import Navebar from '../components/Navebar'
import Thome from '../components/Thome'
import '../components/home.css'
import Newturf from '../components/Newturf'
import { Col,Row } from 'react-bootstrap';
import Footer from '../components/Footer'
import jogobaneer1 from "../img/banner4.jpg";
import jogobaneer2 from "../img/5001.webp";
import { useNavigate,Link } from 'react-router-dom';

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
    <h1 className='title mb-5 mt-5'>Find Your Turf</h1>
    <Newturf/>
    </Col>
  </Row>
 
</div>

<div className='container'>
<div class="row mt-5">
<h1 className='title mb-5'>FiFA World Cup 2022</h1>
</div>
<div class="row">
  {/* <div class="col-sm-6 mt-5 mb-5"><img alt='' className='banner' src={jogobaneer2} /></div> */}
  <div class="col-sm-6"><h1 className='motto mt-5'>Brazil – Home kit
Yellow shirts, blue shorts and white socks – you know what you are getting with Brazil. Twists can be put on an old classic, though, and the Selecao have worked a subtle debossed jaguar pattern into their latest design. There is also beautiful button detailing on the collar that resembles the nation’s flag.</h1>
<button className='buttons1 m-4' style={{color:'white'}}><Link to='/turf'>Play Soccer</Link></button>
</div>
</div>
</div>


<div className='container'>
<div class="row mt-5">
<h1 className='title mb-5'>FIFA World Cup 2022 Qatar</h1>
</div>
<div class="row">
  <div class="col-sm-6"><h1 className=' mt-5 motto1'>Football corruption and the remarkable road to Qatar’s World Cup</h1>
  <button className='buttons1 m-4' style={{color:'white'}}><Link to='/turf'>Play Soccer</Link></button></div>
<div class="col-sm-6 mt-5 mb-5"><img alt='' className='banner' src={jogobaneer1} /></div>
</div>
</div>

<div className='FooterContainer'>
  <Footer/>
</div>


    </div>
  )
}

export default ThomePage