import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector }
from "react-redux";

import Header from "../components/Header";

import { clearCart }
from "../redux/cartSlice";

export default function Checkout() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    state => state.cart.items
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleOrder = () => {

    alert("Order placed");

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Header />

      <div className="checkout-container">

        <h1>Checkout</h1>

        <form className="checkout-form">

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email"
            required
          />

          <input
            type="text"
            placeholder="Address"
            required
          />

        </form>

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cartItems.map(item => (
            <p key={item.id}>
              {item.title}
              x {item.quantity}
            </p>
          ))}

          <h3>
            Total: ₹ {totalPrice.toFixed(2)}
          </h3>

          <button
            className="place-order-btn"
            onClick={handleOrder}
          >
            Place Order
          </button>

        </div>

      </div>
    </>
  );
}