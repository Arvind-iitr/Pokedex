import React, { useState } from 'react';
import '../styles/ResetOTP.css';
import { Link } from 'react-router-dom';

export const ResetOTP = () => {
  const [email, setEmail] = useState('');

  const handleResetRequest = (e) => {
    e.preventDefault();
    console.log('Password reset request sent to:', email);
    // Logic to send OTP goes here (e.g., API call)
  };

  

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h1 className="reset-title">Reset Your Password</h1>
        <p className="reset-subtext">Enter your email and we’ll send you a verification code.</p>
        <form className="reset-form" onSubmit={handleResetRequest}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="ash@pokemon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-button">Send OTP</button>
        </form>
      </div>
    </div>
  );
};
