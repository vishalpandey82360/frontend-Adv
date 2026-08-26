import { useState } from "react";
import { Heart, Plus, ShoppingBag, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Cloud Knit Sweater",
    category: "Everyday layers",
    price: 68,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Mara Leather Tote",
    category: "Carry essentials",
    price: 124,
    rating: 4.8,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    badge: "New",
  },
  {
    id: 3,
    name: "Form Ceramic Set",
    category: "Home objects",
    price: 42,
    rating: 4.7,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Solstice Running Shoes",
    category: "Move freely",
    price: 96,
    rating: 4.9,
    reviews: 211,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    badge: "Popular",
  },
];

export function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img className="product-image" src={product.image} alt={product.name} />
        <button
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <div className="product-heading">
          <h3>{product.name}</h3>
          <strong>${product.price}</strong>
        </div>
        <div className="product-rating" aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}>
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>
        <button
          className={`add-to-bag ${isAdded ? "is-added" : ""}`}
          type="button"
          onClick={() => setIsAdded((added) => !added)}
        >
          {isAdded ? <ShoppingBag size={17} /> : <Plus size={17} />}
          {isAdded ? "Added to bag" : "Add to bag"}
        </button>
      </div>
    </article>
  );
}

export default function ProductGrid() {
  return (
    <section className="shop-section" aria-labelledby="shop-heading">
      <div className="shop-heading">
        <div>
          <p className="eyebrow">The edit</p>
          <h2 id="shop-heading">Made for the everyday</h2>
        </div>
        <button className="shop-link" type="button">View all products</button>
      </div>
      <div className="product-grid">
        {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
