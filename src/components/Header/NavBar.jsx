import { Link } from "react-router-dom";
import "./NavBar.css";

//Components
import CardSearchForm from "./CardSearchForm";

export default function NavBar() {
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">Do I Have That Card</div>
      </div>
      <div className="nav-hamburger-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <Link className="nav-links-btn" to="/">
          Main
        </Link>
        <Link className="nav-links-btn" to="/sets">
          Sets
        </Link>
        <Link className="nav-links-btn" to="/cards">
          Cards
        </Link>
        <Link className="nav-links-btn" to="/resources">
          Resources
        </Link>
        <Link className="nav-links-btn" to="/decks">
          Decks
        </Link>
        <CardSearchForm />
      </div>
    </div>
  );
}
