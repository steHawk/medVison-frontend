import { FETCH_ALL_DOCTORS,CALLBACK_TOKEN } from "../actions/types";

const initialState = {
  doctors: [],
  doc_token: "",
  gotDocToken: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    case CALLBACK_TOKEN:
      return {
        ...state,
        doc_token: action.payload.test_details.bookingId,
        gotDocToken: action.payload.ok
      };

    default:
      return state;
  }
}
