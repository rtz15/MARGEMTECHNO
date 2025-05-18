import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import MTSessions from './pages/MTSessions';
import OurTeam from './pages/OurTeam';
import Shop from './pages/Shop';
import MTNation from './pages/MTNation';
import Navbar from './components/Navbar';
import ShopCheckout from './pages/ShopCheckout';
import Footer from './components/home/Footer';
import AboutUs from './pages/AboutUs';
import Support from './pages/Support';
import Accessibility from './pages/Accessibility';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ViewProfile from './pages/ViewProfile'; // 👈 NOVO
import { AuthProvider } from './context/AuthContext';
import './App.css';
import SearchPage from './pages/SearchPage';
import RequireAuth from './components/auth/RequireAuth';
import Faq from './pages/FaqPage'; // Import the Faq component
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />  

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} /> 
          <Route path="/mt-sessions" element={<MTSessions />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mt-nation" element={<RequireAuth><MTNation /></RequireAuth>} />
          <Route path="/shop/checkout" element={<RequireAuth><ShopCheckout /></RequireAuth>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/our-team/about-us" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/perfil" element={<RequireAuth><ViewProfile /></RequireAuth>} />
          <Route path="/faq" element={<Faq />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;