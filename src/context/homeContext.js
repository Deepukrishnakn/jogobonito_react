import { createContext,useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import axios from "../constants/constants"

const HomeContext = createContext()
export default HomeContext;

export const AuthProvider = ({children})=>{

const [loading,setLoading] = useState(false);
const [category,setCategory] = useState([])

useEffect(()=>{
    setLoading(true);
  axios.get('vendor/category').then(res=>{
    console.log(res.data)
    setCategory(res.data)
  }).catch(e=>console.log(e))
  .finally(()=>setLoading(false))
},[]);



let contextData={
    loading:loading,
    category:category


}
return(
    <HomeContext.Provider value={contextData}>,
        {children}
    </HomeContext.Provider>
)

}