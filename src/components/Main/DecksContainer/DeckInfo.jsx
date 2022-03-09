import { useDispatch, useSelector } from "react-redux";

export default function DeckInfo() {
  const oDeck = useSelector((state) => state.oUserReducer.oCurrentDeck);

  let bStandard = "✔";
  let bLegacy = "✔";
  let bVintage = "✔";
  let bCommander = "✔";
  let bPauper = "✔";
  let bModern = "✔";

  for (let card in oDeck) {
    if (oDeck[card].aLegalities.standard === "not_legal") bStandard = "X";
    if (oDeck[card].aLegalities.legacy === "not_legal") bLegacy = "X";
    if (oDeck[card].aLegalities.vintage === "not_legal") bVintage = "X";
    if (oDeck[card].aLegalities.commander === "not_legal") bCommander = "X";
    if (oDeck[card].aLegalities.pauper === "not_legal") bPauper = "X";
    if (oDeck[card].aLegalities.modern === "not_legal") bModern = "X";
  }

  return (
    <div className="static-card">
      <h2>Deck Info</h2>

      <div className="row">
        <input placeholder="Deck Name"></input>
        <button className="submit-btn">Save</button>
        <button className="cancel-btn">Discard</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard</td>
            <td>{bStandard}</td>
          </tr>
          <tr>
            <td>Legacy</td>
            <td>{bLegacy}</td>
          </tr>
          <tr>
            <td>Vintage</td>
            <td>{bVintage}</td>
          </tr>
          <tr>
            <td>Commander</td>
            <td>{bCommander}</td>
          </tr>
          <tr>
            <td>Modern</td>
            <td>{bModern}</td>
          </tr>
          <tr>
            <td>Pauper</td>
            <td>{bPauper}</td>
          </tr>
        </tbody>
      </table>
      <div>Mana Curve</div>
    </div>
  );
}
