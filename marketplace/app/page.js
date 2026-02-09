import './HomePage.css';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

export default function HomePage() {
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