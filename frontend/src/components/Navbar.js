import React, { useContext, useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logos/logo-margemtechno.png';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../assets/logos/profile-icon.png';
import { AuthContext } from '../context/AuthContext';
import ProfileSidebar from '../pages/ProfileSidebar';

function Navbar() {
    const { user } = useContext(AuthContext);
    const [isProfileOpen, setProfileOpen] = useState(false);

    console.log('👤 Estado do user no Navbar:', user);

    if (user === undefined) {
        return null;
    }

    return (
        <>
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
                    <NavLink to="/search" className={({ isActive }) => isActive ? "active-link no-hover" : "no-hover"}>SEARCH</NavLink>
                    {user ? (
                        <button
                            onClick={() => setProfileOpen(true)}
                            className="profile-link"
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img src={userIcon} alt="Perfil" className="profile-icon" />
                        </button>
                    ) : (
                        <NavLink to="/login" className={({ isActive }) => isActive ? "active-link no-hover" : "no-hover"}>LOGIN/SIGNUP</NavLink>
                    )}
                </div>
            </nav>

            {/* Sidebar do perfil */}
            <ProfileSidebar isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
        </>
    );
}

export default Navbar;
