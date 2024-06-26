import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { NavLink, useNavigate, useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Logo from "../Images/logo2.png";
import api from '../services'
import "../style/login.css";
import useToast from '../hooks/useToast.js'
import { errorHandler } from "../helper/handleError.js";
import { blue } from '@mui/material/colors';
const ForgetPassword = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusPasswod, setIsFocusPassword] = useState(false); // we are using it for confirm password Focus
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const toast = useToast()
  const StyledIconButton = styled(IconButton)({
    color: "white", // Adjust the color here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
      if (value.length >= 8) {
        setisValidPassword(true);
      } else {
        setisValidPassword(false);
      }
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    console.log(showConfirmPassword, "value of passwordata");
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleConfirmFocus = () => {
    setIsFocusPassword(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleBlurPassword = () => {
    // we are using for Confirm Password Blur
    setIsFocusPassword(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (email) {
      setIsValidEmail(regex.test(email));
    }
  }, [email]);

  const handleResetPassword = async() => {
    setLoading(true)
    try {
      const payload=JSON.stringify({
        user_email:email
      })
      const res=await api.register.sendResetPasswordOTPEmail(payload)
      console.log('res',res)
      localStorage.setItem("OtpTitle", "Reset");
      localStorage.setItem("auth",JSON.stringify({email,password}));
      setLoading(false)
       navigate("/otp");
    } catch (error) {
      const errorMessage=errorHandler(error)
      toast(errorMessage,'error')
      setLoading(false)

      
    }
    
  };

  const isDisabled = !email || !password || !confirmPassword || !isValidPassword;

  console.log('isDisabled',isDisabled)
  return (
    <>
      <Box className="main-login">
        <Box className="signup-form">
          <div className="logInLogo">
            <img src={Logo} alt="logo" height={20} width={270} />
          </div>
          <h2
            style={{ fontFamily: "sans-serif", fontWeight: 600, fontSize: 30 }}
          >
            Reset Password
          </h2>
          <p
            style={{
              color: "gray",
              fontWeight: 400,
              fontFamily: "sans-serif",
              marginTop: "14px",
              marginBottom: "32px",
              fontSize: "14px",
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
          {email !== "" && isValidEmail == false && (
            <p style={{ color: "red", marginLeft: "20px",marginBottom:"-10px" }}>
              {"please write the valid email address"}
            </p>
          )}
          <TextField
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password" // Add name prop
            value={password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
            className="loginField"/>
          {password !== "" && !isValidPassword && (
            <p style={{ color: "red" ,marginLeft:"20px",marginBottom:"-10px"}}>
              Password must be at least 8 characters long
            </p>
          )}
          <TextField
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword" // Add name prop
            value={confirmPassword}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isFocusPasswod && (
                    <StyledIconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </StyledIconButton>
                  )}
                </InputAdornment>
              ),
            }}
            onFocus={handleConfirmFocus}
            onBlur={handleBlurPassword}
            className="loginField"
          />
          {confirmPassword !== "" && confirmPassword!==password && (
            <p style={{ color: "red" ,marginLeft:"20px",marginBottom:"-10px"}}>
               confirm password does not match the password
            </p>
          )}
          
          <Button
            variant="contained"
           
            fullWidth
            className="loginBtn"
            onClick={handleResetPassword}
            disabled={isDisabled}
          >
             {loading && (
          <CircularProgress
            size={24}
           sx={{color:blue[500]}}
          />
        )}
            {loading ? "Logging in..." : "Reset password"}
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
              style={{
                textDecoration: "none",
                fontWeight: 700,
                color: "rgba(23, 124, 240, 1)",
              }}
              className="forgotpassword"
            >
              Sign Up Now
            </NavLink>
            {/* <Link href="#" style={{ textDecoration: "none", fontWeight: 700 }}>
            Sign Up Now ?
          </Link> */}
          </p>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
