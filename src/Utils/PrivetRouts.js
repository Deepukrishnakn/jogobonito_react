import React,{useContext} from 'react'
import {Outlet,Navigate} from 'react-router-dom'


function PrivetRouts() {

    const val=  localStorage.getItem('authTokens')

    return val ? <Outlet/>: <Navigate to='/login'></Navigate>
}

export default PrivetRouts