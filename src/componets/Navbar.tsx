import React, { useState } from "react";
import logoOrange from "../assets/logo_orange.png";
import { NavbarProps } from "../interface/components";
import SearchInput from "./SerchInput";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { getUserDataFromToken } from "../service/tokenService";
import { GoProject } from "react-icons/go";

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userData = getUserDataFromToken();
  const handleMenuClick = () => {
    toggleSidebar();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenSecurity");
    navigate("/");
  };
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleSquads = () => {
    navigate("/squads");
  };

  const handleProjects = () => {
    navigate("/projects");
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const permissionId = userData?.permissionId;
  const permissionUserId = userData?.permissionUserId;
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
        <ul className="fixed top-20 left-0 w-full bg-customBgLight2 text-orange-600 shadow-2xl md:hidden z-10">
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleHome}
          >
            <FaHome className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg`}>Inicio</span>
          </li>
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleSettingsClick}
          >
            <FaGear className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg`}>Configurações</span>
          </li>
          {permissionId === 1 && (
            <li
              className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
              onClick={handleUsers}
            >
              <FaUser className="text-orange-700 text-2xl" />
              <span className={`text-orange-700 text-lg`}>Usuários</span>
            </li>
          )}
          {(permissionId === 1 || permissionUserId === 1) && (
            <li
              className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
              onClick={handleSquads}
            >
              <MdGroups className="text-orange-700 text-2xl" />
              <span className={`text-orange-700 text-lg`}>Squads</span>
            </li>
          )}
          {(permissionId === 1 || permissionUserId === 1) && (
            <li
              className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
              onClick={handleProjects}
            >
              <GoProject className="text-orange-700 text-2xl" />
              <span className={`text-orange-700 text-lg `}>Projetos</span>
            </li>
          )}
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg`}>Sair</span>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
