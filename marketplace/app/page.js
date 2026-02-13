'use client';

import './HomePage.css';
import ProductCard from './components/ProductCard';
import { useState, useEffect } from 'react';
import { products } from './data/products';

export default function HomePage() {
  const [products_list, setProducts] = useState([]);
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
        } else {
          // Fallback to local data
          setProducts(products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to local data when API fails
        setProducts(products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main>
      <section className='categories'>
        <div className='category-nav'>
          <a href="#" className='category-link active'>
            <span className='material-symbols-outlined'>devices</span>
            <span className='category-label'>Tech</span>
          </a>
          <a href="#" className='category-link'>
            <span className='material-symbols-outlined'>checkroom</span>
            <span className='category-label'>Fashion</span>
          </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">chair</span>
              <span className="category-label">Home</span>
            </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">face</span>
              <span className="category-label">Beauty</span>
            </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">fitness_center</span>
              <span className="category-label">Sports</span>
            </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">restaurant</span>
              <span className="category-label">Groceries</span>
            </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">toys</span>
              <span className="category-label">Kids</span>
            </a>
            <a href="#" className="category-link">
              <span className="material-symbols-outlined">menu</span>
              <span className="category-label">More</span>
            </a>
        </div>
      </section>

      <section className='hero-banner'>
        <div className="hero-content">
          <span><b>FLASH SALE NOW LIVE</b></span>
          <h2>Fresh Deals <br />Approved Daily</h2>
          <p>Discover unique products from verified vendors. Manual order <br />approval for your safety and security.</p>

          <div className='hero-buttons'>
            <button className='primary-btn'>Shop Now</button>
            <button className='secondary-btn'>Explore Products</button>
          </div>
        </div>
      </section>

      <section className='trending-products'>
        <div className="trending-header">
          <div>
            <h3>Trending Now</h3>
            <p>Most requested products this week</p>
          </div>
          <a href="" className='view-all'>
            Explore All Products <span className='material-symbols-outlined'>arrow_forward</span>
          </a>
        </div>
        <div className="products-grid">
          {products_list.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
          ))}
        </div>
      </section>

      <section className='commercials'>
          <div className='commercials-container'>
            <h1>Shop with confidence from verified <br />vendors.</h1>
            <div className="ad"><p>Each order is reviewed and approved by teams to ensure you receive exactly what you paid for.</p>
            <div className="vendors">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8IoTyLA7u6Mi5-qgHS_6eBCySW7-jgUFtzMejuBdfegz93NwY3vrj5-4CXGudTDc3eIGSDfcUsTgHXOKWx0aComSkAiRZYGm4il5e4dd0-xgCci7XuBKXZUk6fxhe6dmlhdYWWE90-7W8wtRGzcr-GSDclwPxzzZsPkYSCWgKDQnjO_I2efBFB7dH8Dno4LbkMLycU3uj-aJMxLwAn7ZpObWn-EauwZrj8M_H7w29I1U8P-RSdLPANqqNsJaaPUSecK1mQQc9ZWg2" alt="" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzskZWO_yIFkg6zWD-wQaBVwUHG1De5BUV4WCxcTab84ArLB2bAZBhUCRQRXSmfHq7yg2z_POSczx6c5RWm1vTlpJN_OCneraqoDcWd5ul9u-2WgxdEsus4Ud-myT12lsskO2sGeCU2QwlkNYXBeMwzQLYH38hF7O0gFcL7v-jDaH7XArjsbX3os3e1ESKjYDhb6_-IvWGtPx0_cVWQR6TTfWlTN1d5r69_U0qRN3PGMUPNsCnwMtpJZfCk3pHPDJeBVLOmvCS_lH-" alt="" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuApGSj7tSF4d5SrfWc8wZwVbSIuuO4Ii1x-cH7E_gK6vLTABMTkdmjxm3PO-jjIYJwzxXr_0RWsoSB3PlegIeVZkzTt9UVHaNLXNMY1lnB05blaS2t5cHMB0ad368zxLelRKHGK6UmZnTyonIBwWnVzAe-aSJwaMLBHAvrzs16icjNzl4sJGn02DImAiOitqpF3fxtrFnfVd5Z_bweJoLLXZT-FsNuIzWeV6oQ6N7KV5nSwYgLTUvjGWTT-H6R1YG6XsUCq1nqiey5G" alt="" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYad76wMBoYCaJnINWvJBggOwCA-tot-V_3m_wg92o3dtYhZi3ULPUnANNCsTq9r7iIoTTQpT7tLjN86tpaECKRiMr9StXDNx-ReuLFWFXDAr9FbbF-D6UET_8-qXLRVkRyyq2VCifwYDAWf6qpZeS4h2jPiQbUQMBZrEso4RoyX2m8ePYtocQbJlglVComWPj2tFIron1O_LQt1mbF9m5FwOgKU6SbYX3vb-s4KBVu-W_GO5B1L6nyeBjtZaBFSucKBKX3YjsYMl9" alt="" />
              {/* <img src="" alt="+2k" /> */}
              <span className='vendors-count'>+2k</span>
              <span>Joined by <span>2,400+</span> Verified Vendors</span>
            </div>
            </div>
          </div>
      </section>
    </main>
  ); 
}