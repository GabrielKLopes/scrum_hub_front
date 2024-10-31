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
    <div className="flex h-screen w-screen bg-customBgLight">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col ml-20">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow w-full h-full overflow-y-auto mt-20 scrollbar scrollbar-thumb-customInput scrollbar-track-transparent scrollbar-thumb-rounded">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
