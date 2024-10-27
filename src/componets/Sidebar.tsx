import React from 'react';
import { FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { SidebarProps } from '../interface/components';
import { getUserDataFromToken } from '../service/tokenService';
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const userData = getUserDataFromToken();

  const handleLogout = () => {
    localStorage.removeItem('tokenSecurity');
    navigate("/");
  }
  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleUsers = () => {
    navigate("/users");
  };
  const permissionId = userData?.permissionId; 
  const username = userData?.username || 'Usuário';
  const userType = userData?.userType;

  return (
    <div
      className={`bg-customBg h-screen flex flex-col items-center p-4 duration-300 ${
        isOpen ? 'w-64' : 'w-24'
      } shadow-xl hidden md:flex`} // <-- Oculte o Sidebar em telas pequenas
      style={{
        paddingTop: '4rem',
        transition: 'width 0.3s ease, padding 0.3s ease',
      }}
    >
      <ul className="w-full mt-5">
        <li className="flex items-center space-x-4 p-2 hover:bg-customInput hover:rounded-lg transition-all">
          <FaHome className="text-orange-500 text-2xl" />
          <span className={`text-orange-500 text-lg ${!isOpen && 'hidden'}`}>
            Inicio
          </span>
        </li>
          <li className='flex items-center space-x-4 p-2 hover:bg-customInput hover:rounded-lg transition-all' onClick={handleSettingsClick}>
            <FaGear className="text-orange-500 text-2xl" />
            <span className={`text-orange-500 text-lg ${!isOpen && 'hidden'}`}>
              Configurações
            </span>
          </li>
         {permissionId === 1 && ( 
          <li className='flex items-center space-x-4 p-2 hover:bg-customInput hover:rounded-lg transition-all' onClick={handleUsers}>
            <FaUser className="text-orange-500 text-2xl" />
            <span className={`text-orange-500 text-lg ${!isOpen && 'hidden'}`}>
              Usuários
            </span>
          </li>
          
        )}
        <li 
          className='flex items-center space-x-4 p-2 hover:bg-customInput hover:rounded-lg transition-all cursor-pointer'
          onClick={handleLogout} 
        >
          <FaSignOutAlt className="text-orange-500 text-2xl" />
          <span className={`text-orange-500 text-lg ${!isOpen && 'hidden'}`}>
            Sair
          </span>
        </li>
      </ul>
      <div className={`mt-auto flex items-center justify-center p-4 ${isOpen ? 'flex' : 'flex-col items-center'}`}>
        <div className={`rounded-full bg-orange-500 flex items-center justify-center transition-all ${isOpen ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <span className="text-white text-2xl">G</span>
        </div>
        <div className={`ml-3 flex flex-col text-white ${!isOpen ? 'hidden' : 'flex'}`}>
          <p className="text-lg">{username}</p>
          <p className="text-sm">{userType}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
