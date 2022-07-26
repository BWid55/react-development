import React, { useContext } from "react";
import CartContext from "../utils/cartContext";

function CartQuantity() {
  //component used to reflect quantity of items housed in cart context
  const { cartQuantity } = useContext(CartContext);

  return <span className="cart-icon-quantity">{cartQuantity}</span>;
}

export default CartQuantity;
