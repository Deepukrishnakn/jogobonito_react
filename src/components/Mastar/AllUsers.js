import React, { useEffect, useState, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';
import axios from "../../constants/constants"
import AuthContext from '../../context/authContext';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from '../../components/Pagination';

import Switch from '@mui/material/Switch';
import Mnavebars from './Mnavebars';


function AllUsers() {

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const [is_active, setIsAcctivate] = useState();

    const {adminauthTokens} =useContext(AuthContext)
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
    const [user,setUser] = useState([])
    const [singleUser,setSingleUser] = useState('')

    const getUser = () =>{
        setLoading(true);
        axios.get('mastar/alluser',
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
            setUser(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const GetSingleUser = (id,e) =>{
        setLoading(true);
        axios.get(`mastar/alluser/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setSingleUser(res.data)
          console.log(res.data)
          handleShow()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const Deleteuser = (id,e) =>{
        axios.delete(`mastar/alluser/${id}`,
        {headers:{Authorization:`Bearer ${adminauthTokens}`}}).then(res=>{
          handleClose2()
          getUser()
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

      const handleActivate=async(id,active)=>{
        let request=(JSON.parse(localStorage.getItem('token'))) 
        if (active){
          await axios.patch(`mastar/alluser/${id}/`,{
            is_active:'False'
          },{headers:{Authorization:`Bearer ${adminauthTokens}`}}).then((res)=>{
           console.log(res.data)
           getUser()
          })
        }else{
          await axios.patch(`mastar/alluser/${id}/`,{
            is_active:'True'
          },{headers:{Authorization:`Bearer ${adminauthTokens}`}}).then((res)=>{
           console.log(res.data)
           getUser()
          })
        }
      
      }


   useEffect(() => {
    getUser()
    GetSingleUser()
   }, [])
   
   // get current post

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
const currentPost = user.slice(indexOfFirstPost, indexOfLastPost);
// change page 
const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        <Mnavebars/>
      
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>All Users Details</h1>

      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>Vendor Name</th>
          <th>Email</th>
          <th>phone</th>
          <th>Boock/Unblock</th>
          <th>Vendor Details</th>
          <th>Delete</th>
        </tr>
      </thead>
      {currentPost.map((obj,index)=>
      <tbody>
        {! obj.is_admin?
        <tr>
          <td>{index+1}</td>
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
          <td><Button variant="" className=""  onClick={(e) => GetSingleUser(obj.id,e)}>Details</Button></td>
        
          <td> <Button variant="danger" onClick={handleShow2}>
          DELETE
      </Button>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <h5 style={{color:'red'}}>Are You sure you want to delete?</h5> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="danger" className="bookbtn"  onClick={(e) => Deleteuser(obj.id,e)}>DELETE</Button>
        </Modal.Footer>
      </Modal>
</td> 
        </tr>: ' '}
      </tbody>
      )}
    </Table>
    </Col>

    {singleUser ? 
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>User Details </Modal.Title>
</Modal.Header>
<Modal.Body>
<div>
 <h3> Name: {singleUser.first_name +"  "+ singleUser.last_name}</h3><br/>
 <h6>Email: {singleUser.email}</h6><br/>
 <h6>phone number: {singleUser.phone_number}</h6><br/>
{/* <h6>Description : {singleUser.description}</h6><br/> */}
  <h6>Username: {singleUser.username}</h6><br/>
 <h6>Last login: {singleUser.last_login}</h6><br/>
 <h6>date joined: {singleUser.date_joined}</h6><br/>
</div>
</Modal.Body>
</Modal>
: ''}
</Row>
<Pagination postsPerPage={postsPerPage} 
totalPosts={user.length}
paginate={paginate}
/>
        
    </div>
  )
}

export default AllUsers
