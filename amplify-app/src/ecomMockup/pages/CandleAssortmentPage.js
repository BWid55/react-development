import React, { useState, useEffect } from "react";
import { storefront } from "../utils/storefront";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function CandleCollectionPage() {
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
        products(${pageInclusion ? pageInclusion : "first: 5"}) {
          edges {
            cursor
            node {
              title
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
    setPageNumber(pageNumber - 1);
    setPageInclusion(
      `last: 5, before: "${assortment.collectionByHandle.products.edges[0].cursor}"`
    );
    console.log("previous page");
  };
  const nextPageHandler = () => {
    setPageNumber(pageNumber + 1);
    setPageInclusion(
      `first: 5, after: "${assortment.collectionByHandle.products.edges[4].cursor}"`
    );
    console.log("next page");
  };

  console.log(assortment);

  return (
    <>
      {assortment && (
        <>
          <h2 className="content-header">
            {assortment.collectionByHandle.title}
          </h2>
          <div>
            {assortment.collectionByHandle.products.edges.map((product) => {
              return (
                <div key={product.node.title}>
                  <Link
                    to={"/candle/" + product.node.handle}
                    className="button-link"
                  >
                    <img
                      style={{ width: "150px" }}
                      src={product.node.images.edges[0].node.transformedSrc}
                      alt={product.node.images.edges[0].node.altText}
                    />
                    <button style={{ margin: "auto" }}>
                      View {product.node.title}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
          <div>
            <button
              disabled={
                !assortment.collectionByHandle.products.pageInfo.hasPreviousPage
              }
              onClick={previousPageHandler}
            >
              -
            </button>
            <span style={{ margin: "15px" }}>{pageNumber}</span>
            <button
              disabled={
                !assortment.collectionByHandle.products.pageInfo.hasNextPage
              }
              onClick={nextPageHandler}
            >
              +
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CandleCollectionPage;
