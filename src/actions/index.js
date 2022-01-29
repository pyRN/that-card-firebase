import {
  RESET_STAGE,
  SET_CARDS_DISPLAYED,
  SET_DIRTY,
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

export const signOutUser = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: null,
  });
};

export const resetCardSearch = () => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING,
    payload: {
      bIsLoading: true,
    },
  });
  dispatch({
    type: SET_FILTERED_CARDS,
    payload: null,
  });
};

export const setCardSearch = (aFetchedPromises, bIsLoading) => (dispatch) => {
  //Check if from search or expansion
  dispatch({
    type: SET_CARDS_DISPLAYED,
    payload:
      aFetchedPromises.length === 2 ? aFetchedPromises : [aFetchedPromises],
  });
  dispatch({
    type: SET_IS_LOADING,
    payload: {
      bIsLoading: bIsLoading,
    },
  });
  dispatch({
    type: SET_FILTERED_CARDS,
    payload:
      aFetchedPromises.length === 2 ? aFetchedPromises[0] : aFetchedPromises,
  });
};

export const resetStaging = () => (dispatch) => {
  dispatch({ type: RESET_STAGE });
  dispatch({ type: SET_DIRTY });
};

export const fnFetchCards =
  (sSearchInput, oUser, bExactMatch) => (dispatch) => {
    new Promise((fnResolve, fnReject) => {
      fnGetCardsFromSearch(
        [],
        `https://api.scryfall.com/cards/search?unique=prints&q=%22${sSearchInput}%22`,
        fnResolve,
        bExactMatch,
        sSearchInput
      );
    }).then((aCards) => {
      let aCardIds = [];

      aCards.forEach((oCard) => {
        aCardIds.push(oCard.id.replace(/-/g, ""));
      });

      new Promise((fnResolve, fnReject) => {
        fnGetDocsFromSearch(aCardIds, oUser, fnResolve);
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
  fnResolve,
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

export const fnFetchDocs = (aCardIds) => (dispatch) => {};

const fnGetDocsFromSearch = (aCardIds, oUser, fnResolve) => {
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

      fnResolve(aDocsRetrieved);
    });
  } else {
    fnResolve(null);
  }
};
