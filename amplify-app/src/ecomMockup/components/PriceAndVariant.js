import React, { useEffect } from "react";

function PriceAndVariant(props) {
  const productTitle = props.productTitle;
  const variantTitle = props.variantTitle;
  const price = props.price;
  const variantId = props.variantId;

  useEffect(() => {
    props.onVariantChange(variantId, price, variantTitle, productTitle);
  }, [props, variantId]);

  return <span>{price}</span>;
}

export default PriceAndVariant;
