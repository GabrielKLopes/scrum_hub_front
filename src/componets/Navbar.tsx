import React, { useState } from 'react';
import logoOrange from "../assets/logo_orange.png";
import { NavbarProps } from '../interface/components';


const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = () => {
    toggleSidebar();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-customBg p-4 h-20 flex items-center justify-between z-20 shadow-xl">
      <button
        onClick={handleMenuClick}
        className="text-orange-500 text-3xl focus:outline-none rounded-full p-2"
      >
        &#9776;
      </button>
      <img src={logoOrange} alt="Logo Orange" className="w-24 h-24" />

      {isDropdownOpen && (
        <ul className="fixed top-20 left-0 w-full bg-customBg text-white shadow-2xlg md:hidden z-10">
          <li className="w-full p-2 hover:bg-gray-700 cursor-pointer text-center">Inicio</li>
          <li className="w-full p-2 hover:bg-gray-700 cursor-pointer text-center">Configurações</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
