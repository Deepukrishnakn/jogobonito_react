import React,{useContext,useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Vnavebar from '../Vendor/Vnavebar';
import authContext from '../../context/authContext'
import axios from "../../constants/constants"
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Row,Col } from 'react-bootstrap';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function UpdateCategory() {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const {VendorAuthTokens} =useContext(authContext)
  const Navigate = useNavigate()
  const [cate_name, setCatename] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [data,setData] = useState([])


    const {id} = useParams()

  const loadecate = async() => {
    const {data} = await axios.get(`vendor/category/${data.id}/`,
    {headers:{Authorization:`Bearer ${VendorAuthTokens}`,  'content-type': 'multipart/form-data'} });
    setCatename(data.category_name)
    setSlug(data.slug)
    setDescription(data.description)
    setImage(data.cat_image)
    
  }


  const CategoryHandleSubmit = async(e) => {
    const cateData = new FormData();
    cateData.append('category_name',cate_name)
    cateData.append('slug',slug)
    cateData.append('description',description)
    cateData.append('cat_image',image,)

await axios.patch(`vendor/category/${data.id}/`,cateData,    
{headers:{Authorization:`Bearer ${VendorAuthTokens}`, 'content-type': 'multipart/form-data'} } ).then((response)=>{
  console.log(response.data)
  if (response.status===200){
    handleClose()
    console.log("success")
  }
})  
.catch((err)=>{
  console.log(err.response.data.detail,"erorr")
 console.log(cateData)
}) 
}

const deleteCate = async (id,e) => {
    await axios.delete(`vendor/category/${id}/`,{headers:{Authorization:`Bearer ${VendorAuthTokens}`} })
    .then((response)=>{
        loadecate()
        handleClose1()
    }).catch((err)=>{

    })}
  


    const categoryCall=()=>{
        axios.get('vendor/category').then(res=>{
          console.log(res.data)
           setData(res.data)
         }).catch(e=>console.log(e))
      }

  useEffect(()=>{
    categoryCall()
    loadecate()
   
  },[]);

  return (
    <div>
  <Vnavebar/>
       {data ? (
        <Row>
     
<h1 className='title mt-5'>All Categorys</h1>
     
      <Col lg={12}>
 <Table striped bordered hover className='m-5 me-5'>
      <thead>
        <tr className=''>
          <th>No.</th>
          <th>Category Name</th>
          <th>slug</th>
          <th>description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      {data.map((obj)=>
      <tbody>
        <tr>
          <td>1</td>
          <td>{obj.category_name}</td>
          {/* <td><img src={'http://127.0.0.1:8000'+obj.image}/></td> */}
          <td>{obj.slug}</td>
          <td>{obj.description}</td>
         
          <td> <Button className="bookbtn" variant="success" onClick={handleShow}>
        Edit Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form  onSubmit={CategoryHandleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Category name</Form.Label>
        <Form.Control type="text" placeholder="Enter Category name" onChange={(e)=>setCatename(e.target.value)} value={cate_name}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setSlug(e.target.value)} value={slug}>
        <Form.Label>Enter slug name</Form.Label>
        <Form.Control type="text" placeholder="Enter slug name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setDescription(e.target.value)} value={description}>
        <Form.Label>Enter description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>upload image1</Form.Label>
              <Form.Control name='image' type="file" placeholder="upload image1" onChange={(e)=>setImage(e.target.files[0])}/>
            </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal><br/><br/>
     
   </td>
        
        <td>   <Button variant="danger" className="bookbtn" onClick={handleShow1}>
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
          <Button variant="danger" className="bookbtn"  onClick={(e) => deleteCate(obj.id,e)}>DELETE</Button>
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

    </div>
  )
}

export default UpdateCategory