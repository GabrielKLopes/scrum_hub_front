import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean; 
}

const InputForm: React.FC<InputProps> = ({ 
  type, 
  value, 
  onChange, 
  placeholder, 
  label, 
  onKeyDown, 
  readOnly 
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly} 
        className={`shadow appearance-none border border-orange-700 rounded py-3 px-4 bg-customBgLight3
          text-orange-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-700 w-full pr-10 
          ${readOnly ? 'cursor-not-allowed' : ''}`}
        onKeyDown={onKeyDown} 
      />
    </div>
  );
};

export default InputForm;
