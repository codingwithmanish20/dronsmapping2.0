import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import '../style/sideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import DatasetIcon from '@mui/icons-material/Dataset';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import image from "../Images/BotIcon.png"
import Avatar from '@mui/material/Avatar';
import LoginInfo from './LoginInfo';
import ReorderIcon from '@mui/icons-material/Reorder';
import InfoIcon from '@mui/icons-material/Info';
import Cookies from 'js-cookie'
import api from '../services'
import ConfirmationAlert from '../shared/ConfirmationAlert';



const SideBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isToggle, setIstoggle] = useState(false)
const [showLogoutConfirmAlert,setShowLogoutConfirmAlert]=useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
        setIstoggle(!isOpen)
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const handleAvatarClick = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <HomeIcon style={{ fontSize: "18px" }} />
        },
        {
            path: "/dataprocessing",
            name: "Data Processing",
            icon: <DatasetIcon style={{ fontSize: "18px" }} />
        },


    ]


    const navigate = useNavigate()

    const handleLogout = async () => {
        setShowLogoutConfirmAlert(!showLogoutConfirmAlert)
        
    };
const handleLogoutConfirm=async()=>{
    try {
        const response =await  api.register.logout()

        if (response.status===200) {
            Cookies.remove('refresh_token')
            localStorage.removeItem('auth')
            localStorage.removeItem('OtpTitle')

            navigate('/login');
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

    return (
        <>
            <div className="container">
                <div className="sidebar" style={{ width: isOpen ? "280px" : "80px", }} >
                    <div className="top_section">
                        <ReorderIcon onClick={toggle} style={{ color: "white", fontSize: "18px", padding: "8px 10px", whiteSpace: "nowrap" }} />
                        <p className='sidebar-logo-title' style={{ display: isOpen ? "block" : "none", color: "white", fontFamily: "sans-serif", whiteSpace: "nowrap",padding: "21px 0px 0px 0px", }}>BotLabDynamics</p>
                    </div>
                    {
                        menuItem?.map((item, index) => {
                            return (
                                <>
                                    <div key={index}>
                                        <NavLink to={item.path} className='link' style={{ color: "white", whiteSpace: "nowrap" }}>
                                            <div >{item.icon}</div>
                                            <div className="link_text" style={{ display: isOpen ? "block" : "none" }} >{item.name}</div>
                                        </NavLink>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className='link' style={{display:'flex',alignItems:'center'}}  onClick={handleLogout}>
                        <ExitToAppIcon style={{color:'white'}} fontSize='12px' />

                        <p onClick={handleLogout} style={{ display: isOpen ? "block" : "none",fontSize: "13px", fontFamily: " sans-serif", cursor: "pointer" }} >Logout</p>

                    </div>
                    <div className='link'>
                        <InfoIcon
                            onClick={handleAvatarClick}
                            style={{
                                color: 'white',
                                fontSize: '18px',
                                cursor: "pointer"
                            }}

                        />
                        <p onClick={handleAvatarClick} style={{ display: isOpen ? "block" : "none", marginTop: "2px", fontSize: "13px", fontFamily: " sans-serif", cursor: "pointer",whiteSpace: "nowrap" }}>User Info</p>
                    </div>
                   
                    <LoginInfo open={isModalOpen} onClose={handleCloseModal} />
                </div>
                <main><Outlet /></main>
            </div>

            <ConfirmationAlert message={"Are you sure you want to logout?"} open={showLogoutConfirmAlert} onConfirm={handleLogoutConfirm} onClose={()=>setShowLogoutConfirmAlert(!showLogoutConfirmAlert)} />
        </>
    )
}

export default SideBar