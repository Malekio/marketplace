'use client';

import './page.css';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { useState, useEffect } from 'react';

export default function ExplorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/');
        if (response.ok) {
          const data = await response.json();
          // Handle paginated response
          const productsList = Array.isArray(data) ? data : data.results || [];
          setProducts(productsList);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main>
        <div className="trending">
            <h2>Trending Styles</h2>
            <div className="trending-display">
                <div className="primary-display">
                    <span>FEATURED COLLECTION</span>
                    <h1>Eco-Friendly Performance</h1>
                    <p>Sustainable gear that doesn't compromise on speed or style.</p>
                    <button>Shop Collection</button>
                </div>
                <div className="secondary-display">
                    <div className='up'>
                        <h3>Summer Essentials</h3>
                        <p>Timeless pieces for the perfect getaway.</p>
                        <a href="" className='explore-more'>
                            Explore More <span className='material-symbols-outlined'>arrow_forward</span>
                        </a>
                    </div>
                    <div className='down'>
                        <h3>Handmade Artisans</h3>
                        <div>
                            <p>Supporting 200+ local makers worldwide</p>
                            <div className="images">
                            </div>
                        </div>
                        <button>Meet the Creators</button>
                    </div>
                </div>
            </div>
        </div>

        <section className="explore-products">
            <div className="explore-header">
                <h2>Explore All Products</h2>
                <div className="explore-controls">
                    <select className="sort-select">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                        <option>Best Rated</option>
                    </select>
                </div>
            </div>

            <div className="category-filter">
                {categories.map((cat) => (
                    <button key={cat.id} className="category-filter-btn">
                        <span className="material-symbols-outlined">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    </main>
  );
}