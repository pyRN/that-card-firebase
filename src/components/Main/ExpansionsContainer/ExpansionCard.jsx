import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  function getCardsFromExpansion(cards, currentURL) {
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
    fetch(currentURL)
      .then((response) => response.json())
      .then((data) => {
        cards = cards.concat(data.data);
        if (data.has_more) {
          getCardsFromExpansion(cards, data.next_page);
        } else {
          fnDispatch({
            type: "SET_CARDS_DISPLAYED",
            payload: {
              aDisplayedCards: cards,
            },
          });
          fnDispatch({
            type: "SET_IS_LOADING",
            payload: {
              bIsLoading: false,
            },
          });
        }
      });
  }

  return (
    <div className="expansion-card" onClick={handleOnClick}>
      <div className="expansion-items" align="center">
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
