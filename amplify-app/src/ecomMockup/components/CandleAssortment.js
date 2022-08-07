import React, { useState, useEffect } from "react";
import { storefront } from "../utils/storefront";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import QuantityButtons from "../components/QuantityButtons";
import { useTransition, animated } from "react-spring";
import LoadingAndError from "./LoadingAndError";

function CandleAssortment() {
  //location used for formatting request to Shopify API (send request based on url location)
  const location = useLocation();
  //collection data recieved from Shopify API stored here as well as loading/error handling/URL-based collection does not exist
  const [assortment, setAssortment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noAssortment, setNoAssortment] = useState(false);
  //states used for referencing loction in possible collection requests (forward or backward) and to show user context (e.g. page number)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInclusion, setPageInclusion] = useState(null);

  useEffect(() => {
    //function used to make requests for collection data from Shopify API
    const getAssortmentContent = async () => {
      setIsLoading(true);
      try {
        const { data } = await storefront(assortmentContentQuery);
        if (data.collectionByHandle) {
          setAssortment(data.collectionByHandle);
        } else if (data.collectionByHandle === null) {
          setNoAssortment(true);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
      }
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
    getAssortmentContent();
  }, [location.pathname, pageInclusion]);

  //two handlers used to trigger requests to Shopify API, update visual page state content, and load from top of page
  const previousPageHandler = () => {
    window.scrollTo(0, 0);
    setPageNumber((previousNumber) => {
      return previousNumber - 1;
    });
    setPageInclusion(
      `last: 8, before: "${assortment.products.edges[0].cursor}"`
    );
  };
  const nextPageHandler = () => {
    window.scrollTo(0, 0);
    setPageNumber((previousNumber) => {
      return previousNumber + 1;
    });
    setPageInclusion(
      `first: 8, after: "${assortment.products.edges[7].cursor}"`
    );
  };

  //function to load collection items with a pleasant transition
  const productsTransition = useTransition(true, {
    from: { x: 250, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    delay: 550,
    config: { duration: 450 },
    reset: true,
  });

  return (
    <LoadingAndError
      isLoading={isLoading}
      hasError={hasError}
      incorrectEndpoint={noAssortment}
    >
      <div className="bg-tertiary">
        {assortment && (
          <>
            <h2 className="content-header">{assortment.title}</h2>
            {productsTransition(
              (style, item) =>
                item && (
                  <animated.div
                    style={style}
                    className="collection-items mw-large"
                  >
                    {assortment.products.edges.map((product) => {
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
                            <div className="collection-items-item-image">
                              <img
                                loading="lazy"
                                src={
                                  product.node.images.edges[0].node
                                    .transformedSrc
                                }
                                alt={product.node.images.edges[0].node.altText}
                              />
                            </div>
                            <button style={{ margin: "auto" }}>
                              {product.node.title}
                            </button>
                          </Link>
                        </div>
                      );
                    })}
                  </animated.div>
                )
            )}
            <QuantityButtons
              moreAvailable={assortment.products.pageInfo.hasNextPage}
              requireAboveZero
              quantity={pageNumber}
              onDecrease={previousPageHandler}
              onIncrease={nextPageHandler}
            />
          </>
        )}
      </div>
    </LoadingAndError>
  );
}

export default CandleAssortment;
