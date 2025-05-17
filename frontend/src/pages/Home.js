import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logos/MTFundo.png';
import eletrica from '../assets/backgimages/eletrica.png';
import madeforhard from '../assets/backgimages/madeforhard.png';

function Home() {
  return (
    <div className="home">
      <div className="homepage-logo-container">
        <img src={logo} alt="MargemTechno Logo" className="homepage-logo" />
      </div>
      <div className="homepage-logo-container">
        <img src={madeforhard} className="madeforhard" />
      </div>
      <div>
        <img src={eletrica} className="homebackg" />
      </div>
    </div>
  );
}

export default Home;