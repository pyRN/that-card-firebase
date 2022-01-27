import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";
import CardContainerHeader from "./CardContainerHeader";
import LoadingSymbol from "../LoadingSymbol";
import Footer from "./Footer";

//Media
import VampiricTutor from "../../../multimedia/Vampiric-tutor.jpg";

export default function CardsContainer() {
  const aFilteredCards = useSelector(
    (state) => state.oUserReducer.aFilteredCards
  );

  return (
    <>
      <LoadingSymbol />
      <CardContainerHeader aFilteredCards={aFilteredCards} />
      <div className="page-container">
        {aFilteredCards ? (
          aFilteredCards.map((oCardInfo) => {
            return <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />;
          })
        ) : aFilteredCards === null ? (
          <div className="static-card">
            <h1 align="center">Search for a Card</h1>
            <img src={VampiricTutor} className="mtg-card" alt="VampiricTutor" />
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
