import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import "./Navbar.css"; // Link to the CSS we'll define below"
import { IoSearchOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';




const Navbar = () => {

  const navigate = useNavigate();

  const {search, setSearch } = useAppContext();

  return (
    <nav className="pokemon-navbar glassy">
      <div className="logo" >
        <img src="/image/logo.png" alt="Pokémon Logo" />
      </div>
      <div className='searchbar-container' >
        <input type="text" className='nav-input' value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="nav-search-icons">
        <FaCamera size={20} />
        </div>
      </div>
      <div className="profile-icon" onClick={()=>navigate('/profile')}>
      
        <FaUserCircle size={38} />
      </div>
    </nav>
  );
};

export default Navbar;
