//login from,  options like forgot pass, create account

import React, { useState , useEffect} from 'react';
import "../styles/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { login } from '../api/authServices';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const {isLogin, setIsLogin} = useAppContext();

    
    useEffect(() => {
      console.log(isLogin);
      if (isLogin) {
          navigate("/pokepage");
      }
  }, [isLogin]);
  

    const handleLogin = async(e) => {
      e.preventDefault();
      //Send login request to backend
      try {
        const response = await login(email, password);
        console.log(response);
        if(response.data.success === true){
          toast.success(response.data.message);
          setIsLogin(true);
          navigate('/pokepage');
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handleForgotPasssword = () => {
       navigate("/reset-otp");
    }
    
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back, Trainer!</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="ash@pokemon.com" value = {email} onChange={(e) => setEmail(e.target.value)}/>
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
                    <span className='eye' onClick={()=> setShowPassword(!showPassword)} >{showPassword? <IoIosEye size={24} />: <IoIosEyeOff size={24} />  }</span> 
                  </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to={"/signup"}>Signup</Link>
        </p>
        <p className="login-footer">
          Forgot password? <Link to={"/reset-otp"} onClick={handleForgotPasssword} >Reset password</Link>
        </p>
      </div>
    </div>
  );
};


