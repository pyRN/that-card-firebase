//TODO:   When returning to expansions page, filtered expansions needs to reset.

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ExpansionsContainer.css";

//Components
import ExpansionCard from "./ExpansionCard";
import Footer from "./Footer.jsx";
import LoadingSymbol from "../LoadingSymbol";

export default function ExpansionsContainer() {
  const aExpansionsList = useSelector(
    (state) => state.oExpansionsReducer.aExpansions
  );
  const aFilteredExpansions = useSelector(
    (state) => state.oExpansionsReducer.aFilteredExpansions
  );
  const fnDispatch = useDispatch();

  useEffect(() => {
    //Only make one call to this API for list of sets and save in state
    if (!aExpansionsList.length) {
      fnDispatch({
        type: "SET_IS_LOADING",
        payload: {
          bIsLoading: true,
        },
      });
      fetch("https://api.scryfall.com/sets")
        .then((response) => response.json())
        .then((data) => {
          fnDispatch({
            type: "SET_EXPANSION_LIST",
            payload: data.data,
          });
          fnDispatch({
            type: "SET_IS_LOADING",
            payload: {
              bIsLoading: false,
            },
          });
        });
    }
    //Scroll to top when navigating to this page
    window.scrollTo(0, 0);
  });

  //Only show expansions if they exist
  if (aExpansionsList !== undefined && aExpansionsList.length) {
    return (
      <div className="flex-column center w-100">
        <div className="flex-row flex-wrap center">
          <LoadingSymbol />
          {aExpansionsList.map(function (oExpansionInfo) {
            return !oExpansionInfo.digital &&
              (aFilteredExpansions.length === 0 ||
                aFilteredExpansions.includes(oExpansionInfo.name)) ? (
              <ExpansionCard
                key={oExpansionInfo.name}
                oExpansionInfo={oExpansionInfo}
              />
            ) : null;
          })}
        </div>
        <Footer />
      </div>
    );
  }

  //If no expansion list, show loading
  return (
    <div className="expansions-container">
      <LoadingSymbol />
    </div>
  );
}
