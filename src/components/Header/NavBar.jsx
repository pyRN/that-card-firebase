import { useSelector, useDispatch } from "react-redux";
import { fnFetchCards, fnSignOutUser } from "../../actions";
import { useHistory } from "react-router-dom";
import { auth } from "./../../firebase";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import "./NavBar.css";

export default function NavBar() {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const bIsDirty = useSelector((state) => state.oUserReducer.bIsDirty);
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();
  const oHamburgerMenu = useRef(null);
  const oSearchInput = useRef(null);

  const fnSignOut = (oEvent) => {
    oEvent.preventDefault();
    signOut(auth)
      .then(() => {
        fnDispatch(fnSignOutUser());
        fnHistory.push("/signIn");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const fnToggleMobileMenu = (oEvent) => {
    oEvent.preventDefault();
    oHamburgerMenu.current.classList.toggle("open");
  };

  const fnOnLinkClick = (oEvent) => {
    oEvent.preventDefault();
    bIsDirty
      ? fnDispatch({ type: "SET_MODAL_OPEN" })
      : fnHistory.push("/" + oEvent.target.id.split("-")[0]);
  };

  const fnOnSearchChange = (oEvent) => {
    if (bIsDirty) {
      fnDispatch({ type: "SET_MODAL_OPEN" });
    }
  };

  const fnSearchCard = (oEvent) => {
    oEvent.preventDefault();

    if (bIsDirty) {
      fnDispatch({ type: "SET_MODAL_OPEN" });
    } else {
      if (oSearchInput.current.value) {
        fnDispatch(
          fnFetchCards(oSearchInput.current.value, oUser, false, false)
        );
        oSearchInput.current.value = "";

        //If already on /cards path, no need to reload page
        if (fnHistory.location.pathname !== "/cards") {
          fnHistory.push("/cards");
        }
      }
    }
  };

  return (
    <header className="sticky-top">
      <h2 className="brand">Do I Have That Card?</h2>
      <nav>
        <ul>
          <li className="nav-links" onClick={fnOnLinkClick}>
            Main
          </li>
          <li
            className="nav-links"
            id="expansions-link"
            onClick={fnOnLinkClick}
          >
            Expansions
          </li>
          <li className="nav-links" id="cards-link" onClick={fnOnLinkClick}>
            Cards
          </li>

          {oUser ? (
            <>
              <li className="nav-links" id="decks-link" onClick={fnOnLinkClick}>
                Decks
              </li>
              <li
                className="nav-links"
                id="resources-link"
                onClick={fnOnLinkClick}
              >
                Resources
              </li>
              <li className="nav-links">
                <a href="#top" className="signOut-link" onClick={fnSignOut}>
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <li className="nav-links" id="signIn-link" onClick={fnOnLinkClick}>
              Sign In
            </li>
          )}
          <form className="input-form" onSubmit={fnSearchCard}>
            <input
              // className="input-field"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={oSearchInput}
              onChange={fnOnSearchChange}
            />
            <button className="submit-btn" type="submit" onClick={fnSearchCard}>
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
          <li onClick={fnOnLinkClick}>Main</li>
          <li id="expansions-mobile-link" onClick={fnOnLinkClick}>
            Expansions
          </li>
          <li id="cards-mobile-link" onClick={fnOnLinkClick}>
            Cards
          </li>

          {oUser ? (
            <>
              <li id="decks-mobile-link" onClick={fnOnLinkClick}>
                Decks
              </li>
              <li id="resource-mobile-links" onClick={fnOnLinkClick}>
                Resources
              </li>
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
            <li id="signIn-mobile-link" onClick={fnOnLinkClick}>
              Sign In
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
