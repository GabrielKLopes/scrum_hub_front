import React from 'react';
import { FaHome, FaProjectDiagram, FaInfoCircle, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`relative bg-customBg h-screen flex flex-col items-center p-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-24'
      }`}
      style={{ paddingTop: '4rem' }} 
    >
      <ul className="w-full mt-5">
        <li className="flex items-center space-x-4 p-2 hover:bg-customInput hover:rounded-lg transition-all">
          <FaHome className="text-orange-500 text-2xl" />
          <span className={`text-orange-500 text-lg ${!isOpen && 'hidden'} transition-all`}>
            Home
          </span>
        </li>
      </ul>

      <div className={`mt-auto flex items-center justify-center p-4 ${isOpen ? 'flex' : 'flex-col items-center'}`}>
        <div className={`w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center transition-all ${isOpen ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <span className="text-white text-2xl">G</span>
        </div>

        <div className={`ml-3 text-white ${!isOpen ? 'hidden' : 'flex'}`}>
          <p className="text-lg">Nome Fictício</p>
          <p className="text-sm">Tipo: Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
