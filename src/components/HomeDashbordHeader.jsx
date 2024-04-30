import { Box } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "../style/homeheader.css";


const HomeDashbordHeader = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/NewProject");
  };
  const buttonStyle = {
    color: 'white',
    padding:"10px 20px",
    borderRadius: '8px',
    backgroundColor:"#1976D9",

    boxShadow: '0 0px 3px 0px black',
  };

  return (
    <>
      <Box className="homedashheader">
        <div className="left_text">
          <h2>Projects</h2>
          <p style={{fontSize:"16px"}} >Manage your projects here</p>
        </div>
        <div className="rigth_btn">
          <Button
            onClick={handleNavigation}
            startIcon={<AddIcon />}
            style={buttonStyle}
          >
             New Project
          </Button>
        </div>
        
      </Box>
      
    </>
  );
};

export default HomeDashbordHeader;
