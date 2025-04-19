//landing page where we show the user to login or signup 
//also present some pokmons and their details
import React from 'react'
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();
  return (
    
      <div className="homepage-wrapper">
        <div className="home-pokemon-img">
          <img src="/svg/pikachu.svg" alt="pikachu image" />
        </div>
        <div className="welcome-message">
          <h1>Hi Trainer!</h1>
          <p>Welcome To Pokedex</p>
        </div>
        <button onClick={() => navigate("/signup")}>Start Your Journey</button>
      </div>
    
  )
}
