import './App.css';
import Search from './components/Search';
import React from 'react';
import Allgames from './components/Allgames.jsx';


function App() {
  return (
    <div className="App">
      <Search></Search>
      <Allgames></Allgames>
    </div>
  );
}

export default App;
