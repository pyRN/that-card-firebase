import { SIGN_IN } from "./types";

export const signIn = (oUser) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: oUser,
  });
};
