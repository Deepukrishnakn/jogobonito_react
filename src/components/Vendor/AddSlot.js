import React,{useContext,useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Vnavebar from './Vnavebar';
import authContext from '../../context/authContext'
import axios from "../../constants/constants"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Link,navigate, useNavigate} from 'react-router-dom';

function AddSlot() {

  const navigate = useNavigate()
  const {VendorAuthTokens} =useContext(authContext)

  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [Slot_No, setSlot_No] = useState("");
  const [is_available, setIs_available] = useState("False")
  const [turf_id, setTurf_id] = useState("")
  const [turf, setTurf] = useState([])


  const HandleSubmit = async(e) => {
    
    e.preventDefault()
      const slotData = new FormData();
      slotData.append('Date',Date)
      slotData.append('Time',Time)
      slotData.append('Slot_No',Slot_No)
      slotData.append('turf_id',turf_id)
      slotData.append('is_available',is_available)
      
  await axios.post('vendor/addSlot/',slotData,    
  {headers:{Authorization:`Bearer ${VendorAuthTokens}`,  'content-type': 'multipart/form-data'} } ).then((response)=>{
    console.log(response.data)
    if (response.status===200){
      navigate('/vhome')
      console.log("success")
    }
  })  
  .catch((err)=>{
    console.log(err.response.data.detail,"erorr")
   console.log(slotData)
  }) 
}


const turfCall=()=>{
  axios.get('vendor/turf_view_by_vendor',{headers:{Authorization:`Bearer ${VendorAuthTokens}`} }).then(res=>{
    console.log(res.data)
     setTurf(res.data)
     {turf.map ((o) =>
      console.log(o.id,'id kittiyo')
   ) }
    
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

  const handleChange=(e)=>{
      setTurf_id(e.target.value)
      console.log(e.target.value)
  }

  useEffect(()=>{
   turfCall()
   console.log(turf)
  },[]);

  return (
    <div>
<Vnavebar/>
<h1 className='title mb-5 mt-5'>Add Your Slot</h1>
<Form className='m-5' onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Date</Form.Label>
        <Form.Control type="date" placeholder="Enter Date" onChange={(e)=>setDate(e.target.value)} value={Date}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setTime(e.target.value)} value={Time}>
        <Form.Label>Enter Time</Form.Label>
        <Form.Control type="time" placeholder="Time" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=>setSlot_No(e.target.value)} value={Slot_No}>
        <Form.Label>Enter slot number</Form.Label>
        <Form.Control type="text" placeholder="Slot Numbber" />
      </Form.Group>

    

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Enter Turf</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={turf_id}
          label="Enter Turf"
          onChange={handleChange}>
          {turf.map((obj)=>
          <MenuItem value={obj.id}>{obj.turf_name}</MenuItem>
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

export default AddSlot