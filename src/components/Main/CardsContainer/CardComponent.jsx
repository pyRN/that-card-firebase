import React, { useRef } from "react";

export default function CardComponent({ oCardInfo }) {
  let aCardImage;

  //For double sided cards
  const aCardImagesSrcs =
    oCardInfo.card_faces && oCardInfo.card_faces[0].image_uris
      ? [
          oCardInfo.card_faces[0].image_uris.normal,
          oCardInfo.card_faces[1].image_uris.normal,
        ]
      : null;
  const oCardImage = useRef(null);

  const fnOnFlipClick = (event) => {
    event.preventDefault();
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

  return (
    <div className="card-container">
      <div className="card-items" align="center">
        {aCardImage}
        {aCardImagesSrcs ? (
          <button className="flip-btn" onClick={fnOnFlipClick}>
            Flip
          </button>
        ) : null}
        <div className="card-name-text">{oCardInfo.name}</div>
      </div>
    </div>
  );
}
