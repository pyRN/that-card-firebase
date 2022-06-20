import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fnFetchCards } from "../../../actions/index";
import "./ExpansionsContainer.css";

const ExpansionCard = ({ oExpansionInfo }) => {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();

  const handleOnClick = (oEvent) => {
    oEvent.preventDefault();
    fnDispatch(fnFetchCards(oExpansionInfo.code, oUser, false, true));

    fnHistory.push("/cards");
  };

  return (
    <div className="flex-column center expansion-card" onClick={handleOnClick}>
      <img
        src={oExpansionInfo.icon_svg_uri}
        className="expansion-img"
        alt={oExpansionInfo.name}
      />
      <h2 className="expansion-card-text">
        {oExpansionInfo.name} ({oExpansionInfo.code.toUpperCase()})
      </h2>
    </div>
  );
};

export default ExpansionCard;
