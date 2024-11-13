import React from "react";
import panda from "../assets/panda404.png"; 

const UnderDevelopment: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <img src={panda} alt="Panda" className="mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700">Funcionalidade em Desenvolvimento</h1>
        <p className="mt-2 text-gray-500">Estamos trabalhando nisso! Volte logo.</p>
      </div>
    </div>
  );
};

export default UnderDevelopment;
