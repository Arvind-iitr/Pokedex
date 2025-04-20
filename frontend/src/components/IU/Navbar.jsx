import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import "./Navbar.css"; // Link to the CSS we'll define below"


const Navbar = () => {
  return (
    <nav className="pokemon-navbar glassy">
      <div className="logo">
        <img src="/image/logo.png" alt="Pokémon Logo" />
      </div>
      <div>
        <input type="text" className='nav-input' />
      </div>
      <div className="profile-icon">
        <FaUserCircle size={38} />
      </div>
    </nav>
  );
};

export default Navbar;
