import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import info from '../Images/user1.png';
import '../style/logindetails.css';

const LoginInfo = ({user, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose} 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 600,
          height: '55vh',
          bgcolor: '#001f5f',
          // bgcolor:"light-grey",

          boxShadow: 24,
          borderRadius: '30px',
          padding: '10px 12px',
          position: 'relative',
          
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ position: 'absolute', top: 0, right: 0, padding:"20px 32px" }}
        >

          {/*  */}
          <CloseIcon style={{color:"white"}} />
        </IconButton>

        <Box className="loginInformation">
          <Box>
            <Box className="loginInfo_header_img">
              <img src={info} alt="info" style={{ width: '20%' }} />
            </Box>
            <Typography variant="h5" className="user_info1" sx={{ marginBottom: '20px' }}>
              User Info
            </Typography>
            {user!==null ? (
              <div className='px-4  text-white'>
                <div className='flex items-center gap-2'>
                <label>Name:</label>
                <p>{user?.name}</p>
                </div>
                <div className='flex items-center gap-2'>
                <label>Email:</label>
                <p>{user?.email}</p>
                </div>
                
               
              </div>
            ) : (
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 300, fontFamily:"sans-serif" }}>
                No user email information available
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginInfo;
