import React,{useState} from 'react';
import OtpInput from './OtpInput';

const OtpModel = () => {
  const [phoneNumber,setPhoneNumber] = useState("");
  const [showOtpInput,setShowOtpInput] = useState(false);

// here i am going to make Custome OTP Model 

const handelPhoneNumber = (event)=>{
  setPhoneNumber(event.target.value);
}

const handelPhoneSubmit = (event)=>{
  event.preventDefault();
  
  // phone Number Validation using regex
  const regex = /[^0-9]/g;
  if(phoneNumber.length < 10 || regex.test(phoneNumber)){
    alert("Invalid Phone Number");
    return;
  }else{
    setShowOtpInput(true);
  }
  // call Api here 
  // Show OTP
}

const onOtpSubmit = (otp)=>{
  console.log('login otp success',otp)
}


  return (
    <div>
      {/* creating a form for input of Otp number */}
      {
        !showOtpInput ? 
      <form onSubmit={handelPhoneSubmit}>
        {/* taking a input for number field */}
        <input type="text" value={phoneNumber} onChange={handelPhoneNumber} placeholder='Enter Phone Number'/>  
        <button type='submit'>Submit</button> 
        </form>  : <>
        <p>Enter OTP send to {phoneNumber}</p>
        <OtpInput length = {4} onOtpSubmit = {onOtpSubmit} />
        
        </>
      }
    </div>
  )
}

export default OtpModel