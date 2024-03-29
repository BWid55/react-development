import "./styles.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CartContext from "../utils/cartContext";

import HomePage from "../pages/Homepage";
import CandleProductPage from "../pages/CandleProductPage";
import BundleProductPage from "../pages/BundleProductPage";
import CandleAssortmentPage from "../pages/CandleAssortmentPage";
import AboutPage from "../pages/AboutPage.js";
import ShippingAndReturnsPage from "../pages/ShippingAndReturnsPage";
import TermsOfServicePage from "../pages/TermsOfServicePage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

function EcomMockupApp() {
  //context init for cart
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  //load from top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{ cartItems, setCartItems, cartQuantity, setCartQuantity }}
      >
        <div className="ecom-mockup-app">
          <div id="cart-modal-root" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={"/candle/*"} element={<CandleProductPage />} />
            <Route path={"/bundle/*"} element={<BundleProductPage />} />
            <Route path={"/assortment/*"} element={<CandleAssortmentPage />} />
            <Route path={"/about"} element={<AboutPage />} />
            <Route
              path={"/shipping-and-returns"}
              element={<ShippingAndReturnsPage />}
            />
            <Route
              path={"/terms-of-service"}
              element={<TermsOfServicePage />}
            />
            <Route path={"/contact"} element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </>
  );
}
export default EcomMockupApp;
