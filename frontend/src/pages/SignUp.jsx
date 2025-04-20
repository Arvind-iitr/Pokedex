//create account or signup page

import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye , IoIosEyeOff} from "react-icons/io";
import axios from 'axios';
import { signup , sendOtp } from '../api/authServices';
import { toast } from'react-toastify';

export const Signup = () => {
  const [trainerName, setTrainerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      const response =  await signup(trainerName, email, password);
      console.log(response.data);
      if(response.data.success === true){
         toast.success(response.data.message);
         const otpresponse = await sendOtp();
         if(otpresponse.data.success === true){
            toast.success(otpresponse.data.message);
            navigate('/verify-otp');}
            else{
              toast.error(otpresponse.data.message);
            }
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Join the Pokémon League!</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Trainer Name</label>
            <input
              id="name"
              type="text"
              placeholder="Ash Ketchum"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type= {showPassword? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='eye' onClick={()=> setShowPassword(!showPassword)} >{showPassword?<IoIosEye size={24} />: <IoIosEyeOff size={24} />}</span> 
          </div>

        

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account?<Link to={"/login"}
          >Login</Link>
        </p>
      </div>
    </div>
  );
};


