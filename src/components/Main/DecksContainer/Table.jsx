import { useDispatch, useSelector } from "react-redux";

export default function Table({ sHeader }) {
  const oDeck = useSelector((state) => state.oUserReducer.oCurrentDeck);
  return (
    <table>
      <thead>
        <tr>
          <th>{sHeader}</th>
          <th>Need</th>
          <th>Have</th>
        </tr>
      </thead>
      {oDeck !== null ? (
        <tbody>
          {oDeck
            .filter((oCard) => {
              switch (sHeader) {
                case "Creatures":
                  return (
                    oCard.sType.includes("Creature") &&
                    oCard.sBoard === "mainBoard"
                  );
                case "Spells":
                  return (
                    oCard.sBoard === "mainBoard" &&
                    (oCard.sType.includes("Enchantment") ||
                      oCard.sType.includes("Sorcery") ||
                      oCard.sType.includes("Instant") ||
                      oCard.sType.includes("Interrupt"))
                  );
                case "Artifacts":
                  return (
                    oCard.sType.includes("Artifact") &&
                    oCard.sBoard === "mainBoard" &&
                    !oCard.sType.includes("Creature")
                  );
                case "Planeswalkers":
                  return (
                    oCard.sType.includes("Planeswalker") &&
                    oCard.sBoard === "mainBoard"
                  );
                case "Lands":
                  return (
                    oCard.sType.includes("Land") && oCard.sBoard === "mainBoard"
                  );
                case "Sideboard":
                  return oCard.sBoard === "sideBoard";
                case "MaybeBoard":
                  return oCard.sBoard === "maybeBoard";
                default:
                  break;
              }
            })
            .map((oCard) => {
              return (
                <tr align="center">
                  <td>{oCard.sName}</td>
                  <td>{oCard.iAmount}</td>
                  <td>1</td>
                </tr>
              );
            })}
        </tbody>
      ) : (
        <tbody></tbody>
      )}
    </table>
  );
}
