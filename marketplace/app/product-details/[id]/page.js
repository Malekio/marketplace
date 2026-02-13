'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { products as localProducts } from '../../data/products';
import '../../product-details.css';
import '../page.css';

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          // Fallback to local data
          const localProduct = localProducts.find(p => p.id === parseInt(id));
          setProduct(localProduct);
        }
      } catch (err) {
        console.error(err);
        // Fallback to local data on error
        const localProduct = localProducts.find(p => p.id === parseInt(id));
        setProduct(localProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="product-details-container">
        <div className="not-found">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-container">
        <div className="not-found">
          <h1>Product Not Found</h1>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link href="/explore" className="back-link">Back to Explore</Link>
        </div>
      </main>
    );
  }

  const images = [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <main className="product-details-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <Link href="/explore">Products</Link>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>{product.category}</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="details-grid">
        {/* Left: Gallery */}
        <div className="gallery-section">
          <div className="gallery-wrapper">
            {/* Thumbnails */}
            <div className="thumbnails">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="main-image-wrapper">
              <img 
                src={images[selectedImageIndex]} 
                alt={product.name}
                className="main-image"
              />
              <button className="zoom-button">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="info-section">
          <div className="header-info">
            <span className="badge">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="rating-info">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined ${
                      i < Math.floor(product.rating) ? 'filled' : ''
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="reviews">({product.reviews} Reviews)</span>
              <span className="divider">|</span>
              <span className="sku">SKU: {product.id}-{product.vendor.slice(0, 3).toUpperCase()}</span>
            </div>
          </div>

          {/* Price Card */}
          <div className="price-card">
            <div className="price-row">
              <span className="current-price">${typeof product.price === 'string' ? product.price : parseFloat(product.price).toFixed(2)}</span>
              <span className="original-price">${(parseFloat(product.price) * 1.2).toFixed(2)}</span>
              <span className="discount">-15%</span>
            </div>
            <p className="discount-text">Limited time offer (Ends in 2 days)</p>
          </div>

          {/* Vendor Card */}
          <div className="vendor-card">
            <div className="vendor-info">
              <div className="vendor-avatar">
                <span className="material-symbols-outlined">storefront</span>
              </div>
              <div className="vendor-details">
                <div className="vendor-name">
                  <h4>{product.vendor}</h4>
                  {product.isVerified && (
                    <span className="material-symbols-outlined verified">verified</span>
                  )}
                </div>
                <p className="vendor-rating">Top Rated Seller • 98% Positive</p>
              </div>
            </div>
            <Link href={`/vendor/${product.vendor}`} className="visit-store">
              Visit Store
            </Link>
          </div>

          {/* Action Block */}
          <div className="action-block">
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

            <button className="add-to-cart-btn">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
          </div>

          <button className="request-approval-btn">
            Request Order Approval
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="info-box">
            <span className="material-symbols-outlined">info</span>
            <p>
              <strong>Fast Processing:</strong> Most orders approved within 24 hours.
              Free shipping on orders over $100.
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <div className="tabs">
          <button className="tab-btn active">Product Details</button>
          <button className="tab-btn">Technical Specs</button>
          <button className="tab-btn">Customer Reviews ({product.reviews})</button>
          <button className="tab-btn">Shipping & Returns</button>
        </div>

        <div className="tabs-content">
          <div className="content-left">
            <section>
              <h3>Premium Quality Product</h3>
              <p>
                This {product.name} is a high-quality item designed for customers 
                who demand excellence. Each product is carefully selected and 
                verified by our top-rated sellers to ensure you receive the best value.
              </p>
              <ul className="features-list">
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Verified seller with excellent reputation
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Quality guaranteed or your money back
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Fast and secure shipping worldwide
                </li>
              </ul>
            </section>

            <section className="specs-box">
              <h3>Key Information</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Seller</span>
                  <span className="spec-value">{product.vendor}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Rating</span>
                  <span className="spec-value">{product.rating} / 5</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Reviews</span>
                  <span className="spec-value">{product.reviews}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Reviews Sidebar */}
          <div className="reviews-sidebar">
            <div className="reviews-card">
              <h3>Customer Sentiment</h3>
              <div className="sentiment-score">
                <span className="score">{product.rating}</span>
                <div className="stars-large">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined filled"
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="recommendation">Highly Recommended</p>
              </div>

              <div className="rating-bars">
                <div className="rating-bar">
                  <span className="rating-num">5</span>
                  <div className="bar"><div className="fill" style={{width: '85%'}}></div></div>
                  <span className="rating-pct">85%</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-num">4</span>
                  <div className="bar"><div className="fill" style={{width: '10%'}}></div></div>
                  <span className="rating-pct">10%</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-num">3</span>
                  <div className="bar"><div className="fill" style={{width: '3%'}}></div></div>
                  <span className="rating-pct">3%</span>
                </div>
              </div>
            </div>

            {/* Review Card */}
            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Customer</span>
                <span className="verified-badge">Verified Buyer</span>
              </div>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined filled">star</span>
                ))}
              </div>
              <p className="review-text">
                Excellent product quality and fast shipping! The seller was very responsive 
                and professional. Highly recommend this item and vendor!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky-bottom-bar">
        <div className="sticky-product">
          <img src={product.imageUrl} alt={product.name} />
          <div className="sticky-details">
            <h4>{product.name}</h4>
            <p className="sticky-price">${typeof product.price === 'string' ? product.price : parseFloat(product.price).toFixed(2)}</p>
          </div>
        </div>
        <div className="sticky-actions">
          <button className="sticky-cart">
            <span className="material-symbols-outlined">shopping_cart</span>
            Add to Cart
          </button>
          <button className="sticky-approval">Request Approval</button>
        </div>
      </div>
    </main>
  );
}
