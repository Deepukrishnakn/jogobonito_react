import React,{useState,useContext,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "../../constants/constants"
import { Navigate, useNavigate, useParams } from 'react-router-dom'

// mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Vnavebar from '../../components/Vendor/Vnavebar';
import authContext from '../../context/authContext';

function UpdateTurf() {

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const {VendorAuthTokens} =useContext(authContext)
  const Navigate = useNavigate()
 
    const [turf_Name, setTurfname] = useState("");
    const [slug, setSlug] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [price, setprice] = useState("");
    const [image, setImage] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [category_id, setCategory_id] = useState("");
    const [subCategory_id, setSubCategory_id] = useState("");
    const [district_id, setDistrict_id] = useState("");
    const [city_id, setCity_id] = useState("");
    const [is_available, setIs_available] = useState("False")
    const [data,setData] = useState([])
    const [district,setDistrict] = useState([])
    const [city,setCity] = useState([])
    const [subcate,setSubcate] = useState([])
    
    // const [category_id, setCategory_id] = useState("");
    // const handleChange = (event) => {
    //   setCategory_id(event.target.value );
    //   console.log(category_id)
   
    // };

    const {id}= useParams()

    const loadTurf = async () => {
        const {data} = await axios.get(`vendor/Turfall/${id}/`,
        {headers:{Authorization:`Bearer ${VendorAuthTokens}`, 'content-type': 'multipart/form-data'} } );
        console.log(data)
        setTurfname(data.turf_name)
        setSlug(data.slug)
        setSize(data.size)
        setDescription(data.description)
        setprice(data.price)
        setImage(data.image)
        setImage1(data.image1)
        setImage2(data.image2)
        setImage3(data.image3)
        setSubCategory_id(data.SubCategory)
        setDistrict_id(data.district)
        setCity_id(data.city)
        setCategory_id(data.category)
        setIs_available('true')

    }
  


    const HandleSubmit = async(e) => {
      console.log(category_id)
      e.preventDefault()
        console.log(turf_Name)
        const turfData = new FormData();
        turfData.append('turf_name',turf_Name)
        turfData.append('slug',slug)
        turfData.append('size',size)
        turfData.append('description',description)
        turfData.append('price',price)
        // turfData.append('image',image,)
        // turfData.append('image1',image1)
        // turfData.append('image2',image2)
        // turfData.append('image3',image3)
        turfData.append('category',category_id)
        turfData.append('SubCategory',subCategory_id)
        turfData.append('district',district_id)
        turfData.append('city',city_id)
        turfData.append('is_available',is_available)
        
    await axios.patch(`vendor/Turfall/${id}/`,turfData,    
    {headers:{Authorization:`Bearer ${VendorAuthTokens}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
      console.log(response.data)
      if (response.status===200){
        Navigate('/vhome')
        console.log("success")
      }
    })  
    .catch((err)=>{
      console.log(err.response.data.detail,"erorr")
     console.log(turfData)
    }) 
}

useEffect(()=>{
  categoryCall()
  districtCall()
  cityCall()
  subcatcall()
  loadTurf()
},[]);


const categoryCall=()=>{
  axios.get('vendor/category').then(res=>{
    console.log(res.data)
     setData(res.data)
   }).catch(e=>console.log(e))
}

const districtCall=()=>{
  axios.get('vendor/district').then(res=>{
   console.log(res.data)
    setDistrict(res.data)
  }).catch(e=>console.log(e))
}
  
const cityCall=()=>{
  axios.get('vendor/city').then(res=>{
   console.log(res.data)
    setCity(res.data)
  }).catch(e=>console.log(e))
}
  
const subcatcall=()=>{
  axios.get('vendor/subcate').then(res=>{
   console.log(res.data)
    setSubcate(res.data)
  }).catch(e=>console.log(e))
}

console.log(is_available)
  const handleCheck=()=>{
    if(is_available==='True'){
      setIs_available('False')
    }else{
      setIs_available('True')
    }
  }

        return (
          <div>
            <Vnavebar/>
      <h1 className='title mb-5 mt-5'>Update Your Turf</h1>
      <Form className=' m-5' onSubmit={HandleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter turf Name</Form.Label>
              <Form.Control name='turfName' type="text" placeholder="Enter turf name" onChange={(e)=>setTurfname(e.target.value)} value={turf_Name} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter slug</Form.Label>
              <Form.Control name='slug' type="text" placeholder="Enter slug " onChange={(e)=>setSlug(e.target.value)} value={slug} />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>turf Size</Form.Label>
              <Form.Control name='size' type="text" placeholder="Enter turf Size" onChange={(e)=>setSize(e.target.value)} value={size} />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>description</Form.Label>
              <Form.Control name='description' type="text" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)} value={description} />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Price</Form.Label>
              <Form.Control name='price' type="text" placeholder="Enter Price" onChange={(e)=>setprice(e.target.value)} value={price} />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>upload image1</Form.Label>
              <Form.Control name='image' type="file" placeholder="upload image1" onChange={(e)=>setImage(e.target.files[0])}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>upload image2</Form.Label>
              <Form.Control name='image1' type="file" placeholder="upload image2" onChange={(e)=>setImage1(e.target.files[0])}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>upload image3</Form.Label>
              <Form.Control name='image2' type="file" placeholder="upload image3" onChange={(e)=>setImage2(e.target.files[0])}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>upload image4</Form.Label>
              <Form.Control name='image3' type="file" placeholder="upload image4" onChange={(e)=>setImage3(e.target.files[0])}/>
            </Form.Group>

   

<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Enter district</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={district_id}
          label="Enter district"
          onChange={(e)=>setDistrict_id(e.target.value)} 
        >
          {district.map((obj)=>
          <MenuItem value={obj.id}>{obj.district}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box> <br/>



    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Enter city</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city_id}
          label="Enter city"
          onChange={(e)=>setCity_id(e.target.value)} 
        >
          {city.map((obj)=>
          <MenuItem value={obj.id}>{obj.city}</MenuItem>
          )}
        </Select>
      </FormControl><br/>
    </Box>


            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter City</Form.Label>
              <Form.Control name='city_id' type="text" placeholder="Enter City" onChange={(e)=>setCity_id(e.target.value)} value={city_id} />
            </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter district</Form.Label>
              <Form.Control name='district_id' type="text" placeholder="Enter district" onChange={(e)=>setDistrict_id(e.target.value)} value={district_id} />
            </Form.Group> */}

  
           <br/> <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Enter Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category_id}
          label="Enter Category"
          onChange={(e)=>setCategory_id(e.target.value)} 
        >
          {data.map((obj)=>
          <MenuItem value={obj.id}>{obj.category_name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box><br/>


<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Enter subcategory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategory_id}
          label="Enter Subcategory"
          onChange={(e)=>setSubCategory_id(e.target.value)} 
        >
          {subcate.map((obj)=>
          <MenuItem value={obj.id}>{obj.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box> <br/>
      
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check is available" onChange={handleCheck} value={is_available} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
      
          </div>
        )
      }
      //.replace(is_available.charAt(0), is_available.charAt(0).toUpperCase());

export default UpdateTurf