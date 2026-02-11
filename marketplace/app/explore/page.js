import './page.css';

export default function ExplorePage() {
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
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                        </div>
                        <button>Meet the Creators</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}