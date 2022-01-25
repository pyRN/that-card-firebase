import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";
import LoadingSymbol from "../LoadingSymbol";
import Footer from "./Footer";

//Media
// import LastChance from "../../../multimedia/Last-chance.jpg";
// import VampiricTutor from "../../../multimedia/Vampiric-tutor.jpg";

export default function CardsContainer() {
  const aFilteredCards = useSelector(
    (state) => state.oUserReducer.aFilteredCards
  );

  return (
    <>
      <div className="page-container">
        <LoadingSymbol />
        {aFilteredCards
          ? aFilteredCards.map((oCardInfo) => {
              return <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />;
            })
          : null}
      </div>
      <Footer />
    </>
  );
}
