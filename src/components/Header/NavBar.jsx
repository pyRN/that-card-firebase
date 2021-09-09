import { Link } from "react-router-dom";

//Components
import CardSearchForm from "./CardSearchForm";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <h3 className="navbar-brand text-primary">Do I Have That Card?</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="btn">
              <Link className="nav-link text-primary" to="/">
                Main
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/sets">
                Sets
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/cards">
                Cards
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/signIn">
                Sign In
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/decks">
                Decks
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/resources">
                Resources
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-1 border border-success"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ backgroundColor: "#222", color: "green" }}
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
