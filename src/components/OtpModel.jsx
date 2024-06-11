import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import Logo from "../Images/logo2.png";
import "../style/otp.css";
import { NavLink, useNavigate,useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";
import api from '../services'
import { errorHandler } from "../helper/handleError";
import useToast from "../hooks/useToast";
import Loading from "../shared/Loading";
const OtpModel = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [time, setTime] = useState(60);
  const [OtpTitle, setOtpTitle] = useState("");

const [loading,setLoading]=useState(false)
const toast=useToast()
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const retrievedData = localStorage.getItem("OtpTitle");
    if (retrievedData) {
      setOtpTitle(retrievedData);
    }
  }, []);



  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } 
  }, [time]);

  const handleOtpChange = (otp) => {
    const numericValue = otp.replace(/\D/g, "");
    setOtp(numericValue);
  };

  const handleVerify = async() => {
    setLoading(true)
    const auth=JSON.parse(localStorage.getItem('auth'))
    if(auth?.email){
      const payload={
        email:auth.email,otp
      }
    try {
      const res=await api.register.otpVerification(payload)
      if(res.status===200){
        setLoading(false)
        toast('Logged in successfully.','success')
      }
    } catch (error) {
      console.log(error)
      if(error.response.status===400 && error?.response?.data){
      toast('Please enter a valid OTP.','z')
      setOtp("")
      setLoading(false)
      return

      }
      const errorMessage=errorHandler(error)
      toast(errorMessage,'error')
      setLoading(false)
      
    }

    }

  
  };

  const handleResend =async () => {
  setLoading(true)
    try {

      const authData=JSON.parse(localStorage.getItem('auth'))

      const res=await api.register.login(authData)
      if(res.status===201){
        setLoading(false)
        setTime(60);
      }
    } catch (error) {
      const errorMessage=errorHandler(error)
      toast(errorMessage,'error')
      setLoading(false)
    }
    
  };
  let isDisabled=otp?.length!==6
  return (
    <div className="forgot-password-container">
      <Loading isVisible={loading} />
      <div className="forgot-password-main">
        <img
          src={Logo}
          alt="Logo"
          style={{ marginBottom: "30px", width: "80%" }}
        />
        <h1 style={{ marginLeft: "-317px" }}>{OtpTitle}</h1>
        <p>Please enter the OTP sent to your registered email ID.</p>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          separator={<span>-</span>}
          inputStyle="otp-input"
          renderInput={(props) => <input {...props} />}
        />

        {/* {resultdata == otp ? (
          <button onClick={handleSubmit} className="reset-button">
            Login
          </button>
        ) : (
          <button onClick={null} className="reset-button" style={{backgroundColor:"grey"}}>
            Login
          </button>
        )} */}
        <Box mt={4}>

        <Button
          variant="contained"
          fullWidth
          className="loginBtn"
          onClick={handleVerify}
          disabled={isDisabled || loading}  
           


        >
           {loading ? (
                      <CircularProgress size={'1.3rem'}  style={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
        </Button>
        </Box>

        <div className="timer-container">
          <p style={{ fontSize: "12px" }}>Remaining time: 00:{time}s</p>
          <p onClick={handleResend} style={{ fontSize: "12px" }}>
            Don't get the code? <span className="resend-link">Resend</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpModel;
