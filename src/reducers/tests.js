import { FETCH_TESTS, FETCH_ALL_TESTS } from "../actions/types";

const initialState = {
  tests: [],
  allTests: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTS:
      return {
        ...state,
        tests: action.payload,
      };
    case FETCH_ALL_TESTS:
      return {
        ...state,
        allTests: action.payload,
      };
    default:
      return state;
  }
}
