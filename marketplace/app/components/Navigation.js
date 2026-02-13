'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './Navigation.css';

export default function Navigation() {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    // Check if seller is authenticated
    const seller = localStorage.getItem('seller');
    setIsSeller(!!seller);
  }, []);

  const handleSellClick = (e) => {
    e.preventDefault();
    
    const seller = localStorage.getItem('seller');
    if (seller) {
      router.push('/vendor-dashboard');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="material-symbols-outlined">grid_view</span>
          <h1>Marketplace</h1>
        </div>

        <nav className="navbar-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/explore" className="nav-link">Explore</a>
          <a href="/deals" className="nav-link">Deals</a>
          <button 
            onClick={handleSellClick} 
            className="nav-link sell-btn"
            title={isSeller ? 'Go to Dashboard' : 'Login to Sell'}
          >
            Sell
            {!isSeller && <span className="material-symbols-outlined login-icon">login</span>}
          </button>
        </nav>

        <div className="navbar-actions">
          <div className="search-box">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search products..." />
          </div>

          <div className="action-icons">
            <a href="/cart" className="icon-btn" title="Shopping Cart">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="badge">2</span>
            </a>
            <a href="#" className="icon-btn" title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
              <span className="badge">3</span>
            </a>
            <button className="icon-btn profile" title="User Profile">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
