import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";
import CardContainerHeader from "./CardContainerHeader";
import LoadingSymbol from "../LoadingSymbol";
import Footer from "./Footer";

//Media
import VampiricTutor from "../../../multimedia/Vampiric-tutor.jpg";

const CardsContainer = () => {
  const aFilteredCards = useSelector(
    (state) => state.oUserReducer.aFilteredCards
  );

  return (
    <div className="flex-column center w-100">
      <LoadingSymbol />
      <CardContainerHeader aFilteredCards={aFilteredCards} />
      <div className="flex-row flex-wrap center w-100">
        {aFilteredCards ? (
          aFilteredCards.map((oCardInfo) => {
            return <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />;
          })
        ) : aFilteredCards === null ? (
          <div className="landing-card flex-row center w-100">
            <div className="flex-column  landing-content w-50 center">
              <h2 className="main-heading">Search for a Card</h2>
            </div>
            <img
              src={VampiricTutor}
              className="mtg-card w-50"
              alt="Vampiric Tutor"
              id="landing-mtg-card"
            />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default CardsContainer;
