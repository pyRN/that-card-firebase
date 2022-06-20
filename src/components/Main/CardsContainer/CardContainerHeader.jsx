import { useSelector } from "react-redux";

const CardContainerHeader = ({ aFilteredCards }) => {
  const aFetchedPromises = useSelector(
    (state) => state.oUserReducer.aFetchedPromises
  );
  const oUser = useSelector((state) => state.oUserReducer.oUser);

  const iTotalCards =
    aFetchedPromises !== null && aFetchedPromises[0]
      ? aFetchedPromises[0].length
      : 0;
  const iTotalCardsOwned =
    aFetchedPromises !== null && aFetchedPromises[1]
      ? aFetchedPromises[1].length
      : 0;
  const oProgressBarStyle = {
    background: `linear-gradient(135deg, #09c372 ${
      (iTotalCardsOwned / iTotalCards) * 100
    }%, #ee7879 ${
      ((iTotalCards - iTotalCardsOwned) / iTotalCards) * 100
    }% 100%)`,
    margin: "10px",
  };

  return (
    <div className="flex-column center">
      {aFilteredCards === null ? null : (
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
      )}
    </div>
  );
};

export default CardContainerHeader;
