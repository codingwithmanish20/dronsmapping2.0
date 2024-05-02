import React, { useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import "../style/login.css";

const Login = ({isLoginData}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const StyledIconButton = styled(IconButton)({
    color: "white", // Adjust the color here
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
      const response = await fetch('https://res2e4sb2oz6ta7mlagcaelvlm0mpadg.lambda-url.us-west-1.on.aws/account/login', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('access_token', JSON.stringify(userData.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(userData.refresh_token));

        // Redirect to the home page
        navigate('/'); // Change the route to the home page route

        console.log("Login successful");
        isLoginData(true);
      } else {
        alert('Login failed');
        console.error('Login failed');
        isLoginData(false);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !email || !password;

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
        <TextField   
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
          className="loginField"
        />
        <Link
          href="#"
          style={{ textAlign: "right", display: "block", margin: "10px" }}
          className="forgotpassword"
        >
          Forgot Password?
        </Link>
        <Button
          variant="contained"
          fullWidth
          className="loginBtn"
          onClick={handleLogin}
          disabled={isDisabled || loading}
        >
          {loading ? 'Logging in...' : 'Login'}
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