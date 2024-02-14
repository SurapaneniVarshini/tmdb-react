import React, { useState } from "react";
import './Search.css';
import {FaSearch} from 'react-icons/fa';


interface SearchVars {
    onSearch: (query: string) => void;
  }

export const Search = ({ onSearch }: SearchVars) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuery(value);
        onSearch(value);
      };
      
    return (
        <div className="search">
            <FaSearch />
            <input type="text" placeholder="Search for Movies..." value={query} onChange={handleChange} />
        </div>
    );
};