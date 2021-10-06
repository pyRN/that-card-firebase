import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ExpansionsContainer.css";

export default function ExpansionCard({ oExpansionInfo }) {
  const fDispatch = useDispatch();
  const fHistory = useHistory();

  const handleOnClick = (event) => {
    event.preventDefault();

    function getCardsFromExpansion(cards, currentURL) {
      fDispatch({
        type: "SET_LOADING",
        payload: {
          bIsDataLoading: true,
        },
      });

      fetch(currentURL)
        .then((response) => response.json())
        .then((data) => {
          cards = cards.concat(data.data);
          if (data.has_more) {
            getCardsFromExpansion(cards, data.next_page);
          } else {
            fDispatch({
              type: "SET_SEARCH_RESULTS",
              payload: {
                sTitle: `Do I Have Cards From: ${oExpansionInfo.name}`,
                bIsFromSet: true,
                sInputValue: oExpansionInfo.code,
                aDisplayedCards: cards,
                bIsDataLoading: false,
              },
            });
          }
        });
    }

    getCardsFromExpansion(
      [],
      `https://api.scryfall.com/cards/search?order=set&q=e%3A${oExpansionInfo.code}&unique=prints`
    );
    fHistory.push("/cards");
  };

  return (
    <div
      className="expansion-card"
      onClick={handleOnClick}
      style={{ cursor: "pointer" }}
    >
      <div className="expansion-items" align="center">
        <img
          src={oExpansionInfo.icon_svg_uri}
          className="expansion-img"
          alt={oExpansionInfo.name}
        />
        <h5 className="expansion-text">{oExpansionInfo.name}</h5>
      </div>
    </div>
  );
}
