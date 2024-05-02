import React from 'react'
import { Box } from '@mui/material'
import logo from "../Images/BL Botlab Dynamics (1).png"
import "../style/loginheader.css"

const LoginHeader = () => {
  return (
    <div>
      <div>
   <Box className="login_header">
    <img className='bl_logo' src={logo} alt="logo" />
   </Box>
    </div>
    </div>
  )
}

export default LoginHeader
