import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, setIsCartOpen, addToCart, removeFromCart } = useContext(CartContext);
  setIsCartOpen(false);

  return (
    <div className="">
      <div className="">
        {cartItems.map((cartItem) => {
          const { id, name, quantity, price } = cartItem;

          return (
            <div key={id} className="">
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => addToCart(cartItem)}>Increment</span>
              <br />
              <span onClick={() => removeFromCart(cartItem)}>Decrement</span>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
