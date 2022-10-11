// import React, { useState ,useEffect, useContext } from 'react'
// import './List.css'
// import axios from "../constants/constants"
// import { useNavigate,Link } from 'react-router-dom';

// function List() {

//   const [loading,setLoading] = useState(false);
//   const [data,setData] = useState([])
//   const navigate = useNavigate()


// const getAllTurf = () =>{
//     setLoading(true);
//     axios.get('vendor/turfviewset').then(res=>{
//       console.log('turf',res.data.results)
//       setData(res.data)
//     }).catch(e=>console.log(e))
//     .finally(()=>setLoading(false))
//   }

//   return (
//     <div>
//        {loading && <h4>loading...</h4>}




// {data.map((obj)=>
// <div className='list mt-5 me-5 '>
//       <img src={obj.image} alt='' className='listImg'/>
//       <div className='listDesc'>
//       <h1 className='listTile'>Turf Name: {obj.turf_name}</h1>
//         <span className='listSize'>Turf Size: {obj.size}</span>
//         <span className='listDesc'>Turf Desc: good</span>
//         <span className='listcity'>Turf City: Kochi</span>
//         <span className='listPrice'>Price: {obj.price}</span>
//       </div>
//       <div className='BookingBtn'>
//       <button className='bookbtn' onClick={()=>navigate(`/singleturf/${obj.category.slug}/${obj.slug}/`)}>See Availability</button>
//     </div>
//     </div>
// )}

//     </div>
//   )
// }

// export default List