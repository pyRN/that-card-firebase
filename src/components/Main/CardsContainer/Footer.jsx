import React, { useRef } from "react";
import { resetStaging } from "../../../actions";
import { getFirestore, doc, writeBatch } from "firebase/firestore"; //addDoc,collection,
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./../../../firebase";

const Footer = () => {
  const aFetchedPromises = useSelector(
    (state) => state.oUserReducer.aFetchedPromises
  );
  const bIsDirty = useSelector((state) => state.oUserReducer.bIsDirty);
  const aStaging = useSelector((state) => state.oUserReducer.aStaging);
  const fnDispatch = useDispatch();
  const oFilterSelect = useRef(null);
  const db = getFirestore();

  const fnOnSave = (oEvent) => {
    oEvent.preventDefault();
    const oUser = auth.currentUser;
    if (oUser) {
      const batch = writeBatch(db);
      try {
        for (let i = 0; i < aStaging.length; i++) {
          if (aStaging[i].iRegular === 0 && aStaging[i].iFoil === 0) {
            batch.delete(doc(db, oUser.uid, aStaging[i].sId.replace(/-/g, "")));
          } else {
            batch.set(doc(db, oUser.uid, aStaging[i].sId.replace(/-/g, "")), {
              sId: aStaging[i].sId,
              sName: aStaging[i].sName,
              sExpansion: aStaging[i].sExpansion,
              iRegular: aStaging[i].iRegular,
              iFoil: aStaging[i].iFoil,
            });
          }
        }
        batch.commit();
        fnDispatch(resetStaging());
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const fnOnChangeFilter = (oEvent) => {
    //TODO: Fix the price filter
    oEvent.preventDefault();
    let aFilteredCards;
    if (aFetchedPromises && aFetchedPromises[0].length > 0) {
      switch (oFilterSelect.current.value) {
        case "All":
          aFilteredCards = aFetchedPromises[0];
          break;
        // case "HTL":
        //   aFilteredCards = aFetchedPromises[0].sort((a, b) => {
        //     // parseFloat(a.prices.usd) < parseFloat(b.prices.usd) ? 1 : -1
        //     return (
        //       parseFloat(a.prices.usd ? a.prices.usd : 0) <
        //       parseFloat(b.prices.usd ? b.prices.usd : 0)
        //     );
        //   });
        //   break;
        // case "LTH":
        //   aFilteredCards = aFetchedPromises[0].sort((a, b) =>
        //     parseFloat(a.prices.usd) > parseFloat(b.prices.usd) ? 1 : -1
        //   );
        //   break;
        case "Mythic":
        case "Rare":
        case "Uncommon":
        case "Common":
          aFilteredCards = aFetchedPromises[0].filter((oCard) => {
            return oCard.rarity === oFilterSelect.current.value.toLowerCase();
          });
          break;
        case "W":
        case "U":
        case "B":
        case "R":
        case "G":
          aFilteredCards = aFetchedPromises[0].filter((oCard) => {
            return (
              oCard.color_identity.length === 1 &&
              oCard.color_identity.includes(oFilterSelect.current.value)
            );
          });
          break;
        case "Multicolored":
          aFilteredCards = aFetchedPromises[0].filter((oCard) => {
            return oCard.color_identity.length > 1;
          });
          break;
        case "Colorless":
          aFilteredCards = aFetchedPromises[0].filter((oCard) => {
            return oCard.color_identity.length === 0;
          });
          break;
        case "Land":
          aFilteredCards = aFetchedPromises[0].filter((oCard) => {
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
    }
  };
  return (
    <footer className="sticky-bottom flex-row w-100">
      <form className="footer-form">
        {bIsDirty ? (
          <div>
            <button
              className="btn btn-danger"
              onClick={() => fnDispatch(resetStaging())}
            >
              Cancel
            </button>
            <button className="btn btn-submit" onClick={fnOnSave}>
              Save
            </button>
          </div>
        ) : null}
        <select
          id="select-filter"
          ref={oFilterSelect}
          onChange={fnOnChangeFilter}
          className="mobile-select"
        >
          <option defaultValue value="All">
            All
          </option>
          {/* <option value="HTL">High to Low</option>
          <option value="LTH">Low to High</option> */}
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
};

export default Footer;
