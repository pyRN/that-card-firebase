import {
  ADD_TO_STAGE,
  RESET_STAGE,
  SET_CARDS_DISPLAYED,
  SET_DIRTY,
  SET_FILTERED_CARDS,
  SET_IS_LOADING,
  SET_MODAL_OPEN,
  SIGN_IN,
  SIGN_OUT,
} from "../actions/types";

const initialState = {
  aCardsShown: null,
  aFilteredCards: null,
  aStaging: [],
  bIsDirty: false,
  bIsLoading: false,
  bIsModalOpen: false,
  oUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_STAGE:
      //Check if card is already in staging area
      let bInStaging = false;
      for (let i = 0; i < state.aStaging.length; i++) {
        //In in staging, update values
        if (state.aStaging[i].id === action.payload.id) {
          console.log("Already in");
          state.aStaging[i] = action.payload;
          bInStaging = true;
        }
      }

      return bInStaging
        ? state
        : { ...state, aStaging: [...state.aStaging, action.payload] };

    case RESET_STAGE:
      console.log("Reset stage");
      return { ...state, aStaging: [] };

    case SET_CARDS_DISPLAYED:
      return {
        ...state,
        aCardsShown: action.payload.aDisplayedCards,
      };

    case SET_DIRTY:
      console.log("Set dirty");
      return { ...state, bIsDirty: action.payload };

    case SET_FILTERED_CARDS:
      return { ...state, aFilteredCards: action.payload };

    case SET_IS_LOADING:
      return {
        ...state,
        bIsLoading: action.payload.bIsLoading,
      };

    case SET_MODAL_OPEN:
      return { ...state, bIsModalOpen: !state.bIsModalOpen };

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
