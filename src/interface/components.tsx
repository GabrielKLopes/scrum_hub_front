import { ReactNode } from "react";

export interface SidebarProps {
  isOpen: boolean;
  className?: string;
}
export interface LayoutProps {
  children: ReactNode;
}

export interface NavbarProps {
  toggleSidebar: () => void;

 
}
