import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search } from './components/search';
import { Home } from './components/Home';
import { NowPlaying } from './components/NowPlaying';
import { TopRated } from './components/TopRated';
import { Upcoming } from './components/Upcoming';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div>
        <div className='App-header'>
          <header>
            <img src="../images/popcorn.png" alt="popcorn" />
            <h2 id="heading">MOVIE MANIA!</h2>
          </header>
        </div>
        <div className='navbar'>
          <ul>
            <li><Link to="/popular">Popular</Link></li>
            <li><Link to="/nowPlaying">Now Playing</Link></li>
            <li><Link to="/upcoming">Upcoming</Link></li>
            <li><Link to="/topRated">Top Rated</Link></li>
          </ul>
        </div><br />
        <Search onSearch={handleSearch} /><br />
        <Routes>
          <Route path="/popular" element={<Home searchQuery={searchQuery} />} />
          <Route path="/nowPlaying" element={<NowPlaying searchQuery={searchQuery} />} />
          <Route path='/upcoming' element={<Upcoming searchQuery={searchQuery} />} />
          <Route path='/topRated' element={<TopRated searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
