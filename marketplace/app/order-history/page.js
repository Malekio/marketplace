import './order_history.css';
import { orders } from '../data/products';

export default function OrderHistoryPage() {
  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <main className="order-history-main">
      <div className="order-history-container">
        <div className="order-history-header">
          <h1>Order History</h1>
          <p>Track and manage all your orders</p>
        </div>

        <div className="filters">
          <button className="filter-btn active">All Orders</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Processing</button>
          <button className="filter-btn">In Transit</button>
          <button className="filter-btn">Delivered</button>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>{order.id}</h3>
                  <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-body">
                <div className="order-detail">
                  <span className="label">Vendor</span>
                  <span className="value">{order.vendor}</span>
                </div>
                <div className="order-detail">
                  <span className="label">Items</span>
                  <span className="value">{order.items} item{order.items !== 1 ? 's' : ''}</span>
                </div>
                <div className="order-detail">
                  <span className="label">Total</span>
                  <span className="value total">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-footer">
                <button className="btn-secondary">View Details</button>
                <button className="btn-secondary">Track Order</button>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="empty-state">
            <span className="material-symbols-outlined">shopping_bag</span>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <a href="/explore" className="btn-primary">Explore Products</a>
          </div>
        )}
      </div>
    </main>
  );
}
