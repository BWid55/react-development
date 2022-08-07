import React from "react";

const ProductVariantSelector = (props) => {
  //component used for updating variant selected in CandleProduct.js
  const changeHandler = (e, type) => {
    if (type === "Scent") {
      props.onScentChange(e.target.value);
    } else if (type === "Size") {
      props.onSizeChange(e.target.value);
    }
  };

  return (
    <div className="variant-selectors">
      {props.options.map((option) => {
        return (
          <div className="variant-selector" key={option.name}>
            <label htmlFor={option.name}>{option.name}</label>
            <select
              onChange={(e) => changeHandler(e, option.name)}
              id={option.name}
              defaultValue={option.name === "Size" && "8 oz Regular"}
            >
              {option.values.map((value) => {
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariantSelector;
