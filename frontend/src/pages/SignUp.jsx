//create account or signup page

import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import { signup, sendOtp } from '../api/authServices';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import { LoaderCircle } from 'lucide-react';


export const Signup = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [trainerName, setTrainerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useAppContext();

  const handleSignup = async (e) => {
    setIsSigning(true);
    e.preventDefault();
    try {
      const response = await signup(trainerName, email, password);
      console.log(response.data);
      if (response.data.success === true) {
        toast.success(response.data.message);
        setIsLogin(true);
        setIsSigning(false)//for loading state
        navigate('/pokepage')
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigning(false);
    }
  };

  if (isSigning) return <div className="loader-container">
    <LoaderCircle className="loader-icon" size={48} />
    <p>Signing up</p>
  </div>

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
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='eye' onClick={() => setShowPassword(!showPassword)} >{showPassword ? <IoIosEye size={24} /> : <IoIosEyeOff size={24} />}</span>
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


