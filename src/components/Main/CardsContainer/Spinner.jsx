//TODO:If user is signed in, call to DB for amounts owned and display
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Spinner({ oCardInfo }) {
  const [iRegAmnt, fnSetRegAmnt] = useState(0);
  const [iFoilAmnt, fnSetFoilAmnt] = useState(0);
  const bIsDirty = useSelector((state) => state.oUserReducer.bIsDirty);
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const fnDispatch = useDispatch();

  const fnOnAmntChange = (event) => {
    event.preventDefault();
    let iRegVal = iRegAmnt;
    let iFoilVal = iFoilAmnt;
    /*TODO: This code is redundant because there is no callback for useState.  
    There needs to be a better way to accomplish this without doubling variables.*/
    switch (event.target.name) {
      case "decrement-regular":
        //Cannot have amount less than zero
        iRegAmnt - 1 < 0 ? (iRegVal = 0) : (iRegVal = iRegAmnt - 1);
        iRegAmnt - 1 < 0 ? fnSetRegAmnt(0) : fnSetRegAmnt(iRegAmnt - 1);
        break;
      case "increment-regular":
        iRegVal = iRegAmnt + 1;
        fnSetRegAmnt(iRegAmnt + 1);
        break;
      case "decrement-foil":
        //Cannot have amount less than zero
        iFoilAmnt - 1 < 0 ? (iFoilVal = 0) : (iFoilVal = iFoilAmnt - 1);
        iFoilAmnt - 1 < 0 ? fnSetFoilAmnt(0) : fnSetFoilAmnt(iFoilAmnt - 1);
        break;
      case "increment-foil":
        iFoilVal = iFoilAmnt + 1 + 1;
        fnSetFoilAmnt(iFoilAmnt + 1);
        break;
      default:
        break;
    }

    //Set dirty flag if not already dirty
    if (!bIsDirty) {
      fnDispatch({
        type: "SET_DIRTY",
      });
    }

    //Dispatch changes to staging table
    fnDispatch({
      type: "ADD_TO_STAGE",
      payload: {
        sId: oCardInfo.id.replace(/-/g, ""),
        sName: oCardInfo.name,
        sExpansion: oCardInfo.set,
        iRegular: oCardInfo.nonfoil ? iRegVal : null,
        iFoil: oCardInfo.foil ? iFoilVal : null,
      },
    });
  };
  return (
    <div className="spinner-container">
      {oCardInfo.nonfoil ? (
        <div className="spinner">
          {"Reg: "}
          {!oCardInfo.prices.usd ? "$0.00" : "$" + oCardInfo.prices.usd}
          {oUser ? (
            <div className="btn-row">
              <button
                className="spinner-btn"
                name="decrement-regular"
                onClick={fnOnAmntChange}
              >
                -
              </button>
              <p className="spinner-text">{iRegAmnt}</p>
              <button
                className="spinner-btn"
                name="increment-regular"
                onClick={fnOnAmntChange}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {oCardInfo.foil ? (
        <div className="spinner">
          {"Foil: "}
          {!oCardInfo.prices.usd_foil
            ? "$0.00"
            : "$" + oCardInfo.prices.usd_foil}
          {oUser ? (
            <div className="btn-row">
              <button
                className="spinner-btn"
                name="decrement-foil"
                onClick={fnOnAmntChange}
              >
                -
              </button>
              <p className="spinner-text">{iFoilAmnt}</p>
              <button
                className="spinner-btn"
                name="increment-foil"
                onClick={fnOnAmntChange}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
