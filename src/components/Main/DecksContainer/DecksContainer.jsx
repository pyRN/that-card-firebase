import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fnFetchDecks } from "../../../actions/index";
import "./DecksContainer.css";

export default function DecksContainer() {
  // const aDecks = useSelector((state) => state.oUserReducer.aDecks);
  const aDecks = [
    {
      sDeckName: "8 Rack",
    },
    {
      sDeckName: "Mono Red Sligh",
    },
    {
      sDeckName: "Acid Trip",
    },
    {
      sDeckName: "Affinity",
    },
  ];
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();

  const handleOnClick = (oEvent) => {
    oEvent.preventDefault();
    fnDispatch(fnFetchDecks(oEvent.target.name));
    fnHistory.push("/deck");
  };

  return (
    <div className="page-container">
      <div
        className="expansion-card"
        onClick={handleOnClick}
        name={"add-new-deck"}
      >
        <h2 align="center">+ New Deck</h2>
      </div>
      {aDecks.map((oDeck) => {
        return (
          <div
            className="expansion-card"
            onClick={handleOnClick}
            name={oDeck.sDeckName}
            key={oDeck.sDeckName}
          >
            <h2 align="center">{oDeck.sDeckName}</h2>
          </div>
        );
      })}
    </div>
  );
}
