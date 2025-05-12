import React from 'react';
import './Navbar.css';
import logo from '../assets/logos/logo-margemtechno.png';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-section left">
                <Link to="/">
                    <img src={logo} alt="MARGEMTECHNO" className="navbar-logo" />
                </Link>
            </div>
            <div className="navbar-section center">
                <ul className="navbar-menu">
                    <li><NavLink to="/events" className={({ isActive }) => isActive ? "active-link" : ""}>EVENTS</NavLink></li>
                    <li><NavLink to="/videos" className={({ isActive }) => isActive ? "active-link" : ""}>VIDEOS</NavLink></li>
                    <li><NavLink to="/mt-sessions" className={({ isActive }) => isActive ? "active-link" : ""}>MT SESSIONS</NavLink></li>
                    <li><NavLink to="/mt-nation" className={({ isActive }) => isActive ? "active-link" : ""}>MT NATION</NavLink></li>
                    <li><NavLink to="/our-team" className={({ isActive }) => isActive ? "active-link" : ""}>OUR TEAM</NavLink></li>
                    <li><NavLink to="/shop" className={({ isActive }) => isActive ? "active-link" : ""}>SHOP</NavLink></li>

                </ul>
            </div>
            <div className="navbar-section right">
                <NavLink to="/search" className={({ isActive }) => isActive ? "active-link" : ""}>SEARCH</NavLink>
                <span>LOGIN/SIGNUP</span>
            </div>
        </nav>
    );
}

export default Navbar;