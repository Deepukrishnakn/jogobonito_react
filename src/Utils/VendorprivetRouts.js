import React,{useContext} from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import AuthContext from '../context/authContext'

function VendorprivetRouts() {
    let {VendorAuthTokens} = useContext(AuthContext)
    console.log(VendorAuthTokens)

    return VendorAuthTokens ? <Outlet/>: <Navigate to='/VendorLogin'></Navigate>
}

export default VendorprivetRouts