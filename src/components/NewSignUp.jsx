import React, { useState } from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Images/logo2.png";
import ReCAPTCHA from "react-google-recaptcha";
import "../style/login.css";
import OtpModel from "./OtpModel";

// site key in the HTML code your site serves to users. =>  6Lfk-dEpAAAAAFKRUVL3DOCB3gjiX3Ib5PQ7XPoX
// communicate btw site and recapcha => 6Lfk-dEpAAAAAOrMp7sVP7AjNZ77ek5j_8vOFQam

function onChange(value) {
  console.log("Captcha value:", value);
}
const NewSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusPasswod, setIsFocusPassword] = useState(false); // we are using it for confirm password Focus

  const StyledIconButton = styled(IconButton)({
    color: "white", // Adjust the color here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
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

  const isDisabled = !email || !password || !confirmPassword;
  return (
    <>
    {/* <OtpModel /> */}
      <Box className="main-login">
        <Box className="login-form">
          <div className="logInLogo">
            <img src={Logo} alt="" height={20} width={270} />
          </div>
          <h2 style={{ fontFamily: "sans-serif", fontWeight: 700 }}>Sign up</h2>
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
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password" // Add name prop
            value={password}
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
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
          {/* <NavLink
            to="/ForgetPassword"
            style={{ textAlign: "right", display: "block", margin: "10px" }}
            className="forgotpassword"
          >
            Forgot Password?
          </NavLink> */}
          <div className="">
            {/* <input
              type="checkbox"
              style={{
                borderRadius: "45px",
                cursor: "pointer",
                marginLeft: "20px",
              }}
            /> */}
            {/* <span style={{ marginLeft: "10px" }}>I’m not robot</span> */}
            <ReCAPTCHA
              sitekey="6Lfk-dEpAAAAAFKRUVL3DOCB3gjiX3Ib5PQ7XPoX"
              onChange={onChange}
              // style={{
              //   background: "#1c213e",
              //   height: "47px",
              //   borderRadius: "45px",
              // }}
              style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}
            />
          </div>
          <Button
            variant="contained"
            fullWidth
            className="loginBtn"
            onClick={null}
            disabled={isDisabled || loading}
          >
            {loading ? "Register..." : "Register"}
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
            Already have an account ?{" "}
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                color: "rgba(23, 124, 240, 1)",
              }}
              className="forgotpassword"
            >
              Sign in
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

export default NewSignUp;
