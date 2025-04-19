//login from,  options like forgot pass, create account

import React, { useState } from 'react';
import "../styles/Login.css"
import { Link } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");


  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back, Trainer!</h1>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="ash@pokemon.com" value = {email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" value = {password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};


