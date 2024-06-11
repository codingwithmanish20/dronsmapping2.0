import React, { useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Images/logo2.png";
import useToast from "../hooks/useToast";
import { errorHandler } from "../helper/handleError";
import "../style/login.css";
import api from '../services'



const Login = ({isLoginData}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
const toast=useToast()

  const StyledIconButton = styled(IconButton)({
    color: "white",     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);  
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res=await api.register.login({email,password})
      if(res.status===201){
        localStorage.setItem('auth',JSON.stringify({email,password}))
        localStorage.setItem('otpTitle',"Login")
        setLoading(false)
       navigate('/otp')
      }
      
    } catch (error) {
      const errorMessage=errorHandler(error)
      setLoading(false);
      toast(errorMessage,'error')
      
    }
  };

  const isDisabled = !email || !password;


  return (
    <Box className="main-login">
      <Box className="login-form">
        <div className="logInLogo">
          <img src={Logo} alt="" height={20}/>
        </div>
        <h2 style={{ fontFamily: "sans-serif", fontWeight: 700 }}>Login</h2>
        <p
          style={{
            color: "gray",
            fontWeight: 500,
            fontFamily: "sans-serif",
            marginTop: "14px",
            marginBottom: "40px",
            fontSize: "13px",
          }}
        >
          Enter your Credentials to access your account
        </p>
        <TextField
        placeholder="Email"
          type="email"
          name="email" 
          value={email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="loginField"
        />
        <TextField   
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name="password" 
          value={password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          autoComplete="off"
          margin="normal"
          // InputLabelProps={{
          
          //   shrink: true,
          // }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="loginField"          >
                {isFocused && (
                  <StyledIconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </StyledIconButton>
                )}
              </InputAdornment>
            ),
          }}

          onFocus={handleFocus}
          onBlur={handleBlur}
          className="loginField"          
        />
        <NavLink
          to="/ForgetPassword"
          style={{ textAlign: "right", display: "block", margin: "10px"}}
          className="forgotpassword"
        >
          Forgot Password?
        </NavLink>
        <Button
          variant="contained"
          fullWidth
          className="loginBtn"
          onClick={handleLogin}
          disabled={isDisabled || loading}  
           


        >
           {loading ? (
                      <CircularProgress size={'1.3rem'}  style={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
        </Button>
        <p
          style={{
            marginBottom: "40px",
            fontFamily: "sans-serif",
            fontSize: "12px",
            color: "gray",
            fontWeight: 500,
            textAlign: "center",
            display: "block",
            marginTop: "20px",
          }}
        >
          Not Registered Yet ?{" "}
          <NavLink
          to="/newSignUp"
          style={{ textDecoration: "none", fontWeight: 700 }}
          className="forgotpassword"
        >
          Sign Up Now ?
        </NavLink>
             
        </p>
      </Box>
    </Box>
  );
};

export default Login;
