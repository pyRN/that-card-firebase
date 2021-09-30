import { SIGN_IN, SIGN_OUT } from "../actions/types";

const initialState = {
  oCardsShown: {},
  oUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_OUT:
      return {
        ...state,
        oUser: action.payload,
      };
    default:
      return state;
  }
}
