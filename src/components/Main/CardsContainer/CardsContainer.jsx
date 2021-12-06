import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";
import LoadingSymbol from "../LoadingSymbol";
import Footer from "./Footer";

//Media
import LastChance from "../../../multimedia/Last-chance.jpg";
import VampiricTutor from "../../../multimedia/Vampiric-tutor.jpg";

export default function CardsContainer() {
  const aCardsShown = useSelector((state) => state.oUserReducer.aCardsShown);
  const bIsLoading = useSelector((state) => state.oUserReducer.bIsLoading);

  return (
    <div className="page-container">
      <LoadingSymbol />
      {aCardsShown && aCardsShown.length && !bIsLoading ? (
        aCardsShown !== null ? (
          <>
            {aCardsShown.map(function (oCardInfo) {
              return <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />;
            })}
            <Footer />
          </>
        ) : null
      ) : aCardsShown !== null && aCardsShown.length === 0 && !bIsLoading ? (
        <div className="responsive-card">
          <h1 className="card-title-text">Invalid Search</h1>
          <img src={LastChance} className="mtg-card" alt="Magic Card Back" />
          <h3>Search for another card</h3>
        </div>
      ) : !bIsLoading ? (
        <div className="responsive-card">
          <h1 className="card-title-text">Search for cards</h1>
          <img src={VampiricTutor} className="mtg-card" alt="Magic Card Back" />
        </div>
      ) : null}
    </div>
  );
}
