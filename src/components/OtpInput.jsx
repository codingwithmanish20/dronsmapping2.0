import React, { useEffect, useRef, useState } from "react";
import "../style/login.css";

const OtpInput = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    console.log(newOtp, "otpdatafound");
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combineOtp = newOtp.join("");
    if (combineOtp.length == length) {
      onOtpSubmit(combineOtp);

      // move to the next inputbox 
      if(value && index < length-1 && inputRefs.current[index+1]){
        inputRefs.current[index+1].focus();
      }
    }
    // console.log(combineOtp,'otpDatafound')
  };
  const handleClick = () => {};
  const handleKeyDown = (index,e) => {
    // if(e.key==="Backspace" && !otp[input] && index>0 && inputRefs.current[index-1]){inputRefs.current[index-1].focus()}

  };
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // we are using useRef here to get the Otp input value

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <>
            <input
              key={index}
              type="text"
              value={value}
              ref={(input) => inputRefs.current[index] == input}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="OtpInput"
            />
          </>
        );
      })}
    </div>
  );
};

export default OtpInput;
