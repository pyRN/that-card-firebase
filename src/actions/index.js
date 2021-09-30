import { SIGN_IN, SIGN_OUT } from "./types";

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
