import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MainContainer.css";
//Media
import MtgCard from "../../../multimedia/Magic_card_back.jpg";

const MainContainer = () => {
  const fnHistory = useHistory();
  const [oLandingMtgCard, fnSetLandingMtgCard] = useState(MtgCard);
  const fnGetRandomCard = () => {
    fetch(`https://api.scryfall.com/cards/random`)
      .then((response) => response.json())
      .then((oCardInfo) => {
        const aImageSrc =
          oCardInfo.card_faces && oCardInfo.card_faces[0].image_uris
            ? oCardInfo.card_faces[0].image_uris.normal
            : oCardInfo.image_uris.normal;
        fnSetLandingMtgCard(aImageSrc);
      });
  };

  return (
    <div className="landing-card flex-row center w-100">
      <div className="flex-column  landing-content w-50 center">
        <h1 className="main-heading">Do I Have That Card?</h1>
        <p className="sub-heading">
          A light weight Magic: The Gathering&#169; card collection manager for
          physical cards.
        </p>
        <button
          className="btn btn-submit"
          onClick={() => {
            fnHistory.push("/signUp");
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="random-card" onClick={fnGetRandomCard}>
        <img
          src={oLandingMtgCard}
          className="mtg-card w-50"
          alt="Magic Card Back"
          id="landing-mtg-card"
        />
      </div>
    </div>
  );
};

export default MainContainer;
