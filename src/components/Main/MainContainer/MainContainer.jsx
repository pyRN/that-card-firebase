//Media
import MTGCard from "../../../multimedia/Magic_card_back.jpg";

export default function MainContainer() {
  return (
    <div>
      <div
        className="jumbotron jumbotron-fluid m-3"
        style={{
          backgroundColor: "black",
        }}
      >
        <div align="center" className="container">
          <h1 className="display-4 text-success">Do I Have That Card?</h1>
          <p className="lead text-success ml-3">
            A database for logging Magic: The Gathering&#169; cards
          </p>
        </div>
        <div align="center" className="container">
          <img src={MTGCard} style={{ width: "250px" }} alt="Magic Card" />
        </div>
      </div>
    </div>
  );
}
