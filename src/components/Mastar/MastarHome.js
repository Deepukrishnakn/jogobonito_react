import React,{useEffect,useState,useContext} from 'react'
import axios from "../../constants/constants"
import Mnavebars from './Mnavebars'
import Card from 'react-bootstrap/Card';
import '../Vendor/Vhome.css'
import SlotbookingChart from './SlotbookingChart';
import authContext from '../../context/authContext'

function MastarHome() {
  const {authTokens} =useContext(authContext)
  const [loading,setLoading] = useState(false);
    const [cartdata,setachartData] = useState([])
    const getchartdata = () =>{
        setLoading(true);
        axios.get('mastar/Orderchart/',{headers:{Authorization:`Bearer ${authTokens}`} }
        ).then(res=>{
          setachartData(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
      }

      useEffect(() => {
        getchartdata()
      }, [])
      
  return (
    <div>
        
<Mnavebars/>

<div class="container">
  <div class="row">
    <div class="col-sm">
    <Card className="m-5"
          style={{ width: '18rem'}}
        >
          <Card.Header className='mcardtitile'>TOTAL ACTIVE USERS</Card.Header>
          <Card.Body>
            <Card.Title className='mcardtitile'>  </Card.Title>
            <Card.Text className='mcardhead'>
           { cartdata.totalusers}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
    <div class="col-sm">
    <Card className="m-5"
          style={{ width: '18rem'}}
        >
          <Card.Header className='mcardtitile'>TOTAL ACTIVE VENDORS</Card.Header>
          <Card.Body>
            <Card.Title className='mcardtitile'>  </Card.Title>
            <Card.Text className='mcardhead'>
           { cartdata.totalvendor}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  </div>
</div>



<div class="container">
  <div class="row">
  <h1 className='title m-5'>Mothly Slots booking</h1>
    <div class="col-sm m-5">
  <SlotbookingChart/>
    </div>
  </div>
</div>


    </div>
  )
}

export default MastarHome