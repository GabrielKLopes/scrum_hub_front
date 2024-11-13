import React from "react";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { SidebarProps } from "../interface/components";
import { getUserDataFromToken } from "../service/tokenService";
import { useNavigate } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { GoProject } from "react-icons/go";

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const userData = getUserDataFromToken();

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

  const handleHome = () =>{
    navigate("/home")
  }
  
  const handleSquads = () => {
    navigate("/squads");
  };

  const handleProjects = () =>{
    navigate("/projects")
  }

  const permissionId = userData?.permissionId;
  const permissionUserId = userData?.permissionUserId;
  const username = userData?.username || "Usuário";
  const userType = userData?.userType;

  return (
    <div
      className={`bg-customBgLight2 h-screen flex flex-col items-center p-4 duration-300 ${
        isOpen ? "w-64" : "w-20"
      } shadow-xl hidden md:flex`}
      style={{
        paddingTop: "4rem",
        transition: "width 0.3s ease, padding 0.3s ease",
      }}
    >
      <ul className="w-full mt-5 space-y-4">
        <li className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer" onClick={handleHome}>
          <FaHome className="text-orange-700 text-2xl" />
          <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
            Inicio
          </span>
        </li>
        <li
          className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
          onClick={handleSettingsClick}
        >
          <FaGear className="text-orange-700 text-2xl" />
          <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
            Configurações
          </span>
        </li>
        {permissionId === 1 && (
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleUsers}
          >
            <FaUser className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
              Usuários
            </span>
          </li>
        )}
        {(permissionId === 1 || permissionUserId === 1) && (
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleSquads}
          >
            <MdGroups  className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
              Squads
            </span>
          </li>
        )}
          {(permissionId === 1 || permissionUserId === 1) && (
          <li
            className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
            onClick={handleProjects}
          >
            <GoProject   className="text-orange-700 text-2xl" />
            <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
              Projetos
            </span>
          </li>
        )}
        <li
          className="flex items-center space-x-4 p-2 hover:bg-customBgLight3 hover:rounded-lg transition-all cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-orange-700 text-2xl" />
          <span className={`text-orange-700 text-lg ${!isOpen && "hidden"}`}>
            Sair
          </span>
        </li>
      </ul>
      <div className={`mt-auto flex items-center ${isOpen ? "p-4" : "p-2"}`}>
        <div
          className={`rounded-full bg-orange-700 flex items-center justify-center transition-all ${
            isOpen ? "w-16 h-16" : "w-12 h-12"
          }`}
        >
          <span className="text-gray-300 text-2xl">G</span>
        </div>
        {isOpen && (
          <div className="ml-3 flex flex-col text-gray-700">
            <p className="text-lg">{username}</p>
            <p className="text-sm">{userType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
