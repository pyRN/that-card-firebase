//Media
import MTGCard from "../../../multimedia/Magic_card_back.jpg";

export default function MainContainer() {
  return (
    <div className="page-container">
      <div className="responsive-card">
        <h1 className="card-title-text">Do I Have That Card?</h1>

        <img src={MTGCard} className="mtg-card" alt="Magic Card Back" />
        <p align="center">
          A simple Magic: The Gathering&#169; card collection manager
        </p>
      </div>
    </div>
  );
}
