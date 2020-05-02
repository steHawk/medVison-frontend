import { FETCH_TESTS } from "../actions/types";

const initialState = {
  tests: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTS:
      return {
        ...state,
        tests: action.payload,
      };

    default:
      return state;
  }
}
