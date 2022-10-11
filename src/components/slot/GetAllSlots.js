import React, { useEffect, useState, useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Header from '../Header';
// import Navebar from '../Navebar';
import Alert from 'react-bootstrap/Alert';
import '../slot/Slot.css'
import Card from 'react-bootstrap/Card';
import axios from "../../constants/constants"
import { useParams } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';
import '../List.css'
import authContext from '../../context/authContext'
import Vnavebar from '../Vendor/Vnavebar';
import Modal from 'react-bootstrap/Modal';
import Pagination from '../../components/Pagination';

function GetAllSlots() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {VendorAuthTokens,} = useContext(authContext)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

  const navigate = useNavigate()
  const {Turf_id} = useParams();

  const [loading,setLoading] = useState(false);
  const [Slot,setSlot] = useState([])
  const getslot =  async () => {
  const { data } = await axios.get(`vendor/Get_all_Slot/${Turf_id}/`,
  {headers:{Authorization:`Bearer ${VendorAuthTokens}`}}).then((response)=>{
    if (response.status===200){
      console.log("success")            
      setSlot(response.data)
    }
  }).catch((err)=>{
    console.log(err.response.data.detail,"erorr").finally(()=>setLoading(false))
    
  })}


const deleteSlot = async (id,e) => {
  await axios.delete(`vendor/Slotall/${id}/`,{headers:{Authorization:`Bearer ${VendorAuthTokens}`} })
  .then((response)=>{
      getslot()
      handleClose()
  }).catch((err)=>{
    console.log(err.response.data.detail,"erorr").finally(()=>setLoading(false))
    
  })}

  useEffect(()=>{
    getslot()
  },[])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
  const currentPost = Slot.slice(indexOfFirstPost, indexOfLastPost);
  // change page 
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    
<Vnavebar/>
{Slot.length ==0  ?  <Alert variant='danger' className='m-5'>
Sorry Slot is Not available !!!
        </Alert>:
      <Row>
        
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'> Your Slots</h1>
        {currentPost.map((obj)=>
      <Col lg={3}>
<Card  className='m-5'>
      <Card.Img variant="top" src={obj.turf.image} />
      <Card.Body>

        <Card.Title>{obj.turf.turf_name}</Card.Title>
        <div className='newturfTitle'>
        <Card.Text>
        Date: {obj.Date}
        </Card.Text>
        <Card.Text>
        Time: {obj.Time}
        </Card.Text>
        <Card.Text>
        No. : {obj.Slot_No}
        </Card.Text>
        <Card.Text>
        Status: {obj.Is_booked===true ? <h3 className='booked'>Booked!!!</h3>: 'Not Booked'}
        </Card.Text>
</div>
        <Button variant="success"  className='m-4' onClick={()=>navigate(`/updateslot/${obj.id}`)}>Edit</Button>
         <Button variant="danger" onClick={handleShow}>
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
          <Button variant="danger" className="bookbtn"  onClick={(e) => deleteSlot(obj.id,e)}>DELETE</Button>
        </Modal.Footer>
      </Modal>


      </Card.Body>
    </Card>
    </Col>

)}

</Row>
}
<Pagination postsPerPage={postsPerPage} 
totalPosts={Slot.length}
paginate={paginate}
/>
    </>
  )
}

export default GetAllSlots


{/* <Button variant="primary" onClick={handleShow}>
Launch demo modal
</Button>

<Modal show={show} onHide={handleClose} animation={false}>
<Modal.Header closeButton>
  <Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal> */}