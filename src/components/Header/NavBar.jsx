import { useSelector, useDispatch } from "react-redux";
import { resetCardSearch, setCardSearch, signOutUser } from "../../actions";
import { useHistory } from "react-router-dom";
import { auth } from "./../../firebase";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import "./NavBar.css";

export default function NavBar() {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const bIsDirty = useSelector((state) => state.oUserReducer.bIsDirty);
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();
  const oHamburgerMenu = useRef(null);
  const oSearchInput = useRef(null);
  const db = getFirestore();

  const fnSignOut = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
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

  const fnOnLinkClick = (event) => {
    event.preventDefault();
    bIsDirty
      ? fnDispatch({ type: "SET_MODAL_OPEN" })
      : fnHistory.push("/" + event.target.id.split("-")[0]);
  };

  const fnOnSearchChange = (event) => {
    if (bIsDirty) {
      fnDispatch({ type: "SET_MODAL_OPEN" });
    }
  };

  const fnSearchCard = (event) => {
    event.preventDefault();

    if (bIsDirty) {
      fnDispatch({ type: "SET_MODAL_OPEN" });
    } else {
      if (oSearchInput.current.value) {
        new Promise((fnResolve, fnReject) => {
          fnGetCardsFromSearch(
            [],
            `https://api.scryfall.com/cards/search?unique=prints&q=%22${oSearchInput.current.value}%22`,
            fnResolve
          );
        }).then((aCards) => {
          let aCardIds = [];

          aCards.forEach((oCard) => {
            aCardIds.push(oCard.id.replace(/-/g, ""));
          });

          new Promise((fnResolve, fnReject) => {
            fnGetDocsFromSearch(aCardIds, fnResolve);
          }).then((aOwnedCards) => {
            fnDispatch(setCardSearch([aCards, aOwnedCards], false));
          });
        });

        fnDispatch(resetCardSearch());
        oSearchInput.current.value = "";
        //If already on /cards path, no need to reload page
        if (fnHistory.location.pathname !== "/cards") {
          fnHistory.push("/cards");
        }
      }
    }
  };

  const fnGetCardsFromSearch = (aCards, sCurrentURL, fnResolve) => {
    fetch(sCurrentURL)
      .then((response) => response.json())
      .then((data) => {
        //Check to see if search query returns cards
        if (data.object === "list") {
          //When searching for cards, only return cards that are printed (Not digital versions)
          let aNonDigitalCards = data.data.filter((oCard) => {
            return !oCard.digital;
          });

          aCards = aCards.concat(aNonDigitalCards);

          if (data.has_more) {
            fnGetCardsFromSearch(aCards, data.next_page);
          } else {
            fnResolve(aCards);
          }
        }
        //If search is invalid (error 404), return undefined card list
        else {
          fnResolve([]);
        }
      });
  };

  const fnGetDocsFromSearch = (aCardIds, fnResolve) => {
    if (oUser) {
      //Firebase only allows for 10 comparison values, have to make multiple queries
      let aBatchQueries = [];

      while (aCardIds.length) {
        let aChunkOfTenIds = aCardIds.splice(0, 10);

        aBatchQueries.push(
          new Promise((fnResolveQuery, fnRejectQuery) => {
            getDocs(
              query(
                collection(db, oUser.uid),
                where("sId", "in", aChunkOfTenIds)
              )
            ).then((docs) => {
              let aDocsFetched = [];
              docs.forEach((oCard) => {
                aDocsFetched.push(oCard.data());
              });
              fnResolveQuery(aDocsFetched);
            });
          })
        );
      }

      Promise.all(aBatchQueries).then((aRetrievedQueries) => {
        let aDocsRetrieved = [];

        aRetrievedQueries.forEach((aQuery) => {
          aDocsRetrieved = aDocsRetrieved.concat(aQuery);
        });

        fnResolve(aDocsRetrieved);
      });
    } else {
      fnResolve(null);
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
