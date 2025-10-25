import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
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
          FoodDelivery
        </Link>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav ${isMenuOpen ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                </li>
                <li className="dropdown">
                  <button className="dropdown-btn">
                    <FaUser /> {user.name}
                  </button>
                  <div className="dropdown-content">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
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