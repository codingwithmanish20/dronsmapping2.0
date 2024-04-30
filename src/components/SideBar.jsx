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



import {
    FaTh,
    FaBars,
    FaUserAlt,
} from "react-icons/fa"



const SideBar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isToggle, setIstoggle] = useState(false)

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



    const handleLogout = async () => {
        try {
            const response = await fetch(
                'https://res2e4sb2oz6ta7mlagcaelvlm0mpadg.lambda-url.us-west-1.on.aws/account/logout',
                {
                    method: 'PUT',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                // Clear authentication data from local storage or wherever it's stored
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                // Redirect to the login page
                navigate('/login');
            } else {
                // Handle logout failure
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const navigate = useNavigate()
    return (

        <>
            <div className="container">
                <div className="sidebar" style={{ width: isOpen ? "280px" : "80px" }} >
                    <div className="top_section">
                        <ReorderIcon onClick={toggle} style={{ color: "black", fontSize: "18px", padding: "8px 10px", whiteSpace: "nowrap" }} />
                        <p style={{ display: isOpen ? "block" : "none", color: "black", fontFamily: "sans-serif", whiteSpace: "nowrap" }}> BotLabDynamics</p>
                    </div>
                    {
                        menuItem.map((item, index) => {
                            console.log("item", item)
                            return (
                                <>
                                    <div key={index}>
                                        <NavLink to={item.path} className='link' style={{ color: "white", whiteSpace: "nowrap" }}>
                                            <div >{item.icon}</div>
                                            <div className="link_text" style={{ display: isOpen ? "block" : "none", marginTop: "2px" }} >{item.name}</div>
                                        </NavLink>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div style={{ display: "flex", gap: "5px", padding: "8px 25px" }} onClick={handleLogout}>
                        <ExitToAppIcon style={{ fontSize: "18px", cursor: "pointer" }} />

                        <p onClick={handleLogout} style={{ display: isOpen ? "block" : "none", marginTop: "2px", fontSize: "13px", fontFamily: " sans-serif", cursor: "pointer" }} >LogOut</p>

                    </div>
                    <div style={{ display: "flex", gap: "5px", padding: "8px 25px" }}>
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
                    {/* <h1 className='login_edit' style={{display: isOpen ? "block" : "none",  marginTop:"4px",  fontFamily: " sans-serif" }}>L</h1> */}
                    {/* <div className='Login_Info'>
                        < InfoIcon onClick={handleAvatarClick}
                            style={{
                                color: "black",
                                fontSize: "45px"
                            }}
                        /> */}

                    {/* <div className='Login_Info'>
                        <InfoIcon
                            onClick={handleAvatarClick}
                            style={{
                                color: 'white',
                                fontSize: '30px',
                                cursor: "pointer"
                            }}

                        />
                        <p onClick={handleAvatarClick} style={{ display: isOpen ? "block" : "none", marginTop: "4px", fontSize: "16px", fontFamily: " sans-serif", cursor: "pointer" }}>User_Info</p>
                    </div> */}
                    <LoginInfo open={isModalOpen} onClose={handleCloseModal} />
                </div>
                <main><Outlet /></main>
            </div>
        </>
    )
}

export default SideBar