import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCardSearch } from "../../../actions/index";
import "./ExpansionsContainer.css";

export default function ExpansionCard({ oExpansionInfo }) {
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();

  const handleOnClick = (event) => {
    event.preventDefault();

    //Get cards from expansions
    getCardsFromExpansion(
      [],
      `https://api.scryfall.com/cards/search?order=set&q=e%3A${oExpansionInfo.code}&unique=prints`
    );
    fnHistory.push("/cards");
  };

  function getCardsFromExpansion(aCardFromExpansion, currentURL) {
    fnDispatch({
      type: "SET_CARDS_DISPLAYED",
      payload: {
        aDisplayedCards: null,
      },
    });
    fnDispatch({
      type: "SET_IS_LOADING",
      payload: {
        bIsLoading: true,
      },
    });
    fnDispatch({
      type: "RESET_FILTER",
    });
    // fnDispatch({
    //   type: "SET_FILTERED_CARDS",
    //   payload: null,
    // });
    fetch(currentURL)
      .then((response) => response.json())
      .then((data) => {
        aCardFromExpansion = aCardFromExpansion.concat(data.data);
        if (data.has_more) {
          getCardsFromExpansion(aCardFromExpansion, data.next_page);
        } else {
          fnDispatch(setCardSearch(aCardFromExpansion, false));
        }
      });
  }

  return (
    <div className="expansion-card" onClick={handleOnClick}>
      <div>
        <img
          src={oExpansionInfo.icon_svg_uri}
          className="expansion-img"
          alt={oExpansionInfo.name}
        />
        <h5 className="expansion-text">
          {oExpansionInfo.name} ({oExpansionInfo.code.toUpperCase()})
        </h5>
      </div>
    </div>
  );
}
