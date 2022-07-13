import React, { useEffect, useState, useContext } from "react";
import { storefront } from "../utils/storefront";
import { useLocation } from "react-router-dom";
import CartContext from "../utils/cartContext";

import ProductVariantSelector from "../components/ProductVariantSelector";
import PriceAndVariant from "../components/PriceAndVariant";

const CandleProductPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [scent, setScent] = useState("Surprise me!");
  const [size, setSize] = useState("8 oz Regular");

  const [variantId, setVariantId] = useState(null);
  const [price, setPrice] = useState(null);
  const [variantTitle, setVariantTitle] = useState(null);
  const [productTitle, setProductTitle] = useState(null);

  const getProduct = async () => {
    const { data } = await storefront(productPageQuery);
    setProduct(data);
  };

  const productPageQuery = `
    {
      productByHandle(handle: "${location.pathname.split("/").slice(-1)[0]}") {
        title
        options{
          name
        }
        images(first: 1) {
          edges {
            node {
              transformedSrc
              altText
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              title
              id
              selectedOptions{
                name
                value
              }
              priceV2{
                amount
              }
            }
          }
        }
      }
    }
  `;
  useEffect(() => {
    getProduct();
  }, [productPageQuery]);

  const scentChangeHandler = (scent) => {
    setScent(scent);
  };
  const sizeChangeHandler = (size) => {
    setSize(size);
  };
  const variantChangeHandler = (variantId, price, variantTitle) => {
    setVariantId(variantId);
    setPrice(price);
    setVariantTitle(variantTitle);
    setProductTitle(productTitle);
  };
  const cartAddHandler = () => {
    if (cartItems.length === 0) {
      setCartItems([
        {
          id: variantId,
          quantity: 1,
          price:price,
          image: product.productByHandle.images.edges[0].node.transformedSrc,
          productTitle:product.productByHandle.title,
          variantTitle:variantTitle,
        },
      ]);
    } else {
      if (
        cartItems.some((item) => {
          return item.id === variantId;
        })
      ) {
        setCartItems((previousItems) =>
          previousItems.map((item) => {
            if (item.id === variantId) {
              return {
                id: variantId,
                quantity: item.quantity + 1,
                price:price,
                image:
                  product.productByHandle.images.edges[0].node.transformedSrc,
                productTitle:product.productByHandle.title,
                variantTitle:variantTitle,
              };
            } else {
              return item;
            }
          })
        );
      } else {
        setCartItems((previousItems) => {
          return [
            {
              id: variantId,
              quantity: 1,
              price:price,
              image:
                product.productByHandle.images.edges[0].node.transformedSrc,
              productTitle:product.productByHandle.title,
              variantTitle:variantTitle,
            },
            ...previousItems,
          ];
        });
      }
    }
  };

  return (
    <>
      {product && (
        <>
          <p>{product.productByHandle.title}</p>
          <img
            style={{ width: "50px" }}
            src={product.productByHandle.images.edges[0].node.transformedSrc}
            alt={product.productByHandle.images.edges[0].node.altText}
          />
          <ProductVariantSelector
            onScentChange={scentChangeHandler}
            onSizeChange={sizeChangeHandler}
          />
          <div>
            {product.productByHandle.variants.edges.map((variant) => {
              if (variant.node.title === scent + " / " + size) {
                return (
                  <div key={variant.node.title}>
                    <PriceAndVariant
                      onVariantChange={variantChangeHandler}
                      price={variant.node.priceV2.amount}
                      variantId={variant.node.id}
                      variantTitle={variant.node.title}
                      productTitle={product.productByHandle.title}
                    />
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
      <button onClick={cartAddHandler}>Add to Cart</button>
    </>
  );
};

export default CandleProductPage;
