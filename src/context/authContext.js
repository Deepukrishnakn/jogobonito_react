import { createContext,useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import axios from "../constants/constants"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [phone_number, setPhone_number] = useState('')
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [adminauthTokens, setAdminauthTokens] = useState(()=>localStorage.getItem('adminauthTokens') ? JSON.parse(localStorage.getItem('adminauthTokens')) : null)
    let [admin, setAdmin] = useState(()=>localStorage.getItem('adminauthTokens') ? jwt_decode(localStorage.getItem('adminauthTokens')) : null)
    let [VendorAuthTokens, setVendorAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [vendor, setVendor] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
  

    const [message,setMessage]= useState('')
    const [error,setErr]= useState('')       
const userLogin= async (email,password)=>{
    // console.log(email)
    // console.log(password)
    await axios.post('account/login/', {email:email,password:password}).then((response)=>{
        console.log(response.data.admin,'user')
        setAuthTokens(response.data.token)
        setErr(response.data.message) 
        console.log(response.data.message,'user')
        
        if(response.data.token){
          
            if(response.data.admin){
                localStorage.setItem('adminauthTokens',JSON.stringify(response.data.token))
                localStorage.setItem('admin',JSON.stringify(jwt_decode(response.data.token)))
                navigate('/mhome')
                
            }else{
                localStorage.setItem('authTokens',JSON.stringify(response.data.token))
                localStorage.setItem('user',JSON.stringify(jwt_decode(response.data.token)))
                console.log(user)
                localStorage.getItem(('authToken').email);
                navigate('/')
            }
           
            
            
        }

       if(response.data.message){
        console.log('user')
       }
    })

console.log(authTokens)

  }
// const Logoutuser = async()=>{
//     await axios.post('account/logout/',).then((response)=>{
//         console.log(response.data)
//       }) 
//     setAuthTokens(null)           
//     setUser(null)
//     localStorage.removeItem('authTokens')
//     localStorage.removeItem('user')
//     localStorage.removeItem('adminauthTokens')
//     localStorage.removeItem('admin')
//     navigate('/VendorLogin')
// }
let userLogout = () => {
    setAuthTokens(null);
    setUser(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
    navigate( '/Login' )   
}
let adminLogout = () => {
    setAdminauthTokens(null)
    setAdmin(null)
    localStorage.removeItem('adminauthTokens')
    localStorage.removeItem('admin')
    navigate( '/Login' )   
}
  
console.log(error)



const vendorLogin= async (email,password)=>{
    // console.log(email)
    // console.log(password)
    await axios.post('vendor/vendorlogin/', {email:email,password:password}).then((response)=>{
       
        console.log(response.data,'vendor')
        setVendorAuthTokens(response.data.token)
        setErr(response.data.message) 
        // console.log(response.data.message,'vendor message')
        if(response.data.token){
            localStorage.setItem('authTokens',JSON.stringify(response.data.token))
            localStorage.setItem('user',JSON.stringify(jwt_decode(response.data.token)))
            navigate('/vhome')
        }

       if(response.data.message){
        console.log('dfdfffddfdf')
       }
    })

console.log(VendorAuthTokens)

  }

  const logoutvendor = async()=>{
    await axios.post('vendor/Vendorlogout/',).then((response)=>{
        console.log(response.data)
      }) 
    setAuthTokens(null)           
    setVendor(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
    navigate('/VendorLogin')
}
let vendorlogout = () => {
    setAuthTokens(null);
    setVendor(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
    navigate( '/vendorlogin' )   
}

    let contextData={
        user:user,
        phone_number:phone_number,
        setPhone_number:setPhone_number,
        vendorlogout:vendorlogout,
        logoutvendor:logoutvendor,
        userLogout:userLogout,
        userLogin:userLogin,
        message:message,
        setMessage:setMessage,
        error:error,
        vendor:vendor,
        adminauthTokens:adminauthTokens,
        adminLogout:adminLogout,
        vendorLogin:vendorLogin,
        authTokens:authTokens,
        VendorAuthTokens:VendorAuthTokens,

    }
    return(
        <AuthContext.Provider value={contextData}>,
            {children}
        </AuthContext.Provider>
    )
}