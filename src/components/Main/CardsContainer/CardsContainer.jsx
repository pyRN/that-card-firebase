import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";

//Media
import LastChance from "../../../multimedia/Last-chance.jpg";
import VampiricTutor from "../../../multimedia/Vampiric-tutor.jpg";

export default function CardsContainer() {
  const aCardsShown = useSelector((state) => state.oUserReducer.aCardsShown);
  console.log("aCardsShown: ", aCardsShown);

  return (
    <>
      {aCardsShown && aCardsShown.length ? (
        <div className="page-container">
          {aCardsShown !== null
            ? aCardsShown.map(function (oCardInfo) {
                return (
                  <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />
                );
              })
            : null}
        </div>
      ) : aCardsShown !== null && aCardsShown.length === 0 ? (
        <div className="page-container" align="center">
          <div className="responsive-card">
            <h1 className="card-title-text">Invalid Search</h1>
            <img src={LastChance} className="mtg-card" alt="Magic Card Back" />
            <h3>Search for another card</h3>
          </div>
        </div>
      ) : (
        <div className="page-container" align="center">
          <div className="responsive-card">
            <h1 className="card-title-text">Search for cards</h1>
            <img
              src={VampiricTutor}
              className="mtg-card"
              alt="Magic Card Back"
            />
          </div>
        </div>
      )}
    </>
  );
}
