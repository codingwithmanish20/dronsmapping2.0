import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "../style/uploaddataprocessing.css"
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {Button, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const UploadDataProcessing = () => {
    const navigate = useNavigate();
    const handleNavigationdataprocessing = () => {
        navigate('/dataprocessing');
    };
    const handleNavigationNewProject = () => {
        navigate('/NewProject');
    };
    const buttonStyle = {
        color: 'red',
        backgroundColor: 'white',
        fontWeight:"bold"
      };
      const [selectedValue, setSelectedValue] = useState('');

      const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };


  return (
    <>
   <Container>
    {/* Data processing Header part start */}
   <Box className ="upload_data_processing" >
   <Button onClick={handleNavigationdataprocessing} startIcon={<ArrowBackIcon />} style={buttonStyle}>
                     Back to Data Processing
                    </Button>
         <h2 className='data_processing_head' >Project and Survey Details</h2> 
         <p className='data_processing_text' >The image dataset will be uploaded against the chosen Project and Survey</p>
         <hr/>          
   </Box>
   {/* Data processing Header part end */}

   <Box  className="upload_dropdown">
   <p className='project_name'>Project Name</p>
   <FormControl style={{ width: '350px' }}>
      <InputLabel id="dropdown-label">Select a name</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedValue}
        label="Select a name"
        onChange={handleChange}
      >
        <MenuItem value="Stockyard Monitaring">Stockyard Monitaring </MenuItem>
        <MenuItem value="Mint Site">Mint Site</MenuItem>
      </Select>
    </FormControl>
   <p className='project_or'>Or</p>
   <Button
      variant="contained"
      style={{ width: '31%' }}
      endIcon={<ArrowForwardIcon />}
      onClick={handleNavigationNewProject}
    >
      Create a New Project
    </Button>
   </Box>
   </Container>
    </>
  )
}

export default UploadDataProcessing