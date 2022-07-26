import React, { useEffect, useState, useContext } from "react";
import { storefront } from "../utils/storefront";
import { useLocation } from "react-router-dom";
import Draggable from "react-draggable";
import CartContext from "../utils/cartContext";
import { GiClick } from "react-icons/gi";
import CandleVariantSelectors from "./CandleVariantSelectors";
import PriceAndVariant from "./CandleVariantDataSet";

function CandleProduct() {
  //context used for updating cart
  const { cartItems, setCartItems, cartQuantity, setCartQuantity } =
    useContext(CartContext);
  //location used for formatting request to Shopify API (send request based on url location)
  const location = useLocation();
  //product data recieved from Shopify API store here
  const [product, setProduct] = useState(null);
  //these state items are used for selecting variant items for the cart, including customAttributes as custom text
  const [scent, setScent] = useState("Surprise me!");
  const [size, setSize] = useState("8 oz Regular");
  const [customText, setCustomText] = useState("");
  const [cartId, setCartId] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [price, setPrice] = useState(null);
  const [variantTitle, setVariantTitle] = useState(null);
  const [productTitle, setProductTitle] = useState(null);

  //function used to make requests for product data from Shopify API
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await storefront(productPageQuery);
      setProduct(data);
    };
    const productPageQuery = `
      {
        productByHandle(handle: "${
          location.pathname.split("/").slice(-1)[0]
        }") {
          title
          tags
          options{
            name
            values
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
    getProduct();
  }, [location.pathname]);

  //used to update variant data for cart item on variant selector change
  useEffect(() => {
    setCartId(variantId + customText);
  }, [variantId, customText]);
  useEffect(() => {
    if (product && product.productByHandle.tags.includes("customize-text")) {
      setCustomText("Default Text");
    }
  }, [product]);

  //handlers used to trigger variant updates
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
  const customTextHandler = (e) => {
    setCustomText(e.target.value);
  };

  //handler used to add a variant (with custom text if applicable) to the cart, either through the addition of a new item or the incrememnt of an existing item
  const cartAddHandler = () => {
    if (cartItems.length === 0) {
      setCartItems([
        {
          cartId: cartId,
          id: variantId,
          quantity: 1,
          price: price,
          image: product.productByHandle.images.edges[0].node.transformedSrc,
          productTitle: product.productByHandle.title,
          variantTitle: variantTitle,
          customText: customText,
        },
      ]);
      setCartQuantity(cartQuantity + 1);
    } else {
      if (
        cartItems.some((item) => {
          return item.cartId === cartId;
        })
      ) {
        setCartItems((previousItems) =>
          previousItems.map((item) => {
            if (item.cartId === cartId) {
              return {
                cartId: cartId,
                id: variantId,
                quantity: item.quantity + 1,
                price: price,
                image:
                  product.productByHandle.images.edges[0].node.transformedSrc,
                productTitle: product.productByHandle.title,
                variantTitle: variantTitle,
                customText: customText,
              };
            } else {
              return item;
            }
          })
        );
        setCartQuantity(cartQuantity + 1);
      } else {
        setCartItems((previousItems) => {
          return [
            {
              cartId: cartId,
              id: variantId,
              quantity: 1,
              price: price,
              image:
                product.productByHandle.images.edges[0].node.transformedSrc,
              productTitle: product.productByHandle.title,
              variantTitle: variantTitle,
              customText: customText,
            },
            ...previousItems,
          ];
        });
        setCartQuantity(cartQuantity + 1);
      }
    }
  };

  return (
    <>
      {" "}
      {product && (
        <div className="product-page">
          <h2 className="content-header">{product.productByHandle.title}</h2>
          <div className="product-page-content">
            <div className="product-page-content-image">
              <img
                src={
                  product.productByHandle.images.edges[0].node.transformedSrc
                }
                alt={product.productByHandle.images.edges[0].node.altText}
              />
              {product.productByHandle.tags.includes("customize-text") &&
                customText && (
                  <div className="product-page-content-image-text">
                    <Draggable>
                      <p>
                        {customText} <GiClick size={30} />
                      </p>
                    </Draggable>
                  </div>
                )}
              {product.productByHandle.variants.edges.map((variant) => {
                if (variant.node.title === scent + " / " + size) {
                  return (
                    <PriceAndVariant
                      key={variant.node.title}
                      onVariantChange={variantChangeHandler}
                      price={variant.node.priceV2.amount}
                      variantId={variant.node.id}
                      variantTitle={variant.node.title}
                      productTitle={product.productByHandle.title}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <CandleVariantSelectors
              options={product.productByHandle.options}
              onScentChange={scentChangeHandler}
              onSizeChange={sizeChangeHandler}
            />
            <div>
              {product.productByHandle.tags.includes("customize-text") && (
                <>
                  <label
                    className="custom-text-label"
                    htmlFor="custom-text-input"
                  >
                    Include your custom text!
                  </label>
                  <input
                    id="custom-text-input"
                    type="text"
                    value={customText}
                    onChange={customTextHandler}
                  ></input>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <button onClick={cartAddHandler}>Add to Cart</button>
    </>
  );
}

export default CandleProduct;
