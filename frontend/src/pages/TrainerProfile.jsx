//trainer dashboard with details and the pokemon they have catched

import React, { useState } from 'react'
import "../styles/TrainerProfile.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MdEdit } from "react-icons/md";
import { AboutUser } from '../components/user/AboutUser';
import { logout } from '../api/authServices';

export const TrainerProfile = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("about");
  const { userData, isLogin, setIsLogin } = useAppContext();

  const handleLogout = async () => {
    try {
      const res = await setIsLogin(false);
      logout();
      navigate('/');
      console.log("logout", res);
    } catch (error) {
       console.log("logouterr" ,error);
    }
  }

  return (
    <div className='profile-container'>
      <div className="trainer-card">
        <div className="trainer-card-upper-section">
          <div className="profile-pic-container">
            <div className="user-profile-div">
              {userData?.image ? <img src={userData.image} alt="user profile" /> : <h1>{userData ? userData.username.charAt(0).toUpperCase() : "A"}</h1>}

            </div>
            <span>Edit Profile<MdEdit /></span>

          </div>
          <div className="bhaimon">
            <div className="right-upper-div">
              <div className="trainer-info-container">
                <h2>Trainer Name</h2>
                <h3>Trainer ID: 123456</h3>
              </div>
              <div className="logout-verify">
                <button className='pokemon-button' onClick={handleLogout}>Logout</button>
                {!userData?.isverified && <button className='pokemon-button'>{`Verify\u00A0`} </button>}
              </div>
            </div>
            <nav className="profile-navbar">
              <button
                className={activeTab === "about" ? "p-active" : ""}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={activeTab === "catches" ? "p-active" : ""}
                onClick={() => setActiveTab("catches")}
              >
                Pokémon Catches
              </button>
            </nav>
          </div>

        </div>
        <div className="trainer-profile-main-area">
          {activeTab === "about" && <AboutUser />}
          {activeTab === "catches" && <h1>Pokémon Catches</h1>}
        </div>
      </div>

    </div>
  )
}
