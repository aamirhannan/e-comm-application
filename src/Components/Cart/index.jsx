import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import PlaceOrderModal from "../PlaceOrderModal";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../userContext";
const Cart = () => {
  const {
    cartSummary,
    setCartSummary,
    resetCartSummary,
    updateCartSummary,
    discountCouponValue,
    setDiscountCouponValue,
    setCartItem,
    cartItem,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleDecrementQuantity = (item) => {
    if (item.quantity <= 1) {
      return;
    }
    setCartItem((prev) =>
      prev.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: (cartItem.totalPrice - item.price).toFixed(2),
            }
          : cartItem
      )
    );
  };

  const handleIncrementQuantity = (item) => {
    if (item.quantity >= 8) {
      return;
    }
    setCartItem((prev) =>
      prev.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: cartItem.price * (cartItem.quantity + 1).toFixed(2),
            }
          : cartItem
      )
    );
  };

  const handleItemRemoveFromCart = (item) => {
    setCartItem((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
  };

  const handleMoveToHome = (item) => {
    // setShowCart(false);
    navigate("/");
  };

  const discountCoupon = [
    { label: "OFF10", value: 10 },
    { label: "OFF50", value: 50 },
    { label: "OFF75", value: 75 },
  ];

  const handleDiscountCouponChange = (e) => {
    setDiscountCouponValue(Number(e.target.value));
  };

  useEffect(() => {
    updateCartSummary();
  }, [cartItem, discountCouponValue]);

  return (
    <>
      <PlaceOrderModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <section className="cart-container">
        <div className="cart-container-left">
          <div className="cart-title">
            <div className="cart-tab active">Flipkart</div>
            <div className="cart-tab active">Grocery</div>
          </div>

          <div className="cart-address">
            <div>
              <div className="address-top-row">
                Deliver to:{" "}
                <span className="user-name">
                  {"Aamir"} {"842001"}
                </span>{" "}
              </div>
              <div className="address-bottom-row">{"305, Hussain Mansion"}</div>
            </div>
            <button className="address-change-btn">Change Address</button>
          </div>

          <CartList
            cartItem={cartItem}
            handleItemRemoveFromCart={handleItemRemoveFromCart}
            handleIncrementQuantity={handleIncrementQuantity}
            handleDecrementQuantity={handleDecrementQuantity}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
            resetCartSummary={resetCartSummary}
          />

          <div className="place-order-section">
            <button className="continue-btn" onClick={handleMoveToHome}>
              Continue Shopping
            </button>
            <button onClick={handleOpen} className="continue-btn">
              Place Order
            </button>
          </div>
        </div>

        <div className="cart-container-right">
          <div className="cart-total">
            <div className="cart-total-title">Cart Summary</div>
            <div className="cart-total-price">
              <div>Price</div>
              <div>{cartSummary.totalPrice.toFixed(2)}</div>
            </div>
            <div className="cart-total-price">
              <div>Discount</div>
              <div>{cartSummary.discountPrice}</div>
            </div>
            <div className="cart-total-price">
              <div>Platform fee</div>
              <div>{cartSummary.platformfee}</div>
            </div>
            <div className="cart-total-price">
              <div>Delivery Charge</div>
              <div>{cartSummary.deliveryCharge}</div>
            </div>
            <div className="cart-total-price">
              <select
                className="cart-input"
                value={discountCouponValue}
                onChange={handleDiscountCouponChange}
                type="text"
                placeholder="Enter discount coupon"
              >
                <option value="">Select Discount Coupon</option>
                {discountCoupon.map((discount, index) => (
                  <option
                    key={`coupon-${discountCoupon.label}`}
                    value={discount.value}
                  >
                    {discount.label}
                  </option>
                ))}
              </select>
              {/* <button className="apply-coupon-btn">Apply</button> */}
            </div>
            <div className="cart-total-price">
              <div>Total</div>
              <div>
                {cartSummary.totalCost <= 0 ? "0" : cartSummary.totalCost}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;

const CartList = ({
  cartItem,
  resetCartSummary,
  handleItemRemoveFromCart,
  handleIncrementQuantity,
  handleDecrementQuantity,
  open,
  setOpen,
  handleOpen,
  handleClose,
}) => {
  useEffect(() => {
    if (cartItem.length === 0) {
      resetCartSummary();
    }
  }, [cartItem]);
  return (
    <>
      {cartItem.length === 0 ? (
        <h1>Empty Cart</h1>
      ) : (
        cartItem.map((item, index) => (
          <div className="cart-body" key={`item-${item.id}`}>
            <div className="cart-upper-container">
              <div className="cart-item">
                <img className="item-img" src={item.image} alt="item-img" />
                <div className="item-right-section">
                  <div className="item-title">
                    {item.title}
                    <span className="item-expected-delivery">
                      12 june, 2024
                    </span>
                  </div>
                  <div className="item-category">{item.category}</div>
                  <div className="item-seller">retail compay</div>
                  <div className="item-price">
                    <span className="item-actual-price">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-currency-rupee"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                      </svg>
                      1,200
                    </span>
                    <span className="item-expected-price">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-currency-rupee"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                      </svg>
                      {item.totalPrice}
                    </span>
                    <span className="item-discount">
                      {`${item.discount}%`} off 1 offer applied
                    </span>
                  </div>
                </div>
              </div>

              <div className="cart-add-remove-btn">
                <div className="cart-left">
                  <div
                    className="decrement"
                    onClick={() => handleDecrementQuantity(item)}
                  >
                    -
                  </div>

                  <input
                    className="quantity"
                    type="text"
                    value={item.quantity}
                  />

                  <div
                    className="decrement"
                    onClick={() => handleIncrementQuantity(item)}
                  >
                    +
                  </div>
                </div>
                <div
                  className="remove-item-btn"
                  onClick={() => handleItemRemoveFromCart(item)}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};
