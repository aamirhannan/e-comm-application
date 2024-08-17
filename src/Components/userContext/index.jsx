import { Password } from "@mui/icons-material";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCartItem = localStorage.getItem("cartItem");
    return storedCartItem ? JSON.parse(storedCartItem) : [];
  });

  //   const [cartSummary, setCartSummary] = useState({
  //     totalItems: 0,
  //     totalPrice: 0,
  //     discountPrice: 0,
  //     deliveryCharge: 0,
  //     totalCost: 0,
  //     prevAppliedDiscount: 0,
  //   });

  const [cartSummary, setCartSummary] = useState(() => {
    const summary = localStorage.getItem("cartSummary");
    return summary
      ? JSON.parse(summary)
      : {
          totalItems: 0,
          totalPrice: 0,
          discountPrice: 0,
          deliveryCharge: 0,
          totalCost: 0,
          prevAppliedDiscount: 0,
          platformfee: 0,
        };
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          name: "",
          email: "",
          isLoggedIn: false,
          password: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
        };
  });

  const [discountCouponValue, setDiscountCouponValue] = useState(() => {
    const storedCoupon = localStorage.getItem("discountCoupon");
    return storedCoupon ? JSON.parse(storedCoupon) : null;
  });

  useEffect(() => {
    localStorage.setItem("discountCoupon", JSON.stringify(discountCouponValue));
  }, [discountCouponValue]);

  useEffect(() => {
    localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
  }, [cartSummary]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const userLogOut = () => {
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    });

    setCartSummary({
      totalItems: 0,
      totalPrice: 0,
      discountPrice: 0,
      deliveryCharge: 0,
      totalCost: 0,
      prevAppliedDiscount: 0,
    });

    localStorage.removeItem("user");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("cartSummary");
  };

  const clearCartItem = () => {
    setCartItem([]);
    localStorage.removeItem("cartItem");
  };

  const resetCartSummary = () => {
    setCartSummary({
      totalItems: 0,
      totalPrice: 0,
      discountPrice: 0,
      deliveryCharge: 0,
      totalCost: 0,
      prevAppliedDiscount: 0,
      platformfee: 0,
    });
    localStorage.removeItem("cartSummary");
  };

  const updateCartSummary = () => {
    let totalItems = 0;
    let totalPrice = 0;
    let totalCostBeforeDiscounts = 0;

    // Calculate totals from cart items
    cartItem.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
      totalCostBeforeDiscounts += item.price * item.quantity;
    });

    // Generate random values for discount and delivery charge
    const discountPrice = 33;
    const deliveryCharge = 40;
    setCartSummary({
      totalItems,
      totalPrice,
      discountPrice,
      deliveryCharge,
      platformfee: 7,
      totalCost: Number(
        totalCostBeforeDiscounts -
          discountPrice +
          deliveryCharge -
          discountCouponValue +
          7
      ).toFixed(2),
    });

    if (cartItem.length === 0) {
      setCartSummary({
        totalItems: 0,
        totalPrice: 0,
        discountPrice: 0,
        deliveryCharge: 0,
        totalCost: 0,
        prevAppliedDiscount: 0,
        platformfee: 0,
      });
      localStorage.removeItem("cartSummary");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        clearCartItem,
        user,
        setUser,
        userLogOut,
        resetCartSummary,
        cartSummary,
        setCartSummary,
        updateCartSummary,
        discountCouponValue,
        setDiscountCouponValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
