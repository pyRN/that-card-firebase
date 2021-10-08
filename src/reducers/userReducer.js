import { SIGN_IN, SIGN_OUT, SET_CARDS_DISPLAYED } from "../actions/types";

const initialState = {
  aCardsShown: null,
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
    case SET_CARDS_DISPLAYED:
      return {
        ...state,
        aCardsShown: action.payload.aDisplayedCards,
      };
    default:
      return state;
  }
}
