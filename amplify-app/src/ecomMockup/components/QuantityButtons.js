import React, { useState, useEffect } from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function QuantityButtons(props) {
  const [requireAboveZero, setRequireAboveZero] = useState(false);
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
