
import React from 'react';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
function ProtectedRoute({children}) {
  const navigate=useNavigate()
  const isUserExist=JSON.parse(localStorage.getItem('auth-user')) || null
  console.log('isUserExist in protected route',isUserExist)
    if(!isUserExist){
        return <Navigate to='/login' replace />
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute