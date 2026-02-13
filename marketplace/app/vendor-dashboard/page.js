import './vendor_dashboard.css';

const vendorStats = {
  totalSales: 12450.50,
  totalOrders: 89,
  totalProducts: 24,
  avgRating: 4.8,
  pendingOrders: 5
};

const recentOrders = [
  {
    id: "ORD-301",
    customer: "John Doe",
    amount: 499.00,
    date: "2024-01-20",
    status: "Pending"
  },
  {
    id: "ORD-300",
    customer: "Sarah Smith",
    amount: 299.00,
    date: "2024-01-20",
    status: "Approved"
  },
  {
    id: "ORD-299",
    customer: "Mike Johnson",
    amount: 189.50,
    date: "2024-01-19",
    status: "Shipped"
  },
  {
    id: "ORD-298",
    customer: "Emma Wilson",
    amount: 79.99,
    date: "2024-01-19",
    status: "Approved"
  }
];

export default function VendorDashboardPage() {
  return (
    <main className="vendor-dashboard-main">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Vendor Dashboard</h1>
          <p>Manage your store and track sales</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon revenue">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Revenue</p>
              <p className="stat-value">${vendorStats.totalSales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Orders</p>
              <p className="stat-value">{vendorStats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon products">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Products</p>
              <p className="stat-value">{vendorStats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rating">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Average Rating</p>
              <p className="stat-value">{vendorStats.avgRating}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="orders-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <a href="#" className="view-all">View All</a>
            </div>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>${order.amount.toFixed(2)}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card">
                <span className="material-symbols-outlined">add_box</span>
                <span>Add Product</span>
              </button>
              <button className="action-card">
                <span className="material-symbols-outlined">edit</span>
                <span>Edit Store</span>
              </button>
              <button className="action-card">
                <span className="material-symbols-outlined">assessment</span>
                <span>Analytics</span>
              </button>
              <button className="action-card">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
