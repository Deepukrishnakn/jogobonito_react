import React, { useEffect, useState, useContext} from 'react';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { Row,Col } from 'react-bootstrap';
import axios from "../../constants/constants"
import Button from 'react-bootstrap/Button';
import authContext from '../../context/authContext'
import { useNavigate,Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Alert from 'react-bootstrap/Alert';

function Vhome() {
    const {VendorAuthTokens} =useContext(authContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
   
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const [turf,setTurf] = useState([])
    const getfurfbyvendor = () =>{
        setLoading(true);
        axios.get('vendor/turf_view_by_vendor',
        {headers:{Authorization:`Bearer ${VendorAuthTokens}`} } ).then(res=>{
          console.log('turf',res.data)
          setTurf(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }
    
    useEffect(()=>{
        getfurfbyvendor()
      },[])

      // get current post

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - indexOfLastPost;
const currentPost = turf.slice(indexOfFirstPost, indexOfLastPost);
// change page 
const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      {turf.length ==0  ?  <Alert variant='success' className='m-5'>
Now you can Post Your Own Turf !!!
        </Alert>:
     
        <Row>
      {loading && <h4>loading...</h4>}
<h1 className='title mt-5'>Your Turfs</h1>
        {currentPost.map((obj)=>
      <Col lg={3}>
<Card  className='m-5'>
      <Card.Img variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.turf_name}</Card.Title>
        <Card.Text>
        District: {obj.district.district}
        </Card.Text>
        <Card.Text>
        City: {obj.city.city}
        </Card.Text>
        <Button variant="primary" onClick={()=>navigate(`/getallslot/${obj.id}`)}>
View Slots
</Button>
      </Card.Body>
    </Card>
    </Col>

)}

</Row>
}

      <Pagination postsPerPage={postsPerPage} 
totalPosts={turf.length}
paginate={paginate}
/>
    </div>
  )
}

export default Vhome