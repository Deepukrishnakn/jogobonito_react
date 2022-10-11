// import React,{useContext} from 'react'
// import {Outlet,Navigate} from 'react-router-dom'
// import AuthContext from '../context/authContext'

// function OnlyAdminPrivetRoutes() {
//     let {adminauthTokens} = useContext(AuthContext)
//   const val=  localStorage.getItem('adminauthTokens') 
//     console.log(adminauthTokens)

//     return val ? <Outlet/>: <Navigate to='/Login'></Navigate>
// }

// export default OnlyAdminPrivetRoutes