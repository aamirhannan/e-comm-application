import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCartItem = localStorage.getItem("cartItem");
    return storedCartItem ? JSON.parse(storedCartItem) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const clearCartItem = () => {
    setCartItem([]);
    localStorage.removeItem("cartItem");
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        clearCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
