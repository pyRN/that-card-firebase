import { SIGN_IN } from "../actions/types";

const initialState = {
  oCardsShown: {},
  oUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        oUser: action.payload,
      };
    default:
      return state;
  }
}
