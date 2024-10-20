import { ReactNode } from "react"

export interface IRegisterUser{
    name: string
    email: string
    password: string
}

export interface ILoginUser{
    email: string
    password: string
}

export interface ErrorResponse {
    message: string; 
  }

export interface SidebarProps {
    isOpen: boolean; 
    toggleSidebar: () => void;
}
export interface LayoutProps {
    children: ReactNode; 
  }
  
export interface NavbarProps {
    toggleSidebar: () => void; 
  }