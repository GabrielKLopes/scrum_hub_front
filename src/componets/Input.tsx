import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password';
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
      {label && <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly} 
        className="shadow appearance-none border border-orange-600 rounded py-3 px-4 bg-customBg
          text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 w-full pr-10"
        onKeyDown={onKeyDown} 
      />
    </div>
  );
};

export default InputForm;
