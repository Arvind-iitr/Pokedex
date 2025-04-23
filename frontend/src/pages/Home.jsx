//landing page where we show the user to login or signup 
//also present some pokmons and their details
import React from 'react'
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import * as motion from "motion/react-client"

export const Home = () => {
  const navigate = useNavigate();

  return (
    
      <div className="homepage-wrapper">
        <motion.div className="home-pokemon-img"
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
             duration: 0.4,
             scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
         }}>
          <img src="/svg/pikachu.svg" alt="pikachu image" />
        </motion.div>
        <div className="welcome-message">
          <h1>Hi Trainer!</h1>
          <p>Welcome To Pokedex</p>
        </div>
        <button onClick={() => navigate("/signup")}>Start Your Journey</button>
      </div>
    
  )
}
