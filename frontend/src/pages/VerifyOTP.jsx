//verify otp 

import React, { useEffect, useState } from 'react';
import '../styles/VerifyOTP.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { verifyOtp } from '../api/authServices';
import { toast } from'react-toastify';

export const VerifyOTP = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const {isLogin , userData , getUserData} = useAppContext();

  useEffect(() => {
    isLogin&&userData&&userData.isverified && navigate('/pokepage');  
  }, [isLogin, userData]);

  const handleVerify = async(e) => {
    e.preventDefault();
   
    // Add code verification logic here
    try {
      const response = await verifyOtp(code);
      if(response.data.success === true){
        toast.success(response.data.message);
        getUserData();
        navigate('/profile');
      }else{
        toast.error(response.data.message);
        setCode('');
      }
    } catch (error) {
       console.log(error);
       setCode('');
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h1 className="verify-title">Enter Verification Code</h1>
        <p className="verify-subtext">We’ve sent a code to your email. Please enter it below to verify your account.</p>
        
        <form className="verify-form" onSubmit={handleVerify}>
          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input
              id="code"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="verify-button">Verify</button>
        </form>

      
      </div>
    </div>
  );
};


