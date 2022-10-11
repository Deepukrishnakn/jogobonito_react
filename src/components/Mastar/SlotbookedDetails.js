import React, { useEffect, useState, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';
import axios from "../../constants/constants"
import authContext from '../../context/authContext'
import { useNavigate,Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from '../../components/Pagination';
import Mnavebars from './Mnavebars';

function SlotbookedDetails() {

    const {adminauthTokens} =useContext(authContext)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  
    const [loading,setLoading] = useState(false);
    const [order,setOrder] = useState([])
    const [singleOrder,setSingleOrder] = useState('')
    const getBookedSlot = () =>{
        setLoading(true);
        axios.get('mastar/userorders',
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setOrder(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const GetSingleOrder = (id,e) =>{
        setLoading(true);
        axios.get(`mastar/userorders/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setSingleOrder(res.data)
          console.log(res.data)
          handleShow()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

   useEffect(() => {
    getBookedSlot()
    GetSingleOrder()
   }, [])
   
   // get current post

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
const currentPost = order.slice(indexOfFirstPost, indexOfLastPost);
// change page 
const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        
       <Mnavebars/>
      
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>Booked Turfs & Slots Details</h1>
{currentPost ? (
      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>User Name</th>
          <th>Turf Name</th>
          <th>Vendor Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Paid Amount</th>
          {/* <th>Size</th>
          <th>City</th> */}
          <th>Order ID</th>
        </tr>
      </thead>
      {currentPost.map((obj,index)=>
      <tbody>
        <tr>
          <td>{index+1}</td>
          <td>{obj.slot.user.first_name}</td>
          <td>{obj.slot.turf.turf_name}</td>
          <td>{obj.slot.vendor.first_name}</td>
          <td>{obj.slot.Date}</td>
          <td>{obj.slot.Time}</td>
          <td>{obj.slot.turf.price}</td>
          {/* <td>{obj.turf.size}</td>
          <td>{obj.turf.city.city}</td> */}
        {/* <td><Button variant="success" className="bookbtn" onClick={}>EDIT</Button></td>  */}
          <td><Button variant="" className=""  onClick={(e) => GetSingleOrder(obj.id,e)}>Details</Button></td>
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
 <h3>User Name: {singleOrder.slot.user.first_name +"  "+ singleOrder.slot.user.last_name}</h3><br/>
 <h6>Email: {singleOrder.slot.user.email}</h6><br/>
 <h6>phone number: {singleOrder.slot.user.phone_number}</h6><br/>
 <h6>Booked date: {singleOrder.order_date}</h6><br/>
 <h6>Order ID: {singleOrder.order_payment_id}</h6><br/>
 <h6>Booked Slot: {singleOrder.order_product}</h6><br/>
 <h6>Booked Price: {singleOrder.order_amount}</h6><br/>
</div>
</Modal.Body>
</Modal>
: ''}
</Row>
<Pagination postsPerPage={postsPerPage} 
totalPosts={order.length}
paginate={paginate}
/>
        
    </div>
  )
}

export default SlotbookedDetails
