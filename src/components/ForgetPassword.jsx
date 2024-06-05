import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { NavLink, useNavigate, useHistory } from "react-router-dom";
import Logo from "../Images/logo2.png";
import NewSignUp from "./NewSignUp";

import "../style/login.css";

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
    console.log(isValidEmail, "isValidData");
  }, [email]);

  const onClickButton = () => {
    localStorage.setItem("OtpTitle", "Forget");
    navigate("/OtpModel");
  };

  const isDisabled = !email || !password || !confirmPassword;
  return (
    <>
      <Box className="main-login">
        <Box className="login-form">
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
              marginBottom: "40px",
              fontSize: "14px",
            }}
          >
            Enter your Credentials to access your account
          </p>
          <TextField
            placeholder="Email"
            type="email"
            name="email" // Add name prop
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
          {/* {
          confirmPassword == password && confirmPassword !== "" && password !=="" && <p
          style={{ cursor:"pointer",textAlign: "right", display: "block", marginTop: "2px",marginBottom:"10px",color:"rgba(23, 124, 240, 1)",fontSize:"14px",fontWeight:400 }}
          className="forgotpassword"
        >
           <NavLink
          to="/OtpModel"
          style={{ textDecoration: "none", fontWeight: 700 ,color:"rgba(23, 124, 240, 1)"}}
          className="forgotpassword"
        >
          Generate OTP?
        </NavLink>
         
        </p>
        } */}

        {
          (isValidEmail && isValidPassword && password == confirmPassword) ? 
          <Button
            variant="contained"
            style={{ cursor: "pointer", marginTop: "20px", backgroundColor: "black" }}
            fullWidth
            className="loginBtn"
            onClick={() => onClickButton()}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Confirm password"}
          </Button> : 
          <Button
            variant="contained"
            style={{ cursor: "pointer", marginTop: "20px", backgroundColor: "grey",borderRadius:"25px" }}
            fullWidth
            className=""
            onClick={null}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Confirm password"}
          </Button>
        }


          {/* {confirmPassword == password &&
          confirmPassword !== "" &&
          password !== "" ? (
            
              <Button
                variant="contained"
                style={{ cursor: "pointer", marginTop: "3 0px" }}
                fullWidth
                className="loginBtn"
                onClick={()=>onClickButton()}
                disabled={isDisabled || loading}
              >
                {loading ? "Logging in..." : "Confirm password"}
              </Button>
          ) : (
            <Button
              variant="contained"
              style={{ cursor: "pointer", marginTop: "3 0px" }}
              fullWidth
              className="loginBtn"
              onClick={null}
              disabled={isDisabled || loading}
            >
              {loading ? "Logging in..." : "Confirm password"}
            </Button>
          )} */}

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
