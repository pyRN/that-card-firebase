import { SIGN_IN } from "../actions/types";

const initialState = {
  oCardsShown: {},
  oUser: null,
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
}
