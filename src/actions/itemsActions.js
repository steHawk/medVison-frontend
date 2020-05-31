import { FETCH_ITEMS } from "./types";

export const getItems = () => (dispatch) => {
  fetch("https://5e9fd95611b078001679ce9a.mockapi.io/api/tests")
    .then((res) => res.json())
    .then((items) =>
      dispatch({
        type: FETCH_ITEMS,
        payload: items,
      })
    );   
};


