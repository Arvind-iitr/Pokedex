import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import "./Navbar.css";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { findPokemon } from '../../api/gemini';

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

    const options = {
      maxSizeMB: 9,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: 'image/jpeg',
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64Image = await imageCompression.getDataUrlFromFile(compressedFile);//better way to compress and get base64 string

      //send the image to gemini route for identification
      const response = await findPokemon(base64Image);
      console.log('response in findpokemon',response.data.data);
      // const name = response.data.bhaimon.name.toLowerCase();
      // navigate(`/poke-details/${name}`);//redirect to the pokepage of the identified pokemon
      
    } catch (error) {
       console.log('Error compressing image:', error);
    }

    
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
