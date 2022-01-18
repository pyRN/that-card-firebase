import {
  ADD_TO_STAGE,
  RESET_STAGE,
  SET_CARDS_DISPLAYED,
  SET_DIRTY,
  SET_DOCS_FETCHED,
  SET_FILTERED_CARDS,
  SET_IS_LOADING,
  SET_MODAL_OPEN,
  SIGN_IN,
  SIGN_OUT,
} from "../actions/types";

const initialState = {
  aFetchedPromises: null,
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
      for (let i = 0; i < state.aStaging.length; i++) {
        //In in staging, update values
        if (state.aStaging[i].sId === action.payload.sId) {
          if (action.payload.sType === "Regular")
            state.aStaging[i].iRegular = action.payload.iRegular;
          if (action.payload.sType === "Foil")
            state.aStaging[i].iFoil = action.payload.iFoil;
          return state;
        }
      }
      state.aStaging.push(action.payload);
      return state;

    case RESET_STAGE:
      return { ...state, aStaging: [] };

    case SET_CARDS_DISPLAYED:
      return {
        ...state,
        aFetchedPromises: action.payload,
      };

    case SET_DIRTY:
      return { ...state, bIsDirty: action.payload };
    //  return { ...state, bIsDirty: !state.bIsDirty };

    case SET_DOCS_FETCHED:
      return { ...state, aDocsFetched: action.payload };

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
