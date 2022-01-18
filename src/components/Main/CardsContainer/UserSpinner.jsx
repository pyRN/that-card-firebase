import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UserSpinner({ oCardInfo, sType }) {
  const aFetchedPromises = useSelector(
    (state) => state.oUserReducer.aFetchedPromises
  );
  const fnDispatch = useDispatch();
  let oOwnedCard;

  if (aFetchedPromises[1]) {
    oOwnedCard = aFetchedPromises[1].filter(
      (oOwnedInfo) => oOwnedInfo.sId === oCardInfo.id.replace(/-/g, "")
    )[0];
  } else {
    oOwnedCard = null;
  }

  const [iAmnt, fnSetAmnt] = useState(
    oOwnedCard
      ? sType === "Regular"
        ? parseInt(oOwnedCard.iRegular)
        : parseInt(oOwnedCard.iFoil)
      : 0
  );

  const fnOnAmntChange = (event) => {
    event.preventDefault();
    let iOriginal;
    switch (event.target.name) {
      case "decrement":
        //Cannot have amount less than zero
        fnSetAmnt(iAmnt - 1 < 0 ? 0 : iAmnt - 1);
        iOriginal = iAmnt - 1 < 0 ? 0 : iAmnt - 1;
        break;
      case "increment":
        fnSetAmnt(iAmnt + 1);
        iOriginal = iAmnt + 1;
        break;
      default:
        break;
    }

    //Set dirty flag if not already dirty
    fnDispatch({
      type: "SET_DIRTY",
      payload: true,
    });

    //Dispatch changes to staging table
    fnDispatch({
      type: "ADD_TO_STAGE",
      payload: {
        sId: oCardInfo.id.replace(/-/g, ""),
        sName: oCardInfo.name.toLowerCase(),
        sExpansion: oCardInfo.set,
        iRegular:
          sType === "Regular"
            ? iOriginal
            : oOwnedCard
            ? oOwnedCard.iRegular
            : oCardInfo.nonfoil
            ? 0
            : null,
        iFoil:
          sType === "Foil"
            ? iOriginal
            : oOwnedCard
            ? oOwnedCard.iFoil
            : oCardInfo.foil
            ? 0
            : null,
        sType: sType,
      },
    });
  };

  return (
    <div className="spinner">
      {sType === "Regular" ? "Reg: " : "Foil: "}
      {sType === "Regular"
        ? !oCardInfo.prices.usd
          ? "$0.00"
          : "$" + oCardInfo.prices.usd
        : !oCardInfo.prices.usd_foil
        ? "$0.00"
        : "$" + oCardInfo.prices.usd_foil}
      {aFetchedPromises[1] ? (
        <div className="btn-row">
          <button
            className="spinner-btn"
            name="decrement"
            onClick={fnOnAmntChange}
          >
            -
          </button>
          <p className="spinner-text">{iAmnt}</p>
          <button
            className="spinner-btn"
            name="increment"
            onClick={fnOnAmntChange}
          >
            +
          </button>
        </div>
      ) : null}
    </div>
  );
}
