import {} from "../actions/types";

const initialState = {
  oCardsShown: {},
  sUID: null,
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case "type":
      return {
        ...state,
        state: action.payload.state,
      };
    default:
      return state;
  }
}
