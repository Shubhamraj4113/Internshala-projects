import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const cartItems = useSelector(
    state => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <Link to="/">
        <h1>🛒 ShoppyGlobe</h1>
      </Link>

      <nav>
        <Link to="/">Home</Link>

        <Link to="/cart" className="cart-link">
          <FaShoppingCart />
          <span className="cart-badge">
            {totalItems}
          </span>
        </Link>
      </nav>
    </header>
  );
}