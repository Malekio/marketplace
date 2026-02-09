// app/page.js
import './HomePage.css';

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
    </main>
  ); 
}