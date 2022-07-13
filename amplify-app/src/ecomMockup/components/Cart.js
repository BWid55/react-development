import React, { useEffect, useState, useContext } from "react";
import { storefront } from "../utils/storefront";
import CartContext from "../utils/cartContext";

import { BsMinecart } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [cartItemsQuerySection, setCartItemsQuerySection] = useState("");
  const [toggleCart, setToggleCart] = useState(false);
  const cartQuantity = cartItems.reduce(function (prev, curr) {
    return prev + curr.quantity;
  }, 0);

  const cartOpenHandler = () => {
    setToggleCart(true);
  };
  const cartCloseHandler = () => {
    setToggleCart(false);
  };
  const minusCartItemHandler = (id) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            quantity: item.quantity - 1,
            image: item.image,
            price: item.price,
            productTitle: item.productTitle,
            variantTitle: item.variantTitle,
          };
        } else {
          return item;
        }
      })
    );
  };
  const plusCartItemHandler = (id) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            quantity: item.quantity + 1,
            image: item.image,
            price: item.price,
            productTitle: item.productTitle,
            variantTitle: item.variantTitle,
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
          return `{variantId:"${item.id}",quantity:${item.quantity}}`;
        })
        .join(",")
    );
  }, [cartItems]);

  return (
    <section>
      <div className="cart">
        <div className="cart-alignment">
          <div className="cart-icon" onClick={cartOpenHandler}>
            <BsMinecart size={20} className="cart-icon-image" />
            <span className="cart-icon-quantity">{cartQuantity}</span>
          </div>
        </div>
      </div>
      <div>
        {toggleCart && (
          <>
            <div className="cart-backdrop" onClick={cartCloseHandler} />
            <div className="cart-popup">
              <div className="cart-popup-header">
                <h2>What You're Getting</h2>
                <AiFillCloseCircle size={25} onClick={cartCloseHandler} />
              </div>
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
                      <div className="cart-popup-items-item" key={item.id}>
                        <div className="cart-popup-items-item-data">
                          <img src={item.image} alt="cart product" />
                          <div className="cart-popup-items-item-data-text">
                            <h3>{item.productTitle}</h3>
                            <span>{item.variantTitle}</span>
                            <div>
                              <AiOutlineMinus
                                onClick={() => minusCartItemHandler(item.id)}
                              />
                              <span>{item.quantity}</span>
                              <AiOutlinePlus
                                onClick={() => plusCartItemHandler(item.id)}
                              />

                              <span>{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <button
                className="cart-popup-checkout"
                onClick={createCheckoutHandler}
                disabled={!cartQuantity}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
