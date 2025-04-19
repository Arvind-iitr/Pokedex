//reset password

import React, { useState } from 'react';
import '../styles/ResetPassword.css'; // Link to the CSS we'll define below
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
 
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

   
    navigate('/login');
  };

  return (
    <div className="reset-otp-page">
      <div className="reset-otp-card">
        <h1 className="reset-otp-title">Reset Your Password</h1>
        <p className="reset-otp-subtext">Enter the OTP sent to your email and choose a new password.</p>

        <form className="reset-otp-form" onSubmit={handleReset}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ash@pokemon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-otp-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};
