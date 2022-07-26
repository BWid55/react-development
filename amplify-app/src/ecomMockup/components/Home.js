import React from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import { ImEvil } from "react-icons/im";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { RiHandHeartLine } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

function Home() {
  //component housing static homepage content (no API call, statically calling data)
  //function to load homepage main product with a pleasant transition
  const singleProductTransition = useTransition(true, {
    from: { y: 250, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    delay: 350,
    config: { duration: 350 },
  });

  return (
    <section className="homepage-content">
      <h2 className="content-header">
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
      {singleProductTransition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="homepage-content-main-product"
            >
              <div className="homepage-content-main-product-image-icon-alignment">
                <Link to={"candle/blow-me"} className="button-link">
                  <img src="https://cdn.shopify.com/s/files/1/0585/5710/4260/files/flame_150_PX.png?v=1656550757" />
                </Link>
              </div>
              <Link to={"candle/blow-me"} className="button-link">
                <img
                  className="homepage-content-main-product-image"
                  src="https://cdn.shopify.com/s/files/1/0585/5710/4260/products/blow-brown.png?v=1655757090"
                  alt="Blow Me Candle"
                />
                <button>Blow Me Candle</button>
              </Link>
            </animated.div>
          )
      )}
    </section>
  );
}

export default Home;
