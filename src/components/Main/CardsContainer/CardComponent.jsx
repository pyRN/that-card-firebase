import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fnFetchCards } from "./../../../actions/";
import "./CardsContainer.css";

//Components
import Spinner from "./Spinner";
import UserSpinner from "./UserSpinner";

export default function CardComponent({ oCardInfo }) {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  let aCardImage;
  const oCardImage = useRef(null);
  const fnDispatch = useDispatch();

  //For double sided cards
  const aCardImagesSrcs =
    oCardInfo.card_faces && oCardInfo.card_faces[0].image_uris
      ? [
          oCardInfo.card_faces[0].image_uris.normal,
          oCardInfo.card_faces[1].image_uris.normal,
        ]
      : null;

  const fnOnFlipClick = (oEvent) => {
    oEvent.preventDefault();
    oCardImage.current.src =
      oCardImage.current.src === aCardImagesSrcs[0]
        ? aCardImagesSrcs[1]
        : aCardImagesSrcs[0];
  };

  aCardImage = aCardImagesSrcs ? (
    <img
      className="mtg-card"
      alt={oCardInfo.name}
      src={oCardInfo.card_faces[0].image_uris.normal}
      ref={oCardImage}
    />
  ) : (
    <img
      src={oCardInfo.image_uris.normal}
      className="mtg-card"
      alt={oCardInfo.name}
    />
  );

  const fnOnNameClick = (oEvent) => {
    oEvent.preventDefault();
    fnDispatch(fnFetchCards(oCardInfo.name, oUser, true, false));
  };

  const fnOnSetClick = (oEvent) => {
    oEvent.preventDefault();
    fnDispatch(fnFetchCards(oCardInfo.set, oUser, false, true));
  };

  return (
    <div className="static-card">
      <div className="card-items" align="center">
        {aCardImage}
        {aCardImagesSrcs ? (
          <button className="submit-btn" onClick={fnOnFlipClick}>
            Flip
          </button>
        ) : null}
        <div className="card-name-text" onClick={fnOnNameClick}>
          {oCardInfo.name} ({oCardInfo.rarity.slice(0, 1).toUpperCase()})
        </div>
        <div className="set-name-text" onClick={fnOnSetClick}>
          {oCardInfo.set_name} ({oCardInfo.set.toUpperCase()})
        </div>
        <div className="spinner-container">
          {oUser ? (
            <>
              {oCardInfo.nonfoil ? (
                <UserSpinner oCardInfo={oCardInfo} sType={"Regular"} />
              ) : null}
              {oCardInfo.foil ? (
                <UserSpinner oCardInfo={oCardInfo} sType={"Foil"} />
              ) : null}
            </>
          ) : (
            <>
              {oCardInfo.nonfoil ? (
                <Spinner oCardInfo={oCardInfo} sType={"Regular"} />
              ) : null}
              {oCardInfo.foil ? (
                <Spinner oCardInfo={oCardInfo} sType={"Foil"} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
