import "./DecksContainer.css";

//Components
import CardSearch from "./CardSearch";
import DeckInfo from "./DeckInfo";
import DeckList from "./DeckList";

export default function DeckContainer() {
  return (
    <div className="page-container" align="center">
      <div className="row">
        <CardSearch />
        <DeckInfo />
      </div>
      <div className="row">
        <DeckList />
      </div>
    </div>
  );
}
