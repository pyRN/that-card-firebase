import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Footer() {
  const aCardsShown = useSelector((state) => state.oUserReducer.aCardsShown);
  const fnDispatch = useDispatch();
  const oFilterSelect = useRef(null);

  const fnOnChange = (event) => {
    event.preventDefault();
    let aFilteredCards;

    switch (oFilterSelect.current.value) {
      case "All":
        aFilteredCards = null;
        break;
      case "HTL":
        aFilteredCards = aCardsShown.sort((a, b) =>
          parseFloat(a.prices.usd) < parseFloat(b.prices.usd) ? 1 : -1
        );
        break;
      case "LTH":
        aFilteredCards = aCardsShown.sort((a, b) =>
          parseFloat(a.prices.usd) > parseFloat(b.prices.usd) ? 1 : -1
        );
        break;
      case "Mythic":
      case "Rare":
      case "Uncommon":
      case "Common":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.rarity === oFilterSelect.current.value.toLowerCase();
        });
        break;
      case "W":
      case "U":
      case "B":
      case "R":
      case "G":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return (
            oCard.color_identity.length === 1 &&
            oCard.color_identity.includes(oFilterSelect.current.value)
          );
        });
        break;
      case "Multicolored":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.color_identity.length > 1;
        });
        break;
      case "Colorless":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.color_identity.length === 0;
        });
        break;
      case "Land":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.type_line.includes("Land");
        });
        break;
      default:
        break;
    }
    fnDispatch({
      type: "SET_FILTERED_CARDS",
      payload: aFilteredCards,
    });
  };
  return (
    <div className="sticky-bottom cards-footer">
      {/* <div className="btn-container">
        <button className="cancel-btn" onClick={fnOnClick}>Cancel</button>
        <button className="save-btn" onClick={fnOnClick}>Save</button>
      </div> */}
      <select
        id="select-filter"
        className="filter-select"
        ref={oFilterSelect}
        onChange={fnOnChange}
      >
        <option defaultValue value="All">
          All
        </option>
        <option value="HTL">High to Low</option>
        <option value="LTH">Low to High</option>
        <option value="Mythic">Mythic</option>
        <option value="Rare">Rare</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Common">Common</option>
        <option value="W">White</option>
        <option value="U">Blue</option>
        <option value="B">Black</option>
        <option value="R">Red</option>
        <option value="G">Green</option>
        <option value="Multicolored">Multicolored</option>
        <option value="Colorless">Colorless</option>
        <option value="Land">Land</option>
      </select>
    </div>
  );
}
