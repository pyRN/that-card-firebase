import {
  RESET_STAGE,
  SET_CARDS_DISPLAYED,
  SET_DIRTY,
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
