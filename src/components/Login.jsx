import React, { useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

import "../style/login.css";

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);

  const StyledIconButton = styled(IconButton)({
    color: "white", // Adjust the color here
  });
  const [showPassword, setShowPassword] = useState(false);

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
    console.log(event, "datatttttt");
    event.preventDefault();
  };
  return (
    <Box className="main-login">
      <Box className="login-form">
        <div className="logInLogo">
          <p>Image Container</p>
          <img src="" alt="" />
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
          // label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="loginField"
        />
        <TextField
          // label="Password"
          type={showPassword ? "text" : "password"}
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
            // Change the color here
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="loginField"
        />
        <Link
          href="#"
          style={{ textAlign: "right", display: "block", margin: "10px" }}
          className="forgotpassword"
        >
          Forgot Password?
        </Link>
        <Button variant="contained" fullWidth className="loginBtn">
          Login
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
          <Link href="#" style={{ textDecoration: "none", fontWeight: 700 }}>
            Sign Up Now ?
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
