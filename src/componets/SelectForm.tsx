import React from 'react';

interface SelectProps {
  value: number; 
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string; 
  options: { value: number; label: string }[];
}

const SelectForm: React.FC<SelectProps> = ({ value, onChange, label, options }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-400 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="shadow appearance-none border border-orange-600 rounded py-3 px-4 bg-customBg
          text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 w-full"
      >
        <option value={0}>Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
