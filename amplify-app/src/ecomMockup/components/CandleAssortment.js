import React, { useState, useEffect, useContext } from "react";
import { storefront } from "../utils/storefront";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import QuantityButtons from "../components/QuantityButtons";
import { useTransition, animated } from "react-spring";

function CandleAssortment() {
  const location = useLocation();
  const [assortment, setAssortment] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInclusion, setPageInclusion] = useState(null);

  const getAssortmentContent = async () => {
    const { data } = await storefront(assortmentContentQuery);
    setAssortment(data);
  };
  const assortmentContentQuery = `
    {
      collectionByHandle(handle: "${
        location.pathname.split("/").slice(-1)[0]
      }") {
        title
        products(${pageInclusion ? pageInclusion : "first: 8"}) {
          edges {
            cursor
            node {
              title
              tags
              handle
              images(first: 1) {
                edges {
                  node {
                    transformedSrc
                    altText
                  }
                }
              }
            }
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  `;
  useEffect(() => {
    getAssortmentContent();
  }, [assortmentContentQuery]);

  const previousPageHandler = () => {
    window.scrollTo(0, 0);
    setPageNumber(pageNumber - 1);
    setPageInclusion(
      `last: 8, before: "${assortment.collectionByHandle.products.edges[0].cursor}"`
    );
  };
  const nextPageHandler = () => {
    window.scrollTo(0, 0);
    setPageNumber(pageNumber + 1);
    setPageInclusion(
      `first: 8, after: "${assortment.collectionByHandle.products.edges[7].cursor}"`
    );
  };

  const productsTransition = useTransition(true, {
    from: { x: 250, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    delay: 250,
    config: { duration: 250 },
    reset: true,
  });

  return (
    <div className="bg-tertiary">
      {assortment && (
        <>
          <h2 className="content-header">
            {assortment.collectionByHandle.title}
          </h2>
          {productsTransition(
            (style, item) =>
              item && (
                <animated.div
                  style={style}
                  className="collection-items mw-large"
                >
                  {assortment.collectionByHandle.products.edges.map(
                    (product) => {
                      return (
                        <div
                          className="collection-items-item"
                          key={product.node.title}
                        >
                          {product.node.tags.includes("customize-text") && (
                            <div className="collection-items-item-tag">
                              <p className="collection-items-item-tag-inner">
                                Custom Text
                              </p>
                            </div>
                          )}
                          <Link
                            to={"/candle/" + product.node.handle}
                            className="button-link"
                          >
                            <img
                              src={
                                product.node.images.edges[0].node.transformedSrc
                              }
                              alt={product.node.images.edges[0].node.altText}
                            />
                            <button style={{ margin: "auto" }}>
                              {product.node.title}
                            </button>
                          </Link>
                        </div>
                      );
                    }
                  )}
                </animated.div>
              )
          )}
          <QuantityButtons
            moreAvailable={
              assortment.collectionByHandle.products.pageInfo.hasNextPage
            }
            requireAboveZero
            quantity={pageNumber}
            onDecrease={previousPageHandler}
            onIncrease={nextPageHandler}
          />
        </>
      )}
    </div>
  );
}

export default CandleAssortment;
