import React, { useState,useEffect } from 'react'
import './Newturf.css'
import { Col,Row } from 'react-bootstrap';
import axios from "../constants/constants"
import { navigate, useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';


function Newturf() {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])
  
  useEffect(()=>{
  
      setLoading(true);
    axios.get('vendor/turfviewset').then(res=>{
      console.log('turf',res.data)
      setData(res.data)
    }).catch(e=>console.log(e))
    .finally(()=>setLoading(false))
  },[]);

  return (
    
    <div className=' m-5 homeContainer'>

        <Row>
        {loading && <h4>loading...</h4>}
       
        {data.slice(0,8).map((obj)=>
        <Col lg={3}>
         <MDBCard>
      <MDBCardImage src={obj.image} alt={obj.image} position='top' />
      <MDBCardBody>
        <MDBCardTitle>{obj.turf_name}</MDBCardTitle>
        <MDBCardText style={{backgroundColor:''}}>
    <h5>Size:{obj.size}</h5>
    <h4 className='newturfTitle'>Rent/h: ₹  {obj.price}</h4>
        </MDBCardText>
        <MDBBtn href='#' className='buttons' onClick={()=>navigate(`/singleturf/${obj.category.slug}/${obj.slug}/`)}>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>

        </Col>
)}
        

      
       
        </Row>
    </div>
  )
}

export default Newturf


{/* <div className='newturfItem'>
<img src={obj.image} alt={obj.image}/>
<div className='newturfTitle'>
    <h1>{obj.turf_name}</h1>
    <h1>Size:{obj.size}</h1>
    <h2 className='newturfTitle'>Rent/h:{obj.price}</h2>
    <button className='buttons' onClick={()=>navigate(`/singleturf/${obj.category.slug}/${obj.slug}/`)}>See Availability</button>
</div>
</div> */}