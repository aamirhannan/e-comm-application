import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./Components/userContext/index.jsx";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// const Cart = () => {
//   return <h1>Cart</h1>;
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <CartProvider>
      <App />
      {/* <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
        </Routes> */}
    </CartProvider>
    {/* </BrowserRouter> */}
  </StrictMode>
);
