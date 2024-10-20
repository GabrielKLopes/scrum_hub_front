// components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-customInput">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />

        <main
          className={`flex-grow p-6 transition-all duration-300 ${
            isOpen ? 'ml-64' : 'ml-20'
          } md:ml-0`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
