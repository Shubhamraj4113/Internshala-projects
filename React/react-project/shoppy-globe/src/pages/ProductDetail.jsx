import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Header />

      <div className="detail-container">
        <img
          loading="lazy"
          src={product.thumbnail}
          alt={product.title}
        />

        <div>
          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h2>₹ {product.price}</h2>

          <p>⭐ {product.rating}</p>

          <button
            className="cart-btn"
            onClick={() =>
              dispatch(addToCart(product))
            }
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}