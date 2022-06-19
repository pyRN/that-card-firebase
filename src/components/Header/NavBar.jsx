import { useSelector, useDispatch } from "react-redux";
import { fnFetchCards, fnSignOutUser } from "../../actions";
import { useHistory, Link } from "react-router-dom";
import { auth } from "./../../firebase";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import "./NavBar.css";

//Multimedia
import PhyrexianSymbol from "../../multimedia/PhyrexianSymbol.svg";

const NavBar = () => {
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

        //If already on path:/cards, no need to reload page
        if (fnHistory.location.pathname !== "/cards") {
          fnHistory.push("/cards");
        }
      }
    }
  };

  return (
    <header className="flex-row sticky-top">
      <Link to="/" className="brand">
        Do I Have That Card?
      </Link>
      <nav class="flex-row">
        <div className="nav-links flex-row center">
          <div class="flex-row menu-link center">
            <img
              class="hover-icon"
              src={PhyrexianSymbol}
              alt="Phyrexian Symbol"
              width="15px"
              height="15px"
            />
            <Link className="nav-link" to="/expansions">
              Expansions
            </Link>
          </div>
          <div class="flex-row menu-link center">
            <img
              class="hover-icon"
              src={PhyrexianSymbol}
              alt="Phyrexian Symbol"
              width="15px"
              height="15px"
            />
            <Link className="nav-link" to="/cards">
              Cards
            </Link>
          </div>

          {oUser ? (
            <button className="btn btn-danger" onClick={fnSignOut}>
              Sign Out
            </button>
          ) : (
            <div class="flex-row menu-link center">
              <img
                class="hover-icon"
                src={PhyrexianSymbol}
                alt="Phyrexian Symbol"
                width="15px"
                height="15px"
              />
              <Link className="nav-link" to="/signIn">
                Sign In
              </Link>
            </div>
          )}
        </div>
        <form className="flex-row center search-form" onSubmit={fnSearchCard}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={oSearchInput}
            onChange={fnOnSearchChange}
          />
          <button
            className="btn btn-submit"
            type="submit"
            onClick={fnSearchCard}
          >
            Search
          </button>
        </form>
      </nav>
      <div
        className="hamburger-icon"
        ref={oHamburgerMenu}
        onClick={fnToggleMobileMenu}
      >
        <div className="hamburger-bar-1"></div>
        <div className="hamburger-bar-2"></div>
        <div className="hamburger-bar-3"></div>
        <ul className="flex-column mobile-menu">
          <Link to="/" className="mobile-brand mobile-nav-link">
            Main
          </Link>
          <Link className="mobile-nav-link" to="/expansions">
            Expansions
          </Link>
          <Link className="mobile-nav-link" to="/cards">
            Cards
          </Link>
          {oUser ? (
            <div className="signOut-link" onClick={fnSignOut}>
              Sign Out
            </div>
          ) : (
            <Link className="mobile-nav-link" to="/signIn">
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
