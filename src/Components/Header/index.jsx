import React, { useContext } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Toolbar, Tooltip } from "@mui/material";
import { CartContext } from "../userContext";
const Header = ({ setSearchQuery = () => {}, cartItem = 0, setShowCart }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const { user } = useContext(CartContext);
  console.log(user);

  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-right">
        <span
          className="header-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="header-logo"
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="header-logo"
          />
        </span>
        <input
          type="text"
          placeholder="search for product, brand and more "
          className="header-search-bar"
          onChange={handleInputChange}
        />
      </div>
      <div className="header-left">
        <span
          className="login-icon"
          onClick={() => {
            navigate("/login");
          }}
        >
          <span className="login-title">
            {user.isLoggedIn ? user.name : "Login"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>{" "}
        </span>
        <Tooltip title="Coming Soon" placement="right-end" arrow>
          <span className="login-icon">
            <span className="login-title">Become a seller</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>{" "}
          </span>
        </Tooltip>
        <Tooltip title="Coming Soon" placement="right-end" arrow>
          <span className="login-icon">
            <span className="login-title">More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>{" "}
          </span>
        </Tooltip>
        <span
          className="login-icon"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart-dash"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>{" "}
          <span className="login-title">Cart</span>
        </span>
      </div>
      {cartItem.length > 0 && (
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="cart-count"
        >
          {cartItem.length}
        </div>
      )}
    </header>
  );
};

export default Header;
