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
        delayedSearch(value);
      };

    const debounce = (func: Function, delay: number) => {
        let timeoutId: number;
        return function (this: any, ...args: any[]) {
          clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => func.apply(this, args), delay);
        };
      };
    
      const delayedSearch = debounce((value: string) => {
        if (value.trim() !== '') {
          onSearch(value);
        }
      }, 750);

      
    return (
        <div className="search">
            <FaSearch />
            <input type="text" placeholder="Search for Movies..." value={query} onChange={handleChange} />
        </div>
    );
};