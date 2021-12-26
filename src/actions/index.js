import {
  SET_CARDS_DISPLAYED,
  SET_FILTERED_CARDS,
  SET_IS_LOADING,
  SIGN_IN,
  SIGN_OUT,
} from "./types";

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
    type: SET_CARDS_DISPLAYED,
    payload: {
      aDisplayedCards: null,
    },
  });
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

export const setCardSearch = (aDisplayedCards, bIsLoading) => (dispatch) => {
  dispatch({
    type: SET_CARDS_DISPLAYED,
    payload: {
      aDisplayedCards: aDisplayedCards,
    },
  });
  dispatch({
    type: SET_IS_LOADING,
    payload: {
      bIsLoading: bIsLoading,
    },
  });
};
