export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <button className="wishlist-btn">
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </div>
        </div>
    )
}