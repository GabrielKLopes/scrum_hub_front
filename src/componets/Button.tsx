import React from "react";

interface ButtonProps{
    onClick?: () => void;
    children: React.ReactNode;
    className?:string;
    disabled?: boolean; 

}

const Button: React.FC<ButtonProps> = ({ onClick, className, disabled, children }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-customButton text-white py-2 px-5 rounded-lg shadow-lg hover:bg-red-600 transition ${className}`}
      >
        {children}
      </button>
    );
};

export default Button;