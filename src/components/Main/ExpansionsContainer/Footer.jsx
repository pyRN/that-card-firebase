import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Footer() {
  const aExpansionsList = useSelector(
    (state) => state.oExpansionsReducer.aExpansions
  );
  let aExpansionNames = [];
  for (let i = 0; i < aExpansionsList.length; i++) {
    aExpansionNames.push(aExpansionsList[i].name);
  }
  const fnDispatch = useDispatch();
  const oExpansionSearch = useRef(null);

  const fnOnChange = (event) => {
    event.preventDefault();

    fnDispatch({
      type: "SET_EXPANSION_FILTER",
      payload: aExpansionNames.filter(function (sName) {
        return sName
          .toLowerCase()
          .includes(oExpansionSearch.current.value.toLowerCase());
      }),
    });
  };

  return (
    <footer className="sticky-bottom">
      <form className="footer-form">
        <input
          type="search"
          placeholder="Search Expansions"
          aria-label="Search"
          onChange={fnOnChange}
          ref={oExpansionSearch}
        />
      </form>
    </footer>
  );
}
