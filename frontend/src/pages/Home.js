import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
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
      {/* Destaque Evento */}
      <div className="home-section">
        <h2>NEXT EVENT</h2>
        <p>SOON WE WILL GIVE MORE DETAILS ABOUT A NEW RAVE. GET READY!</p>
        <Link to="/events" className="event-btn">SEE EVENTS</Link>
      </div>
      <div className="home-section">
        <h2>LAST SET</h2>
        <p>LISTEN TO THE NEW HERNAS' SET ON ESTRAGO</p>
        <iframe
          width="300"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://www.youtube.com/embed/ua76F7kYAtA?start=2228"
        ></iframe>
        <Link to="/mt-sessions" className="event-btn">SEE SESSIONS</Link>
      </div>
      {/* Produto em Destaque */}
      <div className="home-section">
        <h2>OUR MAIN PRODUCT</h2>
        <img src="/products/Tshirt_MT_2dvOzd8.png" alt="MARGEM TSHIRT" />
        <p>TSHIRT Margem Techno — 20€</p>
        <Link to="/shop" className="event-btn">SEE STORE</Link>
      </div>

      {/* Testemunhos da Comunidade */}
      <div className="home-section">
        <h2>FROM OUR COMMUNITY</h2>
        <blockquote>"MARGEMTECHNO IS MORE THAN A GROUP, IT'S A TRIBE."</blockquote>
        <blockquote>"THE PARTIES ARE INSANE 🔥. ONLY PURE TECHNO."</blockquote>
        <blockquote>"MT SESSIONS? MANDATORY RITUAL."</blockquote>
      </div>
    </div>
  );
}

export default Home;