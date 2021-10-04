import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

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
      className="card m-2 p-2 border border-success bg-dark rounded col-md-2"
      onClick={handleOnClick}
      style={{ cursor: "pointer" }}
    >
      <div align="center">
        <img
          src={oExpansionInfo.icon_svg_uri}
          align="center"
          className="card-img-top"
          alt={oExpansionInfo.name}
          style={{
            height: 100,
            width: 100,
            filter: "drop-shadow(0px 0px 5px #0275d8)",
          }}
        />
      </div>
      <div className="card-body justify-content-center">
        <h5 className="text-primary text-center">{oExpansionInfo.name}</h5>
      </div>
    </div>
  );
}
