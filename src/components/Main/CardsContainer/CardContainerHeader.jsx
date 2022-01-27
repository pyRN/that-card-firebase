import { useSelector } from "react-redux";

export default function CardContainerHeader({ aFilteredCards }) {
  const aFetchedPromises = useSelector(
    (state) => state.oUserReducer.aFetchedPromises
  );
  const oUser = useSelector((state) => state.oUserReducer.oUser);

  const iTotalCards = aFetchedPromises[0] ? aFetchedPromises[0].length : 0;
  const iTotalCardsOwned = aFetchedPromises[1] ? aFetchedPromises[1].length : 0;
  const oProgressBarStyle = {
    background: `linear-gradient(135deg, #09c372 ${Math.ceil(
      iTotalCardsOwned / iTotalCards
    )}%, #ee7879 ${
      iTotalCardsOwned - Math.ceil(iTotalCardsOwned / iTotalCards)
    }%)`,
  };

  return (
    <>
      {aFilteredCards === null ? null : (
        <div align="center" className="card-header-container">
          <h2>
            {aFilteredCards.length === 0 ? (
              "Card searched does not exist or no cards in current filter"
            ) : oUser ? (
              <div style={oProgressBarStyle}>
                <p style={{ color: "#2a3166" }}>
                  {iTotalCardsOwned + " / " + iTotalCards} Owned
                </p>
              </div>
            ) : null}
          </h2>
        </div>
      )}
    </>
  );
}