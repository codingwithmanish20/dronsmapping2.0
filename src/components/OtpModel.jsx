import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import Logo from "../Images/logo2.png";
import "../style/otp.css";
import { NavLink, useNavigate,useHistory } from "react-router-dom";


const OtpModel = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [time, setTime] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [OtpTitle, setOtpTitle] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const retrievedData = localStorage.getItem("OtpTitle");
    if (retrievedData) {
      setOtpTitle(retrievedData);
    }
  }, []);

  const retrievedData = localStorage.getItem("OtpTitle");

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendVisible(true);
    }
  }, [time]);

  const handleOtpChange = (otp) => {
    const numericValue = otp.replace(/\D/g, "");
    setOtp(numericValue);
  };

  const handleSubmit = () => {
    navigate('/');
    // Add logic to handle OTP
    console.log("OTP Submitted:", otp);
  };

  const handleResend = () => {
    setTime(60);
    setIsResendVisible(false);
    console.log("OTP Resend");
  };
  let resultdata = 123456;
  return (
    <div className="forgot-password-container">
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

        {resultdata == otp ? (
          <button onClick={handleSubmit} className="reset-button">
            Login
          </button>
        ) : (
          <button onClick={null} className="reset-button" style={{backgroundColor:"grey"}}>
            Login
          </button>
        )}

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
