import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutUser } from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import React, { useRef } from "react";
import "./NavBar.css";

export default function NavBar() {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();
  const oHamburgerMenu = useRef(null);
  // const oMobileSearchInput = useRef(null);
  // const oSearchInput = useRef(null);

  //Functions
  const fnSignOut = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        fnDispatch(signOutUser());
        fnHistory.push("/signIn");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const fnToggleMobileMenu = (event) => {
    event.preventDefault();
    oHamburgerMenu.current.classList.toggle("open");
  };

  return (
    <header className="sticky">
      <div className="brand">
        <a href="/">Do I Have That Card?</a>
      </div>
      <form className="mobile-search">
        <input
          className="input-field"
          type="search"
          placeholder="Do I Have That Card?"
          aria-label="Do I Have That Card?"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <nav className="nav-links">
        <ul>
          <li>
            <Link className="link-text" to="/">
              Main
            </Link>
          </li>
          <li>
            <Link className="link-text" to="/expansions">
              Expansions
            </Link>
          </li>
          <li>
            <Link className="link-text" to="/cards">
              Cards
            </Link>
          </li>

          {oUser ? (
            <>
              <li>
                <Link className="link-text" to="/decks">
                  Decks
                </Link>
              </li>
              <li>
                <Link className="link-text" to="/resources">
                  Resources
                </Link>
              </li>
              <li>
                <Link className="signOut-btn" onClick={fnSignOut}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className="link-text" to="/signIn">
                Sign In
              </Link>
            </li>
          )}
          <form>
            <input
              className="input-field"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
        </ul>
      </nav>
      <div
        className="hamburger-icon"
        ref={oHamburgerMenu}
        onClick={fnToggleMobileMenu}
      >
        <div className="hamburger-bar-1"></div>
        <div className="hamburger-bar-2"></div>
        <div className="hamburger-bar-3"></div>
        <ul className="mobile-menu">
          <Link className="link-text mobile-item" to="/" align="center">
            <li>Main</li>
          </Link>

          <Link
            className="link-text mobile-item"
            to="/expansions"
            align="center"
          >
            <li>Expansions</li>
          </Link>
          <Link className="link-text mobile-item" to="/cards" align="center">
            <li>Cards</li>
          </Link>

          {oUser ? (
            <>
              <Link
                className="link-text mobile-item"
                to="/decks"
                align="center"
              >
                <li>Decks</li>
              </Link>
              <Link
                className="link-text mobile-item"
                to="/resources"
                align="center"
              >
                <li>Resources</li>
              </Link>
              <li>
                <Link className="signOut-btn" onClick={fnSignOut}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <Link className="link-text mobile-item" to="/signIn" align="center">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
