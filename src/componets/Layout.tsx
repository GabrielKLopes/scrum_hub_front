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
      <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <Sidebar isOpen={isOpen} className="hidden md:flex" />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow w-full mt-16 h-full overflow-y-auto scrollbar scrollbar-thumb-customInput scrollbar-track-transparent scrollbar-thumb-rounded">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
