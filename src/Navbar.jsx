import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <header className="navbar sticky-glass" role="banner">
      <div className="logo">
        <Link to="/" aria-label="Home">
          <img src="/images/logo.png" width="125" alt="Logo" />
        </Link>
      </div>

      <nav className="nav" role="navigation" aria-label="Main navigation">
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <img src="/images/menu.png" className="menu-icon" alt="Menu" />
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          <li>
            <Link to="/" className="nav-link-anim">Explore</Link>
          </li>
          <li>
            <Link to="/products" className="nav-link-anim">Products</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link-anim">About</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link-anim">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="nav-actions">
        <div className="account-container-nav">
          <button 
            className="account-trigger" 
            onClick={() => setAccountOpen(!accountOpen)}
            aria-label="Account details"
          >
            <i className="fas fa-user-circle" />
          </button>
          
          {accountOpen && (
            <div className="account-dropdown glass-dropdown">
              {user ? (
                <div className="user-info">
                  <div className="user-header">
                    <i className="fas fa-user-circle large-icon" />
                    <div>
                      <h4 className="user-name">{user.name}</h4>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="user-details">
                    <p><strong>Bio:</strong> {user.bio}</p>
                    <p><strong>Joined:</strong> {user.joinDate}</p>
                  </div>
                  <div className="dropdown-actions">
                    <Link to="/account" onClick={() => setAccountOpen(false)}>Profile</Link>
                    <button onClick={logout} className="logout-btn">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="no-user">
                  <p>Not signed in</p>
                  <Link to="/account" onClick={() => setAccountOpen(false)} className="login-link">Sign In / Register</Link>
                </div>
              )}
            </div>
          )}
        </div>

        <Link to="/cart" className="cart-icon" aria-label={`Cart with ${cartCount} items`}>
          <img src="/images/cart.png" width="30" height="30" alt="Cart" />
          {cartCount > 0 && <span className="cart-count nav-pop">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
