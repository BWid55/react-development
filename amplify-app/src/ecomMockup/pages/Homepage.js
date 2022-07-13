import React, { useEffect, useState } from "react";
import { storefront } from "../utils/storefront";
import { Link } from "react-router-dom";

import { ImEvil } from "react-icons/im";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { RiHandHeartLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

const HomePage = () => {
  // const [homepageContent, sethomepageContent] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const gethomepageContent = async () => {
  //   setIsLoading(true);
  //   const { data } = await storefront(homepageContentQuery);
  //   sethomepageContent(data);
  //   setIsLoading(false);
  // };

  // const homepageContentQuery = `
  //   {
  //     collectionByHandle(handle: "homepage-content") {
  //       products(first: 1) {
  //         edges {
  //           node {
  //             id
  //             title
  //             handle
  //             images(first: 1) {
  //               edges {
  //                 node {
  //                   transformedSrc
  //                   altText
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //       metafield(namespace: "custom", key: "homepage_collection") {
  //         value
  //       }
  //     }
  //   }
  // `;

  // useEffect(() => {
  //   gethomepageContent();
  // }, [homepageContentQuery]);

  return (
    <section className="homepage-content">
      <h2 className="content-header">
        {process.env.REACT_APP_API_URL}
        {process.env.REACT_APP_ACCESS_TOKEN}
        Artisinal Quality Gifts for
        <br />
        <span>Questionable</span> Quality People
      </h2>
      <div className="homepage-content-copy">
        <div className="homepage-content-copy--left">
          <p>
            See why people
            <br className="mobile-break" /> love us on Etsy!
          </p>
          <div>
            <AiFillStar size={20} />
            <AiFillStar size={20} />
            <AiFillStar size={20} />
            <AiFillStar size={20} />
            <AiFillStar size={20} />
          </div>
          <a
            href="https://www.etsy.com/shop/UnkindCandles#reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="button-link"
          >
            <button>Reviews</button>
          </a>
        </div>
        <div className="homepage-content-copy--right">
          <p>
            <ImEvil size={30} />
            <span>
              Mischeviously
              <br className="mobile-break" /> Hilarious
            </span>
          </p>
          <p>
            <GiPlantsAndAnimals size={30} />
            <span>
              Ethically
              <br className="mobile-break" /> Sourced
            </span>
          </p>
          <p>
            <RiHandHeartLine size={30} />
            <span>
              Hand
              <br className="mobile-break" /> Poured
            </span>
          </p>
        </div>
      </div>
      <div className="homepage-content-candle-light"></div>
      <div className="homepage-content-main-product">
        <div className="homepage-content-main-product-image-icon-alignment">
          <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/flame_150_PX.png?v=1656550757" />
        </div>
        <Link to={"candle/blow-me"} className="button-link">
          <img
            className="homepage-content-main-product-image"
            src="https://cdn.shopify.com/s/files/1/0585/5710/4260/products/blow-brown.png?v=1655757090"
            alt="Blow Me Candle"
          />
          <button>Blow Me Candle</button>
        </Link>
      </div>
      <footer>
        <Link to={"assortment/best-sellers"} className="button-link">
          <button>View Our Best Selling Candles</button>
        </Link>
        <hr />
        <div className="mw-large">
          <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_7098-crop.png?v=1656528262" />
          <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_6074-crop.png?v=1656528350" />
          <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_5989-crop.png?v=1656528180" />
          <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/IMG_5962-crop.png?v=1656528179" />
        </div>
      </footer>
    </section>
  );
};

export default HomePage;
