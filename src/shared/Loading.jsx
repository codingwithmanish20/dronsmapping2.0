import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({isVisible}) => {
  if(!isVisible) return ""

  return (
    <div className='loading'>
    <div>
      <CircularProgress />
      

    </div>
    </div>
  )
}

export default Loading