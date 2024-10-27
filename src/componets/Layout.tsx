import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { LayoutProps } from '../interface/components';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-customInput">
      <Sidebar isOpen={isOpen} className="hidden md:block" /> 
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-24'}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow w-full mt-16 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
