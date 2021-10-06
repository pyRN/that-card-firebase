import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ExpansionsContainer.css";

//Components
import ExpansionCard from "./ExpansionCard";

export default function ExpansionsContainer() {
  const aExpansionsList = useSelector(
    (state) => state.oExpansionsReducer.aExpansions
  );
  const fnDispatch = useDispatch();

  useEffect(() => {
    //Only make one call to this API for list of sets and save in state
    if (!aExpansionsList.length) {
      fetch("https://api.scryfall.com/sets")
        .then((response) => response.json())
        .then((data) => {
          fnDispatch({
            type: "SET_EXPANSION_LIST",
            payload: data.data,
          });
        });
    }
    //Scroll to top when navigating to this page
    window.scrollTo(0, 0);
  });

  //Only show expansions if they exist
  if (aExpansionsList !== undefined && aExpansionsList.length) {
    return (
      <>
        <div align="center" className="main-container">
          {aExpansionsList.map(function (oExpansionInfo) {
            return !oExpansionInfo.digital ? (
              <ExpansionCard
                key={oExpansionInfo.name}
                oExpansionInfo={oExpansionInfo}
              />
            ) : null;
          })}
        </div>
      </>
    );
  }

  //If no expansion list, show loading
  return (
    <div align="center" className="justify-content-center mt-3">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
}
