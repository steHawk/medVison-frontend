import { SEARCH_ITEMS } from "../actions/types";

const initialState = {
  searchItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        searchItems: action.payload,
      };

    default:
      return state;
  }
}
