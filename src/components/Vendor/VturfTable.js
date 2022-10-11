import React, { useEffect, useState, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';
import axios from "../../constants/constants"
import Button from 'react-bootstrap/Button';
import authContext from '../../context/authContext'
import { useNavigate,Link } from 'react-router-dom';
import Vnavebar from './Vnavebar';
import Pagination from '../../components/Pagination';

import Modal from 'react-bootstrap/Modal';

function VturfTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {VendorAuthTokens} =useContext(authContext)
   
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false);
    const [turf,setTurf] = useState([])
    const getfurfbyvendor = () =>{
        setLoading(true);
        axios.get('vendor/turf_view_by_vendor',
        {headers:{Authorization:`Bearer ${VendorAuthTokens}`}}).then(res=>{
          console.log('turf',res.data)
          setTurf(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }


      const deleteTurf = async (id,e) => {
        e.preventDefault();
        await axios.delete(`vendor/Turfall/${id}/`,{headers:{Authorization:`Bearer ${VendorAuthTokens}`} })
        .then((response)=>{
          if (response.status===200){
            console.log("success")            
            getfurfbyvendor()
            handleClose()
          }
      handleClose()
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr").finally(()=>setLoading(false))
          
        })}
    
    useEffect(()=>{
        getfurfbyvendor()
      },[])

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
      const currentPost = turf.slice(indexOfFirstPost, indexOfLastPost);
      // change page 
      const paginate = pageNumber => setCurrentPage(pageNumber);

  return (

    <div className=''>
      <Vnavebar/>
       {turf ? (
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>Your Turfs</h1>
     
      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>Turf Name</th>
          <th>Price</th>
          <th>Size</th>
          <th>Category</th>
          <th>District</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      {currentPost.map((obj,index)=>
      <tbody>
        <tr>
          <td>{index+1}</td>
          <td>{obj.turf_name}</td>
          {/* <td><img src={'http://127.0.0.1:8000'+obj.image}/></td> */}
          <td>{obj.price}</td>
          <td>{obj.size}</td>
          <td>{obj.category.category_name}</td>
          <td>{obj.district.district}</td>
          <td>{obj.city.city}</td>
          <td><Button variant="success" className="bookbtn" onClick={()=>navigate(`/updateturf/${obj.id}`)}>EDIT</Button></td>
          {/* <td><Button variant="danger" className="bookbtn"  onClick={(e) => deleteTurf(obj.id,e)}>DELETE</Button></td> */}
   


          <td>   <Button variant="danger" className="bookbtn" onClick={handleShow}>
          DELETE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <h5 style={{color:'red'}}>Are You sure you want to delete?</h5> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" className="bookbtn"  onClick={(e) => deleteTurf(obj.id,e)}>DELETE</Button>
        </Modal.Footer>
      </Modal></td>
        </tr>
      </tbody>
      )}
    </Table>
    </Col>
</Row>
) : (
       ''
      )}
      <Pagination postsPerPage={postsPerPage} 
totalPosts={turf.length}
paginate={paginate}
/>
    </div>
  )
}

export default VturfTable