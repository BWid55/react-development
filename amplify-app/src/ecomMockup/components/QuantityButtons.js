import React, { useState, useEffect } from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function QuantityButtons(props) {
  //component used to increment and decriment (used in cart and product components)
  //requireAboveZero state requires 1 or above to be maintained (e.g. cannot go negative on assortment pages)
  const [requireAboveZero, setRequireAboveZero] = useState(false);
  //two handlers for decrementing and incrementing quantity respectively, as well as an effect to track if parent component requires a minimum of 1
  const minusHandler = () => {
    props.onDecrease(props.cartItemId);
  };
  const plusHandler = () => {
    props.onIncrease(props.cartItemId);
  };
  useEffect(() => {
    if (props.requireAboveZero) {
        setRequireAboveZero(true);
    }
  }, []);

  return (
    <div className="quantity-buttons">
      <AiOutlineMinus
        onClick={
            requireAboveZero && props.quantity === 1 ? undefined : () => minusHandler()
        }
        className={requireAboveZero && props.quantity === 1 && "disabled"}
      />
      <span>{props.quantity}</span>
      <AiOutlinePlus
        onClick={props.moreAvailable ? () => plusHandler() : undefined}
        className={!props.moreAvailable && "disabled"}
      />
    </div>
  );
}

export default QuantityButtons;
