import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Footer = () => {
  const aExpansionsList = useSelector(
    (state) => state.oExpansionsReducer.aExpansions
  );
  let aExpansionNames = aExpansionsList.map((oExpansion) => oExpansion.name);
  const fnDispatch = useDispatch();
  const oExpansionSearch = useRef(null);

  const fnOnChange = (event) => {
    event.preventDefault();

    fnDispatch({
      type: "SET_EXPANSION_FILTER",
      payload: aExpansionNames.filter((sName) =>
        sName
          .toLowerCase()
          .includes(oExpansionSearch.current.value.toLowerCase())
      ),
    });
  };

  return (
    <footer className="sticky-bottom flex-row w-100">
      <form className="footer-form">
        <input
          type="search"
          placeholder="Search Expansions"
          aria-label="Search"
          onChange={fnOnChange}
          ref={oExpansionSearch}
          autoFocus
        />
      </form>
    </footer>
  );
};

export default Footer;
