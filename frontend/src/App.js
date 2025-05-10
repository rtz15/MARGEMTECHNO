import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Events from './pages/Events';
import Videos from './pages/Videos';
import MTSessions from './pages/MTSessions';
import OurTeam from './pages/OurTeam';
import Shop from './pages/Shop';
import MTNation from './pages/MTNation';
import Navbar from './components/Navbar';
import './App.css'; // Import your global CSS file

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/mt-sessions" element={<MTSessions />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mt-nation" element={<MTNation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;