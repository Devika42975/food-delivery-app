import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-text">QuickBite</span>
          <span className="logo-tagline">Fast Food Delivery</span>
        </Link>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav ${isMenuOpen ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <FaHeart /> Favorites
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                </li>
                <li className="dropdown">
                  <button className="dropdown-btn">
                    <FaUser /> {user?.name || 'User'}
                  </button>
                  <div className="dropdown-content">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <FaUser /> Profile
                    </Link>
                    <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                      📋 My Orders
                    </Link>
                    <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                      <FaHeart /> Favorites
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register" className="auth-link signup-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </li>
                <li>
                  <Link to="/login" className="auth-link login-btn" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                </li>
              </>
            )}
            <li className="cart-icon">
              <Link to="/checkout" onClick={() => setIsMenuOpen(false)}>
                <FaShoppingCart />
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;