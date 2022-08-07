import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { useTransition, animated } from "react-spring";
import { BsMinecart } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import CartItems from "./CartItems";
import CartQuantity from "./CartQuantity";
import CartContext from "../utils/cartContext";

function Cart() {
  //state and context used transfer to Shopify checkout, update the quantity of items in cart, and open/close the cart
  const [createCheckoutTrigger, setCreateCheckoutTrigger] = useState(false);
  const { cartQuantity } = useContext(CartContext);
  const [toggleCart, setToggleCart] = useState(false);

  //handlers used to trigger opening the cart, closing the cart, and transferring to Shopify checkout
  const cartOpenHandler = () => {
    setToggleCart(true);
  };
  const cartCloseHandler = () => {
    setToggleCart(false);
  };
  const checkoutButtonClickHandler = () => {
    setCreateCheckoutTrigger(true);
  };

  //function to show cart with a pleasant transition
  const cartTransition = useTransition(toggleCart, {
    from: { x: 250, opacity: 0 },
    enter: { x: 0, opacity: 1 },
  });

  return (
    <section>
      <div className="cart">
        <div className="cart-alignment">
          <div className="cart-icon" onClick={cartOpenHandler}>
            <BsMinecart size={20} className="cart-icon-image" />
            <CartQuantity />
          </div>
        </div>
      </div>
      <div>
        {toggleCart && (
          <>
            {ReactDOM.createPortal(
              <>
                <div className="cart-backdrop" onClick={cartCloseHandler} />
                {cartTransition(
                  (style, item) =>
                    item && (
                      <animated.div style={style} className="cart-popup">
                        <div className="cart-popup-header">
                          <h2>What You're Getting</h2>
                          <AiFillCloseCircle
                            size={25}
                            onClick={cartCloseHandler}
                          />
                        </div>
                        <CartItems
                          createCheckoutTrigger={createCheckoutTrigger}
                        />
                        <button
                          className="cart-popup-checkout"
                          onClick={checkoutButtonClickHandler}
                          disabled={!cartQuantity}
                        >
                          Checkout
                        </button>
                      </animated.div>
                    )
                )}
              </>,
              document.querySelector("#cart-modal-root")
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
