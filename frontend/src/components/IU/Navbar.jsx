import React, { useRef, useState } from 'react';
import "./Navbar.css";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { search, setSearch } = useAppContext();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async(event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file); // "image" should match the field your API expects

    // try {
    //   const response = await fetch('/api/gemini/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error('Upload failed');
    //   }

    //   const result = await response.json();
    //   console.log('Upload success:', result);
    //   // You can display result or route based on it

    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // } define the API endpoint and method for uploading images.
  };

  return (
    <>
      <nav className="pokemon-navbar glassy">
      <input
        ref ={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
        <div className="logo">
          <img src="/image/logo.png" alt="Pokémon Logo" />
        </div>
        <div className='searchbar-container'>
          <input type="text" className='nav-input' value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="nav-search-icons">
            <FaCamera size={20} onClick={handleClick} />
          </div>
        </div>
        <div className="profile-icon" onClick={() => setShowMenu(!showMenu)}>
          <IoMdMenu size={36} />
        </div>
      </nav>

      {/* Move this outside the <nav> */}
      {showMenu && (
        <div className="nav-menu">
          <ul>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/dailies"}>Daily Task</Link></li>
            <li><Link to={"/news"}>News</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
