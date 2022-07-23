import React, { useState, useContext } from "react";
import { useTransition, animated } from "react-spring";

import { BsMinecart } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import CartItems from "./CartItems";
import CartQuantity from "./CartQuantity";
import CartContext from "../utils/cartContext";

function Cart() {
  const [createCheckoutTrigger, setCreateCheckoutTrigger] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const { cartQuantity } = useContext(CartContext)

  const cartOpenHandler = () => {
    setToggleCart(true);
  };
  const cartCloseHandler = () => {
    setToggleCart(false);
  };
  const checkoutButtonClickHandler = () => {
    setCreateCheckoutTrigger(true);
  };

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
            <div className="cart-backdrop" onClick={cartCloseHandler} />
            {cartTransition(
              (style, item) =>
                item && (
                  <animated.div style={style} className="cart-popup">
                    <div className="cart-popup-header">
                      <h2>What You're Getting</h2>
                      <AiFillCloseCircle size={25} onClick={cartCloseHandler} />
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
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
