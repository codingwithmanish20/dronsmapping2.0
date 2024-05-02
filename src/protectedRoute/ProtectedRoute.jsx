
import React from 'react';
import { Navigate } from 'react-router';

function ProtectedRoute({children,isLogIn}) {
  

// const isLogin=true
    if(isLogIn){
        return <Navigate to='/login'/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute