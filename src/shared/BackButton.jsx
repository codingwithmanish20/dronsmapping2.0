import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BackButton = ({label,path}) => {
const navigate=useNavigate()
  return (
    <Button
          size="small"
          onClick={()=>navigate(path)}
            startIcon={<ArrowBackIcon />}
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "#1c213e",
              padding: "4px 16px",
              borderRadius: "30px",
              color:"white"
            }}

         
          >{label}</Button>
  )
}

export default BackButton