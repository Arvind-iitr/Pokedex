//landing page where we show the user to login or signup 
//also present some pokmons and their details
import React from 'react'
import "../styles/Home.css"

export const Home = () => {
  return (
    
      <div className="homepage-wrapper">
        <div className="home-pokemon-img">
          <img src="/svg/pikachu.svg" alt="pikachu image" />
        </div>
        <div className="welcome-message">
          <h1>Hi Trainer!</h1>
          <p>Welcome To Pokedex</p>
        </div>
        <button>Start Your Journey</button>
      </div>
    
  )
}
