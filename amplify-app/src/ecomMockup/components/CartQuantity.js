import React, { useContext } from "react";
import CartContext from "../utils/cartContext";

function CartQuantity() {
  const { cartQuantity } = useContext(CartContext);

  return <span className="cart-icon-quantity">{cartQuantity}</span>;
}

export default CartQuantity;
