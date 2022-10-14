import React, { useEffect, useState, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';
import axios from "../../constants/constants"
import authContext from '../../context/authContext'
import { useNavigate,Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from '../../components/Pagination';

import Switch from '@mui/material/Switch';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Mnavebars from './Mnavebars';

function AllVendors() {

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    // const [is_Vendor, setIsVendor] = useState("");
    // const [is_Paid, setIsPaid] = useState("");
    const [is_active, setIsAcctivate] = useState();

    const {adminauthTokens} =useContext(authContext)
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  
    const [loading,setLoading] = useState(false);
    const [vendor,setVendor] = useState([])
    const [singleVendor,setSingleVendor] = useState('')

    const getVendor = () =>{
        setLoading(true);
        axios.get('mastar/allvendor',
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
            // setIsAcctivate(res.data.is_active)
            // setIsVendor(res.data.is_Vendor)
            // setIsPaid(res.data.is_Paid)
          setVendor(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const GetSingleVendor = (id,e) =>{
        setLoading(true);
        axios.get(`mastar/allvendor/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setSingleVendor(res.data)
          console.log(res.data)
          handleShow()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const DeleteVendor = (id,e) =>{
        axios.delete(`mastar/allvendor/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          handleClose1()
          getVendor()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

      const handleActivate=async(id,active)=>{ 
        if (active){
          await axios.patch(`mastar/allvendor/${id}/`,{
            is_active:'False'
          },{headers:{Authorization:`Bearer ${adminauthTokens}`}}).then((res)=>{
           console.log(res.data)
           getVendor()
          })
        }else{
          await axios.patch(`mastar/allvendor/${id}/`,{
            is_active:'True'
          },{headers:{Authorization:`Bearer ${adminauthTokens}`}}).then((res)=>{
           console.log(res.data)
           getVendor()
          })
        }
      
      }

    //   const handlePaid=async(id,is_Paid)=>{
    //     if (is_Paid){
    //       await axios.patch(`mastar/allvendor/${id}/`,{
    //         is_Paid:'False'
    //       },{headers:{Authorization:`Bearer ${authTokens}`}}).then((res)=>{
    //        console.log(res.data)
    //        getVendor()
    //       })
    //     }else{
    //       await axios.patch(`mastar/allvendor/${id}/`,{
    //         is_Paid:'True'
    //       },{headers:{Authorization:`Bearer ${authTokens}`}}).then((res)=>{
    //        console.log(res.data)
    //        getVendor()
    //       })
    //     }
      
    //   }

     
    //   const handleCheck=()=>{
    //     if(is_Activate==='True'){
    //       setIsAcctivate('False')
    //     }else{
    //       setIsAcctivate('True')
    //     }
    //   }
 
    //   const handleCheck1=()=>{
    //     if(is_Paid==='True'){
    //       setIsPaid('False')
    //     }else{
    //       setIsPaid('True')
    //     }
    //   }

    //   const handleCheck2=()=>{
    //     if(is_Vendor==='True'){
    //       setIsVendor('False')
    //     }else{
    //       setIsVendor('True')
    //     }
    //   }

   useEffect(() => {
    getVendor()
    GetSingleVendor()
   }, [])
   
   // get current post

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
const currentPost = vendor.slice(indexOfFirstPost, indexOfLastPost);
// change page 
const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    <Mnavebars/>    
      
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>All Vendors Details</h1>

      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          {/* <th>No.</th> */}
          <th>Vendor Name</th>
          <th>Email</th>
          <th>phone</th>
          <th>Block/Unblock</th>
          <th>Vendor Details</th>
          <th>Delete</th>
        </tr>
      </thead>
      {currentPost.map((obj,index)=>
      <tbody>
        {obj.is_Vendor?
        <tr>
          {/* <td>{index+1}</td> */}
          <td>{obj.first_name+' '+ obj.last_name}</td>
          <td>{obj.email}</td>
          <td>{obj.phone_number}</td>
          
          <td> <Switch
              checked={obj.is_active}
              onClick={()=>handleActivate(obj.id,obj.is_active)}
              inputProps={{ 'aria-label': 'controlled' }}
            /></td>

            {/* <td> <Switch
              checked={obj.is_Paid}
              onClick={()=>handlePaid(obj.id,obj.is_Paid)}
              inputProps={{ 'aria-label': 'controlled' }}
            /></td> */}

          {/* <td><h4 style={{color:'green'}}>{obj.is_Paid}</h4></td> */}
          <td><Button variant="" className=""  onClick={(e) => GetSingleVendor(obj.id,e)}>Details</Button></td>
        
          <td><Button variant="danger" onClick={handleShow1}>
          DELETE
      </Button>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <h5 style={{color:'red'}}>Are You sure you want to delete?</h5> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="danger" className="bookbtn"  onClick={(e) => DeleteVendor(obj.id,e)}>DELETE</Button>
        </Modal.Footer>
      </Modal>
</td> 
        </tr>: ' '}
      </tbody>
      )}
    </Table>
    </Col>

    {singleVendor ? 
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Order Details </Modal.Title>
</Modal.Header>
<Modal.Body>
<div>
 <h3> Name: {singleVendor.first_name +"  "+ singleVendor.last_name}</h3><br/>
 <h6>Email: {singleVendor.email}</h6><br/>
 <h6>phone number: {singleVendor.phone_number}</h6><br/>
<h6>Description : {singleVendor.description}</h6><br/>
  {/* <h6>Order ID: {singleOrder.order_payment_id}</h6><br/>
 <h6>Booked Slot: {singleOrder.order_product}</h6><br/>
 <h6>Booked Price: {singleOrder.order_amount}</h6><br/> */}
</div>
</Modal.Body>
</Modal>
: ''}
</Row>
<Pagination postsPerPage={postsPerPage} 
totalPosts={vendor.length}
paginate={paginate}
/>
        
    </div>
  )
}

export default AllVendors
