import './cart.css';
import { cartItems } from '../data/products';

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = 15.00;
  const total = subtotal + tax + shipping;

  return (
    <main className="cart-main">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="item-image" />
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="vendor">by <strong>{item.vendor}</strong></p>
                </div>

                <div className="item-actions">
                  <div className="quantity-control">
                    <button className="qty-btn">−</button>
                    <input type="text" value={item.quantity} readOnly className="qty-input" />
                    <button className="qty-btn">+</button>
                  </div>
                </div>

                <div className="item-price">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button className="remove-btn">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
            <a href="/explore" className="continue-shopping">Continue Shopping</a>
          </div>
        </div>
      </div>
    </main>
  );
}
