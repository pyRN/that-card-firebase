import React, { useRef } from "react";
import { resetStaging } from "../../../actions";
import { getFirestore, doc, writeBatch } from "firebase/firestore"; //addDoc,collection,
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./../../../firebase";

export default function Footer() {
  const aCardsShown = useSelector((state) => state.oUserReducer.aCardsShown);
  const bIsDirty = useSelector((state) => state.oUserReducer.bIsDirty);
  const aStaging = useSelector((state) => state.oUserReducer.aStaging);
  const fnDispatch = useDispatch();
  const oFilterSelect = useRef(null);
  const db = getFirestore();

  const fnOnClick = (event) => {
    event.preventDefault();
    const oUser = auth.currentUser;
    if (event.target.name === "save") {
      if (oUser) {
        const batch = writeBatch(db);
        try {
          for (let i = 0; i < aStaging.length; i++) {
            batch.set(
              doc(db, oUser.uid, aStaging[i].sId.replace(/-/g, "")),
              aStaging[i]
            );
          }
          batch.commit();
          fnDispatch(resetStaging());
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
    if (event.target.name === "cancel") {
      fnDispatch(resetStaging());
    }
  };

  const fnOnChange = (event) => {
    event.preventDefault();
    let aFilteredCards;

    switch (oFilterSelect.current.value) {
      case "All":
        aFilteredCards = null;
        break;
      case "HTL":
        aFilteredCards = aCardsShown.sort((a, b) =>
          parseFloat(a.prices.usd) < parseFloat(b.prices.usd) ? 1 : -1
        );
        break;
      case "LTH":
        aFilteredCards = aCardsShown.sort((a, b) =>
          parseFloat(a.prices.usd) > parseFloat(b.prices.usd) ? 1 : -1
        );
        break;
      case "Mythic":
      case "Rare":
      case "Uncommon":
      case "Common":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.rarity === oFilterSelect.current.value.toLowerCase();
        });
        break;
      case "W":
      case "U":
      case "B":
      case "R":
      case "G":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return (
            oCard.color_identity.length === 1 &&
            oCard.color_identity.includes(oFilterSelect.current.value)
          );
        });
        break;
      case "Multicolored":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.color_identity.length > 1;
        });
        break;
      case "Colorless":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.color_identity.length === 0;
        });
        break;
      case "Land":
        aFilteredCards = aCardsShown.filter((oCard) => {
          return oCard.type_line.includes("Land");
        });
        break;
      default:
        break;
    }
    fnDispatch({
      type: "SET_FILTERED_CARDS",
      payload: aFilteredCards,
    });
  };
  return (
    <footer className="sticky-bottom">
      <form className="footer-form">
        {bIsDirty ? (
          <div>
            <button className="cancel-btn" onClick={fnOnClick} name="cancel">
              Cancel
            </button>
            <button className="submit-btn" onClick={fnOnClick} name="save">
              Save
            </button>
          </div>
        ) : null}
        <select
          id="select-filter"
          ref={oFilterSelect}
          onChange={fnOnChange}
          className="mobile-select"
        >
          <option defaultValue value="All">
            All
          </option>
          <option value="HTL">High to Low</option>
          <option value="LTH">Low to High</option>
          <option value="Mythic">Mythic</option>
          <option value="Rare">Rare</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Common">Common</option>
          <option value="W">White</option>
          <option value="U">Blue</option>
          <option value="B">Black</option>
          <option value="R">Red</option>
          <option value="G">Green</option>
          <option value="Multicolored">Multicolored</option>
          <option value="Colorless">Colorless</option>
          <option value="Land">Land</option>
        </select>
      </form>
    </footer>
  );
}
