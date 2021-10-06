import "./MainContainer.css";
//Media
import MTGCard from "../../../multimedia/Magic_card_back.jpg";

export default function MainContainer() {
  return (
    <div className="main-container">
      <div align="center">
        <h1>Do I Have That Card?</h1>
        <p>An easy way to manage your Magic: The Gathering&#169; collection</p>
      </div>
      <div align="center">
        <img src={MTGCard} className="mtg-card" alt="Magic Card Back" />
      </div>
    </div>
  );
}
