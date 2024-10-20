// components/Navbar.jsx
import React from 'react';
import logoOrange from "../assets/logo_orange.png";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-customBg p-4 h-20 flex items-center justify-between z-10">
      <button
        onClick={toggleSidebar}
        className="text-orange-500 text-3xl focus:outline-none rounded-full p-2 "
      >
        &#9776;
      </button>
      
      <img src={logoOrange} alt="Logo Orange" className="w-24 h-24" />
    </nav>
  );
};

export default Navbar;
