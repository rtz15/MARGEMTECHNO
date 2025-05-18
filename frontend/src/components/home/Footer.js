import React, { useState } from 'react';
import '../../styles/Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/logo-margemtechno.png';

function Footer() {
  const [showText, setShowText] = useState(false);
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const toggleText = () => setShowText(!showText);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    console.log('Email submitted:', email);
    setSuccessMsg('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h2>
          SIGN UP TO OUR MAILING LIST <br />
          SO YOU CAN JOIN THE NATION PLUS<br />
          EXCLUSIVE ACCESS TO NEWS AND EVENTS.
        </h2>

        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>

        {successMsg && <p className="newsletter-success">{successMsg}</p>}

        <p className="newsletter-note">
          You can opt out anytime. We will treat your information with respect.
          For more information about our privacy practices please read our Privacy Policy.
        </p>
      </div>

      <div className="footer-columns">
        <div>
          <h4>MARGEM TECHNO</h4>
          <ul>
            <li><Link to="/our-team/about-us">About Us</Link></li>
            <li><Link to="/our-team">Our Team</Link></li>
            <li><a href="https://www.instagram.com/margemtechno_/">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@margemtechno">TikTok</a></li>
          </ul>
        </div>
        <div>
          <h4>PROJECTS</h4>
          <ul>
            <li><Link to="/mt-sessions">MT Sessions</Link></li>
            <li><Link to="/mt-nation">MT Nation</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>
        <div>
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" onClick={toggleText}>
        <Link to="/">
          <img src={logo} alt="MARGEMTECHNO" className="navbar-logo" />
        </Link>
        <div className="footer-logo">© {new Date().getFullYear()} MARGEM TECHNO</div>
        <p>{showText ? 'NOT FOR THE WEAK' : 'MADE FOR HARD'}</p>
      </div>
    </footer>
  );
}

export default Footer;
