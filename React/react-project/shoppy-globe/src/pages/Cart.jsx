import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cartItems = useSelector(
    state => state.cart.items
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className="container">

        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">

            <h2>🛒 Your Cart Is Empty</h2>

            <p>
              Looks like you haven't added
              anything yet.
            </p>

            <Link to="/">
              <button className="shop-btn">
                Start Shopping
              </button>
            </Link>

          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}

            <h2>
              Total: ₹ {totalPrice.toFixed(2)}
            </h2>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed To Checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}