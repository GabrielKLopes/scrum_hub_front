import React from 'react';
import { FaSearch } from 'react-icons/fa'; 

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-1/2"> 
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar..."
        className="w-full p-2 pr-10 rounded-full border border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700"
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-700" />
    </div>
  );
};

export default SearchInput;
