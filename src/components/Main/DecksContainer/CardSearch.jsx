import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fnFetchSingleCard } from "../../../actions";
//Media
import MTGCard from "../../../multimedia/Magic_card_back.jpg";

export default function CardSearch() {
  const oCard = useSelector((state) => state.oUserReducer.oDeckCardSearch);
  const oSearchInput = useRef(null);
  let aCardImage;
  const oBoardSelect = useRef(null);
  const oCardImage = useRef(null);
  const oSpinnerInput = useRef(null);
  const fnDispatch = useDispatch();

  //For double sided cards
  const aCardImagesSrcs =
    oCard !== null && oCard.card_faces && oCard.card_faces[0].image_uris
      ? [
          oCard.card_faces[0].image_uris.normal,
          oCard.card_faces[1].image_uris.normal,
        ]
      : null;

  const fnOnFlipClick = (oEvent) => {
    oEvent.preventDefault();
    oCardImage.current.src =
      oCardImage.current.src === aCardImagesSrcs[0]
        ? aCardImagesSrcs[1]
        : aCardImagesSrcs[0];
  };

  aCardImage =
    oCard === null ? (
      <img src={MTGCard} className="mtg-card" alt="Magic Card Back" />
    ) : aCardImagesSrcs ? (
      <img
        className="mtg-card"
        alt={oCard.name}
        src={oCard.card_faces[0].image_uris.normal}
        ref={oCardImage}
      />
    ) : (
      <img
        src={oCard.image_uris.normal}
        className="mtg-card"
        alt={oCard.name}
      />
    );

  const fnSearchCard = (oEvent) => {
    oEvent.preventDefault();
    if (oSearchInput.current.value) {
      fnDispatch(fnFetchSingleCard(oSearchInput.current.value));
      oSearchInput.current.value = "";
    }
  };

  const fnOnAddCard = (oEvent) => {
    oEvent.preventDefault();
    fnDispatch({
      type: "ADD_CARD_TO_DECK",
      payload: {
        sName: oCard.name,
        aLegalities: oCard.legalities,
        iCmc: oCard.cmc,
        iAmount: oSpinnerInput.current.value,
        sType: oCard.type_line,
        sBoard: oBoardSelect.current.value,
      },
    });
  };

  return (
    <div className="static-card">
      <div className="card-items" align="center">
        <form className="input-form" onSubmit={fnSearchCard}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={oSearchInput}
          />
          <button className="submit-btn" type="submit" onClick={fnSearchCard}>
            Search
          </button>
        </form>
        {oCard !== null ? (
          <div>
            <input
              type="number"
              className="deck-spinner"
              min="0"
              ref={oSpinnerInput}
            />
            <select ref={oBoardSelect}>
              <option value="mainBoard">Main Board</option>
              <option value="sideBoard">Sideboard</option>
              <option value="maybeBoard">Maybe Board</option>
            </select>
            <button className="submit-btn" onClick={fnOnAddCard}>
              Add
            </button>
          </div>
        ) : null}
        {oCard !== null ? (
          aCardImage
        ) : (
          <img src={MTGCard} className="mtg-card" alt="Magic Card Back" />
        )}
        {aCardImagesSrcs ? (
          <button className="flip-btn" onClick={fnOnFlipClick}>
            Flip
          </button>
        ) : null}
      </div>
    </div>
  );
}
