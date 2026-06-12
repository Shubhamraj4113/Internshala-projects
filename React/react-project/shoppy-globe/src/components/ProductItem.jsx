import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    toast.success(
      `${product.title} added to cart`
    );
  };

  return (
    <div className="product-card">
      <img
        loading="lazy"
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="discount-badge">
        {product.discountPercentage}% OFF
      </div>

      <h3>{product.title}</h3>

      <p className="price">
        ₹ {product.price}
      </p>

      <p className="rating">
        ⭐ {product.rating}
      </p>

      <div className="card-buttons">
        <Link to={`/product/${product.id}`}>
          <button className="details-btn">
            View Details
          </button>
        </Link>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}