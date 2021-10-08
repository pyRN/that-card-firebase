import { useSelector } from "react-redux";
import "./CardsContainer.css";

//Components
import CardComponent from "./CardComponent";

export default function CardsContainer() {
  const aCardsShown = useSelector((state) => state.oUserReducer.aCardsShown);

  return (
    <>
      {aCardsShown ? (
        <div align="center" className="cards-container">
          {aCardsShown !== null
            ? aCardsShown.map(function (oCardInfo) {
                return (
                  <CardComponent oCardInfo={oCardInfo} key={oCardInfo.id} />
                );
              })
            : null}
        </div>
      ) : null}
    </>
  );
}
