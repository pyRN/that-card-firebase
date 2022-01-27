import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCardSearch, resetCardSearch } from "../../../actions/index";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import "./ExpansionsContainer.css";

export default function ExpansionCard({ oExpansionInfo }) {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const db = getFirestore();
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();

  const handleOnClick = (event) => {
    event.preventDefault();
    fnDispatch(resetCardSearch());

    new Promise((fnResolveExpansions, fnReject) => {
      //Get cards from expansions
      getCardsFromExpansion(
        [],
        `https://api.scryfall.com/cards/search?order=set&q=e%3A${oExpansionInfo.code}&unique=prints`,
        fnResolveExpansions
      );
    }).then((aCards) => {
      let aCardIds = [];

      aCards.forEach((oCard) => {
        aCardIds.push(oCard.id.replace(/-/g, ""));
      });

      new Promise((fnResolve, fnReject) => {
        fnGetDocsFromSearch(aCardIds, fnResolve);
      }).then((aOwnedCards) => {
        fnDispatch(setCardSearch([aCards, aOwnedCards], false));
        fnDispatch({
          type: "SET_EXPANSION_FILTER",
          payload: [],
        });
        fnHistory.push("/cards");
      });
    });
  };

  function getCardsFromExpansion(
    aCardsFromExpansion,
    currentURL,
    fnResolveExpansions
  ) {
    fetch(currentURL)
      .then((response) => response.json())
      .then((data) => {
        aCardsFromExpansion = aCardsFromExpansion.concat(data.data);
        if (data.has_more) {
          getCardsFromExpansion(
            aCardsFromExpansion,
            data.next_page,
            fnResolveExpansions
          );
        } else {
          fnResolveExpansions(aCardsFromExpansion);
        }
      });
  }

  const fnGetDocsFromSearch = (aCardIds, fnResolve) => {
    if (oUser) {
      //Firebase only allows for 10 comparison values, have to make multiple queries
      let aBatchQueries = [];

      while (aCardIds.length) {
        let aChunkOfTenIds = aCardIds.splice(0, 10);

        aBatchQueries.push(
          new Promise((fnResolveQuery, fnRejectQuery) => {
            getDocs(
              query(
                collection(db, oUser.uid),
                where("sId", "in", aChunkOfTenIds)
              )
            ).then((docs) => {
              let aDocsFetched = [];
              docs.forEach((oCard) => {
                aDocsFetched.push(oCard.data());
              });
              fnResolveQuery(aDocsFetched);
            });
          })
        );
      }

      Promise.all(aBatchQueries).then((aRetrievedQueries) => {
        let aDocsRetrieved = [];

        aRetrievedQueries.forEach((aQuery) => {
          aDocsRetrieved = aDocsRetrieved.concat(aQuery);
        });

        fnResolve(aDocsRetrieved);
      });
    } else {
      fnResolve(null);
    }
  };

  return (
    <div className="expansion-card" onClick={handleOnClick}>
      <img
        src={oExpansionInfo.icon_svg_uri}
        className="expansion-img"
        alt={oExpansionInfo.name}
      />
      <h5 align="center">
        {oExpansionInfo.name} ({oExpansionInfo.code.toUpperCase()})
      </h5>
    </div>
  );
}
