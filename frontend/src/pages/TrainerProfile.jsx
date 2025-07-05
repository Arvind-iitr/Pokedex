//trainer dashboard with details and the pokemon they have catched

import React, { useState, useRef } from 'react'
import "../styles/TrainerProfile.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MdEdit } from "react-icons/md";
import { AboutUser } from '../components/user/AboutUser';
import { logout, sendOtp } from '../api/authServices';
import { updateProfile } from '../api/api';
import { toast } from 'react-toastify';
import { PokemonCatches } from '../components/user/PokemonCatches';
import { Loader } from '../components/IU/Loader';

export const TrainerProfile = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("about");
  const [isUploading, setIsUploading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const { userData, isLogin, setIsLogin, getUserData } = useAppContext();

  const handleLogout = async () => {  //log out the user and navigate to the home page
    try {
      const res = await setIsLogin(false);
      logout();
      navigate('/');
      console.log("logout", res);


    } catch (error) {
      console.log("logouterr", error);
    }
  }

  //logic for sending verification otp
  const handleSendOtp = async () => {
    setIsSendingOtp(true)
    try {
      const res = await sendOtp();
      if (res.data.success === true) {
        setIsSendingOtp(false);
        toast.success("verification OTP sent successfully. Please check spam");
        navigate('/verify-otp');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error sending otp", error);
    } finally {
      setIsSendingOtp(false)
    }
  }

  //update user profile pic logic
  const fileInputRef = useRef(null);

  const handleClick = () => {fileInputRef.current.click();};

  const handleImageUpload = async (event) => {
    setIsUploading(true);
    console.log("uploading", isUploading);
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please select an image");
      setIsUploading(false);
      return;
    }

    console.log("file", file.size);

    //check file size
    if (file.size > 1024 * 1024 * 5) { // 5MB
      toast.error("File size should not exceed 5MB");
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      console.log("base64Image", base64Image);

      try {
        const response = await updateProfile({ profilePic: base64Image });
        if (response.data.success === true) {
          console.log("Profile Pic updated successfully");
          toast.success("Profile Pic updated successfully");
          getUserData(); // update user data in the context after profile pic update
        } else {
          toast.error(response.data.message || "Upload failed");
        }
        console.log("uploading res", response.data);
      } catch (error) {
        console.log("Error in updating profile pic:", error);
        toast.error("Something went wrong");
      } finally {
        setIsUploading(false);
        console.log("uploading done", isUploading);
      }
    };

    reader.readAsDataURL(file); // 🟢 THIS WAS MISSING
  };


  if (isSendingOtp) return (
    <div>
      <h1>Sending OTP...</h1>
      <Loader />
    </div>
  )

  return (
    <div className='profile-container'>
      <div className="trainer-card">
        <div className="trainer-card-upper-section">
          <div className="profile-pic-container">
            <div className="user-profile-div">
              {userData?.profilePic ? <img src={userData.profilePic} alt="user profile" /> : <h1>{userData ? userData.username.charAt(0).toUpperCase() : "A"}</h1>}

            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <span onClick={handleClick} >Edit Profile<MdEdit /></span>

          </div>
          <div className="bhaimon">
            <div className="right-upper-div">
              <div className="trainer-info-container">
                <h2>{userData?.username}</h2>
                <h3>Trainer ID: 123456</h3>
              </div>
              <div className="logout-verify">
                <button className='pokemon-button' onClick={handleLogout}>Logout</button>
                {!userData?.isverified && <button className='pokemon-button' onClick={handleSendOtp} >{`Verify\u00A0`} </button>}
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
                Pokémons
              </button>
            </nav>
          </div>

        </div>
        <div className="trainer-profile-main-area">
          {activeTab === "about" && <AboutUser />}
          {activeTab === "catches" && <PokemonCatches />}
        </div>

      </div>

    </div>
  )
}
