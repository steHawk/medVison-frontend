import { FETCH_TESTS } from "./types";


export const fetchTests = () => (dispatch) => {
    console.log('fetching...')
  fetch("https://5e9fd95611b078001679ce9a.mockapi.io/api/tests")
    .then((res) => res.json())
    .then((tests) =>
      dispatch({
        type: FETCH_TESTS,
        payload: tests,
      })
    );
};
