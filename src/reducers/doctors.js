import {
  FETCH_ALL_DOCTORS,
  CALLBACK_TOKEN,
  CALLBACK_TOKEN_NULL,
} from "../actions/types";

const initialState = {
  doctors: [],
  doc_token: "",
  gotDocToken: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DOCTORS:
      return {
        doctors: action.payload,
      };
    case CALLBACK_TOKEN:
      // console.log("-------->", action.payload.test_details)
      return {
        ...state,
        doc_token: action.payload.test_details.bookingId,
        gotDocToken: action.payload.ok,
      };
    case CALLBACK_TOKEN_NULL:
      return {
        ...state,
        doc_token: "", 
        gotDocToken: false,
      };
    default:
      return state;
  }
}
