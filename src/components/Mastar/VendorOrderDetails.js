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

function VendorOrderDetails() {

    const {adminauthTokens} =useContext(authContext)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  
    const [loading,setLoading] = useState(false);
    const [order,setOrder] = useState([])
    const [singleOrder,setSingleOrder] = useState('')
    const getOrder = () =>{
        setLoading(true);
        axios.get('mastar/vendororders',
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setOrder(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const GetSingleOrder = (id,e) =>{
        setLoading(true);
        axios.get(`mastar/vendororders/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setSingleOrder(res.data)
          console.log(res.data)
          handleShow()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

      // const DeleteVendor = (id,e) =>{
      //   axios.delete(`mastar/vendororders/${id}`,
      //   {headers:{Authorization:`Bearer ${authTokens}`}}).then(res=>{
      //     handleClose1()
      //     getOrder()
      //   }).catch(e=>console.log(e))
      //   .finally(()=>setLoading(false))
      // }

   useEffect(() => {
    getOrder()
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
<h1 className='title mt-5'>Vendor Payment Details</h1>
{order ? (
      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>User Name</th>
          <th>phone number</th>
          <th>Email</th>
          {/* <th>Date</th>
          <th>Time</th>
          <th>Paid Amount</th> */}
          {/* <th>Size</th>
          <th>City</th> */}
          <th>Order Details</th>
        </tr>
      </thead>
      {currentPost.map((obj,index)=>
      <tbody>
        <tr>
          <td>{index+1}</td>
          <td>{obj.vendor.first_name+' '+obj.vendor.last_name}</td>
           <td>{obj.vendor.phone_number}</td>
          <td>{obj.vendor.email}</td>
          {/* <td>{obj.slot.Time}</td>
          <td>{obj.slot.turf.price}</td> */}
          {/* <td>{obj.turf.size}</td>
          <td>{obj.turf.city.city}</td> */}
        {/* <td><Button variant="success" className="bookbtn" onClick={}>EDIT</Button></td>  */}
          <td><Button variant="" className=""  onClick={(e) => GetSingleOrder(obj.id,e)}>Details</Button></td>

          {/* <td><Button variant="danger" onClick={handleShow1}>
          DELETE
      </Button>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <h5 style={{color:'red'}}>Are You sure you want to delete? {obj.vendor.first_name+' '+obj.vendor.last_name}</h5> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" className="bookbtn"  onClick={(e) => DeleteVendor(obj.id,e)}>DELETE</Button>
        </Modal.Footer>
      </Modal>
</td>  */}
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
 {/* <h3>User Name: {singleOrder.vendor.first_name +"  "+ singleOrder.slot.user.last_name}</h3><br/> */}
 <h6>Email: {singleOrder.vendor.email}</h6><br/>
 <h6>Order Date: {singleOrder.order_date}</h6><br/>
 <h6>Booked date: {singleOrder.order_date}</h6><br/>
 <h6>Paid Amount: {singleOrder.order_amount}</h6><br/>
 <h6>Payment Id: {singleOrder.order_payment_id}</h6><br/>

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

export default VendorOrderDetails
