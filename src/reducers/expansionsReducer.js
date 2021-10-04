import { SET_EXPANSION_LIST } from "../actions/types";

const initialState = {
  aExpansions: [],
};

export default function expansionsList(state = initialState, action) {
  switch (action.type) {
    case SET_EXPANSION_LIST:
      return { ...state, aExpansions: action.payload };
    default:
      return state;
  }
}
