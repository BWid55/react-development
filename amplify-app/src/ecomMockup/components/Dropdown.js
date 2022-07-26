import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Dropdown(props) {
  //state used to reveal individual dropdown when title is clicked and hide when the mouse is removed form the dropdown or when click occurs outside the dropdown
  const [dropdownIsRevealed, setDropdownIsRevealed] = useState(false);

  //handles used to set state for reveal/hide an individual dropdown
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
