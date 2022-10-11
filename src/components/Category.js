import React, { useState,useEffect } from 'react'
import './Category.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col,Row } from 'react-bootstrap';
import axios from "../constants/constants"
import { useNavigate,Link } from 'react-router-dom';

function Category() {

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState([])

useEffect(()=>{
    setLoading(true);
  axios.get('vendor/category').then(res=>{
    // console.log(res.data)
    setData(res.data)
  }).catch(e=>console.log(e))
  .finally(()=>setLoading(false))
},[]);
  return (  
    <div>
<Row>
      {loading && <h4>loading...</h4>}
  <h1 className='title'>Categories</h1>

  

  {data.map((obj)=>
    <Col lg={4}>
<Card key={obj.id} className='m-5'>
      <img src={obj.cat_image} alt={obj.cat_image}/>
      <Card.Body>
        <Card.Title> {obj.category_name}</Card.Title>
        <Card.Text>
        {obj.description}
        </Card.Text>
        <Button variant="primary" className='buttons' onClick={()=>navigate(`/TurfByCategory/${obj.slug}/`)}>Go To Play</Button>
      </Card.Body>
    </Card>
     </Col> 
)}
   

{/* 
    <Col lg={4}>
<Card  className='m-5'>
      <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYrGvP1llQLOgzXDXEUXcqx81jCS_P4uncdw&usqp=CAU' />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col lg={4}>
<Card  className='m-5'>
      <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYrGvP1llQLOgzXDXEUXcqx81jCS_P4uncdw&usqp=CAU' />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col> */}

    </Row>
    </div>
  )
}

export default Category