import './App.css';
import { Search } from './components/search';
import { Home } from './components/Home';
import { useState } from 'react';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <><div className='App-header'>
      <header>
        <img src="../images/popcorn.png" alt="popcorn" />
        <h2 id="heading">Movie Mania!</h2>
      </header>
    </div>
    <Search onSearch={handleSearch} />
    <Home searchQuery={searchQuery} /></>
  );
}

export default App;
