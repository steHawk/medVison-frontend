import { ITEM_DETAIL } from "../actions/types";

const initialState = {
    itemDetail: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ITEM_DETAIL:
      return {
        ...state,
        itemDetail: action.payload,
      };

    default:
      return state;
  }
}