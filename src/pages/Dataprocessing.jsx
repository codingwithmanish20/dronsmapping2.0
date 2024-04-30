import { Box } from '@mui/material'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList'
import RefreshIcon from '@mui/icons-material/Refresh';
// import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import BackupIcon from '@mui/icons-material/Backup';
import { useNavigate } from "react-router-dom";
import "../style/home.css"
import "../style/dataprocessing.css"
import TableData from '../components/TableData';
import DataProcessingModel from '../components/DataProcessingModel';

const Dataprocessing = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    // Navigate to a different route
    navigate('/UploadDataProcessing');
  }

  const buttonStyle = {
   color: "red",
    boxShadow: "rgba(0, 0, 0, 0.2) 2px 3px 4px",
    padding:"10px 20px"
  };

  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
  <Box className="data_processing_header">
   <Box className="data_processing_heading">
   <h2 className='data_processing_text_heading' >Data Processing</h2>
    </Box> 
    <Box className="data_processing_button">
    <Button
            onClick={handleNavigation}
            startIcon={<BackupIcon />}
            style={buttonStyle}
          >
             Upload Data
          </Button>
    </Box>

  </Box>

  <Box className="data_processing_wraper">


  <Box className="search_wraper">
  <Box className="serch_left">
  <TextField
      variant="outlined"
      style={{ width: '350px', borderRadius: '50px!important', height:"40px", }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder="Search for project for location"
      value={searchValue}
      onChange={handleChange}
    />
  </Box>
  <Box className="serch_right"   >
  <Button
        style={{ marginRight: "20px" }}
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={handleOpenModal} 
      >
        Filter
      </Button>
      
    <Button
      variant="contained"
      startIcon={<RefreshIcon />}
    >
      Refresh
    </Button>
    
  </Box>
</Box>
<Box  className="data_table">
<TableData/>
</Box>
    </Box> 
 
    <DataProcessingModel open={isModalOpen} onClose={handleCloseModal} />

    </>
  )
}

export default Dataprocessing