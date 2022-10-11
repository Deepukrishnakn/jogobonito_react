import React,{useContext} from 'react'
import {Outlet,Navigate} from 'react-router-dom'


function OnlyAdminPrivetRoutes() {

  const val=  localStorage.getItem('adminauthTokens') 

    return val ? <Outlet/>: <Navigate to='/login'></Navigate>
}

export default OnlyAdminPrivetRoutes