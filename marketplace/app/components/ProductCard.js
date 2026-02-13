import "./ProductCard.css";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product-details/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.imageUrl} 
            alt={product.altText || product.name}
            className="product-image"
          />
          <button className="wishlist-btn">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          {product.isVerified && (
            <div className="verified-badge">
              <span className="material-symbols-outlined">verified</span>
              Verified Vendor
            </div>
          )}
        </div>
        <h4>{product.name}</h4>
        <div className="vendor">by <span className="vendor-name">{product.vendor}</span></div>
        <div className="product-footer">
          <p className="price">${typeof product.price === 'string' ? product.price : product.price.toFixed(2)}</p>
          <button className="add-to-cart" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}