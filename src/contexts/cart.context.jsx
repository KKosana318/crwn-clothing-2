import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addToCart: () => {},
  cartCount: 0,
});

const addToCartHelper = (cartItems, product) => {
  const exists = cartItems.find((cartItem) => cartItem.id === product.id);

  if (exists) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(addToCartHelper(cartItems, product));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, setIsCartOpen, cartItems, addToCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
