import React, { useEffect, useState, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';
import axios from "../constants/constants"
import authContext from '../context/authContext'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header'
import Navebar from '../components/Navebar'

function UserBookedSlots() {

    const {authTokens} =useContext(authContext)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
    const [loading,setLoading] = useState(false);
    const [order,setOrder] = useState([])
    const [singleOrder,setSingleOrder] = useState('')
    const getUserBookedSlot = () =>{
        setLoading(true);
        axios.get('account/GetUserOrder',
        {headers:{Authorization:`Bearer ${authTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setOrder(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const GetUserSingleOrder = (id,e) =>{
        setLoading(true);
        axios.get(`account/GetUserSingleOrder/${id}`,
        {headers:{Authorization:`Bearer ${authTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setSingleOrder(res.data)
          console.log(res.data)
          handleShow()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

   useEffect(() => {
    getUserBookedSlot()
    GetUserSingleOrder()
   }, [])
   

  return (
    <div>
        
<Navebar/>
<Header/>
      
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>Booked Turfs & Slots Details</h1>
{order ? (
      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>Manager Name</th>
          <th>Turf Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Price</th>
          {/* <th>Size</th>
          <th>City</th> */}
          <th>Order ID</th>
        </tr>
      </thead>
      {order.map((obj,index)=>
      <tbody>
        <tr>
          <td>{index+1}</td>
          <td>{obj.slot.vendor.first_name}</td>
          <td>{obj.slot.turf.turf_name}</td>
          <td>{obj.slot.Date}</td>
          <td>{obj.slot.Time}</td>
          <td>{obj.slot.turf.price}</td>
          {/* <td>{obj.turf.size}</td>
          <td>{obj.turf.city.city}</td> */}
        {/* <td><Button variant="success" className="bookbtn" onClick={}>EDIT</Button></td>  */}
          <td><Button variant="info" className=""  onClick={(e) => GetUserSingleOrder(obj.id,e)}>Details</Button></td>
        </tr>
      </tbody>
      )}
    </Table>
    </Col>
    ) : (
       ''
      )}
    {singleOrder ? 
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Order Details </Modal.Title>
</Modal.Header>
<Modal.Body>
<div>
 <h3>Manager Name: {singleOrder.slot.vendor.first_name +"  "+ singleOrder.slot.user.last_name}</h3><br/>
 <h6>Manager Email: {singleOrder.slot.vendor.email}</h6><br/>
 <h6>Manager phone number: {singleOrder.slot.vendor.phone_number}</h6><br/>
 <h6>Booked date: {singleOrder.order_date}</h6><br/>
 <h6>Order ID: {singleOrder.order_payment_id}</h6><br/>
 <h6>Booked Slot: {singleOrder.order_product}</h6><br/>
 <h6>Booked Price: {singleOrder.order_amount}</h6><br/>
</div>
</Modal.Body>
</Modal>
: ''}
</Row>

        
    </div>
  )
}

export default UserBookedSlots
