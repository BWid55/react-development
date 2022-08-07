import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  //component for static footer content (only used in Homepage.js)
  return (
    <footer>
      <Link to={"assortment/best-sellers"} className="button-link">
        <button>View Our Best Selling Candles</button>
      </Link>
      <hr />
      <div className="mw-large">
        <img
          loading="lazy"
          src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_7098-crop.png?v=1656528262"
          alt=""
        />
        <img
          loading="lazy"
          src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_6074-crop.png?v=1656528350"
          alt=""
        />
        <img
          loading="lazy"
          src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_5989-crop.png?v=1656528180"
          alt=""
        />
        <img
          loading="lazy"
          src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_5962-crop.png?v=1656528179"
          alt=""
        />
      </div>
    </footer>
  );
}

export default Footer;
