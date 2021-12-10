import {
  SIGN_IN,
  SIGN_OUT,
  SET_CARDS_DISPLAYED,
  SET_IS_LOADING,
  SET_FILTERED_CARDS,
} from "../actions/types";

const initialState = {
  aCardsShown: null,
  aFilteredCards: null,
  oUser: null,
  bIsLoading: false,
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
    case SET_IS_LOADING:
      return {
        ...state,
        bIsLoading: action.payload.bIsLoading,
      };
    case SET_FILTERED_CARDS:
      return { ...state, aFilteredCards: action.payload };
    default:
      return state;
  }
}
