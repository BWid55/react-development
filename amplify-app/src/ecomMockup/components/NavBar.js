import React from "react";
import { Link } from "react-router-dom";

import Cart from "./Cart";
import Dropdown from "./Dropdown";

function NavBar() {
  return (
    <div className="navigation-outer-color">
      <nav className="navigation">
        <div className="navigation-item">
          <p className="navigation-item-link-level-one">
            <Link className="navigation-item-link-level-one" to="/">
              Home
            </Link>
          </p>
        </div>
        <Dropdown dropdownTitle="Candles">
          <Link to="/assortment/for-him">For Him</Link>
          <Link to="/assortment/for-her">For Her</Link>
          <Link to="/assortment/anniversary">Anniversary</Link>
          <Link to="/assortment/long-distance">Long Distance</Link>
          <Link to="/assortment/best-sellers">Best Sellers</Link>
        </Dropdown>
        <Dropdown dropdownTitle="Info">
          <Link to="/about">About</Link>
          <Link to="/shipping-and-returns">Shipping & Returns</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/contact">Contact</Link>
        </Dropdown>
      </nav>
      <Cart />
    </div>
  );
}

export default NavBar;
