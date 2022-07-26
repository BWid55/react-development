import React, { useEffect } from "react";

function PriceAndVariant(props) {
  //component used to update variant item data in CandleProduct.js
  const productTitle = props.productTitle;
  const variantTitle = props.variantTitle;
  const price = props.price;
  const variantId = props.variantId;

  useEffect(() => {
    props.onVariantChange(variantId, price, variantTitle, productTitle);
  }, [props, variantId, price, productTitle, variantTitle]);

  return (
    <div className="variant-price">
      <span className="variant-price-inner">
        ${Number(props.price).toFixed(2)}
      </span>
    </div>
  );
}

export default PriceAndVariant;
