import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logos/MTFundo.png';

function Home() {
  return (
    <div className="home">
      <div className="homepage-logo-container">
        <img src={logo} alt="MargemTechno Logo" className="homepage-logo" />
      </div>
      <section className="hero">
        <h1>MADE FOR HARD</h1>
      </section>
    </div>
  );
}

export default Home;