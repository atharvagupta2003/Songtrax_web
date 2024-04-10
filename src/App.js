// Imports react core library
import React from 'react';
// From React-router-dom library importing compinent for navigation without reloads
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// HTML5 api histort to keep user interface in sync
// Importing React components from respective files
import EditSample from './components/EditSample';
import HomeScreen from './components/HomeScreen';
import Share from './components/Share';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes> 
            <Route path="/" element={<HomeScreen />} />
            <Route path="/create" element={<EditSample />} />
            <Route path="/share/:id" element={<Share />} />
            <Route path="/edit/:id" element={<EditSample />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
