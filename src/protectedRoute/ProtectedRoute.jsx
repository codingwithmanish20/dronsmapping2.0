
import React from 'react';
import { Navigate } from 'react-router';

function ProtectedRoute({children}) {

const isLogin=true
    if(!isLogin){
        return <Navigate to='/login'/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute