import {
  RESET_STAGE,
  SET_CARDS_DISPLAYED,
  SET_DECK_CARD_SEARCH,
  SET_DIRTY,
  SET_EXPANSION_FILTER,
  SET_FILTERED_CARDS,
  SET_IS_LOADING,
  SIGN_IN,
  SIGN_OUT,
} from "./types";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const signIn = (oUser) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: oUser,
  });
};

export const fnSignOutUser = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: null,
  });
};

export const resetStaging = () => (dispatch) => {
  dispatch({ type: RESET_STAGE });
  dispatch({ type: SET_DIRTY });
};

export const fnFetchDecks = (sDeckName) => (dispatch) => {
  console.log("Fetch Decks and return deck names in an array");
  console.log("Dispatch array of deck names to reducer");
};

export const fnFetchSingleCard = (sSearchInput) => (dispatch) => {
  fetch(`https://api.scryfall.com/cards/named?exact=${sSearchInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: SET_DECK_CARD_SEARCH,
        payload: data.status === 404 ? null : data,
      });
    });
};

export const fnFetchCards =
  (sSearchInput, oUser, bExactMatch, bExpansion) => (dispatch) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: {
        bIsLoading: true,
      },
    });

    if (bExpansion) {
      dispatch({
        type: SET_EXPANSION_FILTER,
        payload: [],
      });
    }

    new Promise((fnResolveGetCards, fnReject) => {
      fnGetCardsFromSearch(
        [],
        bExpansion
          ? `https://api.scryfall.com/cards/search?order=set&q=e%3A${sSearchInput}&unique=prints`
          : `https://api.scryfall.com/cards/search?unique=prints&q=%22${sSearchInput}%22`,
        fnResolveGetCards,
        bExactMatch,
        sSearchInput
      );
    }).then((aCards) => {
      let aCardIds = [];

      aCards.forEach((oCard) => {
        aCardIds.push(oCard.id.replace(/-/g, ""));
      });

      new Promise((fnResolveGetDocs, fnReject) => {
        fnGetDocsFromSearch(aCardIds, oUser, fnResolveGetDocs);
      }).then((aOwnedCards) => {
        let aFetchedPromises = [aCards, aOwnedCards];
        //Check if from search or expansion

        dispatch({
          type: SET_CARDS_DISPLAYED,
          payload:
            aFetchedPromises.length === 2
              ? aFetchedPromises
              : [aFetchedPromises],
        });
        dispatch({
          type: SET_IS_LOADING,
          payload: {
            bIsLoading: false,
          },
        });
        dispatch({
          type: SET_FILTERED_CARDS,
          payload:
            aFetchedPromises.length === 2
              ? aFetchedPromises[0]
              : aFetchedPromises,
        });
      });
    });
  };

const fnGetCardsFromSearch = (
  aCards,
  sCurrentURL,
  fnResolveGetCards,
  bExactMatch,
  sSearchInput
) => {
  fetch(sCurrentURL)
    .then((response) => response.json())
    .then((data) => {
      //Check to see if search query returns cards
      if (data.object === "list") {
        //When searching for cards, only return cards that are printed (Not digital versions)
        let aNonDigitalCards = data.data.filter((oCard) => {
          return !oCard.digital;
        });

        if (bExactMatch) {
          //This is triggered when a user clicks on a card name text
          aNonDigitalCards = aNonDigitalCards.filter((oCard) => {
            return oCard.name === sSearchInput;
          });
        }

        aCards = aCards.concat(aNonDigitalCards);

        if (data.has_more) {
          fnGetCardsFromSearch(
            aCards,
            data.next_page,
            fnResolveGetCards,
            bExactMatch,
            sSearchInput
          );
        } else {
          fnResolveGetCards(aCards);
        }
      }
      //If search is invalid (error 404), return undefined card list
      else {
        fnResolveGetCards([]);
      }
    });
};

const fnGetDocsFromSearch = (aCardIds, oUser, fnResolveGetDocs) => {
  if (oUser) {
    //Firebase only allows for 10 comparison values, have to make multiple queries
    let aBatchQueries = [];
    const db = getFirestore();

    while (aCardIds.length) {
      let aChunkOfTenIds = aCardIds.splice(0, 10);

      aBatchQueries.push(
        new Promise((fnResolveQuery, fnRejectQuery) => {
          getDocs(
            query(collection(db, oUser.uid), where("sId", "in", aChunkOfTenIds))
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

      fnResolveGetDocs(aDocsRetrieved);
    });
  } else {
    fnResolveGetDocs(null);
  }
};
