import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Dropdown(props) {
  const [dropdownIsRevealed, setDropdownIsRevealed] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdownIsRevealed(!dropdownIsRevealed);
  };
  const hideDropdownHandler = () => {
    setDropdownIsRevealed(false);
  };

  return (
    <>
      <div className="navigation-item" onClick={toggleDropdownHandler}>
        <p className="navigation-item-link-level-one">
          {props.dropdownTitle}
          {props.children && dropdownIsRevealed && <FiChevronUp />}
          {props.children && !dropdownIsRevealed && <FiChevronDown />}
        </p>
        {dropdownIsRevealed && (
          <>
            <div className="navigation-item-dropdown-backdrop" />
            <div className="navigation-item-dropdown" onMouseLeave={hideDropdownHandler}>{props.children}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Dropdown;
