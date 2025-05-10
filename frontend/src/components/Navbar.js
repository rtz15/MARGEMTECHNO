import React from 'react';
import './Navbar.css';
import logo from '../assets/logos/logo-margemtechno.png';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-section left">
                <img src={logo} alt="Margem Techno" className="navbar-logo" />
            </div>
            <div className="navbar-section center">
                <ul className="navbar-menu">
                    <li><Link to="/events">EVENTS</Link></li>
                    <li><Link to="/videos">VIDEOS</Link></li>
                    <li><Link to="/mt-sessions">MT SESSIONS</Link></li>
                    <li><Link to="/our-team">OUR TEAM</Link></li>
                    <li><Link to="/shop">SHOP</Link></li>
                    <li><Link to="/mt-nation">MT NATION</Link></li>
                </ul>
            </div>
            <div className="navbar-section right">
                <span>SEARCH</span>
                <span>LOGIN/SIGNUP</span>
            </div>
        </nav>
    );
}

export default Navbar;