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
  const oSearchInput = useRef(null);

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

  const fnSearchCard = (event) => {
    event.preventDefault();
    if (oSearchInput.current.value) {
      fnGetCardsFromExpansion(
        [],
        `https://api.scryfall.com/cards/search?unique=prints&q=%22${oSearchInput.current.value}%22`
      );
      oSearchInput.current.value = "";
      fnHistory.push("/cards");
    }
  };

  const fnGetCardsFromExpansion = (cards, currentURL) => {
    fetch(currentURL)
      .then((response) => response.json())
      .then((data) => {
        //Check to see if search query returns cards
        if (data.object === "list") {
          //When searching for cards, only return cards that are printed (Not digital versions)
          let aNonDigitalCards = data.data.filter((card) => {
            return !card.digital;
          });
          cards = cards.concat(aNonDigitalCards);

          if (data.has_more) {
            fnGetCardsFromExpansion(cards, data.next_page);
          } else {
            fnDispatch({
              type: "SET_CARDS_DISPLAYED",
              payload: {
                aDisplayedCards: cards,
              },
            });
          }
        }
        //If search is invalid (error 404), return undefined card list
        else {
          fnDispatch({
            type: "SET_CARDS_DISPLAYED",
            payload: {
              aDisplayedCards: [],
            },
          });
        }
      });
  };

  return (
    <header className="sticky">
      <div className="brand">
        <a href="/">Do I Have That Card?</a>
      </div>
      <nav>
        <ul>
          <li className="nav-links">
            <Link className="link-text" to="/">
              Main
            </Link>
          </li>
          <li className="nav-links">
            <Link className="link-text" to="/expansions">
              Expansions
            </Link>
          </li>
          <li className="nav-links">
            <Link className="link-text" to="/cards">
              Cards
            </Link>
          </li>

          {oUser ? (
            <>
              <li className="nav-links">
                <Link className="link-text" to="/decks">
                  Decks
                </Link>
              </li>
              <li className="nav-links">
                <Link className="link-text" to="/resources">
                  Resources
                </Link>
              </li>
              <li className="nav-links">
                <a href="#top" className="signOut-link" onClick={fnSignOut}>
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <li className="nav-links">
              <Link className="link-text" to="/signIn">
                Sign In
              </Link>
            </li>
          )}
          <form className="input-form" onSubmit={fnSearchCard}>
            <input
              className="input-field"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={oSearchInput}
            />
            <button className="search-btn" type="submit" onClick={fnSearchCard}>
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
            <li align="center">Main</li>
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
              <a
                href="#top"
                className="signOut-link"
                onClick={fnSignOut}
                align="center"
              >
                Sign Out
              </a>
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
