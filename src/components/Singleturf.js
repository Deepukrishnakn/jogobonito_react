import React,{useState,useEffect} from 'react'
import './Singleturf.css'
import Carousel from 'react-bootstrap/Carousel';
import Header from '../components/Header'
import Navebar from '../components/Navebar'
import axios from "../constants/constants"
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import '../components/home.css'
import { useNavigate,Link } from 'react-router-dom';

function Singleturf() {

const navigate = useNavigate()
const [turfdetails, setTurfDetails] = useState('')

const { cate_slug,turf_slug } = useParams();

const getSingleTurf =  async () => {
  const { data } = await axios.get(`vendor/Turf_details/${cate_slug}/${turf_slug}`)
  console.log(data)
  setTurfDetails(data)
}

useEffect(() => {
  getSingleTurf();
  console.log(turfdetails)
},[])


  return (
    <div>

<Navebar/>
<Header/>
{turfdetails ? (
        <div className='singleturfcontainer'>
        <div className='singleturfwrapper'>
          <div className='singleturfcard'>
         <br/> <h1 className='singleturftitle'> {turfdetails.turf_name}</h1>
          <h2 className='turfdetailspan'>
                {turfdetails.category.category_name}
                </h2>
          <div className=''>
            {/* <FontAwesomeIcone icone={faLocationDot}/> */}
            <h3 className='singleturftitle'>{turfdetails.district.district}</h3>
              <span className='singleturftitle' >{turfdetails.city.city}</span><br/><br/>
          </div>
          </div>
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={turfdetails.image}
                alt={turfdetails.image}
              />
              <Carousel.Caption>
                {/* <h3>{turfdetails.turf_name}</h3>
                <p>{turfdetails.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={turfdetails.image1}
                alt="Second slide"
              />
      
      <Carousel.Caption>
                {/* <h3>{turfdetails.turf_name}</h3>
                <p>{turfdetails.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={turfdetails.image2}
                alt="Third slide"
              />
      
      <Carousel.Caption>
                {/* <h3 style={{color:"black"}}>{turfdetails.turf_name}</h3>
                <p style={{color:"black"}}>{turfdetails.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={turfdetails.image3}
                alt="Third slide"
              />
      
      <Carousel.Caption>
                {/* <h3>{turfdetails.turf_name}</h3>
                <p>{turfdetails.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className='singleturfcard'>
          <div className="turfdetailstext">
                <p className="turfdes">{turfdetails.description}
                </p>
              </div>
          <div className="turfdetails">
           
              <div className="turfdetailsprice">  
             <h2 className="bookbtnp ms-5"> <b>${turfdetails.price}</b> For one match</h2>
              </div>
                <h1 className="priceh1"> {turfdetails.size}</h1>
                <h2>
                
                  <button className="bookbtn me-5" onClick={()=>navigate(`/getslot/${turfdetails.id}`)}>Reserve or Book Now </button>
                </h2>
                </div>
          </div>
        </div>
      </div>
      
      ) : (
       ''
      )}

<div className='FooterContainer'>
  <Footer/>
</div>
</div>
  )
}

export default Singleturf