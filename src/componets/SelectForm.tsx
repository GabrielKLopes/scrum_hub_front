import React from 'react';

interface SelectProps {
  id: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  options: { value: number; label: string }[];
  isOpen: boolean;
  readOnly?: boolean;
  setOpenId: (id: number | null) => void;
}

const SelectForm: React.FC<SelectProps> = ({ id, value, onChange, label, options, isOpen, setOpenId, readOnly }) => {
  const handleSelect = (selectedValue: number) => {
    if (!readOnly) {  // Evita seleção se for readOnly
      onChange(selectedValue);
      setOpenId(null);
    }
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div
        className={`shadow appearance-none border rounded-lg py-3 px-4 bg-customBgLight3 text-orange-700 leading-tight 
                    ${readOnly ? 'cursor-not-allowed' : 'cursor-pointer'} 
                    focus:outline-none focus:shadow-outline w-full border-orange-700`}
        onClick={() => !readOnly && setOpenId(isOpen ? null : id)}
      >
        {options.find(option => option.value === value)?.label || 'Selecione'}
      </div>
      {isOpen && !readOnly && (
        <div className="absolute mt-2 w-full bg-customBgLight3 border rounded-lg shadow-2lg z-10">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 text-orange-700 cursor-pointer  hover:bg-customBgLight2 hover:bg-opacity-70 rounded-sm"
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
