import {
  SET_EXPANSION_LIST,
  SET_EXPANSION_FILTER,
  RESET_FILTER,
} from "../actions/types";

const initialState = {
  aExpansions: [],
  aFilteredExpansions: [],
};

export default function expansionsList(state = initialState, action) {
  switch (action.type) {
    case RESET_FILTER:
      return { ...state, aFilteredExpansions: [] };
    case SET_EXPANSION_LIST:
      return { ...state, aExpansions: action.payload };
    case SET_EXPANSION_FILTER:
      return { ...state, aFilteredExpansions: action.payload };
    default:
      return state;
  }
}
