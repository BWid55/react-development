import React, { useContext, useEffect, useState } from "react";

import Price from "./Price";
import QuantityButtons from "./QuantityButtons";
import { storefront } from "../utils/storefront";
import CartContext from "../utils/cartContext";

function CartItems({ createCheckoutTrigger }) {
  //context used to update cart data through + and - on cart items
  let { cartItems, setCartItems, cartQuantity, setCartQuantity } = useContext(CartContext);
  //state used to house product data which is used in the query section, on checkout initiation this data is sent in the API call to add all products to the checkout intiated
  const [cartItemsQuerySection, setCartItemsQuerySection] = useState("");
  //update context on + and - to reflect increase or decrease in cart quantity
  setCartQuantity(
    (cartQuantity = cartItems.reduce(function (prev, curr) {
      return prev + curr.quantity;
    }, 0))
  );

  //handler to decrement item quantity by 1 if >1 and remove from the cart items if =1
  const minusCartItemHandler = (itemId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.cartId === itemId) {
          return {
            cartId: item.cartId,
            id: item.id,
            quantity: item.quantity - 1,
            image: item.image,
            price: item.price,
            productTitle: item.productTitle,
            variantTitle: item.variantTitle,
            customText: item.customText,
          };
        } else {
          return item;
        }
      })
    );
  };
  //handler to increment item quantity by 1
  const plusCartItemHandler = (itemId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.cartId === itemId) {
          return {
            cartId: item.cartId,
            id: item.id,
            quantity: item.quantity + 1,
            image: item.image,
            price: item.price,
            productTitle: item.productTitle,
            variantTitle: item.variantTitle,
            customText: item.customText,
          };
        } else {
          return item;
        }
      })
    );
  };

  const createCheckoutHandler = async () => {
    const createCheckout = async () => {
      const { data } = await storefront(checkoutQuery);
      window.location.href = data.checkoutCreate.checkout.webUrl;
    };
    const checkoutQuery = `mutation {
      checkoutCreate(input: {
        lineItems: [${cartItemsQuerySection}]
      }) {
        checkout {
           webUrl
        }
      }
    }`;
    createCheckout();
  };

  useEffect(() => {
    setCartItemsQuerySection(
      cartItems
        .map((item) => {
          return `{variantId:"${item.id}",quantity:${item.quantity},customAttributes:[{key:"Custom Text",value:"${item.customText}"}]}`;
        })
        .join(",")
    );
  }, [cartItems]);
  useEffect(() => {
    if (createCheckoutTrigger) {
      createCheckoutHandler();
    }
  }, [createCheckoutTrigger]);

  return (
    <div className="cart-popup-items">
      {cartQuantity === 0 && (
        <div className="cart-popup-items-empty">
          <div>
            <h3>Nada</h3>
            <h3>Zip</h3>
            <h3>Zilch</h3>
            <h3>Nothing</h3>
          </div>
        </div>
      )}
      {cartItems.map(
        (item) =>
          item.quantity > 0 && (
            <div className="cart-popup-items-item" key={item.cartId}>
              <div className="cart-popup-items-item-data">
                <div className="cart-popup-items-item-data-image">
                  <img src={item.image} alt="cart product" />
                  <p>{item.customText}</p>
                </div>
                <div className="cart-popup-items-item-data-text">
                  <h3>{item.productTitle}</h3>
                  <span>{item.variantTitle}</span>
                  <div className="cart-popup-items-item-data-text-quantity-info">
                    <QuantityButtons
                      cartItemId={item.cartId}
                      quantity={item.quantity}
                      onDecrease={minusCartItemHandler}
                      onIncrease={plusCartItemHandler}
                      moreAvailable
                    />
                    <Price amount={item.price * item.quantity} />
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default CartItems;
