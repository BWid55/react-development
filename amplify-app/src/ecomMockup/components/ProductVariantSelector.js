import React from "react";

const ProductVariantSelector = (props) => {
  const scentChangeHandler = (e) => {
    props.onScentChange(e.target.value);
  };
  const sizeChangeHandler = (e) => {
    props.onSizeChange(e.target.value);
  };

  return (
    <>
      <select onChange={scentChangeHandler}>
        <option value="Surprise me!">Surprise me!</option>
        <option value="Cinnamon & Vanilla">Cinnamon & Vanilla</option>
        <option value="Citrus & Agave">Citrus & Agave</option>
        <option value="Lush Linens">Lush Linens</option>
        <option value="Fresh Cut Flowers">Fresh Cut Flowers</option>
        <option value="Warm Apple Pie">Warm Apple Pie</option>
        <option value="Unscented">Unscented</option>
      </select>
      <select defaultValue="8 oz Regular" onChange={sizeChangeHandler}>
        <option value="4 oz Mini">4 oz Mini</option>
        <option value="8 oz Regular">8 oz Regular</option>
        <option value="16 oz Large">16 oz Large</option>
      </select>
    </>
  );
};

export default ProductVariantSelector;
