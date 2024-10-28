import React, { useState } from 'react';

interface SelectProps {
  id: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  options: { value: number; label: string }[];
  isOpen: boolean;
  setOpenId: (id: number | null) => void;
}

const SelectForm: React.FC<SelectProps> = ({ id, value, onChange, label, options, isOpen, setOpenId }) => {
  const handleSelect = (selectedValue: number) => {
    onChange(selectedValue);
    setOpenId(null);
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-gray-400 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div
        className="shadow appearance-none border border-orange-600 rounded-lg py-3 px-4 bg-customBg
          text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 w-full cursor-pointer"
        onClick={() => setOpenId(isOpen ? null : id)}
      >
        {options.find(option => option.value === value)?.label || 'Selecione'}
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-customBg border border-customBg rounded-lg shadow-lg z-10">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 text-orange-600 cursor-pointer hover:bg-customInput rounded-lg"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectForm;
