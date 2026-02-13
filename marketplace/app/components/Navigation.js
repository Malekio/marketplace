import './Navigation.css';

export default function Navigation() {
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
          <a href="/vendor-dashboard" className="nav-link">Sell</a>
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
