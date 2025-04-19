//verify otp 

import React, { useState } from 'react';
import '../styles/VerifyOTP.css';
import { useNavigate } from 'react-router-dom';

export const VerifyOTP = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    console.log('Entered verification code:', code);
    // Add code verification logic here

    navigate("/");

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


