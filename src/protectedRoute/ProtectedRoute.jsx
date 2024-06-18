
import React from 'react';
import { Navigate } from 'react-router';
import Cookies from  'js-cookie'
import { getAccessToken, getRefreshToken } from '../helper/cookies';
function ProtectedRoute({children}) {
  const token=getRefreshToken()
    // if(!token){
    //     return <Navigate to='/login'/>
    // }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute