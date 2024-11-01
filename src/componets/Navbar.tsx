import React, { useState } from 'react';
import logoOrange from "../assets/logo_orange.png";
import { NavbarProps } from '../interface/components';
import SearchInput from './SerchInput';

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuClick = () => {
    toggleSidebar();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-customBgLight2 p-4 h-20 flex items-center justify-between z-20 shadow-md">
      <button
        onClick={handleMenuClick}
        className="text-orange-700 text-3xl focus:outline-none rounded-full p-2"
      >
        &#9776;
      </button>
      
      <div className="flex-1 mx-4 flex justify-center">
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </div>

      <img src={logoOrange} alt="Logo Orange" className="w-24 h-24" />

      {isDropdownOpen && (
        <ul className="fixed top-20 left-0 w-full bg-customBg text-white shadow-2xl md:hidden z-10">
          <li className="w-full p-2 hover:bg-gray-700 cursor-pointer text-center">Inicio</li>
          <li className="w-full p-2 hover:bg-gray-700 cursor-pointer text-center">Configurações</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
