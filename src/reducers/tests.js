import {
  FETCH_TESTS,
  FETCH_SUPER60_TEST,
} from "../actions/types";

const initialState = {
  tests: [],
  super60: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTS:
      return {
        ...state,
        tests: action.payload,
      };
    case FETCH_SUPER60_TEST:
      return {
        ...state,
        super60: [...state.super60, action.payload],
      };
    default:
      return state;
  }
}
