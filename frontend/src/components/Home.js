import React from 'react';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <h1>Welcome to Margem Techno</h1>
        <p>MADE FOR HARD.</p>
      </section>
    </div>
  );
}

export default Home;